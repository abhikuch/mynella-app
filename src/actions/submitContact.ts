"use server";

import { Resend } from "resend";
import { getResendOutboundEnv } from "@/lib/resend-outbound";
import { addLeadToResendList } from "@/lib/resend-leads-list";
import { normalizeIndiaMobile } from "@/lib/phone-india";
import { normalizeLeadEmail, validateContactFormData } from "@/lib/form-validation";

export type SubmitContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(formData: FormData): Promise<SubmitContactResult> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const fieldErr = validateContactFormData(formData);
  if (fieldErr) return { ok: false, error: fieldErr };

  const first = String(formData.get("firstName") ?? "");
  const last = String(formData.get("lastName") ?? "");
  const email = normalizeLeadEmail(String(formData.get("email") ?? ""));
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phoneDigits = normalizeIndiaMobile(phoneRaw)!;
  const product = String(formData.get("product") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const isProd = process.env.NODE_ENV === "production";
  const outbound = getResendOutboundEnv();

  if (isProd && !outbound) {
    console.error("submitContact: missing RESEND_* env in production");
    return { ok: false, error: "Submissions are temporarily unavailable. Please try again later." };
  }

  const subjectProduct = ` — ${product}`;
  const bodyLines = [
    "Source: Contact page",
    `Name: ${first.trim()} ${last.trim()}`.trim(),
    `Email: ${email}`,
    `Phone: +91 ${phoneDigits}`,
    `Interest: ${product}`,
    "",
    message || "(no message)",
    "",
    `Time: ${new Date().toISOString()}`,
  ];
  const text = bodyLines.join("\n");

  if (outbound) {
    const resend = new Resend(outbound.apiKey);
    const { error } = await resend.emails.send({
      from: outbound.from,
      to: [outbound.to],
      replyTo: email,
      subject: `MyNella website inquiry${subjectProduct}`,
      text,
    });
    if (error) {
      console.error("submitContact: Resend error", error);
      return { ok: false, error: "Could not send. Please try again or email us directly." };
    }

    void addLeadToResendList(resend, {
      email,
      firstName: first.trim(),
      lastName: last.trim(),
      leadSource: "contact",
      productInterest: product,
      phoneDisplay: `+91 ${phoneDigits}`,
    });
  } else if (!isProd) {
    console.info("submitContact (dev, no Resend):", {
      first,
      last,
      email,
      phoneDigits,
      product,
      message,
    });
  }

  return { ok: true };
}
