"use server";

import { Resend } from "resend";
import { buildFooterWelcomeEmail, buildLeadInternalNotification } from "@/lib/lead-welcome-email";
import { getResendOutboundEnv } from "@/lib/resend-outbound";
import {
  addLeadToResendList,
  isLeadAlreadyInResendList,
  type LeadAcquisitionSource,
} from "@/lib/resend-leads-list";
import { normalizeIndiaMobile } from "@/lib/phone-india";
import { SITE_URL } from "@/lib/seo-config";
import { normalizeLeadEmail, validateNewsletterFormData } from "@/lib/form-validation";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

const WAITLIST_SOURCES = ["footer", "landing-hero", "landing-bottom"] as const;
type WaitlistFormSource = (typeof WAITLIST_SOURCES)[number];

function parseWaitlistSource(raw: unknown): WaitlistFormSource | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  return WAITLIST_SOURCES.includes(s as WaitlistFormSource) ? (s as WaitlistFormSource) : null;
}

function toResendLeadSource(source: WaitlistFormSource): LeadAcquisitionSource {
  switch (source) {
    case "footer":
      return "footer";
    case "landing-hero":
      return "landing_hero";
    case "landing-bottom":
      return "landing_bottom";
    default: {
      const _exhaustive: never = source;
      return _exhaustive;
    }
  }
}

function internalLabel(source: WaitlistFormSource): string {
  switch (source) {
    case "footer":
      return "Newsletter (footer)";
    case "landing-hero":
      return "Waitlist (landing hero)";
    case "landing-bottom":
      return "Waitlist (landing bottom)";
    default: {
      const _e: never = source;
      return _e;
    }
  }
}

export async function submitLead(formData: FormData): Promise<SubmitLeadResult> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const source = parseWaitlistSource(formData.get("source"));
  if (!source) {
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
    const label = internalLabel(source);
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
      leadSource: toResendLeadSource(source),
      phoneDisplay: phoneDisplay,
    });
  } else if (!isProd) {
    console.info("submitLead (dev, no Resend):", { source, email, phoneDigits });
  }

  return { ok: true };
}
