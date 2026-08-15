const products = [
  { id: 1, name: "Miro Lounge Chair", price: 320, tone: "thumb-a", image: "img/products/miro-lounge-chair.jpg", gallery: ["img/products/miro-lounge-chair.jpg", "img/lux_detail_lounge_wide.jpg", "img/lux_detail_lounge_closeup.jpg"], category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 2, name: "Rilo Oak Bed", price: 680, tone: "thumb-b", image: "img/products/rilo-oak-bed.jpg", category: "Seating", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 3, name: "Arca Dining Table", price: 900, tone: "thumb-c", image: "img/products/arca-dining-table.jpg", category: "Tables", room: "Dining", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 4, name: "Noma Stone Bath", price: 230, tone: "thumb-d", image: "img/products/noma-stone-bath.jpg", category: "Light & form", room: "Bathroom", materialGroup: "Stone", colors: ["Cream"], materials: ["Stone"] },
  { id: 5, name: "Silo Writing Desk", price: 210, tone: "thumb-e", image: "img/products/silo-writing-desk.jpg", category: "Tables", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 6, name: "Raku Lounge Chair", price: 430, tone: "thumb-f", image: "img/products/raku-lounge-chair.jpg", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Terracotta"], materials: ["Textile"] },
  { id: 7, name: "Haven Wool Rug", price: 700, tone: "thumb-g", image: "img/products/haven-wool-rug.jpg", category: "Textiles", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 8, name: "Ona Modular Sofa", price: 180, tone: "thumb-h", image: "img/products/ona-modular-sofa.jpg", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 9, name: "Koto Side Table", price: 460, tone: "thumb-i", image: "img/products/koto-side-table.jpg", category: "Tables", room: "Living", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 10, name: "Ora Pedestal Table", price: 240, tone: "thumb-j", image: "img/products/ora-pedestal-table.jpg", category: "Tables", room: "Dining", materialGroup: "Stoneware", colors: ["Cream"], materials: ["Stoneware"] },
  { id: 11, name: "Audo Dining Chair", price: 210, tone: "thumb-k", image: "img/lux_story_2.png", category: "Seating", room: "Dining", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 12, name: "Dune Loveseat", price: 280, tone: "thumb-l", image: "img/lux_gallery_main.png", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 13, name: "Moss Table Lamp", price: 160, tone: "thumb-m", image: "img/products-new/olive-desk-lamp.jpg", category: "Light & form", room: "Office", materialGroup: "Stoneware", colors: ["Olive green"], materials: ["Stoneware"] },
  { id: 14, name: "Halo Wall Light", price: 120, tone: "thumb-n", image: "img/products-new/amber-wall-sconce.jpg", category: "Light & form", room: "Bedroom", materialGroup: "Stoneware", colors: ["Terracotta"], materials: ["Stoneware"] },
  { id: 15, name: "Softline Linen Throw", price: 95, tone: "thumb-o", image: "img/products-new/linen-throw.jpg", category: "Textiles", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 16, name: "Mori Keepsake Box", price: 145, tone: "thumb-p", image: "img/products-new/oak-keepsake-box.jpg", category: "Light & form", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 17, name: "Luma Amber Sconce", price: 190, tone: "thumb-q", image: "img/lux_luma_sconce_front.jpg", gallery: ["img/lux_luma_sconce_front.jpg", "img/lux_luma_sconce_side.jpg", "img/lux_luma_sconce_detail.jpg"], category: "Light & form", room: "Living", materialGroup: "Stoneware", colors: ["Terracotta"], materials: ["Stoneware"] },
];

function injectExperienceStylesheets() {
  const assets = [
    { href: "css/title-spacing.css?v=ux-20260813-6", attribute: "data-luxroom-title-spacing" },
    { href: "css/experience-upgrade.css?v=ux-20260813-10", attribute: "data-luxroom-experience-upgrade" },
  ];
  assets.forEach(({ href, attribute }) => {
    if (document.querySelector(`link[${attribute}]`)) return;
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    stylesheet.setAttribute(attribute, "true");
    document.head.appendChild(stylesheet);
  });
}

injectExperienceStylesheets();

function standardizeHeaderIcons() {
  document.querySelectorAll(".topbar-actions").forEach((actions) => {
    actions.setAttribute("aria-label", "Quick actions");
    actions.innerHTML = `
      <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="luxroom-main-menu">
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
      <button class="icon-button" aria-label="Search" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
      </button>
      <a class="icon-button" href="cart.html" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2 3h2l3 12h10l2-8H6"></path></svg>
        <span class="cart-badge" data-cart-count style="display:none">0</span>
      </a>
      <a class="icon-button" href="wishlist.html" aria-label="Wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>
        <span class="cart-badge" data-wishlist-count style="display:none">0</span>
      </a>
      <a class="icon-button" href="auth.html" aria-label="Account">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </a>`;
  });
}

standardizeHeaderIcons();

function initMobileMenu() {
  document.querySelectorAll(".topbar").forEach((topbar) => {
    const nav = topbar.querySelector(".main-nav");
    const toggle = topbar.querySelector(".mobile-menu-toggle");
    if (!nav || !toggle) return;

    nav.id = "luxroom-main-menu";
    const setOpen = (isOpen, moveFocus = false) => {
      topbar.classList.toggle("menu-open", isOpen);
      document.body.classList.toggle("lux-menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      if (moveFocus) nav.querySelector("a")?.focus();
    };

    toggle.addEventListener("click", () => setOpen(!topbar.classList.contains("menu-open"), true));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && topbar.classList.contains("menu-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820 && topbar.classList.contains("menu-open")) setOpen(false);
    });
  });
}

initMobileMenu();

const cartCountNodes = document.querySelectorAll("[data-cart-count]");
const newsletterForms = document.querySelectorAll(".newsletter-form");
let cartItems = JSON.parse(localStorage.getItem("luxroom-cart-items") || "[]");
let wishlistItems = JSON.parse(localStorage.getItem("luxroom-wishlist") || "[]");

function getCartItemCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

let lastCartCount = getCartItemCount();

function pulseCartFeedback() {
  cartCountNodes.forEach((node) => {
    node.classList.remove("is-pulsing");
    void node.offsetWidth;
    node.classList.add("is-pulsing");
    window.setTimeout(() => node.classList.remove("is-pulsing"), 520);
  });
  document.querySelectorAll('.topbar-actions a[aria-label="Cart"]').forEach((link) => {
    link.classList.remove("cart-updated");
    void link.offsetWidth;
    link.classList.add("cart-updated");
    window.setTimeout(() => link.classList.remove("cart-updated"), 520);
  });
}

function syncCartCount() {
  const count = getCartItemCount();
  cartCountNodes.forEach((node) => {
    node.textContent = String(count);
    node.style.display = count > 0 ? "flex" : "none";
  });
  if (count !== lastCartCount) {
    pulseCartFeedback();
    lastCartCount = count;
  }
}

function syncWishlistBadge() {
  document.querySelectorAll("[data-wishlist-count]").forEach((node) => {
    node.textContent = String(wishlistItems.length);
    node.style.display = wishlistItems.length > 0 ? "flex" : "none";
  });
}

function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function addToCart(productId, quantity = 1) {
  const existingItem = cartItems.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = products.find((item) => item.id === productId);
    if (product) cartItems.push({ id: product.id, name: product.name, price: product.price, tone: product.tone, quantity });
  }
  localStorage.setItem("luxroom-cart-items", JSON.stringify(cartItems));
  window.LuxRoom.cartItems = cartItems;
  syncCartCount();
  document.dispatchEvent(new Event("luxroom-cart-updated"));
}

