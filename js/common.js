const products = [
  { id: 1, name: "Miro Chair", price: 320, tone: "thumb-a" },
  { id: 2, name: "Creamy Bed", price: 680, tone: "thumb-b" },
  { id: 3, name: "Beige Sofa", price: 900, tone: "thumb-c" },
  { id: 4, name: "Coffee Table", price: 230, tone: "thumb-d" },
  { id: 5, name: "Bedside Table", price: 210, tone: "thumb-e" },
  { id: 6, name: "Bathroom Sink", price: 430, tone: "thumb-f" },
  { id: 7, name: "Japandi Kitchen", price: 700, tone: "thumb-g" },
  { id: 8, name: "Wooden Lamp", price: 180, tone: "thumb-h" },
  { id: 9, name: "Wooden Panel", price: 460, tone: "thumb-i" },
  { id: 10, name: "Platey Table", price: 240, tone: "thumb-j" },
  { id: 11, name: "Mino Chair", price: 210, tone: "thumb-k" },
  { id: 12, name: "Milo Chair", price: 280, tone: "thumb-l" },
];

const cartCountNodes = document.querySelectorAll("[data-cart-count]");
const newsletterForms = document.querySelectorAll(".newsletter-form");

let cartItems = JSON.parse(localStorage.getItem("luxroom-cart-items") || "[]");

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
  syncCartCount();
}

function clearCart() {
  cartItems = [];
  localStorage.removeItem("luxroom-cart-items");
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
  addToCart,
  updateCartItem,
  clearCart,
  showToast,
};

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
