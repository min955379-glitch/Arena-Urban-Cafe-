# Design Research and Decisions — Urban Cafe & Restaurant, Abbottabad

Status: research complete. Palette is a clearly labeled placeholder until the owner confirms the logo colors.
Date of research: 2026-10-15.

---

## 1. Brand research (Phase 0)

### 1.1 Public sources checked

| Source | URL | What was confirmed |
|---|---|---|
| Facebook page | facebook.com/TheUrbanCafeandRestaurant | Tagline "A place to enjoy food.", address Jadoon Plaza Phase II, Mandian, Abbottabad, phones +92 313 9755550 and +92 310 1444111, email urbancafe555@gmail.com, price range $$$, dine-in, 94% recommend (550 reviews), page category "Chinese Restaurant", approx. 18,300 page likes |
| Google listings (via public aggregators: evendo, top-rated.online, kupi) | see MEMORY.md source log | Rating 4.1 with roughly 500 to 560 reviews, address Jadoon Plaza Phase 2 Rd, Jinnahabad, Abbottabad 22020, late-night food, coffee, small plates, categories: restaurant, cafe, fast food, coffee shop, bar and grill |
| TikTok | tiktok.com/discover/urban-cafe-restaurant-abbottabad, account @urban.cafe.restaurant | The restaurant actively promotes birthday celebrations; third-party food creators feature the Creamy Alfredo Pasta and Parmesan Pasta in Abbottabad pasta reviews; official posts advertise the Jadoon Plaza Phase 2 location |
| Public venue photos | aggregators and TikTok stills | Modern interior: blue cove ceiling lighting, brick accent column, dark tables with white chairs, sofa seating, a typographic feature wall with words such as "YOUR COFFEE CUP", "FRIENDS", "RELAX", "FRESH", "SWEET", "SHARE SPECIAL MOMENTS"; photographed birthday balloon setups |

### 1.2 Logo and brand colors

**Not confirmed.** The public profile and cover images could not be read as a reliable color source, and no official logo file is available. Per the project rules, the palette in section 3 is a **clearly labeled placeholder** built from the research below. It is designed to be swapped in one place (CSS custom properties in `styles.css` under `:root`) the moment the owner sends the logo.

Additional notes found during research, all marked TODO in the code:

- A handle `the_urban_cafe_and_restaurant` appears on the Facebook page (likely TikTok or Instagram). The TikTok videos themselves are posted under `@urban.cafe.restaurant`. TODO: confirm which handle is current before showing any Instagram link (Instagram stays hidden until confirmed).
- Third-party sites list hours as 12:00 to 00:00 daily with a 14:00 Friday opening. The hours given in the project brief (12:30 to 23:15, Friday 14:30 to 23:15) differ. TODO: confirm hours with the owner. The site uses the brief hours and marks them as unconfirmed in an HTML comment.
- Venue photos show birthday party setups, which supports the birthday booking section as a real, promoted service. Package and pricing details remain unconfirmed (TODO).

### 1.3 Positioning read

The venue presents itself as a modern, family-friendly urban cafe and restaurant: broad menu (burgers, pizza, Chinese, pasta, steaks, shakes, coffee), late hours, value-priced (Facebook price range $$$ in the local market), strong social proof on Facebook and Foodpanda, and an event/birthday angle. The website should feel warm, appetizing, and premium but approachable — not fine-dining austere, not fast-food loud.

---

## 2. Layout and style research

### 2.1 What well-made cafe and restaurant sites do (industry study, 2025 sources)

Reviewed current design writing and case studies (NihStudio restaurant web design trends 2025, DesignRush cafe website conversion study, MotoCMS restaurant design examples, coffee-brand typography trend reports). Findings that shaped this build:

1. **Warm, organic palettes win for food brands.** Earth tones, terracotta, olive, muted gold, cream and deep browns read as appetizing and crafted. Cold grays, neon and purple-blue gradients read as generic or "AI template".
2. **Typography carries the brand.** The consistent advice is one expressive heading face plus one highly readable body face (never more). Elegant serifs signal premium; rustic soft serifs signal artisanal cafe; geometric sans alone signals tech, not food.
3. **Minimal layout, generous whitespace, full-bleed imagery, narrative sections.** Conversion case studies (WindanSea Coffee: earthy greens and clean type, 214% conversion lift; Headwaters: minimalist booking UX, 600+ covers) show clarity beats decoration.
4. **Menu usability matters more than visual novelty:** clear category navigation, search, scannable item rows, obvious price column.
5. **Mobile-first is mandatory** for this market. Most traffic in Abbottabad will be Android phones on mobile data.