function updateCartItem(productId, quantity) {
  cartItems = quantity <= 0
    ? cartItems.filter((item) => item.id !== productId)
    : cartItems.map((item) => item.id === productId ? { ...item, quantity } : item);
  localStorage.setItem("luxroom-cart-items", JSON.stringify(cartItems));
  window.LuxRoom.cartItems = cartItems;
  syncCartCount();
  document.dispatchEvent(new Event("luxroom-cart-updated"));
}

function clearCart() {
  cartItems = [];
  localStorage.removeItem("luxroom-cart-items");
  window.LuxRoom.cartItems = cartItems;
  syncCartCount();
  document.dispatchEvent(new Event("luxroom-cart-updated"));
}

function initMiniCartPreview() {
  const cartLink = document.querySelector('.topbar-actions a[aria-label="Cart"]');
  if (!cartLink || document.querySelector(".mini-cart-popover")) return;

  const popover = document.createElement("div");
  popover.className = "mini-cart-popover";
  popover.setAttribute("aria-hidden", "true");
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-label", "Cart preview");
  document.body.appendChild(popover);

  let closeTimer;
  const positionPopover = () => {
    const rect = cartLink.getBoundingClientRect();
    const width = Math.min(340, window.innerWidth - 32);
    const left = Math.max(16, Math.min(window.innerWidth - width - 16, rect.right - width));
    popover.style.width = `${width}px`;
    popover.style.top = `${rect.bottom + 14}px`;
    popover.style.left = `${left}px`;
  };

  const renderPreview = () => {
    const items = cartItems.slice(0, 2);
    const productById = new Map(products.map((product) => [product.id, product]));
    const total = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    if (!items.length) {
      popover.innerHTML = '<p class="mini-cart-eyebrow">Your selection</p><p class="mini-cart-empty">No objects here yet. Take your time.</p><a class="mini-cart-link" href="products.html">Explore the collection <span aria-hidden="true">↗</span></a>';
      return;
    }
    popover.innerHTML = `<p class="mini-cart-eyebrow">Your selection · ${getCartItemCount()} ${getCartItemCount() === 1 ? "object" : "objects"}</p><div class="mini-cart-items">${items.map((item) => {
      const product = productById.get(item.id);
      return `<div class="mini-cart-item"><span class="mini-cart-item-image" style="background-image:url('${product?.image || "img/luxroom_visual_reference.png"}')" aria-hidden="true"></span><span class="mini-cart-item-copy"><strong>${item.name}</strong><small>${item.quantity} × $${Number(item.price).toFixed(0)}</small></span></div>`;
    }).join("")}</div><div class="mini-cart-total"><span>Subtotal</span><strong>$${total.toFixed(0)}</strong></div><a class="mini-cart-link" href="cart.html">View cart <span aria-hidden="true">↗</span></a>`;
  };

  const open = () => {
    window.clearTimeout(closeTimer);
    renderPreview();
    positionPopover();
    popover.classList.add("is-open");
    popover.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    closeTimer = window.setTimeout(() => {
      popover.classList.remove("is-open");
      popover.setAttribute("aria-hidden", "true");
    }, 180);
  };

  cartLink.addEventListener("mouseenter", open);
  cartLink.addEventListener("focusin", open);
  cartLink.addEventListener("mouseleave", close);
  cartLink.addEventListener("focusout", (event) => {
    if (!popover.contains(event.relatedTarget)) close();
  });
  popover.addEventListener("mouseenter", open);
  popover.addEventListener("mouseleave", close);
  popover.addEventListener("focusin", open);
  popover.addEventListener("focusout", (event) => {
    if (!cartLink.contains(event.relatedTarget)) close();
  });
  window.addEventListener("resize", () => {
    if (popover.classList.contains("is-open")) positionPopover();
  });
  document.addEventListener("luxroom-cart-updated", renderPreview);
}

