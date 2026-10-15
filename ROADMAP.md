# ROADMAP.md — Urban Cafe & Restaurant Website

## Ships now (sample site for the pitch)

- One-page site: header, hero, menu (17 categories, search, tabs), WhatsApp cart ordering, about, gallery placeholders, birthday booking form, aggregate reviews, location and hours, contact footer with QR panel, sticky mobile call bar.
- `menu.json` with seed dishes named in public reviews plus clearly marked sample entries, all prices "Rs. ---".
- SEO foundation: meta, Open Graph, sitemap, robots, Restaurant JSON-LD.
- 10 documentation files so the project is maintainable by any developer or AI.
- Accessibility and performance baseline (Lighthouse targets 90+).

## Next (after owner handoff)

1. Real menu from the owner: names, descriptions, prices. Update `menu.json`, enable the cart total (search TODO-PRICE in `script.js`).
2. Owner photography for the gallery and hero; delete placeholder tiles.
3. Logo file and true brand colors; swap CSS custom properties in `styles.css` and re-run contrast checks.
4. Confirm the WhatsApp number (default used: 923139755550).
5. Confirm opening hours and update the hero line, hours table and JSON-LD together.
6. Instagram handle (and the current TikTok handle); unhide the Instagram link.
7. Google Business Profile link and exact map pin (place ID or coordinates).
8. Analytics (privacy-compliant, owner-approved) and Search Console.
9. Real domain: update canonical/OG URLs, sitemap, robots and the QR code target; reprint table QR codes.
10. Birthday packages and pricing from the owner for the booking section.

## Later ideas

- Online ordering with cart persistence and order status (WhatsApp Business API or a lightweight ordering layer).
- Loyalty offers (e.g. stamp card digitized, birthday club) once packages are confirmed.
- Urdu language toggle for local guests.
- Seasonal menu highlights driven by a flag in `menu.json`.
- Events page for live music or weekend specials if the restaurant starts them.
- Table-stand printable menu (A4 PDF generated from `menu.json`).
- Feedback form routed to the restaurant email.
