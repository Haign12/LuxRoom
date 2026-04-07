const productGrid = document.querySelector("#product-grid");

function renderProducts() {
  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = window.LuxRoom.products
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

renderProducts();
