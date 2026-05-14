export function formatPostDate(iso: string | null): string {
  if (!iso) return "Latest";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "Post";
  }
}
