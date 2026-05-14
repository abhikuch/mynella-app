/**
 * Shared Resend configuration for lead capture, contact form, etc.
 * Set RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_LEAD_TO_EMAIL (see .env.example).
 */
export function getResendOutboundEnv():
  | { apiKey: string; from: string; to: string }
  | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.RESEND_LEAD_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}