function isWishlisted(productId) {
  return wishlistItems.includes(productId);
}

function toggleWishlist(productId) {
  const product = products.find((item) => item.id === productId);
  if (isWishlisted(productId)) {
    wishlistItems = wishlistItems.filter((item) => item !== productId);
    if (product) showToast(`${product.name} removed from wishlist.`);
  } else {
    wishlistItems.push(productId);
    if (product) showToast(`${product.name} saved to wishlist.`);
  }
  localStorage.setItem("luxroom-wishlist", JSON.stringify(wishlistItems));
  window.LuxRoom.wishlistItems = wishlistItems;
  syncWishlistBadge();
  document.dispatchEvent(new CustomEvent("wishlist-updated"));
}

function injectContextualBackLink() {
  const page = window.location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  const destinations = {
    checkout: { href: "./cart.html", label: "Back to cart" },
    wishlist: { href: "./products.html", label: "Back to collection" },
    success: { href: "./products.html", label: "Back to collection" },
  };
  const destination = destinations[page];
  const main = document.querySelector("main");
  if (!destination || !main || document.querySelector(".page-back-link")) return;
  const container = document.createElement("div");
  container.className = "page-back-shell";
  container.innerHTML = `<a class="page-back-link" href="${destination.href}">← ${destination.label}</a>`;
  main.prepend(container);
}

