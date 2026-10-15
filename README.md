# Urban Cafe & Restaurant — Sample One-Page Website

A production-ready, single-page website for **Urban Cafe & Restaurant**, Jadoon Plaza Phase 2, Mandian, Abbottabad. Built as a free sample pitch by BluePeakDesign with plain HTML, CSS and vanilla JavaScript — no frameworks, free to host on Netlify or Vercel.

Live-surface summary: sticky header, hero, full menu with search and category tabs, WhatsApp ordering cart, about band, gallery with lightbox, birthday and event booking form, aggregate reviews, location with map and hours, contact footer with printable QR panel, and a sticky call/WhatsApp bar on mobile.

---

## 1. Run it locally

The menu loads from `menu.json` with `fetch()`, which browsers block on the `file://` protocol. Serve the folder over HTTP:

```bash
cd urban-cafe-website
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static server works (`npx serve`, `php -S localhost:8080`, VS Code Live Server, etc.).

---

## 2. File map

| File | Role |
|---|---|
| `index.html` | All page markup, meta/SEO tags, JSON-LD |
| `styles.css` | Design tokens (palette, type, spacing) and all styling |
| `script.js` | Config block, menu rendering, search, cart, WhatsApp message builder, lightbox, forms |
| `menu.json` | Menu data: categories and items |
| `images/` | SVG placeholder tiles for the gallery (replace with real photos) |
| `robots.txt`, `sitemap.xml` | SEO basics (update URLs when the domain exists) |
| Docs | `README.md`, `ROADMAP.md`, `RULES.md`, `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `PHASES.md`, `IMPLEMENTATION.md`, `DEPLOYMENT.md`, `MEMORY.md` |

---

## 3. Edit the config block

Everything contactable lives in one place: the top of `script.js`.

```js
const CONFIG = {
  WHATSAPP_NUMBER: "923139755550", // TODO: confirm this is the WhatsApp number
  PHONE_1: "+92 313 9755550",
  PHONE_2: "+92 310 1444111",
  EMAIL: "urbancafe555@gmail.com",
  FACEBOOK_URL: "https://www.facebook.com/TheUrbanCafeandRestaurant",
  TIKTOK_URL: "https://www.tiktok.com/@urban.cafe.restaurant",
  INSTAGRAM_URL: "", // hidden until a handle is confirmed
  HOURS: { ... }
};
```

Change values there and the header, hero, footer, sticky bar, JSON-LD hints and every WhatsApp link follow. Do not scatter numbers through the HTML.

To show Instagram later: put the full URL in `INSTAGRAM_URL` and remove the `hidden` handling in `script.js` (search for `INSTAGRAM`).

---

## 4. Edit the menu

`menu.json` is a plain object: an ordered list of categories, each with an `id`, `label` and `items` array.

```json
{
  "id": "burgers",
  "label": "Burgers",
  "items": [
    {
      "name": "Jalapeno Burger",
      "description": "Spicy jalapenos, cheese, house sauce.",
      "price": "Rs. ---",
      "popular": true,
      "source": "seed"
    }
  ]
}
```

Rules that must hold when editing:

- `price` stays `"Rs. ---"` until real prices are confirmed. Never invent prices.
- `source` is `"seed"` only for dishes named in the brief's public-review list; everything else is `"sample"` and carries a TODO in `menu.json` comments... JSON has no comments, so unconfirmed items use `"todo"` field text instead (see existing entries).
- `popular: true` makes an item appear in the "Popular" category automatically and shows the Popular tag.
- Category order in the file is the tab order.

---

## 5. Deploy

Full steps live in `DEPLOYMENT.md`. Short version (Netlify):

1. Drop the folder on https://app.netlify.com/drop, or connect the Git repo (build command: none, publish directory: root).
2. Or with Vercel: `npx vercel` from the project folder.
3. Before launch, replace the placeholder domain in `index.html` (canonical, OG URL), `sitemap.xml` and `robots.txt`.

---

## 6. What is intentionally unfinished

Every unconfirmed fact is marked with `TODO` in the source and listed at the end of `MEMORY.md`. The big ones: real menu and prices, owner photos and logo, confirmed WhatsApp number and hours, Instagram handle, birthday packages, live domain for the QR code.
