# Security configuration

- Cloudflare visitor HTTP requests redirect to HTTPS (308), preserving path/query.
- HSTS starts with a one-day lifetime, without includeSubDomains or preload.
- Responses include nosniff, SAMEORIGIN, strict-origin referrer policy and disabled unused device permissions.
- CSP restricts base URLs, plugins and embedding; AdSense/CMP script, frame and network sources remain unrestricted.
- Next.js identification header is disabled; standalone output is tracked for Docker deployment.
- JSON-LD script content escapes `<` as `<` so data text cannot close the script tag.
- Keep `next` on a patched release; run `npm audit --omit=dev` before each deployment.

Server, network and firewall details are kept in private operator notes, not in this public repository.
