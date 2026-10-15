# DEPLOYMENT.md — Deploy, Domain, Pre-Launch

The site is fully static: `index.html`, `styles.css`, `script.js`, `menu.json`, `images/`, `robots.txt`, `sitemap.xml`. No build step.

## 1. Netlify

### Option A — Drag and drop

1. Go to https://app.netlify.com/drop and drag the `urban-cafe-website` folder onto the page.
2. Netlify publishes it immediately at a random subdomain (for example `urban-cafe-abbottabad.netlify.app`). Rename the site under Site settings, Change site name.
3. Every later update: drag the folder again (or use Git, below).

### Option B — Git

1. Push the folder to a GitHub/GitLab repository.
2. Netlify, Add new site, Import from Git. Build command: (leave empty). Publish directory: `/` (repository root).
3. Deploys run on every push.

Netlify needs no `_redirects` or headers file for this site. (Optional hardening later: add a `_headers` file with cache rules for `styles.css`, `script.js` and `images/*`.)

## 2. Vercel

1. Install the CLI (`npm i -g vercel`) or use the dashboard import.
2. From the project folder run `npx vercel` and accept the defaults (framework: Other, build command: none, output directory: root).
3. Production deploy: `npx vercel --prod`.
4. The site works with zero configuration.

## 3. Custom domain

1. Buy the domain (for example `urbancafeabbottabad.pk` or a `.com` the owner prefers).
2. Netlify: Site settings, Domain management, Add domain. Vercel: Project settings, Domains.
3. At the registrar, point DNS: an `A` record to the host's load-balancer IP (Netlify `75.2.60.5`; check current docs) or a `CNAME` to the host alias (Vercel `cname.vercel-dns.com`; Netlify `your-site.netlify.app`).
4. Enable the free Let's Encrypt certificate (automatic on both hosts).
5. Update the placeholder URLs everywhere (checklist below).

## 4. Files that must change when the domain exists

- `index.html`: canonical link, Open Graph `og:url`, JSON-LD `url` and `hasMap` if used.
- `sitemap.xml`: the single `<loc>`.
- `robots.txt`: the Sitemap line.
- `script.js` CONFIG or QR section: the QR code target URL (TODO live URL).
- Regenerate the QR code image for the printable table menu (`images/qr-menu.svg` or a PNG export) and reprint table stickers.

## 5. Pre-launch checklist

Content:

- [ ] Owner-provided menu pasted into `menu.json` with real prices; all `todo` fields cleared.
- [ ] Cart total enabled (TODO-PRICE in `script.js`) and the WhatsApp template total line tested.
- [ ] Owner photos replace `images/gallery-*.svg`; alt text rewritten.
- [ ] Logo added (header and footer) and brand colors swapped into `:root` with contrast re-checked (DESIGN.md section 3).
- [ ] WhatsApp number confirmed (CONFIG and JSON-LD).
- [ ] Opening hours confirmed (hero line, hours table, JSON-LD together).
- [ ] Instagram/TikTok handles confirmed and links updated.
- [ ] Birthday packages copy added or the disclaimer kept.
- [ ] Parking note confirmed.

Technical:

- [ ] Domain connected, HTTPS active.
- [ ] Canonical/OG/sitemap/robots URLs updated.
- [ ] QR code regenerated to the live URL and tested by scanning.
- [ ] Lighthouse mobile run: 90+ performance, accessibility, SEO.
- [ ] Test at 360, 768 and 1280 px: no horizontal scroll, no covered content, sticky bar clear of controls.
- [ ] Test the WhatsApp send for dine-in, pickup and delivery (address line appears only for delivery).
- [ ] Test click-to-call and email links on a real phone.
- [ ] Google Business Profile: add the website URL.
- [ ] Submit sitemap in Google Search Console.

## 6. Rollback

Static hosting keeps deploy history. Netlify: Deploys tab, publish a previous deploy. Vercel: Deployments tab, promote an older deployment. No database, no migrations.
