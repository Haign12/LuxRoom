const products = [
  { id: 1, name: "Miro Lounge Chair", price: 320, tone: "thumb-a", image: "img/products/miro-lounge-chair.jpg", gallery: ["img/products/miro-lounge-chair.jpg", "img/lux_detail_lounge_wide.jpg", "img/lux_detail_lounge_closeup.jpg"], category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 2, name: "Rilo Oak Bed", price: 680, tone: "thumb-b", image: "img/products/rilo-oak-bed.jpg", category: "Seating", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 3, name: "Arca Dining Table", price: 900, tone: "thumb-c", image: "img/products/arca-dining-table.jpg", category: "Tables", room: "Dining", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 4, name: "Noma Stone Bath", price: 230, tone: "thumb-d", image: "img/products/noma-stone-bath.jpg", category: "Light & form", room: "Bathroom", materialGroup: "Stone", colors: ["Cream"], materials: ["Stone"] },
  { id: 5, name: "Silo Writing Desk", price: 210, tone: "thumb-e", image: "img/products/silo-writing-desk.jpg", category: "Tables", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 6, name: "Raku Lounge Chair", price: 430, tone: "thumb-f", image: "img/products/raku-lounge-chair.jpg", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Terracotta"], materials: ["Textile"] },
  { id: 7, name: "Haven Wool Rug", price: 700, tone: "thumb-g", image: "img/products/haven-wool-rug.jpg", category: "Textiles", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 8, name: "Ona Modular Sofa", price: 180, tone: "thumb-h", image: "img/products/ona-modular-sofa.jpg", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 9, name: "Koto Side Table", price: 460, tone: "thumb-i", image: "img/products/koto-side-table.jpg", gallery: ["img/products/koto-side-table.jpg", "img/lux_mineral_side_table.jpg", "img/lux_mineral_side_table.jpg"], category: "Tables", room: "Living", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 10, name: "Ora Pedestal Table", price: 240, tone: "thumb-j", image: "img/products/ora-pedestal-table.jpg", category: "Tables", room: "Dining", materialGroup: "Stoneware", colors: ["Cream"], materials: ["Stoneware"] },
  { id: 11, name: "Audo Dining Chair", price: 210, tone: "thumb-k", image: "img/lux_story_2.png", category: "Seating", room: "Dining", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 12, name: "Dune Loveseat", price: 280, tone: "thumb-l", image: "img/lux_gallery_main.png", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 13, name: "Moss Table Lamp", price: 160, tone: "thumb-m", image: "img/products-new/olive-desk-lamp.jpg", category: "Light & form", room: "Office", materialGroup: "Stoneware", colors: ["Olive green"], materials: ["Stoneware"] },
  { id: 14, name: "Halo Wall Light", price: 120, tone: "thumb-n", image: "img/products-new/amber-wall-sconce.jpg", category: "Light & form", room: "Bedroom", materialGroup: "Stoneware", colors: ["Terracotta"], materials: ["Stoneware"] },
  { id: 15, name: "Softline Linen Throw", price: 95, tone: "thumb-o", image: "img/products-new/linen-throw.jpg", category: "Textiles", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 16, name: "Mori Keepsake Box", price: 145, tone: "thumb-p", image: "img/products-new/oak-keepsake-box.jpg", category: "Light & form", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 17, name: "Luma Amber Sconce", price: 190, tone: "thumb-q", image: "img/lux_amber_wall_sconce.jpg", gallery: ["img/lux_amber_wall_sconce.jpg", "img/lux_amber_wall_sconce.jpg", "img/lux_amber_wall_sconce.jpg"], category: "Light & form", room: "Living", materialGroup: "Stoneware", colors: ["Terracotta"], materials: ["Stoneware"] },
];

function injectTitleSpacingStylesheet() {
  if (document.querySelector('link[data-luxroom-title-spacing]')) return;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "css/title-spacing.css";
  stylesheet.dataset.luxroomTitleSpacing = "true";
  document.head.appendChild(stylesheet);
}

injectTitleSpacingStylesheet();

const cartCountNodes = document.querySelectorAll("[data-cart-count]");
const newsletterForms = document.querySelectorAll(".newsletter-form");
let cartItems = JSON.parse(localStorage.getItem("luxroom-cart-items") || "[]");
let wishlistItems = JSON.parse(localStorage.getItem("luxroom-wishlist") || "[]");

function getCartItemCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function syncCartCount() {
  const count = getCartItemCount();
  cartCountNodes.forEach((node) => {
    node.textContent = String(count);
    node.style.display = count > 0 ? "flex" : "none";
  });
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
}

function updateCartItem(productId, quantity) {
  cartItems = quantity <= 0
    ? cartItems.filter((item) => item.id !== productId)
    : cartItems.map((item) => item.id === productId ? { ...item, quantity } : item);
  localStorage.setItem("luxroom-cart-items", JSON.stringify(cartItems));
  window.LuxRoom.cartItems = cartItems;
  syncCartCount();
}

function clearCart() {
  cartItems = [];
  localStorage.removeItem("luxroom-cart-items");
  window.LuxRoom.cartItems = cartItems;
  syncCartCount();
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
    cart: { href: "./products.html", label: "Back to collection" },
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

newsletterForms.forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));

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
