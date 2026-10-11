# Security configuration

- Cloudflare visitor HTTP requests redirect to HTTPS (308), preserving path/query.
- HSTS starts with a one-day lifetime, without includeSubDomains or preload.
- Responses include nosniff, SAMEORIGIN, strict-origin referrer policy and disabled unused device permissions.
- CSP restricts base URLs, plugins and embedding; AdSense/CMP script, frame and network sources remain unrestricted.
- Next.js identification header is disabled; standalone output is tracked for Docker deployment.

## Home server port guard

`pcfix-port-guard.service` runs after Docker and reapplies narrow iptables rules after reboot/Docker restart.
Only incoming Docker connections originally targeting TCP 3000 and host TCP 20242 are guarded.
PC FIX direct IPv4 access is allowed from `192.168.219.0/24`; host loopback/Tunnel access continues. Other Docker service ports and SSH are untouched.
IPv6 direct access from outside loopback is blocked for these two ports.
The rules do not make UFW active and are not a complete server firewall policy.

Server files: `/usr/local/sbin/pcfix-port-guard`, `/etc/systemd/system/pcfix-port-guard.service`.
Initial firewall snapshots: `/root/pcfix-security-backup/`. Previous server Next config: `~/pcfix-next-config-security-backup.ts`.

To undo port restrictions, first disable the service, then remove its jump rules and the PCFIX-GUARD / PCFIX-METRICS chains for iptables and ip6tables. Avoid restoring a whole old firewall snapshot if other services' firewall rules have changed meanwhile.

SSH password login remains enabled until key-based login and the desktop monitor migration are verified. Password rotation is a separate manual action.
