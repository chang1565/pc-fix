// Keep this fixed public contact address out of Cloudflare's email link rewrite.
export default function ContactEmail() {
  return <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:contact@pcfixbase.com" class="font-semibold text-blue-600 hover:underline">contact@pcfixbase.com</a><!--/email_off-->' }} />;
}
