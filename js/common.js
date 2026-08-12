const products = [
  { id: 1, name: "Miro Lounge Chair", price: 320, tone: "thumb-a", image: "img/products/miro-lounge-chair.jpg", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
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
];

const cartCountNodes = document.querySelectorAll("[data-cart-count]");
const newsletterForms = document.querySelectorAll(".newsletter-form");

let cartItems = JSON.parse(localStorage.getItem("luxroom-cart-items") || "[]");

// Wishlist runtime (localStorage persistence)
let wishlistItems = JSON.parse(localStorage.getItem("luxroom-wishlist") || "[]");

function saveWishlist() {
  localStorage.setItem("luxroom-wishlist", JSON.stringify(wishlistItems));
  try {
    document.dispatchEvent(new CustomEvent("wishlist-updated"));
  } catch (error) { /* render-only pages dispatch nothing harmful */ }
}

function toggleWishlist(productId) {
  const position = wishlistItems.indexOf(productId);
  const product = products.find((p) => p.id === productId);
  if (position >= 0) {
    wishlistItems.splice(position, 1);
    if (product) showToast(`${product.name} removed from wishlist.`);
  } else {
    wishlistItems.push(productId);
    if (product) showToast(`${product.name} saved to your wishlist.`);
  }
  saveWishlist();
  syncWishlistBadge();
}

function isWishlisted(productId) {
  return wishlistItems.includes(productId);
}

function syncWishlistBadge() {
  document.querySelectorAll("[data-wishlist-count]").forEach((node) => {
    node.textContent = String(wishlistItems.length);
    node.style.display = wishlistItems.length > 0 ? "flex" : "none";
  });
}

function getCartItemCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function syncCartCount() {
  const count = getCartItemCount();
  cartCountNodes.forEach((node) => {
    node.textContent = String(count);
    if (count > 0) {
      node.style.display = "flex";
    } else {
      node.style.display = "none";
    }
  });
}

function addToCart(productId, quantity) {
  const existingItem = cartItems.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        tone: product.tone,
        quantity: quantity,
      });
    }
  }
  localStorage.setItem("luxroom-cart-items", JSON.stringify(cartItems));
  syncCartCount();
}

function updateCartItem(productId, quantity) {
  if (quantity <= 0) {
    cartItems = cartItems.filter((item) => item.id !== productId);
  } else {
    const item = cartItems.find((item) => item.id === productId);
    if (item) item.quantity = quantity;
  }
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

newsletterForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

syncCartCount();

function injectContextualBackLink() {
  const page = window.location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  const destinations = {
    cart: { href: "./products.html", label: "Back to collection" },
    checkout: { href: "./cart.html", label: "Back to cart" },
    wishlist: { href: "./products.html", label: "Back to collection" },
    about: { href: "./index.html", label: "Back to home" },
    contact: { href: "./index.html", label: "Back to home" },
    auth: { href: "./index.html", label: "Back to home" },
    profile: { href: "./index.html", label: "Back to home" },
    success: { href: "./products.html", label: "Back to collection" },
  };
  const destination = destinations[page];
  if (!destination || document.querySelector(".page-back-link")) return;

  const main = document.querySelector("main");
  if (!main) return;
  const container = document.createElement("div");
  container.className = "page-back-shell";
  container.innerHTML = `<a class="page-back-link" href="${destination.href}">← ${destination.label}</a>`;
  main.prepend(container);
}

injectContextualBackLink();

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

  // Trigger reflow to apply animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300); // Wait for transition
  }, 3000); // Notice duration
}

window.LuxRoom = {
  products,
  cartItems,
  wishlistItems,
  addToCart,
  updateCartItem,
  clearCart,
  showToast,
  isWishlisted,
  wishlistItems,
};
window.toggleWishlist = toggleWishlist;
syncWishlistBadge();

// Global Search Overlay Logic
const searchButtons = document.querySelectorAll('button[aria-label="Search"], .icon-button[aria-label="Search"]');
const searchOverlay = document.getElementById('global-search-overlay');
const closeSearch = document.getElementById('close-search');

if (searchOverlay) {
  const toggleSearch = (e) => {
    if (e) e.preventDefault();
    searchOverlay.classList.toggle('show');
    if (searchOverlay.classList.contains('show')) {
      document.getElementById('global-search-input').focus();
    }
  };

  searchButtons.forEach(btn => btn.addEventListener('click', toggleSearch));
  
  if (closeSearch) {
    closeSearch.addEventListener('click', toggleSearch);
  }

  // Close when clicking outside modal
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      toggleSearch();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('show')) {
      toggleSearch();
    }
  });
}
