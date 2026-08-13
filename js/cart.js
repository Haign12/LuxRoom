const cartContainer = document.querySelector("#cart-items-container");
const subtotalNode = document.querySelector("#cart-subtotal");
const shippingNode = document.querySelector("#cart-shipping");
const totalNode = document.querySelector("#cart-total");
const cartCountLabels = document.querySelectorAll(".cart-intro [data-cart-count]");
const continueShopping = document.querySelector(".back-to-edit");

function money(value) {
  return `$${Number(value).toFixed(0)}`;
}

function renderCart() {
  const items = window.LuxRoom.cartItems || [];
  const products = window.LuxRoom.products || [];
  const productById = new Map(products.map((product) => [product.id, product]));
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 35 : 0;
  const total = subtotal + shipping;

  cartCountLabels.forEach((node) => {
    node.textContent = String(items.reduce((count, item) => count + Number(item.quantity), 0));
    node.style.display = "inline";
  });
  if (subtotalNode) subtotalNode.textContent = money(subtotal);
  if (shippingNode) shippingNode.textContent = shipping ? money(shipping) : "$0";
  if (totalNode) totalNode.textContent = money(total);

  if (!cartContainer) return;
  if (!items.length) {
    cartContainer.innerHTML = '<p class="cart-empty">Your selection is empty for now. Take your time finding an object that belongs in the room.</p>';
  } else {
    cartContainer.innerHTML = items.map((item) => {
      const product = productById.get(item.id);
      const image = product?.image || "img/luxroom_visual_reference.png";
      return `<article class="cart-row" data-cart-row="${item.id}">
        <div class="cart-product">
          <div class="cart-product-image" style="background-image:url('${image}')" role="img" aria-label="${item.name}"></div>
          <div class="cart-product-info"><strong>${item.name}</strong><span>${product?.category || "Object"}</span></div>
        </div>
        <div class="cart-qty" aria-label="Quantity for ${item.name}">
          <button type="button" data-cart-decrease="${item.id}" aria-label="Decrease ${item.name}">−</button>
          <span class="cart-qty-value">${item.quantity}</span>
          <button type="button" data-cart-increase="${item.id}" aria-label="Increase ${item.name}">+</button>
        </div>
        <span>${money(Number(item.price) * Number(item.quantity))}</span>
        <button class="cart-remove" type="button" data-cart-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
      </article>`;
    }).join("");
  }

  if (continueShopping) {
    continueShopping.href = "products.html";
    continueShopping.hidden = false;
    continueShopping.innerHTML = "Continue shopping <span aria-hidden=\"true\">↗</span>";
  }
}

cartContainer?.addEventListener("click", (event) => {
  const target = event.target.closest("button[data-cart-decrease], button[data-cart-increase], button[data-cart-remove]");
  if (!target) return;
  const id = Number(target.dataset.cartDecrease || target.dataset.cartIncrease || target.dataset.cartRemove);
  const item = (window.LuxRoom.cartItems || []).find((entry) => entry.id === id);
  if (!item) return;
  if (target.dataset.cartRemove) {
    window.LuxRoom.updateCartItem(id, 0);
  } else {
    const nextQuantity = target.dataset.cartIncrease ? item.quantity + 1 : item.quantity - 1;
    window.LuxRoom.updateCartItem(id, nextQuantity);
  }
  renderCart();
});

document.addEventListener("luxroom-cart-updated", renderCart);
renderCart();
