// Only this fixed public address is exempt from Cloudflare's HTML rewriting.
// The comment markers also prevent plain text from becoming a crawlable 404 link.
export default function ContactEmail({ link = false }: { link?: boolean }) {
  const address = "contact@pcfixbase.com";
  const content = link
    ? `<a href="mailto:${address}" class="font-semibold text-blue-600 hover:underline">${address}</a>`
    : address;
  return <span dangerouslySetInnerHTML={{ __html: `<!--email_off-->${content}<!--/email_off-->` }} />;
}

export function ContactEmailText({ children }: { children: string }) {
  const escaped = children.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const html = escaped.replaceAll("contact@pcfixbase.com", "<!--email_off-->contact@pcfixbase.com<!--/email_off-->");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