### 2.2 Patterns deliberately avoided (template tells)

- Repeated identical card grids for every section.
- Stock gradient blobs, glassmorphism, neon glow.
- Oversized pill buttons on everything.
- Dark gray plus orange "AI default" scheme; default purple/blue gradients.
- Centered hero text with two generic buttons and nothing else. (This hero is centered, but it is layered with eyebrow, tagline, hours, badges and a soft ingredient-tone treatment so it reads as art-directed.)

### 2.3 Layout system decisions

- **Container:** max width 1140 px, side gutters 20 px (mobile) to 32 px (desktop). Every section shares the same container and left edge.
- **Section rhythm:** vertical padding 64 px mobile, 96 px desktop, with a fine 1 px divider (`--color-border`) or alternating cream/latte backgrounds instead of heavy card blocks.
- **Menu presentation:** classic menu row with a dotted leader between item name and price — a hand-designed detail that also aligns prices in a column. Item description under the name; "Popular" tag and "Add" button on the row edge; consistent row height and Add button alignment.
- **Detailing:** soft shadow `0 8px 24px rgba(44, 34, 28, 0.08)` on raised surfaces only (drawer, hero badges); fine dividers; hover states that shift color or translate 1-2 px; letter-spaced small-caps eyebrows above section titles; a small diamond-dot divider ornament between hero and menu.
- **Depth:** background alternation (cream `--color-cream` / latte `--color-latte`) creates section separation without boxes.

---

## 3. Final palette (PLACEHOLDER — swap when logo is confirmed)

Source of each color is an ingredient tone, per the brief. Keep the set to 7 core colors plus a derived border tone. All values are CSS custom properties in `styles.css`.

| Token | Hex | Ingredient / source | Used for | WCAG check |
|---|---|---|---|---|
| `--color-cream` | `#FAF3E9` | Cream / butter | Page background | base |
| `--color-latte` | `#F3E7D5` | Milk foam / latte | Alternating section background, tag backgrounds | base |
| `--color-espresso` | `#2C221C` | Dark-roasted coffee bean | Primary text, primary buttons, footer | 14.1:1 on cream (AAA) |
| `--color-cocoa` | `#3B2A22` | Cocoa husk | Hero heading, wordmark | 12.4:1 on cream (AAA) |
| `--color-paprika` | `#A23B2D` | Dried paprika / chili | Section headings, accent buttons, active tab underline | 6.0:1 on cream (AA) |
| `--color-olive` | `#55663B` | Basil / olive | Alternate section headings, review stars, success states | 5.7:1 on cream (AA) |
| `--color-caramel` | `#C2792D` | Saffron / caramel | Decorative rules, Popular tag fill, focus ring, icon accents | not used for normal-size text on cream (3.1:1); Popular tag pairs it with `--color-on-caramel` |
| `--color-border` | `#E4D3BC` | Toasted shortbread (derived from latte) | Dividers, input borders | non-text |

Derived text tones (still inside the 7-color core plus neutrals):

| Token | Hex | Used for | WCAG check |
|---|---|---|---|
| `--color-espresso-soft` | `#6B5A4E` | Secondary text, placeholders | 6.0:1 on cream, 5.4:1 on latte (AA) |
| `--color-paprika-deep` | `#8A3125` | Error text, hover states | 7.5:1 on cream (AAA) |
| `--color-on-caramel` | `#241B15` | Popular tag text on caramel fill | 4.9:1 on caramel (AA) |

Text/button pairings that ship (measured with the sRGB relative luminance formula):

- Espresso text on cream: 14.1:1, pass AAA.
- Cream text on espresso (primary button): 14.1:1, pass AAA.
- Cream text on paprika (accent button): 6.0:1, pass AA.
- `--color-on-caramel` text on caramel (Popular tag): 4.9:1, pass AA.
- Cream text on olive: 5.7:1, pass AA.
- Espresso-soft secondary text on cream and on latte: pass AA.
- Espresso-soft placeholder text on cream inputs: pass AA (placeholder opacity forced to 1).

