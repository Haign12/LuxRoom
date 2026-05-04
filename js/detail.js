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

    const selected = window.LuxRoom.products.find((product) => product.id === productId) || window.LuxRoom.products[0];
    window.LuxRoom.showToast(`Added ${quantity}x ${selected.name} to cart!`);
  });

  updateQuantity();
}

function setupAccordions() {
  const accordions = document.querySelectorAll(".acc-item");

  accordions.forEach((acc) => {
    const head = acc.querySelector(".acc-head");
    const icon = acc.querySelector(".acc-icon");

    if (head) {
      head.addEventListener("click", () => {
        const isOpen = acc.classList.contains("acc-open");

        // Close all accordions
        accordions.forEach((a) => {
          a.classList.remove("acc-open");
          const i = a.querySelector(".acc-icon");
          if (i) i.textContent = "+";
        });

        // Open clicked one if it was closed
        if (!isOpen) {
          acc.classList.add("acc-open");
          if (icon) icon.textContent = "-";
        }
      });
    }
  });
}

renderProductDetail();
setupQuantityControls();
setupAccordions();
