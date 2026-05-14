function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ctaButton(href: string, label: string): string {
  const h = esc(href);
  const l = esc(label);
  return `<a href="${h}" style="display:inline-block;padding:14px 28px;background:#111827;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${l}</a>`;
}

function textLink(url: string, label: string): string {
  return `${label}: ${url}`;
}

function emailShell(innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#ececf0;color:#1a1a1e;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;font-size:16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:14px;border:1px solid #e4e4e8;overflow:hidden;">
<tr><td style="padding:32px 28px 28px;">
${innerHtml}
</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #ececf0;font-size:13px;color:#6b7280;">
MyNella — marketing site for Nella and beauty editorial. This email is transactional; it is not medical or investment advice.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildFooterWelcomeEmail(args: {
  siteUrl: string;
  bookCallUrl: string;
  contactUrl: string;
  email: string;
  phoneDisplay: string;
}): { subject: string; text: string; html: string } {
  const { bookCallUrl, contactUrl, email, phoneDisplay } = args;
  const subject = "You're on the list — MyNella";
  const text = [
    "Hi,",
    "",
    "Thanks for subscribing. You'll receive occasional updates when we have something worth sharing — launches, editorial drops, and Nella app news.",
    "",
    "Here's what we saved:",
    `• Email: ${email}`,
    `• Mobile: ${phoneDisplay}`,
    "",
    "Want to speak with the team?",
    textLink(bookCallUrl, "Book a call"),
    "",
    `More ways to reach us: ${contactUrl}`,
    "",
    "— MyNella",
  ].join("\n");

  const html = emailShell(`
<p style="margin:0 0 16px;font-size:17px;">Hi,</p>
<p style="margin:0 0 18px;color:#374151;">Thanks for subscribing. You&apos;ll receive occasional updates when we have something worth sharing — launches, editorial drops, and Nella app news.</p>
<p style="margin:0 0 8px;font-weight:600;color:#111827;">What we have on file</p>
<ul style="margin:0 0 22px;padding-left:20px;color:#374151;">
<li style="margin-bottom:6px;">Email: <strong>${esc(email)}</strong></li>
<li>Mobile: <strong>${esc(phoneDisplay)}</strong></li>
</ul>
<p style="margin:0 0 14px;font-weight:600;color:#111827;">Book a call</p>
<p style="margin:0 0 18px;color:#374151;">Prefer a conversation first? Pick a time that works for you.</p>
<p style="margin:0 0 28px;">${ctaButton(bookCallUrl, "Book a call")}</p>
<p style="margin:0;font-size:15px;"><a href="${esc(contactUrl)}" style="color:#2563eb;">Contact page</a> — other ways to reach our team.</p>
`);

  return { subject, text, html };
}

export function buildLeadInternalNotification(args: {
  label: string;
  email: string;
  phoneDisplay: string;
}): { subject: string; text: string } {
  const { label, email, phoneDisplay } = args;
  const subject = `MyNella website lead — ${label}`;
  const text = [
    `Source: ${label}`,
    `Email: ${email}`,
    `Phone: ${phoneDisplay}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");
  return { subject, text };
}
