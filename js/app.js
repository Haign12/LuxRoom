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
const productGrid = document.querySelector("#product-grid");
const detailTitle = document.querySelector("#detail-title");
const detailName = document.querySelector("#detail-name");
const detailPrice = document.querySelector("#detail-price");
const qtyValue = document.querySelector("#qty-value");
const qtyMinus = document.querySelector("#qty-minus");
const qtyPlus = document.querySelector("#qty-plus");
const addToCartButton = document.querySelector("#add-to-cart");
const newsletterForms = document.querySelectorAll(".newsletter-form");

let quantity = 1;
let cart = Number(localStorage.getItem("luxroom-cart-count") || 0);

function syncCartCount() {
  cartCountNodes.forEach((node) => {
    node.textContent = String(cart);
  });
}

function saveCartCount() {
  localStorage.setItem("luxroom-cart-count", String(cart));
  syncCartCount();
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-thumb ${product.tone}"></div>
          <div class="product-meta-row">
            <div>
              <h3>${product.name}</h3>
              <span>$${product.price}</span>
            </div>
            <a class="secondary-button" href="./detail.html?product=${product.id}">
              View
            </a>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderProductDetail() {
  if (!detailTitle || !detailName || !detailPrice) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("product")) || 1;
  const selected = products.find((product) => product.id === productId) || products[0];

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
    cart += quantity;
    saveCartCount();
  });

  updateQuantity();
}

newsletterForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

syncCartCount();
renderProducts();
renderProductDetail();
setupQuantityControls();
