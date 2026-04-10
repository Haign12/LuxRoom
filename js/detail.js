const detailTitle = document.querySelector("#detail-title");
const detailName = document.querySelector("#detail-name");
const detailPrice = document.querySelector("#detail-price");
const qtyValue = document.querySelector("#qty-value");
const qtyMinus = document.querySelector("#qty-minus");
const qtyPlus = document.querySelector("#qty-plus");
const addToCartButton = document.querySelector("#add-to-cart");

let quantity = 1;

function renderProductDetail() {
  if (!detailTitle || !detailName || !detailPrice) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("product")) || 1;
  const selected =
    window.LuxRoom.products.find((product) => product.id === productId) ||
    window.LuxRoom.products[0];

  detailTitle.textContent = selected.name;
  detailName.textContent = selected.name;
  detailPrice.textContent = `$${selected.price}`;
}

function setupQuantityControls() {
  if (!qtyValue || !qtyMinus || !qtyPlus || !addToCartButton) {
    return;
  }

  const updateQuantity = () => {
    qtyValue.textContent = String(quantity);
  };

  qtyMinus.addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateQuantity();
  });

  qtyPlus.addEventListener("click", () => {
    quantity += 1;
    updateQuantity();
  });

  addToCartButton.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("product")) || 1;
    window.LuxRoom.addToCart(productId, quantity);
  });

  updateQuantity();
}

renderProductDetail();
setupQuantityControls();
