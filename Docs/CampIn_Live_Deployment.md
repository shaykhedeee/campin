# CampIn Live Deployment

## Current production target

- Hosting target: Netlify
- Primary public domain: `https://campin.co.in/`
- Redirecting alias: `https://www.campin.co.in/` redirects to the apex domain
- Build command: `npm run build`
- Public build directory: `dist`
- Admin build directory: `dist-admin` (never deploy this directory publicly)
- Local Netlify config: `netlify.toml`

## Netlify domain setup

As of 2026-08-01, public DNS already resolves the apex domain through Netlify edge IPs and `www.campin.co.in` CNAMEs to `campin.co.in`.

Current DNS observed locally:

- `campin.co.in` A -> `13.248.243.5`
- `campin.co.in` A -> `76.223.105.230`
- `www.campin.co.in` CNAME -> `campin.co.in`

To finish or repair the Netlify setup:

1. In Netlify, open the CampIn site dashboard.
2. Go to `Domain management`.
3. Choose `Add a domain` -> `Add a domain you already own`.
4. Add `campin.co.in`; Netlify should also add `www.campin.co.in`.
5. Use external DNS unless you intentionally want to move nameservers to Netlify DNS.
6. Set `campin.co.in` as the primary domain if CampIn should use the apex URL.
7. In `HTTPS`, provision or renew the Netlify-managed certificate after DNS verification passes.

If DNS needs to be recreated at the registrar or DNS provider:

- Preferred apex record: `@` ALIAS/ANAME/flattened CNAME -> `apex-loadbalancer.netlify.com`
- Fallback apex record: `@` A -> `75.2.60.5`
- Subdomain record: `www` CNAME -> the site's `*.netlify.app` subdomain shown in Netlify

## Verification checklist

```text
Resolve-DnsName campin.co.in
Resolve-DnsName www.campin.co.in
Invoke-WebRequest -Uri https://campin.co.in -MaximumRedirection 5
Invoke-WebRequest -Uri https://www.campin.co.in -MaximumRedirection 5
```

Expected result:

- `https://campin.co.in/` returns HTTP 200.
- `https://www.campin.co.in/` redirects to `https://campin.co.in/`.
- Netlify shows both custom domains as verified.
- Netlify HTTPS shows a valid certificate for both apex and `www`.

## Repeatable release

```text
npm run build
```

Netlify should deploy from the connected Git repository using `netlify.toml`.

Run the launch validator before each release:

```text
python tools/campin-launch-validator/scripts/audit_launch.py .
```
