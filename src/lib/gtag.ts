/**
 * GA4 events via gtag (loaded lazily in `GoogleAnalytics`). Safe no-ops until `gtag` exists.
 */
export function sendGtagEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const g = window.gtag;
  if (typeof g !== "function") return;
  g("event", name, params ?? {});
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
