# IMPLEMENTATION.md — How Each Feature Was Built

Companion to ARCHITECTURE.md (which describes structure). This file records build steps so the work can be reproduced or extended.

## 1. Skeleton and config

1. Created the file structure listed in ARCHITECTURE.md section 1.
2. Wrote `styles.css` starting with `:root` tokens from DESIGN.md: palette (`--color-cream`, `--color-latte`, `--color-espresso`, `--color-cocoa`, `--color-paprika`, `--color-olive`, `--color-caramel`, `--color-border`), spacing scale `--space-1` to `--space-10` (4 px base), radii (10 px controls, 8 px small, 999 px tags only), one soft shadow, font stacks, `--header-h`, `--mobile-bar-h`, container width 1140 px.
3. Wrote `script.js` with the `CONFIG` block first, then sections in DOM order: state, menu render, search, cart, WhatsApp builder, lightbox, forms, sticky behaviors, hydration.

## 2. Header and hero

- Header is `position: sticky; top: 0` with a cream background and hairline bottom border; the wordmark is text ("URBAN" letter-spaced bold small-caps in Fraunces, "Cafe & Restaurant" in Karla) until the logo is confirmed (TODO in HTML).
- Mobile menu: a fixed dialog panel listing the anchor links plus the WhatsApp button; hamburger and close are 44 px icon buttons with `aria-label` and `aria-expanded`.
- Anchor links use `scroll-margin-top: var(--header-h)` so the sticky header never covers section titles.
- Hero headline: "A place to enjoy food" style line built as "Good food, good mood, in the heart of Mandian" is NOT used (invented copy) — the headline stays factual: "Urban Cafe & Restaurant" with the tagline line "A place to enjoy food." (the confirmed Facebook tagline) plus the confirmed-style offer line "Steaks, pastas, coffee and shakes, served late." from the brief's allowed facts. Hours line is marked TODO to confirm.

## 3. menu.json format

```json
{
  "version": 1,
  "updated": "2026-10-15",
  "categories": [
    {
      "id": "burgers",
      "label": "Burgers",
      "items": [
        {
          "name": "Jalapeno Burger",
          "description": "Cheese, jalapenos, house sauce.",
          "price": "Rs. ---",
          "popular": true,
          "source": "seed",
          "todo": ""
        },
        {
          "name": "Beef Burger",
          "description": "Grilled beef patty, lettuce, tomato, house sauce.",
          "price": "Rs. ---",
          "popular": false,
          "source": "sample",
          "todo": "Confirm this item exists on the real menu and replace the description."
        }
      ]
    }
  ]
}
```

Field notes:

- `id`: stable slug, used for tab links and `#menu-<id>` anchors.
- `label`: display name spelled exactly per the brief ("Sea Foods", "Chopsuey & Noodles", "Sandwiches").
- `price`: always the string `"Rs. ---"` until the owner confirms prices (RULES.md rule 3).
- `popular: true`: renders the Popular tag and includes the item in the Popular category (always first).
- `source`: `"seed"` for dishes named in the brief's public-review list (Jalapeno Burger, Buffalo Wings, Chicken Mushroom Pasta, Creamy Alfredo Pasta, Parmesan Pasta, Moroccan Steak, Monterrey Chicken, Wild Mushroom Chicken, Chicken Cashew, Beef Chilli Dry, Chicken Chowmein, Egg Fried Rice, Pepperoni Pizza, Urban Pizza, Loaded Fries, Zinger Burger, Mint Margarita, shakes); `"sample"` for structural fillers.
- `todo`: non-empty whenever `source` is `"sample"`, and on every seed item until the owner confirms the name and price.

Category order in the file equals the tab order: Popular (computed), Soups, Urban Special Burger & Pizza Deals, Chinese, Appetizers, Chopsuey & Noodles, Platters, Salads, Pizza, Burgers, Sandwiches, Rice Corner, Chicken Speciality, Sea Foods, Pasta, Steaks, Cold Beverages.

## 4. Menu rendering and search

1. `loadMenu()` fetches `menu.json`, validates shape minimally, and calls `renderMenu(data)`.
2. `renderMenu` builds tabs (Popular first, computed) and one `<section class="menu-group">` per category with `<h3>` and a list of `.menu-item` rows.
3. Menu row markup: `.menu-item__name` (h4), optional `.tag-popular`, `.menu-item__leader` (flex spacer with a dotted bottom border), `.menu-item__price` (tabular figures, fixed min-width so prices align in a column), `.menu-item__desc`, `.btn-add` with the item name in its `aria-label` ("Add Jalapeno Burger to order").
4. `input` events on the search box filter rows with a case-insensitive match on name and description; categories with no matches hide; an `aria-live` region announces the result count; a clear (x) icon button resets.
5. On fetch failure the fallback panel shows (message + phone links + Retry button). The panel is in the HTML from the start and is shown/hidden by the script.

## 5. Cart and WhatsApp ordering

State: `cart` Map of item id to `{name, qty}`. Max qty 20 per line. Empty cart disables the send button.

### 5.1 WhatsApp message template

```
Hello Urban Cafe & Restaurant, I would like to place an order.

Name: Ayesha Khan
Order type: Delivery

Order:
1. Jalapeno Burger x 2
2. Chicken Chowmein x 1
3. Mint Margarita x 3

Delivery address: House 12, Street 4, Jadoon Plaza Phase 2, Mandian, Abbottabad

Notes: Less spicy please.
```

Build rules:

- Line endings are `\n`; the whole string is `encodeURIComponent`-ed into `https://wa.me/<WHATSAPP_NUMBER>?text=...`.
- Order type values: `Dine-in`, `Pickup`, `Delivery`. The address block appears only for Delivery.
- The Notes block appears only if the customer wrote a note.
- No prices and no total appear (all prices are placeholders). TODO-PRICE in `script.js` marks where a total line (`Total: Rs. ...`) turns on once `menu.json` holds real prices; the total must then be computed from numeric price fields and the template gains one line.
- `WHATSAPP_NUMBER` is `923139755550` (digits only, no plus) per the brief default, flagged TODO to confirm.

### 5.2 Drawer behavior

Adding a dish updates the cart badge and leaves the drawer closed so guests can keep browsing and adding; the badge briefly scales as a confirmation and an `aria-live` message announces the add. The cart button (sticky in the header) opens the drawer for review.

`role="dialog"`, `aria-modal="true"`, labelled by its title. Open: remembers the trigger element, moves focus to the close button, locks body scroll. Close: Escape, close button, scrim click, or after send. Focus returns to the trigger.

## 6. Birthday and event form

Fields: name, phone, date (`type=date`), time (`type=time`), guests (`type=number`, min 1), notes (textarea). Native validation plus a small inline error area (`aria-live="polite"`). Submit builds:

```
Hello Urban Cafe & Restaurant, I would like to enquire about a birthday or event booking.

Name: ...
Phone: ...
Date: ...
Time: ...
Guests: ...
Notes: ...
```

and opens the same wa.me endpoint. A disclaimer under the form states that packages and pricing are confirmed by the restaurant (TODO).

## 7. Gallery and lightbox

- Eight neutral SVG placeholder tiles in `images/` (1200 x 900), each labeled "Photo placeholder — replace with owner photo" plus a slot name (Interior, Seating, Pasta, Steak, Burger, Birthday setup, Coffee, Exterior). `alt` text says they are placeholders (TODO comments in HTML list the replacement plan).
- Grid: 1 column mobile, 2 at 768, 4 at 1024. Tiles are buttons that open the lightbox.
- Lightbox: dialog with the large image, caption, prev/next icon buttons, close button, Escape handling, arrow-key navigation, click-outside-to-close, scroll lock.

## 8. Contrast verification (WCAG AA)

Computed with the sRGB relative luminance formula for every shipped pair (script run at build time; results below and in DESIGN.md section 3):

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| espresso #2C221C | cream #FAF3E9 | 14.1:1 | AAA |
| cocoa #3B2A22 | cream #FAF3E9 | 12.4:1 | AAA |
| paprika #A23B2D | cream #FAF3E9 | 6.0:1 | AA |
| olive #55663B | cream #FAF3E9 | 5.7:1 | AA |
| cream #FAF3E9 | espresso #2C221C | 14.1:1 | AAA (primary buttons, footer) |
| cream #FAF3E9 | paprika #A23B2D | 6.0:1 | AA (accent buttons) |
| on-caramel #241B15 | caramel #C2792D | 4.9:1 | AA (Popular tag) |
| cream #FAF3E9 | olive #55663B | 5.7:1 | AA |
| espresso #2C221C | latte #F3E7D5 | 12.7:1 | AAA |
| espresso-soft #6B5A4E | cream #FAF3E9 | 6.0:1 | AA (secondary text, placeholders) |
| espresso-soft #6B5A4E | latte #F3E7D5 | 5.4:1 | AA |
| paprika-deep #8A3125 | cream #FAF3E9 | 7.5:1 | AAA (error text, hovers) |

Caramel is not used for normal-size text on cream anywhere (3.1:1); it is used for rules, the tag fill (with `--color-on-caramel` text), focus rings and large decorative numerals only. First pass shipped espresso-on-caramel at 4.48:1, which misses AA; the tag text color was darkened to `--color-on-caramel` and re-verified at 4.9:1.

## 9. SEO and structured data

- `<title>`: "Urban Cafe & Restaurant | Menu, Steaks & Cafe in Mandian, Abbottabad".
- Meta description targets "Urban Cafe Abbottabad menu", "cafe Mandian", "steak Abbottabad" in natural language.
- Open Graph and Twitter card tags point at a placeholder canonical URL (TODO: real domain in `index.html`, `sitemap.xml`, `robots.txt`).
- JSON-LD `Restaurant` with `name`, `address`, `telephone` (both lines), `openingHoursSpecification` (TODO-confirmed), `servesCuisine`, `priceRange` "$$$", `sameAs` (Facebook, TikTok), `aggregateRating` Google 4.1 with 500+ review count (numbers from the brief's sourced aggregates only; a comment marks the source).

## 10. Performance notes

- No libraries. `styles.css` and `script.js` are single files; `script.js` is `defer`-ed.
- Fonts: preconnect + one Google Fonts stylesheet with only used weights, `display=swap` (see DESIGN.md 4.3).
- Gallery tiles and map iframe load lazily (`loading="lazy"`); the map iframe is below the fold.
- Icons are inline SVG (zero requests). Placeholder tiles are small SVGs.
- Expected Lighthouse mobile: 90+ performance, accessibility, SEO given no hero image payload (hero is type + CSS treatment).

## 11. Spelling and copy rules applied

- Category spellings fixed per the brief (Sandwiches, Sea Foods, Chopsuey & Noodles, Chicken Speciality).
- Seed dish names kept exactly as listed in the brief (Jalapeno Burger, Buffalo Wings, Monterrey Chicken, Beef Chilli Dry, Chicken Chowmein, Egg Fried Rice, Mint Margarita and so on).
- No emojis in any file (verified with a scan; see MEMORY.md Phase 9 entry).
