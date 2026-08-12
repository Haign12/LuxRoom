const productGrid = document.querySelector("#product-grid");

const itemsPerPage = 8;
let currentPage = 1;
const paginationContainer = document.querySelector("#pagination-container");

// Active filter state (room, material group, color, material surface, price range)
const activeFilters = {
  room: null,
  materialGroup: null,
  colors: new Set(),
  materials: new Set(),
  priceMin: 200,
  priceMax: 1200,
};

const colorSwatches = {
  "Olive green": "#6a7458",
  "Cream": "#e8e0d4",
  "Charcoal": "#45474a",
  "Terracotta": "#b3644a",
  "Natural oak": "#b99a76",
};

const materialSurfaces = ["Textile", "Oak & ash", "Stoneware", "Stone"];

window.setPage = function(page) {
  currentPage = page;
  renderProducts();
  const gridOffset = document.querySelector(".filter-toolbar").offsetTop - 100;
  window.scrollTo({ top: gridOffset, behavior: 'smooth' });
}

function productMatchesFilters(product) {
  if (activeFilters.room && product.room !== activeFilters.room) return false;
  if (activeFilters.materialGroup && product.materialGroup !== activeFilters.materialGroup) return false;
  if (activeFilters.colors.size > 0 && !Array.from(activeFilters.colors).some((c) => product.colors.includes(c))) return false;
  if (activeFilters.materials.size > 0 && !Array.from(activeFilters.materials).some((m) => product.materials.includes(m))) return false;
  if (product.price < activeFilters.priceMin || product.price > activeFilters.priceMax) return false;
  return true;
}

function getFilteredProducts() {
  return window.LuxRoom.products.filter(productMatchesFilters);
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  const filtered = getFilteredProducts();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages) currentPage = totalPages || 1;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const heights = [400, 320, 240, 280, 480, 260, 360, 440, 220, 300, 380, 340];

  if (totalItems === 0) {
    productGrid.innerHTML =
      '<div class="empty-results"><p class="eyebrow">The current selection</p><h2>A quieter edit for now.</h2><p>No objects match this combination. Loosen a filter and the room will open up again.</p><button class="clear-filters-btn" onclick="window.clearFilters()" type="button">Reset the edit <span aria-hidden="true">↗</span></button></div>';
  } else {
    productGrid.innerHTML = currentProducts
      .map(
        (product, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s">
          <div class="product-card-inner">
            <a href="./detail.html?product=${product.id}" class="product-thumb ${product.tone}" style="height: ${heights[(startIndex + index) % heights.length]}px;">
              <span class="wishlist-heart ${window.LuxRoom.isWishlisted(product.id) ? 'is-wishlisted' : ''}" data-wishlist="${product.id}" aria-label="Save to wishlist" role="button" tabindex="0"></span>
            </a>
            <div class="product-info-wrapper">
              <div class="product-meta-row">
                <h3>${product.name}</h3>
                <span class="price">$${product.price}</span>
              </div>
              <div class="product-actions-row">
                <button class="add-to-cart-action" onclick="event.preventDefault(); window.LuxRoom.addToCart(${product.id}, 1); window.LuxRoom.showToast('Added 1x ${product.name} to cart!');">
                  + Add to Cart
                </button>
                <button class="wishlist-action ${window.LuxRoom.isWishlisted(product.id) ? 'is-wishlisted' : ''}" data-wishlist="${product.id}" aria-label="Wishlist">
                  <span aria-hidden="true">♡</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `,
      )
      .join("");
  }

  renderPagination(totalPages);
  syncActiveFilterChips();
}

function renderPagination(totalPages) {
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';

  html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="window.setPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
  </button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.setPage(${i})">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="window.setPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
  </button>`;

  paginationContainer.innerHTML = html;
}

function syncActiveFilterChips() {
  const toolbar = document.querySelector(".active-filters");
  if (!toolbar) return;
  const parts = [];
  if (activeFilters.room) parts.push(activeFilters.room);
  activeFilters.colors.forEach((c) => parts.push(c));
  activeFilters.materials.forEach((m) => parts.push(m));
  if (activeFilters.priceMin > 0 || activeFilters.priceMax < 2000) {
    parts.push(`$${activeFilters.priceMin} — $${activeFilters.priceMax}`);
  }
  toolbar.innerHTML =
    parts.length === 0
      ? '<span class="active-chip empty-chip">All objects</span>'
      : parts.map((p) => `<span class="active-chip">${p}</span>`).join('') +
        (parts.length > 0 ? '<button class="clear-filters-chip" onclick="window.clearFilters()" aria-label="Clear filters">Clear ↗</button>' : '');
}

window.clearFilters = function() {
  activeFilters.room = null;
  activeFilters.materialGroup = null;
  activeFilters.colors.clear();
  activeFilters.materials.clear();
  activeFilters.priceMin = 200;
  activeFilters.priceMax = 1200;
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  if (rangeMin) rangeMin.value = 200;
  if (rangeMax) rangeMax.value = 1200;
  const priceMinVal = document.querySelector("#price-min-val");
  const priceMaxVal = document.querySelector("#price-max-val");
  if (priceMinVal) priceMinVal.textContent = "$200";
  if (priceMaxVal) priceMaxVal.textContent = "$1200";
  document.querySelectorAll(".filter-list li").forEach((li) => li.classList.remove("active"));
  document.querySelectorAll(".filter-list li:first-child").forEach((li) => li.classList.add("active"));
  document.querySelectorAll(".chip.is-selected").forEach((chip) => chip.classList.remove("is-selected"));
  renderProducts();
};

const filterToggle = document.querySelector(".filter-toggle");
const expandedFilters = document.querySelector(".expanded-filters");

if (filterToggle && expandedFilters) {
  expandedFilters.classList.add("show");
  filterToggle.addEventListener("click", () => {
    expandedFilters.classList.toggle("show");
  });
}

// List-based filters (Room / Material group)
document.querySelectorAll(".filter-list li").forEach((li) => {
  li.addEventListener("click", () => {
    const group = li.closest(".filter-col");
    const eyebrow = group.querySelector(".eyebrow");
    group.querySelectorAll("li").forEach((sibling) => sibling.classList.remove("active"));
    li.classList.add("active");
    const label = li.textContent.trim();
    if (eyebrow && eyebrow.textContent.trim().toLowerCase() === "room") {
      activeFilters.room = label === "Every room" ? null : label;
    }
    if (eyebrow && eyebrow.textContent.trim().toLowerCase() === "material") {
      activeFilters.materialGroup = label === "All materials" ? null : label;
    }
    currentPage = 1;
    renderProducts();
  });
});

// Color chips
document.querySelectorAll(".color-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const color = chip.dataset.color;
    chip.classList.toggle("is-selected");
    if (chip.classList.contains("is-selected")) {
      activeFilters.colors.add(color);
    } else {
      activeFilters.colors.delete(color);
    }
    currentPage = 1;
    renderProducts();
  });
});

