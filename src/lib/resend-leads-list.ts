/**
 * Resend Audiences / Segments are separate from transactional email (`emails.send`).
 * Subscribers appear in the dashboard only after `contacts.create` (segment or audience).
 *
 * Set one of:
 * - RESEND_LEADS_SEGMENT_ID — preferred (Resend Segments)
 * - RESEND_LEADS_AUDIENCE_ID — legacy Audiences API path in the SDK
 */
import type { Resend } from "resend";

export type ResendLeadsListEnv =
  | { kind: "segment"; id: string }
  | { kind: "audience"; id: string }
  | null;

export function getResendLeadsListEnv(): ResendLeadsListEnv {
  const segmentId = process.env.RESEND_LEADS_SEGMENT_ID?.trim();
  if (segmentId) return { kind: "segment", id: segmentId };
  const audienceId = process.env.RESEND_LEADS_AUDIENCE_ID?.trim();
  if (audienceId) return { kind: "audience", id: audienceId };
  return null;
}

/**
 * True when the email is already in the configured segment/audience and not unsubscribed.
 * On API errors, returns false so signups are not blocked (emails still send).
 */
export async function isLeadAlreadyInResendList(
  resend: Resend,
  email: string,
): Promise<boolean> {
  const list = getResendLeadsListEnv();
  if (!list) return false;

  const e = email.trim();
  if (!e) return false;

  try {
    if (list.kind === "segment") {
      const segRes = await resend.contacts.segments.list({ email: e });
      if (segRes.error || !segRes.data) return false;
      const segments = segRes.data.data ?? [];
      if (!segments.some((s) => s.id === list.id)) return false;
      const got = await resend.contacts.get(e);
      if (got.error || !got.data) return false;
      return !got.data.unsubscribed;
    }

    const got = await resend.contacts.get({ email: e, audienceId: list.id });
    if (got.error || !got.data) return false;
    return !got.data.unsubscribed;
  } catch {
    return false;
  }
}

/** Where the lead was captured — stored on the Resend contact for segmentation and reporting. */
export type LeadAcquisitionSource = "footer" | "blog" | "contact";

function buildContactProperties(opts: {
  leadSource: LeadAcquisitionSource;
  productInterest?: string;
  phoneDisplay?: string;
}): Record<string, string | number | null> {
  const p: Record<string, string | number | null> = {
    lead_source: opts.leadSource,
  };
  const pi = opts.productInterest?.trim();
  if (pi) p.product_interest = pi;
  const ph = opts.phoneDisplay?.trim();
  if (ph) p.phone = ph;
  return p;
}

/** Best-effort: does not throw; logs API errors (e.g. duplicate email). */
export async function addLeadToResendList(
  resend: Resend,
  opts: {
    email: string;
    firstName?: string;
    lastName?: string;
    leadSource: LeadAcquisitionSource;
    /** Contact form product field — omit for newsletter flows. */
    productInterest?: string;
    /** E.g. +91 98765 43210 — for ops visibility in Resend. */
    phoneDisplay?: string;
  },
): Promise<void> {
  const list = getResendLeadsListEnv();
  if (!list) return;

  const email = opts.email.trim();
  if (!email) return;

  const firstName = opts.firstName?.trim() || undefined;
  const lastName = opts.lastName?.trim() || undefined;
  const properties = buildContactProperties({
    leadSource: opts.leadSource,
    productInterest: opts.productInterest,
    phoneDisplay: opts.phoneDisplay,
  });

  try {
    if (list.kind === "segment") {
      const { error } = await resend.contacts.create({
        email,
        firstName,
        lastName,
        segments: [{ id: list.id }],
        properties,
      });
      if (error) {
        console.error("addLeadToResendList (segment):", error);
      }
    } else {
      const { error } = await resend.contacts.create({
        email,
        firstName,
        lastName,
        audienceId: list.id,
        properties,
      });
      if (error) {
        console.error("addLeadToResendList (audience):", error);
      }
    }
  } catch (e) {
    console.error("addLeadToResendList:", e);
  }
}
