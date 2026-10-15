# MEMORY.md — Running Project Log (Urban Cafe & Restaurant sample site)

Purpose: any AI or developer continuing this work reads this file first. Updated after every build phase.

Current phase: Phase 1 complete (research and design decisions). Building continues in phase order defined in PHASES.md.

---

## Log

### 2026-10-15 — Phase 0/1: Research and design decisions (DONE)

- Read the full build brief (uploads/urban-cafe-website-prompt.md) and adopted it as the specification.
- Researched the brand: Facebook page (TheUrbanCafeandRestaurant), Google listing data via public aggregators, TikTok presence (@urban.cafe.restaurant), public venue photos. Findings recorded in DESIGN.md section 1.
- Confirmed facts: name, tagline "A place to enjoy food.", address (Jadoon Plaza Phase II, Mandian, Abbottabad), phones +92 313 9755550 and +92 310 1444111, email urbancafe555@gmail.com, Facebook URL, price range $$$, Google rating 4.1 (500+ reviews), Facebook 94% recommend (550 reviews), Foodpanda 4.8 (500+ reviews per brief).
- Unconfirmed: logo and brand colors (palette in DESIGN.md is a labeled placeholder), exact opening hours (brief hours used with TODO), Instagram handle (hidden), WhatsApp number (923139755550 used as default with TODO), menu prices (all "Rs. ---"), full real menu, photos, birthday packages.
- Design decisions: Fraunces (headings) + Karla (body); 7-color ingredient palette on cream base; Lucide-style inline SVG icons; no emojis anywhere in the project.
- Created all 10 documentation files with real content.

### 2026-10-15 — Phase 2: Skeleton and config (DONE)

- Created project structure: index.html, styles.css, script.js, menu.json, images/, robots.txt, sitemap.xml.
- Config block at the top of script.js holds WHATSAPP_NUMBER, PHONE_1, PHONE_2, EMAIL, FACEBOOK_URL, TIKTOK_URL, INSTAGRAM_URL, HOURS.
- Placeholder SVG tiles generated for the gallery (neutral labeled tiles, easy to replace).

### 2026-10-15 — Phase 3: Header and hero (DONE)

- Sticky header with small-caps text wordmark, anchor nav (Menu, Gallery, Birthdays, Reviews, Location, Contact), primary WhatsApp button, hamburger and full-screen mobile menu with close button.
- Hero: eyebrow, headline with italic accent word, tagline "A place to enjoy food.", hours line (TODO-confirmed), CTA pair (View Menu, Order on WhatsApp), three icon badges (Family-friendly, Dine-in, Open late). Diamond-dot divider below.

### 2026-10-15 — Phase 4: Menu and search (DONE)