function upgradeFooter() {
  const footer = document.querySelector("footer.footer, footer.home-footer, footer.detail-footer");
  if (!footer || footer.dataset.luxroomEnhanced === "true") return;
  footer.dataset.luxroomEnhanced = "true";
  footer.classList.add("footer-rich");
  footer.innerHTML = `
    <div class="footer-rich__top">
      <div class="footer-rich__brand">
        <a class="footer-brand" href="index.html">LuxRoom</a>
        <p>Objects and rooms for an unhurried life.</p>
        <a class="footer-rich__consultation" href="contact.html">Plan a room with us <span aria-hidden="true">↗</span></a>
      </div>
      <div class="footer-rich__column"><h3>Explore</h3><a href="products.html">Collection</a><a href="about.html">Our story</a><a href="wishlist.html">Saved objects</a></div>
      <div class="footer-rich__column"><h3>Service</h3><a href="contact.html">Room consultation</a><a href="contact.html">Delivery & care</a><a href="contact.html">Trade enquiries</a></div>
      <div class="footer-rich__column footer-rich__contact"><h3>Visit & contact</h3><p>Ho Chi Minh City<br>By appointment</p><a href="mailto:hello@luxroom.com">hello@luxroom.com</a><a href="tel:+84798876074">+84 798 876 074</a></div>
      <div class="footer-rich__newsletter"><h3>Notes from LuxRoom</h3><p>New objects, quiet rooms and considered material stories.</p><form class="footer-newsletter" novalidate><label class="sr-only" for="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Your email address" autocomplete="email" required><button type="submit" aria-label="Subscribe to LuxRoom notes">↗</button></form><small>Occasional notes. No noise.</small></div>
    </div>
    <div class="footer-rich__bottom"><div class="footer-rich__meta"><span>© <span data-footer-year></span> LuxRoom</span></div><div class="footer-rich__delivery">Vietnam / worldwide delivery</div><nav class="footer-rich__legal" aria-label="Footer legal links"><a href="contact.html">Privacy</a><a href="contact.html">Terms</a><a href="#top">Back to top ↑</a></nav></div>`;
  footer.querySelectorAll("[data-footer-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
  footer.querySelector(".footer-newsletter")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = footer.querySelector("#footer-email");
    if (!input?.checkValidity()) { input?.reportValidity(); return; }
    showToast("Thank you — LuxRoom notes will arrive quietly.");
    event.currentTarget.reset();
  });
}

function normalizeCartContinueAction() {
  const page = window.location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  if (page !== "cart") return;
  document.querySelectorAll(".page-back-shell").forEach((node) => node.remove());
  const collectionLinks = Array.from(document.querySelectorAll(".back-to-edit"));
  if (!collectionLinks.length) return;
  const collectionLink = collectionLinks[0];
  collectionLinks.slice(1).forEach((node) => node.remove());
  collectionLink.href = "products.html";
  collectionLink.textContent = "Continue shopping";
  collectionLink.setAttribute("aria-label", "Continue shopping in the collection");
  collectionLink.hidden = false;
}

newsletterForms.forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));
upgradeFooter();
normalizeCartContinueAction();

