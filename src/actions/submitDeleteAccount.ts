"use server";

import { Resend } from "resend";
import { getResendOutboundEnv } from "@/lib/resend-outbound";
import { normalizeIndiaMobile } from "@/lib/phone-india";
import { normalizeLeadEmail, validateDeleteAccountFormData } from "@/lib/form-validation";

export type SubmitDeleteAccountResult = { ok: true } | { ok: false; error: string };

export async function submitDeleteAccount(
  formData: FormData,
): Promise<SubmitDeleteAccountResult> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const fieldErr = validateDeleteAccountFormData(formData);
  if (fieldErr) return { ok: false, error: fieldErr };

  const email = normalizeLeadEmail(String(formData.get("email") ?? ""));
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phoneDigits = phoneRaw ? normalizeIndiaMobile(phoneRaw) : null;
  const accountNote = String(formData.get("accountNote") ?? "").trim();

  const isProd = process.env.NODE_ENV === "production";
  const outbound = getResendOutboundEnv();

  if (isProd && !outbound) {
    console.error("submitDeleteAccount: missing RESEND_* env in production");
    return { ok: false, error: "Submissions are temporarily unavailable. Please try again later." };
  }

  const bodyLines = [
    "Source: Delete account page (Nella app)",
    `Account email: ${email}`,
    phoneDigits ? `Phone on file: +91 ${phoneDigits}` : "Phone on file: (not provided)",
    accountNote ? `Account identifier / notes: ${accountNote}` : "",
    "",
    "User confirmed they want permanent deletion of their Nella app account and associated data.",
    "",
    `Time: ${new Date().toISOString()}`,
  ].filter(Boolean);
  const text = bodyLines.join("\n");

  if (outbound) {
    const resend = new Resend(outbound.apiKey);
    const { error } = await resend.emails.send({
      from: outbound.from,
      to: [outbound.to],
      replyTo: email,
      subject: "Nella app — account deletion request",
      text,
    });
    if (error) {
      console.error("submitDeleteAccount: Resend error", error);
      return { ok: false, error: "Could not send. Please try again or email us directly." };
    }
  } else if (!isProd) {
    console.info("submitDeleteAccount (dev, no Resend):", { email, phoneDigits, accountNote });
  }

  return { ok: true };
}