- menu.json holds 17 categories in the order given in the brief. Items carry name, description, price ("Rs. ---" placeholder), optional popular flag, and source ("seed" = named in the brief's public-review list; "sample" = structural placeholder, TODO-confirmed in the data).
- Popular tab is computed from items flagged popular; all seed dishes from the brief appear in sensible categories.
- Sticky category tab strip with active state, search box with clear button, empty state, and load-failure fallback message (with phone numbers).

### 2026-10-15 — Phase 5: Cart and WhatsApp order (DONE)

- Cart drawer (dialog semantics, Escape closes, scroll lock, focus returns to trigger). Quantity steppers, remove, name field, order type (dine-in / pickup / delivery), conditional delivery address, notes.
- Send order builds a wa.me link to WHATSAPP_NUMBER with a plain-text message: greeting, name, order type, item lines (name x qty), address when delivery, notes. No money total is included because no real prices exist (total block hidden until prices are real).
- Template documented in IMPLEMENTATION.md.

### 2026-10-15 — Phase 6: Gallery, birthday form, reviews (DONE)

- Gallery: 8 placeholder tiles (SVG), responsive grid, lightbox with prev/next/close, keyboard support.
- Birthday form: name, phone, date, time, guests, notes; submits into a WhatsApp message; disclaimer that packages and pricing are confirmed by the restaurant.
- Reviews: aggregate-only blocks (Google 4.1 / 500+ reviews, Foodpanda 4.8 / 500+ reviews, Facebook 94% recommend / 550 reviews) with platform links and a Read more reviews button. No invented quotes anywhere.

### 2026-10-15 — Phase 7: Location, contact, footer (DONE)

- Google Maps embed for "Urban Cafe & Restaurant, Jadoon Plaza Phase 2, Mandian, Abbottabad" (iframe embed, no API key), Get Directions deep link, hours table (Mon-Thu and Sat-Sun 12:30-23:15, Fri 14:30-23:15; TODO confirm), parking note placeholder.
- Footer: click-to-call phones, email link, Facebook, TikTok (handle noted), Instagram markup present but hidden until confirmed, BluePeakDesign credit, printable QR panel with TODO live URL (QR encodes the TODO placeholder URL).

### 2026-10-15 — Phase 8: SEO, performance, accessibility (DONE)

- Title and meta description target "Urban Cafe Abbottabad menu", "cafe Mandian", "steak Abbottabad". Open Graph and Twitter tags, canonical placeholder URL, sitemap.xml, robots.txt.
- Restaurant JSON-LD with name, address, phones, hours, cuisine, priceRange "$$$", aggregateRating (sourced numbers only, marked in comments).
- Lazy-loaded images below the fold, no libraries, system-safe fallbacks, focus-visible states, prefers-reduced-motion support.

### 2026-10-15 — Phase 9: QA and checks (DONE)

- Automated QA harness (Playwright + headless Chromium, not shipped with the site) ran 58 checks at 360, 768 and 1280 px: no horizontal overflow, all sections visible, 17 menu groups render, button labels fit, all touch targets at least 44 x 44 px, console clean, sticky bar only under 768 px. Interactive flows verified: search (5 pasta matches), cart badge, drawer open, WhatsApp messages for dine-in (no address line), pickup (no address line) and delivery (address line present), booking message, no total in any message while prices are placeholders, lightbox open/arrow/Escape, mobile menu open/Escape, booking form validation. Result: 58/58 passed.
- Bugs found by QA and fixed:
  1. Author `display: grid/flex` rules were overriding the `hidden` attribute, so the search filter, cart drawer, lightbox and conditional fields never actually hid. Fixed with a global `[hidden] { display: none !important; }`.
  2. Several touch targets were under 44 px (search clear button, qty steppers, menu tabs, Add buttons, Remove link). All raised to 44 px.
  3. An unescaped ampersand in a gallery SVG broke that image. Tiles regenerate with escaped text and validate as XML.
  4. Gallery caption chips overlapped the placeholder tile labels. Chips moved to the top-left corner.
  5. The cart drawer auto-opened on every Add, blocking multi-item ordering. Now the badge bumps and an aria-live message announces the add; the drawer opens only from the cart button.
  6. Popular tag text (espresso on caramel) measured 4.48:1, just under AA. Tag text darkened to `--color-on-caramel` #241B15, re-measured at 4.9:1. Placeholder input text forced to espresso-soft at full opacity for AA.
- Verified: no emojis anywhere in project files (regex scan of all text assets); all prices are "Rs. ---" (no numeric prices anywhere); no invented review quotes; all 51 menu items carry a `todo` field (18 seed, 33 sample); category labels and order match the brief exactly; JS parses clean; menu.json and sitemap.xml valid; palette hexes and font names match between code and DESIGN.md; contrast pairs all pass AA (18 pairs measured, documented in IMPLEMENTATION.md section 8).
- Spell check run on visible strings and docs (pyspellchecker): remaining flags are code identifiers, schema.org fields, brand/font names and brief-mandated spellings ("Chicken Speciality", "Sea Foods"). "flavours" normalized to "flavors" for consistency with the brief's American spelling.
- Layout screenshots reviewed at 360 and 1280 for hero, menu, cart, about, gallery, birthdays, reviews, location, contact, footer: no overlap, clipping or misalignment; prices align in a column; buttons share geometry per type.

### Handoff checklist (all items belong to the owner)

1. Real menu with names, descriptions and prices (replaces menu.json samples and "Rs. ---").
2. Owner photos for the gallery and hero (replace images/gallery-*.svg).
3. Logo file and true brand colors (swap :root custom properties, re-run contrast check).
4. Confirm the WhatsApp order number (default used: 923139755550).
5. Confirm opening hours (hero line, footer line, hours table and JSON-LD update together).
6. Instagram handle (possible handle seen in research: the_urban_cafe_and_restaurant) and current TikTok handle.
7. Birthday and event packages with pricing (or keep the disclaimer).
8. Live domain (canonical, OG URL, sitemap, robots, QR code regeneration and reprint).
9. Exact Google Maps pin (place ID or coordinates) and the Foodpanda page URL.
10. Parking availability note.

---

## Facts still unconfirmed (do not invent; keep TODO markers)

1. Logo file and true brand colors (palette is a swap-ready placeholder).
2. Real menu (names, descriptions, prices) — current items are seed + labeled samples; all prices "Rs. ---".
3. WhatsApp order number is 923139755550 per brief default — confirm with owner.
4. Exact opening hours (third-party sites disagree with the brief hours).
5. Instagram handle (possible handle seen: the_urban_cafe_and_restaurant; unverified).
6. Current TikTok handle (videos seen under @urban.cafe.restaurant and a mention of the_urban_cafe_and_restaurant).
7. Owner's photos and logo for the gallery (placeholders shipped).
8. Birthday/event packages and pricing.
9. Live domain for the QR code and canonical/sitemap URLs.
10. Parking availability note.
11. Google Maps place ID or exact coordinates (embed uses a text query).

## Open design risks

- Palette must be re-checked for contrast if the owner's logo colors replace the placeholder set.
- If the real menu is very large, consider paginating categories or capping the initial render (current JS renders all items per category, which is fine for expected sizes).
- If prices arrive, enable the cart total block (search for TODO-PRICE in script.js) and update the WhatsApp template to include the total line.
