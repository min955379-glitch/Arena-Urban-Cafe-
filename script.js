/* ==========================================================================
   Urban Cafe & Restaurant — script.js
   Plain JavaScript, no dependencies. Sections: config, helpers, hydration,
   menu, search, cart + WhatsApp ordering, booking form, lightbox, menus and
   dialogs, misc.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIG — every contactable value lives here. Edit only this block.
   -------------------------------------------------------------------------- */
const CONFIG = {
  // TODO: confirm this is the number the restaurant uses for WhatsApp orders.
  WHATSAPP_NUMBER: "923139755550",
  PHONE_1: "+92 313 9755550",
  PHONE_2: "+92 310 1444111",
  EMAIL: "urbancafe555@gmail.com",
  FACEBOOK_URL: "https://www.facebook.com/TheUrbanCafeandRestaurant",
  // TODO: confirm the current TikTok handle before launch.
  TIKTOK_URL: "https://www.tiktok.com/@urban.cafe.restaurant",
  // Hidden in the interface until a handle is confirmed. Leave empty to hide.
  INSTAGRAM_URL: "",
  // TODO: confirm hours with the owner (brief values used; third-party listings differ).
  HOURS: {
    monThu: "12:30 pm - 11:15 pm",
    fri: "2:30 pm - 11:15 pm",
    satSun: "12:30 pm - 11:15 pm",
    line: "Open daily from 12:30 pm. Friday from 2:30 pm."
  }
};

/* --------------------------------------------------------------------------
   2. Helpers
   -------------------------------------------------------------------------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = {
  cart: new Map(),          // key -> { name, qty, priceLabel }
  menuData: null,
  lightboxIndex: 0,
  lightboxItems: [],
  lastFocus: null,
  openDialogEl: null
};

function waLink(message) {
  return "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function telHref(number) {
  return "tel:" + number.replace(/[^\d+]/g, "");
}

function announce(message) {
  const status = $("#menu-status");
  if (status) {
    status.textContent = message;
  }
}

function setScrollLock(on) {
  document.body.classList.toggle("scroll-lock", on);
}

function openOverlay(el, trigger, focusTarget) {
  if (!el) return;
  state.lastFocus = trigger || document.activeElement;
  state.openDialogEl = el;
  el.hidden = false;
  setScrollLock(true);
  const target = focusTarget || el.querySelector("button, a, input, [tabindex]");
  if (target) target.focus();
}

function closeOverlay(el) {
  if (!el || el.hidden) return;
  el.hidden = true;
  if (state.openDialogEl === el) {
    state.openDialogEl = null;
    setScrollLock(false);
    if (state.lastFocus && typeof state.lastFocus.focus === "function") {
      state.lastFocus.focus();
    }
    state.lastFocus = null;
  }
}

function closeTopOverlay() {
  const lightbox = $("#lightbox");
  const cart = $("#cart-drawer");
  const nav = $("#mobile-menu");
  if (lightbox && !lightbox.hidden) { closeOverlay(lightbox); return true; }
  if (cart && !cart.hidden) { closeOverlay(cart); return true; }
  if (nav && !nav.hidden) { closeOverlay(nav); return true; }
  return false;
}

/* --------------------------------------------------------------------------
   3. Hydration — CONFIG values into the DOM
   -------------------------------------------------------------------------- */
function hydrateConfig() {
  const generalMsg = "Hello Urban Cafe & Restaurant, I would like to place an order.";

  $$("[data-whatsapp-general]").forEach((el) => {
    el.href = waLink(generalMsg);
  });

  $$("[data-phone-link]").forEach((el) => {
    const which = el.getAttribute("data-phone-link");
    const number = which === "2" ? CONFIG.PHONE_2 : CONFIG.PHONE_1;
    el.href = telHref(number);
  });

  $$("[data-phone-text]").forEach((el) => {
    const which = el.getAttribute("data-phone-text");
    el.textContent = which === "2" ? CONFIG.PHONE_2 : CONFIG.PHONE_1;
  });

  $$("[data-email-link]").forEach((el) => {
    el.href = "mailto:" + CONFIG.EMAIL;
  });

  $$("[data-hours-line]").forEach((el) => {
    el.textContent = CONFIG.HOURS.line;
  });

  const fbLinks = $$("[data-facebook-link]");
  fbLinks.forEach((el) => { el.href = CONFIG.FACEBOOK_URL; });

  const tiktok = $("[data-tiktok-link]");
  if (tiktok) tiktok.href = CONFIG.TIKTOK_URL;

  const instagramWrap = $("#social-instagram");
  const instagramLink = $("[data-instagram-link]");
  if (CONFIG.INSTAGRAM_URL && instagramWrap && instagramLink) {
    instagramLink.href = CONFIG.INSTAGRAM_URL;
    instagramWrap.hidden = false;
  }
}