function initMotionSystem() {
  const selectors = [
    ".home-hero", ".home-section", ".collections", ".studio", ".newsletter",
    ".collection-hero", ".collection-index", ".filter-toolbar", ".expanded-filters", ".product-grid-masonry",
    ".d-gallery", ".di-header", ".d-spec", ".related-products",
    ".contact-intro", ".contact-grid", ".contact-quiet",
    ".story-hero", ".story-statement", ".material-triptych article", ".story-image-essay", ".newsletter-band",
    ".cart-intro", ".cart-layout > *", ".cart-assurance",
    ".checkout-intro", ".checkout-layout > *",
    ".auth-essay", ".auth-card", ".profile-hero", ".profile-layout > *",
    ".success-message", ".success-steps", ".wishlist-hero", ".wishlist-empty",
    ".footer-rich__top > *", ".footer-rich__bottom"
  ];
  const deepMotion = new Set(["home-hero", "collection-hero", "story-hero", "auth-essay", "checkout-intro"]);
  let sequence = 0;
  let observer;

  const prepareNode = (node) => {
    if (!(node instanceof Element) || node.dataset.luxroomMotionReady === "true") return;
    node.dataset.luxroomMotionReady = "true";
    node.classList.add("motion-reveal");
    const delayFromMarkup = node.style.animationDelay;
    if (delayFromMarkup) {
      node.style.setProperty("--motion-delay", delayFromMarkup);
      node.style.removeProperty("animation-delay");
    } else {
      node.style.setProperty("--motion-delay", `${Math.min(sequence, 8) * 45}ms`);
    }
    if (deepMotion.has(node.classList[0]) || node.classList.contains("home-hero") || node.classList.contains("collection-hero") || node.classList.contains("story-hero") || node.classList.contains("auth-essay") || node.classList.contains("checkout-intro")) {
      node.dataset.motionDepth = "deep";
    }
    sequence += 1;
    if (observer) observer.observe(node);
    else node.classList.add("is-visible");
  };

  const decorate = (scope = document) => {
    selectors.forEach((selector) => {
      scope.querySelectorAll(selector).forEach(prepareNode);
    });
    if (scope instanceof Element && scope.matches(".motion-reveal, .product-card")) prepareNode(scope);
  };

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  }

  document.body.classList.add("lux-motion-ready");
  decorate();

  const mutationObserver = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.addedNodes.length > 0)) {
      window.requestAnimationFrame(() => decorate());
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}


function initPageTransition() {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const veil = document.createElement('div');
  veil.className = 'lux-veil';
  veil.setAttribute('aria-hidden', 'true');
  veil.innerHTML = `
    <div class="lux-veil__inner">
      <span class="lux-veil__line" aria-hidden="true"></span>
      <span class="lux-veil__wordmark">LuxRoom</span>
      <span class="lux-veil__line" aria-hidden="true"></span>
    </div>`;
  document.body.appendChild(veil);

  if (reduceMotion) return;

  document.body.classList.add('lux-page-entering');
  window.setTimeout(() => document.body.classList.remove('lux-page-entering'), 560);

  let navigating = false;
  const isModifiedClick = (event) => (
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  );
  const isInternalNavigation = (link) => {
    if (!link || link.hasAttribute('download') || link.target === '_blank' || link.dataset.noTransition !== undefined) return false;
    const rawHref = link.getAttribute('href') || '';
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return false;
    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch {
      return false;
    }
    if (destination.origin !== window.location.origin) return false;
    return `${destination.pathname}${destination.search}${destination.hash}` !== `${window.location.pathname}${window.location.search}${window.location.hash}`;
  };

  document.addEventListener('click', (event) => {
    if (navigating || event.defaultPrevented || isModifiedClick(event)) return;
    const target = event.target;
    const link = target instanceof Element ? target.closest('a[href]') : null;
    if (!isInternalNavigation(link)) return;

    event.preventDefault();
    navigating = true;
    document.body.classList.add('lux-page-leaving');
    veil.classList.add('is-visible');
    window.setTimeout(() => window.location.assign(link.href), 280);
  }, true);

  window.addEventListener('pageshow', () => {
    navigating = false;
    document.body.classList.remove('lux-page-leaving');
    veil.classList.remove('is-visible');
  });
}

initMotionSystem();
initMiniCartPreview();
initPageTransition();

window.LuxRoom = {
  products,
  cartItems,
  wishlistItems,
  addToCart,
  updateCartItem,
  clearCart,
  showToast,
  isWishlisted,
};
window.toggleWishlist = toggleWishlist;
syncCartCount();
syncWishlistBadge();
injectContextualBackLink();

const searchButtons = document.querySelectorAll('button[aria-label="Search"], .icon-button[aria-label="Search"]');
const searchOverlay = document.getElementById("global-search-overlay");
const closeSearch = document.getElementById("close-search");
if (searchOverlay) {
  const toggleSearch = (event) => {
    event?.preventDefault();
    searchOverlay.classList.toggle("show");
    if (searchOverlay.classList.contains("show")) document.getElementById("global-search-input")?.focus();
  };
  searchButtons.forEach((button) => button.addEventListener("click", toggleSearch));
  closeSearch?.addEventListener("click", toggleSearch);
  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) toggleSearch(event);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("show")) toggleSearch(event);
  });
}
