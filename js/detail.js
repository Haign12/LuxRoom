const productQuery = new URLSearchParams(window.location.search).get("product");
const selectedProduct = window.LuxRoom.products.find((product) => product.id === Number(productQuery)) || window.LuxRoom.products[0];
const fallbackGallery = [selectedProduct.image, "img/lux_detail_lounge_wide.jpg", "img/lux_detail_lounge_closeup.jpg"];
const selectedGallery = Array.from(new Set(selectedProduct.gallery || fallbackGallery)).slice(0, 3);
let selectedQuantity = 1;

const titleNode = document.querySelector("#detail-title");
const priceNode = document.querySelector("#detail-price");
const nameNode = document.querySelector("#detail-name");
const crumbNode = document.querySelector("#detail-crumb-name");
const descriptionNode = document.querySelector("#detail-description");
const specImage = document.querySelector("#detail-spec-image");
const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-image]"));

const productDescriptions = {
  1: "A low, generous lounge chair with a soft sculptural profile. Its quiet proportions create an easy pause in the room — refined enough to hold its own, relaxed enough to live with every day.",
  9: "A hand-finished mineral side table whose compact form gives daily objects a grounded, sculptural place to land.",
  17: "An amber glass wall sconce that casts a warm, softened glow and brings a calm evening rhythm to the room.",
};

function applyProductDetails() {
  document.title = `LuxRoom | ${selectedProduct.name}`;
  if (titleNode) titleNode.textContent = selectedProduct.name;
  if (priceNode) priceNode.textContent = `$${selectedProduct.price}`;
  if (nameNode) nameNode.textContent = selectedProduct.name;
  if (crumbNode) crumbNode.textContent = selectedProduct.name;
  if (descriptionNode) descriptionNode.textContent = productDescriptions[selectedProduct.id] || `A considered ${selectedProduct.category.toLowerCase()} selected for texture, proportion and an unhurried way of living.`;
  if (specImage) {
    specImage.style.backgroundImage = `url('./${selectedGallery[0]}')`;
    specImage.setAttribute("aria-label", `${selectedProduct.name} in a warm interior`);
  }
  galleryButtons.forEach((button, index) => {
    const image = selectedGallery[index] || selectedGallery[0];
    button.style.backgroundImage = `url('./${image}')`;
    button.setAttribute("aria-label", `View ${selectedProduct.name}, image ${index + 1}`);
    button.classList.toggle("is-selected", index === 0);
  });
}

function selectGalleryImage(index) {
  const image = selectedGallery[index] || selectedGallery[0];
  galleryButtons.forEach((button, buttonIndex) => button.classList.toggle("is-selected", buttonIndex === index));
  if (specImage) specImage.style.backgroundImage = `url('./${image}')`;
}

galleryButtons.forEach((button, index) => button.addEventListener("click", () => selectGalleryImage(index)));

document.querySelector("#qty-minus")?.addEventListener("click", () => {
  selectedQuantity = Math.max(1, selectedQuantity - 1);
  document.querySelector("#qty-value").textContent = String(selectedQuantity);
});
document.querySelector("#qty-plus")?.addEventListener("click", () => {
  selectedQuantity += 1;
  document.querySelector("#qty-value").textContent = String(selectedQuantity);
});
document.querySelector("#add-to-cart")?.addEventListener("click", () => {
  window.LuxRoom.addToCart(selectedProduct.id, selectedQuantity);
  window.LuxRoom.showToast(`Added ${selectedQuantity}× ${selectedProduct.name} to cart.`);
});
document.querySelectorAll(".acc-head").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".acc-item");
    const isOpen = item.classList.toggle("acc-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector(".acc-icon").textContent = isOpen ? "−" : "+";
  });
});

applyProductDetails();