/* --------------------------------------------------------------------------
   4. Menu rendering
   -------------------------------------------------------------------------- */
function menuGroupsFrom(data) {
  const groups = data.categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    items: cat.items
  }));
  const popularItems = [];
  data.categories.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.popular) popularItems.push(item);
    });
  });
  groups.unshift({ id: "popular", label: "Popular", items: popularItems, computed: true });
  return groups;
}

function renderTabs(groups, activeId) {
  const tabs = $("#menu-tabs");
  if (!tabs) return;
  tabs.innerHTML = "";
  groups.forEach((group) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-tab" + (group.id === activeId ? " is-active" : "");
    btn.textContent = group.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", group.id === activeId ? "true" : "false");
    btn.dataset.groupId = group.id;
    btn.addEventListener("click", () => {
      const target = $("#menu-group-" + group.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      $$(".menu-tab").forEach((t) => {
        t.classList.toggle("is-active", t === btn);
        t.setAttribute("aria-selected", t === btn ? "true" : "false");
      });
    });
    tabs.appendChild(btn);
  });
}

function itemRow(categoryId, item) {
  const li = document.createElement("li");
  li.className = "menu-item";
  // item.id is globally unique, so the same dish shown in Popular and in its
  // category always maps to one cart line.
  li.dataset.itemId = item.id;
  const haystack = (item.name + " " + (item.description || "")).toLowerCase();
  li.dataset.search = haystack;

  const head = document.createElement("div");
  head.className = "menu-item__head";

  const name = document.createElement("h4");
  name.className = "menu-item__name";
  name.textContent = item.name;
  head.appendChild(name);

  if (item.popular) {
    const tag = document.createElement("span");
    tag.className = "tag-popular";
    tag.textContent = "Popular";
    head.appendChild(tag);
  }

  const leader = document.createElement("div");
  leader.className = "menu-item__leader";
  const price = document.createElement("span");
  price.className = "menu-item__price";
  price.textContent = item.price || "Rs. ---";
  leader.appendChild(price);

  const add = document.createElement("button");
  add.type = "button";
  add.className = "btn-add";
  add.textContent = "Add";
  add.setAttribute("aria-label", "Add " + item.name + " to order");
  add.addEventListener("click", () => {
    addToCart(item.id, item);
  });

  li.appendChild(head);
  li.appendChild(leader);
  li.appendChild(add);

  if (item.description) {
    const desc = document.createElement("p");
    desc.className = "menu-item__desc";
    desc.textContent = item.description;
    li.appendChild(desc);
  }

  return li;
}

function renderMenu(data) {
  state.menuData = data;
  const groups = menuGroupsFrom(data);
  const wrap = $("#menu-groups");
  if (!wrap) return;
  wrap.innerHTML = "";

  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "menu-group";
    section.id = "menu-group-" + group.id;
    section.setAttribute("aria-label", group.label);

    const h3 = document.createElement("h3");
    h3.innerHTML = "";
    h3.appendChild(document.createTextNode(group.label));
    const count = document.createElement("span");
    count.className = "count";
    count.textContent = group.items.length + (group.items.length === 1 ? " item" : " items");
    h3.appendChild(count);
    section.appendChild(h3);

    const list = document.createElement("ul");
    list.className = "menu-list";
    if (group.items.length === 0) {
      const empty = document.createElement("li");
      empty.className = "menu-empty";
      empty.textContent = "Items in this section will appear here soon.";
      list.appendChild(empty);
    } else {
      group.items.forEach((item) => {
        list.appendChild(itemRow(group.id, item));
      });
    }
    section.appendChild(list);
    wrap.appendChild(section);
  });

  renderTabs(groups, "popular");

  const fallback = $("#menu-fallback");
  if (fallback) fallback.hidden = true;
  wrap.hidden = false;
}

