const checkoutSummaryItems = document.querySelector("#checkout-summary-items");
const checkoutSubtotal = document.querySelector("#checkout-subtotal");
const checkoutShipping = document.querySelector("#checkout-shipping");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutForm = document.querySelector("#checkout-form");

function renderCheckoutSummary() {
  if (!checkoutSummaryItems) return;

  const items = window.LuxRoom.cartItems || [];

  if (items.length === 0) {
    alert("Your cart is empty. Redirecting to home.");
    window.location.href = "index.html";
    return;
  }

  checkoutSummaryItems.innerHTML = "";
  let subtotal = 0;

  items.forEach((item) => {
    subtotal += item.price * item.quantity;
    const itemEl = document.createElement("div");
    itemEl.className = "summary-item";
    itemEl.innerHTML = `
      <div class="summary-item-img ${item.tone || 'tone-sand'}"></div>
      <div class="summary-item-details">
        <h4 class="summary-item-name">${item.name}</h4>
        <p class="summary-item-qty">Qty: ${item.quantity}</p>
      </div>
      <div class="summary-item-price">$${item.price * item.quantity}</div>
    `;
    checkoutSummaryItems.appendChild(itemEl);
  });

  const shipping = subtotal > 500 ? 0 : 30; // Free shipping over $500
  const total = subtotal + shipping;

  checkoutSubtotal.textContent = `$${subtotal}`;
  checkoutShipping.textContent = shipping === 0 ? "Free" : `$${shipping}`;
  checkoutTotal.textContent = `$${total}`;
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.LuxRoom.clearCart();
    window.location.href = "success.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
});
