const productGrid = document.querySelector("#product-grid");

const itemsPerPage = 8;
let currentPage = 1;
const paginationContainer = document.querySelector("#pagination-container");

window.setPage = function(page) {
  currentPage = page;
  renderProducts();
  // Scroll slightly up to the grid top
  const gridOffset = document.querySelector(".filter-toolbar").offsetTop - 100;
  window.scrollTo({ top: gridOffset, behavior: 'smooth' });
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  const totalItems = window.LuxRoom.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = window.LuxRoom.products.slice(startIndex, endIndex);

  // Maintain masonry staggered heights look based on full index
  const heights = [400, 320, 240, 280, 480, 260, 360, 440, 220, 300, 380, 340];

  productGrid.innerHTML = currentProducts
    .map(
      (product, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s">
          <div class="product-card-inner">
            <a href="./detail.html?product=${product.id}" class="product-thumb ${product.tone}" style="height: ${heights[(startIndex + index) % heights.length]}px;">
            </a>
            <div class="product-info-wrapper">
              <div class="product-meta-row">
                <h3>${product.name}</h3>
                <span class="price">$${product.price}</span>
              </div>
              <button class="add-to-cart-action" onclick="event.preventDefault(); window.LuxRoom.addToCart(${product.id}, 1); window.LuxRoom.showToast('Added 1x ${product.name} to cart!');">
                + Add to Cart
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  if (!paginationContainer) return;
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';
  
  // Prev button
  html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="window.setPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
  </button>`;

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.setPage(${i})">${i}</button>`;
  }

  // Next button
  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="window.setPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
  </button>`;

  paginationContainer.innerHTML = html;
}

const filterToggle = document.querySelector(".filter-toggle");
const expandedFilters = document.querySelector(".expanded-filters");

if (filterToggle && expandedFilters) {
  expandedFilters.classList.add("show");
  filterToggle.addEventListener("click", () => {
    expandedFilters.classList.toggle("show");
  });
}

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

    // Enforce gap
    if (maxVal - minVal < minGap) {
      if (e && e.target.classList.contains("range-min")) {
        rangeMin.value = maxVal - minGap;
        minVal = parseInt(rangeMin.value);
      } else {
        rangeMax.value = minVal + minGap;
        maxVal = parseInt(rangeMax.value);
      }
    }

    priceMinVal.textContent = `$${minVal}`;
    priceMaxVal.textContent = `$${maxVal}`;

    const percentMin = (minVal / rangeMin.max) * 100;
    const percentMax = 100 - (maxVal / rangeMax.max) * 100;

    priceFill.style.left = percentMin + "%";
    priceFill.style.right = percentMax + "%";
  };

  rangeMin.addEventListener("input", updateSlider);
  rangeMax.addEventListener("input", updateSlider);
  
  // Initialize slider layout
  updateSlider();
}

// Render dynamic DOM
renderProducts();