function loadMenu() {
  const wrap = $("#menu-groups");
  const fallback = $("#menu-fallback");
  return fetch("menu.json", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("menu.json request failed");
      return res.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.categories)) throw new Error("menu.json shape invalid");
      renderMenu(data);
    })
    .catch(() => {
      if (wrap) wrap.hidden = true;
      if (fallback) fallback.hidden = false;
      announce("The menu could not be loaded.");
    });
}

/* --------------------------------------------------------------------------
   5. Search
   -------------------------------------------------------------------------- */
function setupSearch() {
  const input = $("#menu-search-input");
  const clear = $("#search-clear");
  if (!input) return;

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    if (clear) clear.hidden = q.length === 0;

    const items = $$(".menu-item");
    let visible = 0;
    items.forEach((li) => {
      const match = q.length === 0 || (li.dataset.search || "").includes(q);
      li.hidden = !match;
      if (match && q.length > 0) visible += 1;
    });

    $$(".menu-group").forEach((group) => {
      const any = $$(".menu-item:not([hidden])", group).length > 0;
      group.hidden = q.length > 0 && !any;
    });

    if (q.length === 0) {
      announce("");
    } else if (visible === 0) {
      announce("No dishes found for " + q + ". Try another word, or ask us on WhatsApp.");
    } else {
      announce(visible + (visible === 1 ? " dish found" : " dishes found") + " for " + q + ".");
    }
  };

  input.addEventListener("input", apply);
  if (clear) {
    clear.addEventListener("click", () => {
      input.value = "";
      apply();
      input.focus();
    });
  }
}

/* --------------------------------------------------------------------------
   6. Cart and WhatsApp ordering
   -------------------------------------------------------------------------- */
function addToCart(id, item) {
  const existing = state.cart.get(id);
  if (existing) {
    existing.qty = Math.min(existing.qty + 1, 20);
  } else {
    state.cart.set(id, { name: item.name, qty: 1, priceLabel: item.price || "Rs. ---" });
  }
  renderCart();
  announce(item.name + " added to your order.");
  // The drawer stays closed so guests can keep adding dishes; the cart button
  // badge updates and opens the drawer when they are ready to review.
  const count = $("#cart-count");
  if (count) {
    count.classList.add("is-bumped");
    window.setTimeout(() => count.classList.remove("is-bumped"), 300);
  }
}

function changeQty(id, delta) {
  const line = state.cart.get(id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) {
    state.cart.delete(id);
  } else {
    line.qty = Math.min(line.qty, 20);
  }
  renderCart();
}

function removeLine(id) {
  const line = state.cart.get(id);
  state.cart.delete(id);
  renderCart();
  if (line) announce(line.name + " removed from your order.");
}

function renderCart() {
  const list = $("#cart-lines");
  const empty = $("#cart-empty");
  const count = $("#cart-count");
  const send = $("#cart-send");
  if (!list) return;

  list.innerHTML = "";
  let totalItems = 0;

  state.cart.forEach((line, id) => {
    totalItems += line.qty;
    const li = document.createElement("li");
    li.className = "cart-line";

    const name = document.createElement("p");
    name.className = "cart-line-name";
    name.textContent = line.name;

    const price = document.createElement("p");
    price.className = "cart-line-price";
    // Prices are placeholders, so no line totals are computed. See TODO-PRICE.
    price.textContent = line.priceLabel;

    const stepper = document.createElement("div");
    stepper.className = "qty-stepper";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.setAttribute("aria-label", "Decrease quantity of " + line.name);
    minus.innerHTML = '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-minus"/></svg>';
    minus.addEventListener("click", () => changeQty(id, -1));

    const qty = document.createElement("span");
    qty.className = "qty-value";
    qty.textContent = String(line.qty);
    qty.setAttribute("aria-label", "Quantity " + line.qty);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.setAttribute("aria-label", "Increase quantity of " + line.name);
    plus.innerHTML = '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-plus"/></svg>';
    plus.addEventListener("click", () => changeQty(id, 1));

    stepper.appendChild(minus);
    stepper.appendChild(qty);
    stepper.appendChild(plus);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "cart-line-remove";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove " + line.name + " from order");
    remove.addEventListener("click", () => removeLine(id));

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(stepper);
    li.appendChild(remove);
    list.appendChild(li);
  });

  if (empty) empty.hidden = totalItems > 0;
  if (count) count.textContent = String(totalItems);
  if (send) send.disabled = totalItems === 0;
}

