# ARCHITECTURE.md — How the Site Is Put Together

## 1. Stack

Plain static files. No framework, no bundler, no dependencies.

```
urban-cafe-website/
  index.html        page markup, SEO head, JSON-LD
  styles.css        design tokens + component styles (mobile-first)
  script.js         CONFIG block, menu, search, cart, WhatsApp, lightbox, forms
  menu.json         menu data (single source of truth)
  robots.txt        crawler rules (placeholder domain)
  sitemap.xml       one-page sitemap (placeholder domain)
  images/           gallery placeholder tiles (SVG), replaceable 1:1 with photos
  *.md              documentation (this file, DESIGN.md, MEMORY.md, ...)
```

## 2. Data flow

### 2.1 menu.json to the menu section

1. `script.js` fetches `menu.json` on load (with a `cache: "no-store"` fetch so edits show up immediately in development).
2. Categories render in file order into the sticky tab strip and into the section body, each with `id` anchors (`#menu-<id>`).
3. Items marked `"popular": true` also render into the computed "Popular" category, which is always first in the tab strip.
4. Search filters items by name and description across all categories; the tab strip hides while searching and shows a result count via `aria-live`.
5. If the fetch fails (offline, `file://` opened directly, corrupt JSON), a visible fallback panel appears with the restaurant phone numbers and a retry button. Nothing else on the page breaks.

Menu row structure: name + optional Popular tag + dotted leader + price column + description + Add button. Prices are literal strings ("Rs. ---"), so the UI never does arithmetic on them.

### 2.2 Cart to the WhatsApp message

1. Adding an item stores `{id, name, qty}` in a `Map` in memory (not persisted; a page refresh starts clean — acceptable for a sample).
2. The cart drawer renders lines with minus/plus steppers and a remove button; a live region announces changes. The floating cart button shows the item count.
3. On submit, the script validates: name required, order type required, address required only for delivery.
4. It builds a plain-text message (template in IMPLEMENTATION.md) and opens `https://wa.me/<WHATSAPP_NUMBER>?text=<url-encoded message>` in a new tab.
5. No money total is included while prices are placeholders. A `TODO-PRICE` marker in `script.js` shows where the total line turns on.

The birthday form uses the same builder pattern with a different template and sends to the same WhatsApp number.

### 2.3 The CONFIG block

Top of `script.js`:

```js
const CONFIG = {
  WHATSAPP_NUMBER, PHONE_1, PHONE_2, EMAIL,
  FACEBOOK_URL, TIKTOK_URL, INSTAGRAM_URL,
  HOURS: { monThu, fri, satSun }
};
```

On load, the script hydrates: footer links, click-to-call hrefs, sticky bar, hero hours line, and (from `index.html` `data-config` attributes) any element that declares a config key. The Instagram link stays `hidden` while `INSTAGRAM_URL` is empty.

`index.html` also carries the same contact facts in JSON-LD and meta tags; those are static and must be edited in step with `CONFIG` (checklist in DEPLOYMENT.md).

## 3. Layout architecture

- One container class (`.container`, max 1140 px) gives every section the same left and right edges.
- Sections are `<section id="...">` with `aria-labelledby` pointing at their heading; `scroll-margin-top` offsets the sticky header for anchor jumps.
- Mobile: single column; the sticky bottom bar needs page bottom padding (`--mobile-bar-h`), applied on `body`.
- The cart drawer and mobile menu are fixed panels with a scrim, `role="dialog"`, Escape-to-close and scroll lock. The lightbox is the same pattern.
- The category tab strip sticks below the header only while the menu section is in view (CSS `position: sticky` with the header offset).

## 4. Styling architecture

- `:root` holds all tokens: 7 palette colors + border, spacing scale, radii, shadows, font stacks, header height, container width.
- Mobile-first media queries at 480 / 768 / 1024 / 1280 px.
- Components are section-commented blocks in one stylesheet (header, hero, menu, cart, forms, gallery, reviews, footer). No utility framework.
- All icons are inline SVG using `stroke="currentColor"`, so icon color follows text color automatically.

## 5. Hosting

Static hosting only. Netlify or Vercel free tier, or any shared host by FTP. Requirements: serve `index.html` at the root, serve `.json` and `.svg` with correct MIME types (both hosts do by default), HTTPS (required for `tel:`, `wa.me` trust and SEO). No server code, no environment variables.

## 6. Extension points

- Real prices: edit `menu.json`, flip `TODO-PRICE` block in `script.js`.
- New menu category: add an object to `menu.json`; tabs and rendering follow automatically.
- Seasonal highlight: add `"flag": "Seasonal"` support in the item renderer (later idea, see ROADMAP.md).
- Analytics: add a snippet in `index.html` head after owner approval; keep it out of the sample.
