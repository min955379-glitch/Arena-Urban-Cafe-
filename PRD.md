# PRD.md — Product Requirements: Urban Cafe & Restaurant One-Page Site

Version: 1.0 (sample-site pitch). Owner of requirements: BluePeakDesign. Date: 2026-10-15.

---

## 1. Problem and goals

Urban Cafe & Restaurant has strong social proof (Google 4.1 with 500+ reviews, Foodpanda 4.8 with 500+ reviews, Facebook 94% recommend with 550 reviews) but no website of its own. Orders and questions arrive through scattered channels; the menu is invisible on Google Search; birthday and event enquiries are handled ad hoc on Facebook.

### Goals (priority order)

1. **More direct WhatsApp orders.** The site funnels menu browsing and ordering into a single-tap WhatsApp message with the order pre-filled, avoiding aggregator fees and phone-tag.
2. **Menu visible on Google.** A crawlable, fast, semantically marked-up menu page targeting "Urban Cafe Abbottabad menu", "cafe Mandian" and "steak Abbottabad", with Restaurant JSON-LD so Google can surface hours, phone and ratings.
3. **Birthday and event bookings.** A short booking form that hands off to WhatsApp with details structured, matching the birthday content the restaurant already promotes on TikTok.

Secondary goals: present a premium but approachable first impression for tourists and families; make the address, hours and directions trivial to find; give the owner an editable menu file.

## 2. Target users

| User | Context | Need |
|---|---|---|
| Families | Weekend lunch, birthdays | Quick read of the menu, prices (once confirmed), family-friendly signal, birthday booking |
| Young diners | Evening hangout, deals, burgers/pizza/pasta | Popular items fast, WhatsApp ordering, social links |
| Tourists | Visiting Abbottabad, staying nearby | Location, directions, hours, English menu, call/WhatsApp |

## 3. Features

In scope for this sample:

- Sticky header with anchor navigation and Order on WhatsApp CTA; hamburger menu on mobile.
- Hero with tagline, hours line and primary actions.
- Menu loaded from `menu.json`: 17 categories, sticky category tabs, text search, Popular tag, Add buttons.
- Cart drawer with quantities and order type (dine-in / pickup / delivery with address) that composes a WhatsApp message.
- About band with confirmed facts only.
- Gallery grid with lightbox and replaceable placeholder tiles.
- Birthday and event booking form (WhatsApp handoff).
- Aggregate reviews strip with platform links (no quotes).
- Location: Google Maps embed, directions button, hours table, parking placeholder.
- Contact footer: click-to-call phones, email, Facebook, TikTok, hidden Instagram slot, printable QR panel, studio credit.
- Sticky mobile Call and WhatsApp bar.
- SEO: meta, Open Graph, sitemap, robots, JSON-LD (Restaurant).
- Graceful menu-load failure state.

## 4. Success metrics

| Metric | Target | How measured |
|---|---|---|
| WhatsApp clicks (order button, cart send, booking send, sticky bar) | Baseline first month, then +20% quarter over quarter | UTM-free event counting once analytics is approved (not in sample) |
| Menu visibility | Menu page indexed; impressions for "urban cafe abbottabad menu" | Google Search Console |
| Lighthouse | 90+ performance, accessibility, SEO on mobile | Lighthouse CI or DevTools |
| Bounce on hero | Below 45% on mobile | Analytics (later) |
| Birthday form completions | 5+ per month within 3 months | WhatsApp message content tracking (later) |

## 5. Out of scope (sample phase)

- Online ordering, payments, delivery tracking.
- Table reservations with live availability.
- Loyalty program, coupons, push notifications.
- CMS or admin panel (menu is a JSON file).
- Multilingual (Urdu) version — noted as a later idea in ROADMAP.md.
- Analytics and cookie banners (owner approval required).
- Real photography and logo (owner supplies).

## 6. Constraints

- No frameworks; free static hosting; must load fast on 3G-class Android phones.
- No invented content; TODO markers for everything unconfirmed (see RULES.md).
- No emojis; inline SVG icons only.
- WCAG AA; 44 px touch targets; no horizontal scroll at any width.

## 7. Acceptance criteria

The sample is accepted for the pitch when: all nine sections render correctly at 360, 768 and 1280 px; the cart produces a correct WhatsApp message for each order type; every TODO is listed for the owner; and quality checks in brief section 11 pass.