/* WhatsApp message template. Documented in IMPLEMENTATION.md section 5.1.
   TODO-PRICE: when menu.json holds real prices, append a "Total: Rs. ..." line
   here and unhide the #cart-total block. */
function buildOrderMessage(lines, name, orderType, address, notes) {
  const out = [];
  out.push("Hello Urban Cafe & Restaurant, I would like to place an order.");
  out.push("");
  out.push("Name: " + name);
  out.push("Order type: " + orderType);
  out.push("");
  out.push("Order:");
  lines.forEach((line, index) => {
    out.push((index + 1) + ". " + line.name + " x " + line.qty);
  });
  if (orderType === "Delivery" && address) {
    out.push("");
    out.push("Delivery address: " + address);
  }
  if (notes) {
    out.push("");
    out.push("Notes: " + notes);
  }
  return out.join("\n");
}

function setupCart() {
  const openBtn = $("#cart-button");
  const drawer = $("#cart-drawer");
  const closeBtn = $("#cart-close");
  const form = $("#cart-form");
  const error = $("#cart-error");
  const addressField = $("#cart-address-field");

  if (openBtn && drawer) {
    openBtn.addEventListener("click", () => openOverlay(drawer, openBtn, closeBtn));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => closeOverlay(drawer));
  }

  if (form) {
    $$('input[name="order-type"]', form).forEach((radio) => {
      radio.addEventListener("change", () => {
        const isDelivery = radio.value === "Delivery" && radio.checked;
        if (addressField) addressField.hidden = !isDelivery;
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (error) error.textContent = "";

      const name = ($("#cart-name").value || "").trim();
      const typeInput = $('input[name="order-type"]:checked', form);
      const orderType = typeInput ? typeInput.value : "Dine-in";
      const address = ($("#cart-address").value || "").trim();
      const notes = ($("#cart-notes").value || "").trim();

      $("#cart-name").setAttribute("aria-invalid", name ? "false" : "true");

      if (state.cart.size === 0) {
        if (error) error.textContent = "Your cart is empty. Add dishes from the menu first.";
        return;
      }
      if (!name) {
        if (error) error.textContent = "Please enter your name so we know who the order is for.";
        $("#cart-name").focus();
        return;
      }
      if (orderType === "Delivery" && !address) {
        if (error) error.textContent = "Please enter a delivery address.";
        $("#cart-address").focus();
        return;
      }

      const lines = Array.from(state.cart.values());
      const message = buildOrderMessage(lines, name, orderType, address, notes);
      window.open(waLink(message), "_blank", "noopener");
    });
  }

  renderCart();
}

/* --------------------------------------------------------------------------
   7. Birthday and event booking form
   -------------------------------------------------------------------------- */
function buildBookingMessage(values) {
  const out = [];
  out.push("Hello Urban Cafe & Restaurant, I would like to enquire about a birthday or event booking.");
  out.push("");
  out.push("Name: " + values.name);
  out.push("Phone: " + values.phone);
  out.push("Date: " + values.date);
  out.push("Time: " + values.time);
  out.push("Guests: " + values.guests);
  if (values.notes) {
    out.push("Notes: " + values.notes);
  }
  return out.join("\n");
}

function setupBookingForm() {
  const form = $("#booking-form");
  if (!form) return;
  const error = $("#booking-error");
  const dateInput = $("#book-date");

  if (dateInput) {
    const today = new Date();
    const iso = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    dateInput.min = iso;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (error) error.textContent = "";

    const values = {
      name: ($("#book-name").value || "").trim(),
      phone: ($("#book-phone").value || "").trim(),
      date: ($("#book-date").value || "").trim(),
      time: ($("#book-time").value || "").trim(),
      guests: ($("#book-guests").value || "").trim(),
      notes: ($("#book-notes").value || "").trim()
    };

    const required = [
      ["#book-name", values.name],
      ["#book-phone", values.phone],
      ["#book-date", values.date],
      ["#book-time", values.time],
      ["#book-guests", values.guests]
    ];

    let firstInvalid = null;
    required.forEach(([selector, value]) => {
      const field = $(selector);
      if (!field) return;
      const ok = value.length > 0;
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      if (error) error.textContent = "Please fill in your name, phone, date, time and number of guests.";
      firstInvalid.focus();
      return;
    }

    window.open(waLink(buildBookingMessage(values)), "_blank", "noopener");
  });
}

/* --------------------------------------------------------------------------
   8. Gallery lightbox
   -------------------------------------------------------------------------- */
function setupLightbox() {
  const lightbox = $("#lightbox");
  const img = $("#lightbox-image");
  const caption = $("#lightbox-caption");
  const closeBtn = $("#lightbox-close");
  const prevBtn = $("#lightbox-prev");
  const nextBtn = $("#lightbox-next");
  const tiles = $$(".gallery-item");
  if (!lightbox || tiles.length === 0) return;

  state.lightboxItems = tiles.map((tile) => {
    const image = $("img", tile);
    const cap = $(".gallery-caption", tile);
    return {
      src: image ? image.getAttribute("src") : "",
      alt: image ? image.getAttribute("alt") : "",
      caption: cap ? cap.textContent : ""
    };
  });

  const show = (index) => {
    const items = state.lightboxItems;
    state.lightboxIndex = (index + items.length) % items.length;
    const item = items[state.lightboxIndex];
    if (img) {
      img.src = item.src;
      img.alt = item.alt;
    }
    if (caption) caption.textContent = item.caption;
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      show(index);
      openOverlay(lightbox, tile, closeBtn);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", () => closeOverlay(lightbox));
  if (prevBtn) prevBtn.addEventListener("click", () => show(state.lightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(state.lightboxIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeOverlay(lightbox);
  });
}

/* --------------------------------------------------------------------------
   9. Mobile menu
   -------------------------------------------------------------------------- */
function setupMobileMenu() {
  const toggle = $("#nav-toggle");
  const menu = $("#mobile-menu");
  const closeBtn = $("#nav-close");
  const scrim = $("#scrim");
  if (!toggle || !menu) return;

  const close = () => {
    closeOverlay(menu);
    if (scrim) scrim.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    openOverlay(menu, toggle, closeBtn);
    if (scrim) scrim.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  });

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (scrim) scrim.addEventListener("click", close);

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", close);
  });
}

