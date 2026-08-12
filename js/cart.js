const cartContainer = document.querySelector("#cart-items-container");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartShipping = document.querySelector("#cart-shipping");
const cartTotal = document.querySelector("#cart-total");

function renderCart() {
  if (!cartContainer) return;

  const items = window.LuxRoom.cartItems || [];

  if (items.length === 0) {
    cartContainer.innerHTML = `<div class="empty-cart-msg">
      <h2>Your cart is empty.</h2>
      <a href="products.html" class="primary-button" style="margin-top:20px;display:inline-block;">Continue Shopping</a>
    </div>`;
    cartSubtotal.textContent = "$0";
    cartShipping.textContent = "$0";
    cartTotal.textContent = "$0";
    return;
  }

  cartContainer.innerHTML = "";
  let subtotal = 0;

    items.forEach((item) => {
      subtotal += item.price * item.quantity;
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item-row";
      
      // We will map product tone to a local utility or fallback to luxury-bg if tone missing.
      const bgClass = item.tone ? item.tone : 'luxury-bg';
      
      itemEl.innerHTML = `
        <div class="cart-item-img ${bgClass}"></div>
        <div class="cart-item-desc">
          <h4>${item.name}</h4>
          <p>The ${item.name} boasts a harmonious blend of style and comfort.</p>
        </div>
        <div class="cart-quantity-controls">
          <button class="cart-qty-btn decrease" data-id="${item.id}">-</button>
          <span class="cart-qty-val">${item.quantity}</span>
          <button class="cart-qty-btn increase" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-price">$${item.price}</div>
        <button class="cart-item-remove" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="var(--ink)"/><path d="m15 9-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="m9 9 6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      `;
      cartContainer.appendChild(itemEl);
    });

  const shipping = subtotal > 500 ? 0 : 30; // Free shipping over $500
  const total = subtotal + shipping;

  cartSubtotal.textContent = `$${subtotal}`;
  cartShipping.textContent = shipping === 0 ? "Free" : `$${shipping}`;
  cartTotal.textContent = `$${total}`;

  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll(".cart-qty-btn.decrease").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const item = window.LuxRoom.cartItems.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        window.LuxRoom.updateCartItem(id, item.quantity - 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".cart-qty-btn.increase").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const item = window.LuxRoom.cartItems.find((i) => i.id === id);
      if (item) {
        window.LuxRoom.updateCartItem(id, item.quantity + 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      window.LuxRoom.updateCartItem(id, 0); // 0 removes the item
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const btnConfirm = document.querySelector(".btn-confirm");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => {
      const items = window.LuxRoom.cartItems || [];
      if (items.length === 0) {
        window.LuxRoom.showToast("Oops! Your cart is empty.");
        return;
      }
      
      const paymentInputs = document.querySelectorAll('.payment-card-box input[type="text"]');
      const isFilled = Array.from(paymentInputs).every(input => input.value.trim() !== "");
      if (!isFilled) {
        window.LuxRoom.showToast("Please fill out your payment details.");
        return;
      }

      window.LuxRoom.showToast("Payment successful! Thank you.");
      
      // Simulate loading state
      btnConfirm.textContent = "Processing...";
      btnConfirm.style.opacity = "0.7";
      btnConfirm.style.pointerEvents = "none";

      setTimeout(() => {
        window.LuxRoom.clearCart();
        window.location.href = "index.html";
      }, 2000);
    });
  }
});
