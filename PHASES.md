# PHASES.md — Build Phases

Checkboxes are updated as phases complete. `MEMORY.md` is updated after each phase.

## Phase 1 — Research and design decisions

- [x] Study premium cafe and restaurant websites for fonts, color and layout patterns (findings in DESIGN.md section 2).
- [x] Research the brand: Facebook page, Google listing data, TikTok, public venue photos (DESIGN.md section 1).
- [x] Decide heading and body fonts with reasons and rejected alternatives (DESIGN.md section 4).
- [x] Define the palette as CSS-ready tokens with sources and WCAG checks (DESIGN.md section 3), clearly labeled placeholder until the logo is confirmed.
- [x] Define spacing scale, buttons, icons, breakpoints, accessibility rules, component list (DESIGN.md sections 5 to 10).

## Phase 2 — Skeleton and config

- [x] Create the file structure (index.html, styles.css, script.js, menu.json, images/, robots.txt, sitemap.xml).
- [x] Add the CONFIG block at the top of script.js.
- [x] Create placeholder gallery tiles as neutral labeled SVGs.

## Phase 3 — Header and hero

- [x] Sticky header: text wordmark, anchor nav, Order on WhatsApp button.
- [x] Mobile hamburger menu with a clear close button.
- [x] Hero: headline, tagline "A place to enjoy food.", hours line (TODO-confirmed), two CTAs, three icon badges.

## Phase 4 — Menu and search

- [x] menu.json with the 17 brief categories and seeded items (plus labeled samples).
- [x] Menu rendering from JSON with Popular category computed from flags.
- [x] Sticky category tabs, search box with clear button, empty state, load-failure fallback.

## Phase 5 — Cart and WhatsApp order

- [x] Cart drawer with quantity steppers and remove.
- [x] Name, order type (dine-in / pickup / delivery), conditional address, notes.
- [x] WhatsApp message builder and wa.me handoff; total block hidden until real prices (TODO-PRICE).

## Phase 6 — Gallery, birthday form, reviews

- [x] Gallery grid with placeholder tiles and lightbox (keyboard support).
- [x] Birthday and event booking form with WhatsApp handoff and pricing disclaimer.
- [x] Reviews: aggregate numbers only with platform links and Read more reviews button.

## Phase 7 — Location, contact, footer

- [x] Google Maps embed, Get Directions button, hours table (TODO-confirmed), parking placeholder.
- [x] Footer contacts: click-to-call phones, email, Facebook, TikTok, hidden Instagram slot, QR panel, BluePeakDesign credit.
- [x] Sticky mobile Call and WhatsApp bar with page bottom padding.

## Phase 8 — SEO, performance, accessibility

- [x] Title and meta description targeting the three search phrases; Open Graph tags.
- [x] sitemap.xml, robots.txt, canonical placeholder.
- [x] Restaurant JSON-LD (sourced aggregate ratings only).
- [x] Lazy images, font loading recipe, focus-visible states, ARIA on dialogs and live regions, prefers-reduced-motion.

## Phase 9 — Layout QA, testing, deployment

- [x] Layout rules audit: buttons, touch targets, alignment, no overlap assumptions, drawer and lightbox behavior (brief section 10).
- [x] Quality checks from brief section 11 (widths, WhatsApp message variants, emoji scan, invented-content scan, TODO audit, spell check, contrast, palette/font consistency).
- [x] Deployment documentation ready (DEPLOYMENT.md); project ready to hand to the owner with the TODO checklist.