/* --------------------------------------------------------------------------
   10. Misc: keyboard, print, active nav, init
   -------------------------------------------------------------------------- */
function setupKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const lightbox = $("#lightbox");
      const cart = $("#cart-drawer");
      const nav = $("#mobile-menu");
      if (lightbox && !lightbox.hidden) { closeOverlay(lightbox); return; }
      if (cart && !cart.hidden) { closeOverlay(cart); return; }
      if (nav && !nav.hidden) {
        closeOverlay(nav);
        const scrim = $("#scrim");
        if (scrim) scrim.hidden = true;
        const toggle = $("#nav-toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
        }
      }
      return;
    }

    const lightbox = $("#lightbox");
    if (lightbox && !lightbox.hidden) {
      if (event.key === "ArrowLeft") $("#lightbox-prev").click();
      if (event.key === "ArrowRight") $("#lightbox-next").click();
    }
  });
}

function setupPrint() {
  const button = $("#print-qr");
  if (button) {
    button.addEventListener("click", () => window.print());
  }
}

function setupActiveNav() {
  const sections = ["menu", "gallery", "birthdays", "reviews", "location", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = $$('.site-nav a');
  if (sections.length === 0 || links.length === 0 || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function init() {
  hydrateConfig();
  setupSearch();
  setupCart();
  setupBookingForm();
  setupLightbox();
  setupMobileMenu();
  setupKeyboard();
  setupPrint();
  setupActiveNav();
  loadMenu();

  const retry = $("#menu-retry");
  if (retry) retry.addEventListener("click", loadMenu);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