A verification script was run against these pairs; see IMPLEMENTATION.md section 8.

### 3.1 Heading color plan

Per the brief, headings carry the ingredient palette:

- **Hero heading:** `--color-cocoa`, with the word "food" in italic Fraunces `--color-paprika`.
- **Section titles:** alternate `--color-paprika` (Menu, Birthdays, Location) and `--color-olive` (About, Gallery, Reviews, Contact) so the page has a quiet rhythm without losing consistency.
- **Footer headings:** cream on espresso.

---

## 4. Typography

Loaded from Google Fonts with preconnect, only the weights used, and `display=swap` (see the head of `index.html`).

### 4.1 Headings — Fraunces (Google Fonts)

Weights used: 600 and 700 (plus italic 600 for the hero accent word).

Why:

- A soft "old-style" serif with genuine character (rounded ball terminals, optional optical sizing) that reads as crafted food and hospitality, not corporate.
- Holds up at display sizes on cheap screens: sturdier stroke contrast than classic Garamond-style faces.
- The italic is warm and editorial — used sparingly (one hero word, pull lines) as a hand-designed signature.
- Versatile enough for a small-caps-style wordmark treatment (letter-spaced 700) until the real logo arrives.

Alternatives rejected:

- **Playfair Display** — excellent quality but the most overused restaurant/template serif on the web; instantly reads "template".
- **Cormorant Garamond** — beautiful, but fine strokes shimmer and break up on low-DPI Android screens at small heading sizes.
- **DM Serif Display** — single weight, less hierarchy control; slightly generic in cafe contexts.
- **Montserrat / Poppins headings** — geometric sans signals SaaS, not food; explicitly the "generic pairing" the brief warns against.
- **Script faces (Great Vibes, Pacifico)** — gimmicky, poor readability, common in low-grade restaurant templates.

### 4.2 Body — Karla (Google Fonts)

Weights used: 400, 500, 700 (plus italic 400 for small notes).

Why:

- Humanist grotesque with subtle quirks (slightly squared curves) that sit naturally beside a soft serif without competing.
- Large x-height and open apertures give excellent readability at 15 to 17 px on small screens.
- Complete UI weight range (400/500/700) covers menu rows, labels, buttons and captions with one family, keeping the payload small.
- Renders reliably across Android browsers; no complex shaping.

Alternatives rejected:

- **Inter** — the de-facto default; the brief rules out "plain system-ish" default choices.
- **Open Sans / Lato** — template staples of the 2010s; carry no brand signal.
- **Nunito / Quicksand** — rounded forms push toward toy/family-SaaS rather than premium food.
- **Roboto** — pure Android system association; zero brand character.

### 4.3 Loading recipe

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Karla:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

Fallback stacks: `Fraunces, Georgia, "Times New Roman", serif` and `Karla, "Segoe UI", Roboto, Arial, sans-serif`. Font sizes use `clamp()` so hierarchy holds from 360 px to 1280 px.

---

## 5. Spacing scale

4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (px tokens `--space-1` through `--space-10`).

- Section padding: 64 px mobile / 96 px desktop.
- Menu row gap: 24 px. Form field gap: 16 px.
- Heading to lede: 16 px. Lede to content: 32 px.

---

## 6. Buttons and interactive states

| Type | Style | Height / radius | Use |
|---|---|---|---|
| Primary | Espresso fill, cream text | 46 px / 10 px | Order on WhatsApp, form submits |
| Accent | Paprika fill, cream text | 46 px / 10 px | View Menu, Send order |
| Secondary | 1.5 px espresso outline on transparent | 46 px / 10 px | Get Directions, Read more reviews |
| Icon button | Square, border only | 44 x 44 px / 10 px | Search clear, drawer close, cart close |
| Small Add | Espresso outline, fills on hover | 40 px / 8 px | Menu item add (aligned right in every row) |

All buttons: 500 weight Karla, letter-spacing 0.02 em, hover darkens 8% and lifts 1 px, `:active` presses 1 px, `:focus-visible` gets a 3 px caramel ring with 2 px offset. Labels never wrap (single-line with generous padding). Touch targets at least 44 x 44 px.

