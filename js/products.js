const productGrid = document.querySelector("#product-grid");

function renderProducts() {
  if (!productGrid) {
    return;
  }

  const heights = [400, 320, 240, 280, 480, 260, 360, 440, 220, 300, 380, 340];

  productGrid.innerHTML = window.LuxRoom.products
    .map(
      (product, index) => `
        <article class="product-card" style="animation-delay: ${index * 0.05}s">
          <a href="./detail.html?product=${product.id}" class="product-thumb ${product.tone}" style="height: ${heights[index % heights.length]}px;">
            <button class="add-to-cart-overlay" onclick="event.preventDefault(); window.LuxRoom.addToCart(${product.id}, 1); alert('Added to cart!');">Add to cart</button>
          </a>
          <div class="product-meta-row">
            <h3>${product.name}</h3>
            <span class="price">$${product.price}</span>
          </div>
        </article>
      `,
    )
    .join("");
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
