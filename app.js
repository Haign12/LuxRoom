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

const pageMap = {
  home: document.querySelector("#page-home"),
  products: document.querySelector("#page-products"),
  detail: document.querySelector("#page-detail"),
};

const productGrid = document.querySelector("#product-grid");
const navLinks = document.querySelectorAll(".nav-link");
const qtyValue = document.querySelector("#qty-value");
const cartCount = document.querySelector("#cart-count");
const detailTitle = document.querySelector("#detail-title");
const detailName = document.querySelector("#detail-name");
const detailPrice = document.querySelector("#detail-price");

let quantity = 1;
let cart = 0;

function renderProducts() {
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
            <button class="secondary-button product-open" data-id="${product.id}" type="button">
              View
            </button>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".product-open").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const selected = products.find((product) => product.id === id);
      if (selected) {
        detailTitle.textContent = selected.name;
        detailName.textContent = selected.name;
        detailPrice.textContent = `$${selected.price}`;
        switchPage("detail");
      }
    });
  });
}

function switchPage(target) {
  Object.entries(pageMap).forEach(([key, page]) => {
    page.classList.toggle("active", key === target);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === target);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;
    if (target && pageMap[target]) {
      switchPage(target);
    }
  });
});

document.querySelector("#qty-minus").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  qtyValue.textContent = quantity;
});

document.querySelector("#qty-plus").addEventListener("click", () => {
  quantity += 1;
  qtyValue.textContent = quantity;
});

document.querySelector("#add-to-cart").addEventListener("click", () => {
  cart += quantity;
  cartCount.textContent = cart;
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

renderProducts();
