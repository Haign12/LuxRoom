const products = [
  { id: 1, name: "Miro Green Sofa", price: 320, tone: "thumb-a", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 2, name: "Creamy Bed", price: 680, tone: "thumb-b", category: "Seating", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 3, name: "Oak Kitchen Console", price: 900, tone: "thumb-c", category: "Tables", room: "Dining", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 4, name: "Stone Bathtub", price: 230, tone: "thumb-d", category: "Light & form", room: "Bathroom", materialGroup: "Stone", colors: ["Cream"], materials: ["Stone"] },
  { id: 5, name: "Studio Desk", price: 210, tone: "thumb-e", category: "Tables", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 6, name: "Lounge Chair", price: 430, tone: "thumb-f", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Charcoal"], materials: ["Textile"] },
  { id: 7, name: "Boucle Rug", price: 700, tone: "thumb-g", category: "Textiles", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 8, name: "Cloud Sofa", price: 180, tone: "thumb-h", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 9, name: "Oak Side Table", price: 460, tone: "thumb-i", category: "Tables", room: "Living", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
  { id: 10, name: "Platey Table", price: 240, tone: "thumb-j", category: "Tables", room: "Dining", materialGroup: "Stoneware", colors: ["Natural oak"], materials: ["Stoneware"] },
  { id: 11, name: "Mino Chair", price: 210, tone: "thumb-k", category: "Seating", room: "Dining", materialGroup: "Textile", colors: ["Terracotta"], materials: ["Textile"] },
  { id: 12, name: "Milo Chair", price: 280, tone: "thumb-l", category: "Seating", room: "Living", materialGroup: "Textile", colors: ["Olive green"], materials: ["Textile"] },
  { id: 13, name: "Olive Desk Lamp", price: 160, tone: "thumb-m", category: "Light & form", room: "Office", materialGroup: "Stoneware", colors: ["Olive green"], materials: ["Stoneware"] },
  { id: 14, name: "Amber Wall Sconce", price: 120, tone: "thumb-n", category: "Light & form", room: "Bedroom", materialGroup: "Stoneware", colors: ["Terracotta"], materials: ["Stoneware"] },
  { id: 15, name: "Linen Throw", price: 95, tone: "thumb-o", category: "Textiles", room: "Bedroom", materialGroup: "Textile", colors: ["Cream"], materials: ["Textile"] },
  { id: 16, name: "Oak Keepsake Box", price: 145, tone: "thumb-p", category: "Light & form", room: "Office", materialGroup: "Oak & ash", colors: ["Natural oak"], materials: ["Oak & ash"] },
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
