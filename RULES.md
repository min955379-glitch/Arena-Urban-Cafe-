# RULES.md — Working Rules for This Repository

These rules bind every AI agent and developer touching this project. They exist to protect the owner from false information and to keep the sample site pitch-quality.

## Facts

1. Never invent facts, prices, reviews, quotes, photos, offers, hours, or menu items and present them as real.
2. Every unconfirmed item carries a `TODO` marker in the source (HTML comment, JS comment, or the `todo` field in `menu.json`).
3. Prices are the literal placeholder `"Rs. ---"` until the owner provides real prices. If prices are added later, they must come from the owner's menu.
4. Customer quotes are forbidden. Reviews appear only as sourced aggregate numbers (Google 4.1 / 500+, Foodpanda 4.8 / 500+, Facebook 94% / 550) with platform links.
5. Photos are neutral labeled placeholder tiles until the owner supplies his own. Never copy images from Foodpanda, TikTok, Facebook or anywhere else.

## Voice and language

6. No emojis anywhere: interface, buttons, headings, body copy, code comments, documentation, commit messages, placeholders. Icons instead.
7. English spelling must be consistent. Menu category names are written exactly as the brief defines them ("Sandwiches", "Sea Foods", "Chopsuey & Noodles").
8. Tone: warm, direct, professional. Short sentences. No marketing fluff, no exclamation marks in UI copy.

## Design

9. No frameworks, no build step, no heavy libraries. Plain HTML, CSS, vanilla JS.
10. Mobile-first. Touch targets at least 44 by 44 px. No horizontal scrolling at any width.
11. Do not change the brand palette (CSS custom properties) or the font pairing without asking the person who commissioned the site. They are documented in `DESIGN.md`.
12. One icon set, inline SVG, one stroke width. No emoji-substitute glyphs.
13. Everything must be visible and placed correctly: nothing hidden, cut off, overlapping or misaligned. Buttons follow the placement rules in the brief section 10 (same geometry per type, logical positions, forms submit below the last field).
14. Accessibility is not optional: semantic HTML, alt text, labels, visible focus, keyboard operation, WCAG AA contrast.

## Engineering

15. All configurable contact data lives in the `CONFIG` block at the top of `script.js`. Never hardcode a phone number or URL in markup that the config already holds.
16. `menu.json` is the single source of truth for the menu. Do not duplicate menu markup in HTML.
17. The WhatsApp message builder must handle all three order types (dine-in, pickup, delivery) and include the delivery address only for delivery.
18. The cart shows a money total only when real prices exist. Until then the total block stays hidden.
19. Keep Lighthouse targets: 90+ performance, accessibility, SEO. That means lazy images, no render-blocking junk, small pages.
20. Update `MEMORY.md` after every phase or meaningful change. If you stop mid-task, `MEMORY.md` must describe where work stopped.

## Questions

21. Ask before changing palette, fonts, section order, or removing a TODO marker. Adding content that is owner-confirmed is always allowed if it gets a source note in `MEMORY.md`.
