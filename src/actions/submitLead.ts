"use server";

import { Resend } from "resend";
import { buildFooterWelcomeEmail, buildLeadInternalNotification } from "@/lib/lead-welcome-email";
import { getResendOutboundEnv } from "@/lib/resend-outbound";
import { addLeadToResendList, isLeadAlreadyInResendList } from "@/lib/resend-leads-list";
import { normalizeIndiaMobile } from "@/lib/phone-india";
import { SITE_URL } from "@/lib/seo-config";
import { normalizeLeadEmail, validateNewsletterFormData } from "@/lib/form-validation";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(formData: FormData): Promise<SubmitLeadResult> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  if (formData.get("source") !== "footer") {
    return { ok: false, error: "Invalid request." };
  }

  const fieldErr = validateNewsletterFormData(formData);
  if (fieldErr) return { ok: false, error: fieldErr };

  const email = normalizeLeadEmail(String(formData.get("email") ?? ""));
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phoneDigits = normalizeIndiaMobile(phoneRaw)!;

  const isProd = process.env.NODE_ENV === "production";
  const outbound = getResendOutboundEnv();

  if (isProd && !outbound) {
    console.error("submitLead: missing RESEND_* env in production");
    return { ok: false, error: "Submissions are temporarily unavailable. Please try again later." };
  }

  if (outbound) {
    const resend = new Resend(outbound.apiKey);
    const label = "Newsletter";
    const phoneDisplay = `+91 ${phoneDigits}`;
    const siteUrl = SITE_URL;
    const contactUrl = `${siteUrl}/contact`;

    const chrome = await getResolvedSiteChrome();
    const bookCallUrl = chrome.ctaLinks.bookCall;

    const internal = buildLeadInternalNotification({ label, email, phoneDisplay });

    const alreadyInList = await isLeadAlreadyInResendList(resend, email);

    if (!alreadyInList) {
      const welcome = buildFooterWelcomeEmail({
        siteUrl,
        bookCallUrl,
        contactUrl,
        email,
        phoneDisplay,
      });

      const [teamSend, userSend] = await Promise.all([
        resend.emails.send({
          from: outbound.from,
          to: [outbound.to],
          subject: internal.subject,
          text: internal.text,
        }),
        resend.emails.send({
          from: outbound.from,
          to: [email],
          replyTo: outbound.to,
          subject: welcome.subject,
          text: welcome.text,
          html: welcome.html,
        }),
      ]);

      if (teamSend.error) {
        console.error("submitLead: Resend team notify error", teamSend.error);
        return { ok: false, error: "Could not submit. Please try again." };
      }
      if (userSend.error) {
        console.error("submitLead: Resend welcome email error", userSend.error);
        return { ok: false, error: "Could not submit. Please try again." };
      }
    }

    void addLeadToResendList(resend, {
      email,
      leadSource: "footer",
      phoneDisplay: phoneDisplay,
    });
  } else if (!isProd) {
    console.info("submitLead (dev, no Resend):", { source: "footer", email, phoneDigits });
  }

  return { ok: true };
}
