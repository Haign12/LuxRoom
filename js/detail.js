const productCatalog = window.LuxRoom?.products || [];
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("product")) || 1;
const selectedProduct = productCatalog.find((product) => product.id === productId) || productCatalog[0];

let quantity = 1;

function renderProductDetail() {
  if (!selectedProduct) return;

  const title = document.querySelector("#detail-title");
  const productName = document.querySelector("#detail-name");
  const crumbName = document.querySelector("#detail-crumb-name");
  const price = document.querySelector("#detail-price");

  if (title) title.textContent = selectedProduct.name;
  if (productName) productName.textContent = selectedProduct.name;
  if (crumbName) crumbName.textContent = selectedProduct.name;
  if (price) price.textContent = `$${selectedProduct.price}`;
  document.title = `LuxRoom | ${selectedProduct.name}`;
}

function setupGallery() {
  const galleryItems = document.querySelectorAll("[data-gallery-image]");
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      galleryItems.forEach((galleryItem) => galleryItem.classList.remove("is-selected"));
      item.classList.add("is-selected");
    });
  });
}

function setupFinishes() {
  const finishes = document.querySelectorAll(".finish-option");
  finishes.forEach((finish) => {
    finish.addEventListener("click", () => {
      finishes.forEach((option) => {
        option.classList.remove("active");
        option.setAttribute("aria-pressed", "false");
      });
      finish.classList.add("active");
      finish.setAttribute("aria-pressed", "true");
    });
  });
}

function setupQuantityControls() {
  const quantityValue = document.querySelector("#qty-value");
  const quantityMinus = document.querySelector("#qty-minus");
  const quantityPlus = document.querySelector("#qty-plus");
  const addToCartButton = document.querySelector("#add-to-cart");

  if (!quantityValue || !quantityMinus || !quantityPlus || !addToCartButton || !selectedProduct) return;

  const updateQuantity = () => {
    quantityValue.textContent = String(quantity);
  };

  quantityMinus.addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateQuantity();
  });

  quantityPlus.addEventListener("click", () => {
    quantity += 1;
    updateQuantity();
  });

  addToCartButton.addEventListener("click", () => {
    window.LuxRoom.addToCart(selectedProduct.id, quantity);
    window.LuxRoom.showToast(`Added ${quantity} × ${selectedProduct.name} to your cart.`);
  });

  updateQuantity();
}

function setupAccordions() {
  const accordions = document.querySelectorAll(".acc-item");
  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".acc-head");
    const icon = accordion.querySelector(".acc-icon");
    if (!trigger || !icon) return;

    trigger.addEventListener("click", () => {
      const wasOpen = accordion.classList.contains("acc-open");
      accordions.forEach((item) => {
        item.classList.remove("acc-open");
        const itemTrigger = item.querySelector(".acc-head");
        const itemIcon = item.querySelector(".acc-icon");
        if (itemTrigger) itemTrigger.setAttribute("aria-expanded", "false");
        if (itemIcon) itemIcon.textContent = "+";
      });

      if (!wasOpen) {
        accordion.classList.add("acc-open");
        trigger.setAttribute("aria-expanded", "true");
        icon.textContent = "−";
      }
    });
  });
}

renderProductDetail();
setupGallery();
setupFinishes();
setupQuantityControls();
setupAccordions();
