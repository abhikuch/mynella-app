import { normalizeIndiaMobile, INDIA_MOBILE_INVALID } from "@/lib/phone-india";

/** Matches server-side lead/contact email checks. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_INVALID_MSG = "Enter a valid email address.";

export const MAX_NAME_LEN = 80;
export const MAX_MESSAGE_LEN = 8000;
export const MAX_PRODUCT_LEN = 120;
export const MAX_EMAIL_LEN = 254;
export const MAX_PHONE_INPUT_LEN = 32;

const CTRL_RE = /[\x00-\x08\x0b\x0c\x0e-\x1f]/;

export function normalizeLeadEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

/** Returns an error message or `null` if valid. */
export function validateLeadEmail(raw: string): string | null {
  const email = normalizeLeadEmail(raw);
  if (!email || email.length > MAX_EMAIL_LEN) return EMAIL_INVALID_MSG;
  if (!EMAIL_RE.test(email)) return EMAIL_INVALID_MSG;
  return null;
}

/** Returns an error message or `null` if valid. */
export function validateIndiaPhone(raw: string): string | null {
  const t = raw.trim();
  if (t.length > MAX_PHONE_INPUT_LEN) return INDIA_MOBILE_INVALID;
  return normalizeIndiaMobile(t) ? null : INDIA_MOBILE_INVALID;
}

/** At least one of first/last must be non-empty after trim; length and control-char checks. */
export function validateEitherName(firstRaw: string, lastRaw: string): string | null {
  const first = firstRaw.trim();
  const last = lastRaw.trim();
  if (!first && !last) return "Please enter your first or last name.";
  if (first.length > MAX_NAME_LEN || last.length > MAX_NAME_LEN) {
    return `Please keep each name under ${MAX_NAME_LEN} characters.`;
  }
  if (CTRL_RE.test(first) || CTRL_RE.test(last)) {
    return "Names contain invalid characters.";
  }
  return null;
}

export function validateContactProduct(raw: string): string | null {
  const product = raw.trim();
  if (!product) return "Please select what you're interested in.";
  if (product.length > MAX_PRODUCT_LEN) return "Invalid selection.";
  if (product.includes("\n") || product.includes("\r")) return "Invalid selection.";
  return null;
}

/** Optional message: empty is OK; otherwise length and NUL checks. */
export function validateOptionalMessage(raw: string): string | null {
  if (raw.includes("\x00")) return "Message contains invalid characters.";
  if (raw.length > MAX_MESSAGE_LEN) {
    return `Please keep your message under ${MAX_MESSAGE_LEN} characters.`;
  }
  return null;
}

export function validateLeadConsent(consent: boolean): string | null {
  if (!consent) return "Please accept the privacy policy to continue.";
  return null;
}

/** Client + server: newsletter / blog gate fields. */
export function validateNewsletterFormData(fd: FormData): string | null {
  return (
    validateLeadEmail(String(fd.get("email") ?? "")) ??
    validateIndiaPhone(String(fd.get("phone") ?? "")) ??
    validateLeadConsent(fd.get("consent") === "on")
  );
}

/** Client + server: contact page fields. */
export function validateContactFormData(fd: FormData): string | null {
  return (
    validateEitherName(String(fd.get("firstName") ?? ""), String(fd.get("lastName") ?? "")) ??
    validateLeadEmail(String(fd.get("email") ?? "")) ??
    validateIndiaPhone(String(fd.get("phone") ?? "")) ??
    validateContactProduct(String(fd.get("product") ?? "")) ??
    validateOptionalMessage(String(fd.get("message") ?? ""))
  );
}