Tags (Popular): caramel fill, espresso text, 11 px uppercase letter-spaced, radius 999 px — pills are used only here and for the hero badges, never for buttons.

---

## 7. Icons

One inline SVG set in the Lucide manner (24 x 24 viewBox, 2 px stroke, round caps and joins, currentColor). Copied as inline SVG — no icon library is downloaded. Consistent 20 px default render size, 22 px in buttons.

Required icons implemented: phone, WhatsApp, map pin, clock, search, cart, plus, minus, close, hamburger menu, star, calendar, users (guests), navigation (directions), mail, Facebook, TikTok, Instagram (code present but the link stays hidden until a handle is confirmed), and category/food icons (burger, pizza, bowl, drink, utensils) used as small accents on menu tabs where they help scanning.

Decorative icons: `aria-hidden="true"`. Icon-only buttons: `aria-label` in English, visible on focus.

---

## 8. Breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile base | up to 479 px | Single column, sticky bottom action bar, hamburger nav, drawer cart |
| Large phone | 480 px | Slightly wider gutters |
| Tablet | 768 px | Two-column menu grid, inline nav starts, gallery 2 columns |
| Desktop | 1024 px | Full nav, hero two-zone, gallery 3 to 4 columns |
| Wide | 1280 px | Container caps at 1140 px |

No horizontal scrolling at any width. Anchor targets get `scroll-margin-top` equal to the sticky header height so headings are never covered. The page gets bottom padding equal to the sticky mobile bar height so nothing is hidden behind it.

---

## 9. Accessibility rules

- Semantic landmarks: header, nav, main, section with aria-labelledby, footer. Skip-to-content link first in the DOM.
- All text and button combinations meet WCAG AA (verified in IMPLEMENTATION.md section 8); body text targets 7:1 or better where possible.
- Visible focus states on every interactive element; focus order follows visual order.
- Keyboard: Escape closes the cart drawer, mobile menu and lightbox; drawers and lightbox are labelled dialogs; background scroll locks while open.
- Form fields have visible labels (not placeholder-only), `type` set appropriately (tel, email, date, time, number), and inline error messaging via `aria-live="polite"`.
- Menu search results and cart changes announce through `aria-live` regions.
- Images: descriptive alt text; placeholder tiles carry alt text that states they are placeholders.
- Color is never the only signal (tags have text, states have icons).
- `prefers-reduced-motion: reduce` disables transforms and smooth scrolling.

---

## 10. Component list

1. Skip link
2. Sticky header (wordmark, anchor nav, WhatsApp CTA, hamburger + mobile overlay menu)
3. Hero (eyebrow, headline, tagline, hours line, CTA pair, three icon badges)
4. Divider ornament (diamond-dot rule)
5. Menu section (sticky category tabs, search with clear button, category groups, menu rows with dotted price leaders, Popular tags, Add buttons, empty-state and load-failure messages)
6. Floating cart button (desktop right; opens drawer) and cart drawer (line items, quantity steppers, name, order type radio group, conditional address field, note field, WhatsApp submit, helper text about prices)
7. About band (short statement, three icon highlights)
8. Gallery grid (placeholder tiles, lightbox dialog with prev/next/close)
9. Birthday booking form (name, phone, date, time, guests, notes, WhatsApp submit, pricing disclaimer)
10. Reviews strip (three aggregate score blocks with platform icons and links, single "Read more reviews" CTA; no quotes)
11. Location block (map embed, directions CTA, hours table, parking note placeholder)
12. Contact/footer (click-to-call phones, email, social links, QR panel, credit line)
13. Sticky mobile action bar (Call, WhatsApp)
14. Toast/announcement region (aria-live)

---

## 11. What makes this feel hand-designed (checklist applied while building)

- Dotted menu leaders and a strict price column instead of uniform cards.
- Alternating cream/latte bands and hairline dividers instead of boxed sections.
- Ingredient-tone headings with one italic accent word.
- Small letter-spaced eyebrows and a diamond-dot ornament.
- Restrained motion (1 px lifts, color shifts) and consistent button geometry per type.
- Every unconfirmed fact visibly marked, which also signals honesty and craft to the owner.
