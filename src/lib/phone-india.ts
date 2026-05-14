/**
 * Indian mobile: 10 digits, first digit 6–9. Accepts +91, 91, leading 0, spaces/dashes.
 */
export function normalizeIndiaMobile(raw: string): string | null {
  let s = raw.replace(/[\s.\-()]/g, "");
  if (s.startsWith("+91")) s = s.slice(3);
  else if (s.startsWith("91") && s.length === 12) s = s.slice(2);
  else if (s.startsWith("0") && s.length === 11) s = s.slice(1);
  if (!/^\d{10}$/.test(s)) return null;
  if (!/^[6-9]/.test(s)) return null;
  return s;
}

export const INDIA_MOBILE_HELP =
  "10-digit Indian mobile (starts with 6–9). Examples: 9876543210 or +91 9876543210.";

export const INDIA_MOBILE_INVALID =
  "Enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).";
