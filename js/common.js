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

let cart = Number(localStorage.getItem("luxroom-cart-count") || 0);

function syncCartCount() {
  cartCountNodes.forEach((node) => {
    node.textContent = String(cart);
  });
}

function addToCart(quantity) {
  cart += quantity;
  localStorage.setItem("luxroom-cart-count", String(cart));
  syncCartCount();
}

newsletterForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

syncCartCount();

window.LuxRoom = {
  products,
  addToCart,
};
