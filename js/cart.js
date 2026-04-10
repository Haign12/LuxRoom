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
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-img ${item.tone || 'tone-sand'}"></div>
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">$${item.price}</p>
        <div class="cart-quantity-controls">
          <button class="cart-qty-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">Remove</button>
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
      const id = Number(e.target.dataset.id);
      const item = window.LuxRoom.cartItems.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        window.LuxRoom.updateCartItem(id, item.quantity - 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".cart-qty-btn.increase").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      const item = window.LuxRoom.cartItems.find((i) => i.id === id);
      if (item) {
        window.LuxRoom.updateCartItem(id, item.quantity + 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      window.LuxRoom.updateCartItem(id, 0); // 0 removes the item
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