// Material surface chips
document.querySelectorAll(".material-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const material = chip.dataset.material;
    chip.classList.toggle("is-selected");
    if (chip.classList.contains("is-selected")) {
      activeFilters.materials.add(material);
    } else {
      activeFilters.materials.delete(material);
    }
    currentPage = 1;
    renderProducts();
  });
});

// Dual Range Slider Logic
const rangeMin = document.querySelector(".range-min");
const rangeMax = document.querySelector(".range-max");
const priceFill = document.querySelector("#price-fill");
const priceMinVal = document.querySelector("#price-min-val");
const priceMaxVal = document.querySelector("#price-max-val");

if (rangeMin && rangeMax) {
  const minGap = 50;

  const updateSlider = (e) => {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);

    if (maxVal - minVal < minGap) {
      if (e && e.target.classList.contains("range-min")) {
        rangeMin.value = maxVal - minGap;
        minVal = parseInt(rangeMin.value);
      } else {
        rangeMax.value = minVal + minGap;
        maxVal = parseInt(rangeMax.value);
      }
    }

    activeFilters.priceMin = minVal;
    activeFilters.priceMax = maxVal;

    priceMinVal.textContent = `$${minVal}`;
    priceMaxVal.textContent = `$${maxVal}`;

    const percentMin = (minVal / rangeMin.max) * 100;
    const percentMax = 100 - (maxVal / rangeMax.max) * 100;

    priceFill.style.left = percentMin + "%";
    priceFill.style.right = percentMax + "%";

    currentPage = 1;
    renderProducts();
  };

  rangeMin.addEventListener("input", updateSlider);
  rangeMax.addEventListener("input", updateSlider);

  updateSlider();
}

// Wishlist heart on the product thumb
productGrid.addEventListener("click", (event) => {
  const heart = event.target.closest(".wishlist-heart[data-wishlist]");
  if (!heart) return;
  event.preventDefault();
  event.stopPropagation();
  window.toggleWishlist(Number(heart.dataset.wishlist));
});

// Wishlist action button in the card actions row
productGrid.addEventListener("click", (event) => {
  const action = event.target.closest(".wishlist-action");
  if (!action) return;
  event.preventDefault();
  event.stopPropagation();
  window.toggleWishlist(Number(action.dataset.wishlist));
});

// Wishlist integration: persist state and sync hearts after render
window.LuxRoom.refreshWishlistState = function() {
  document.querySelectorAll("[data-wishlist]").forEach((control) => {
    const id = Number(control.dataset.wishlist);
    const wishlisted = window.LuxRoom.isWishlisted(id);
    control.classList.toggle("is-wishlisted", wishlisted);
    control.setAttribute("aria-pressed", String(wishlisted));
  });
  const wishlistCountNodes = document.querySelectorAll("[data-wishlist-count]");
  if (wishlistCountNodes.length > 0) {
    const count = window.LuxRoom.wishlistItems.length;
    wishlistCountNodes.forEach((node) => {
      node.textContent = String(count);
      node.style.display = count > 0 ? "flex" : "none";
    });
  }
};

renderProducts();
window.addEventListener("wishlist-updated", window.LuxRoom.refreshWishlistState);
if (window.LuxRoom.refreshWishlistState) window.LuxRoom.refreshWishlistState();
