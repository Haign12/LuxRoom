const wishlistGrid = document.querySelector("#wishlist-grid");
const wishlistEmpty = document.querySelector("#wishlist-empty");
const wishlistTotal = document.querySelector("[data-wishlist-total]");
const moveAllButton = document.querySelector("#move-all-to-cart");

const heights = [400, 320, 240, 280, 480, 260, 360, 440];

function renderWishlist() {
  const ids = window.LuxRoom.wishlistItems;
  const products = ids.map((id) => window.LuxRoom.products.find((p) => p.id === id)).filter(Boolean);

  if (wishlistTotal) wishlistTotal.textContent = String(products.length);
  if (moveAllButton) moveAllButton.disabled = products.length === 0;

  if (products.length === 0) {
    if (wishlistGrid) wishlistGrid.innerHTML = "";
    if (wishlistEmpty) wishlistEmpty.style.display = "block";
    return;
  }

  if (wishlistEmpty) wishlistEmpty.style.display = "none";
  if (!wishlistGrid) return;

  wishlistGrid.innerHTML = products
    .map(
      (product, index) => `
    <article class="product-card" style="animation-delay: ${index * 0.05}s">
      <div class="product-card-inner">
        <a href="./detail.html?product=${product.id}" class="product-thumb ${product.tone}" style="height: ${heights[index % heights.length]}px;"></a>
        <div class="product-info-wrapper">
          <div class="product-meta-row">
            <h3>${product.name}</h3>
            <span class="price">$${product.price}</span>
          </div>
          <div class="product-actions-row">
            <button class="move-to-cart-action" onclick="window.wishlistMoveToCart(${product.id})" type="button">
              Move to cart <span aria-hidden="true">↗</span>
            </button>
            <button class="remove-wishlist-action" data-remove-wishlist="${product.id}" onclick="window.wishlistRemove(${product.id})" type="button" aria-label="Remove from wishlist">
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

window.wishlistRemove = function(productId) {
  window.toggleWishlist(productId);
};

window.wishlistMoveToCart = function(productId) {
  window.LuxRoom.addToCart(productId, 1);
  window.toggleWishlist(productId);
};

window.wishlistMoveAllToCart = function() {
  const ids = window.LuxRoom.wishlistItems.slice();
  for (const id of ids) {
    window.LuxRoom.addToCart(id, 1);
    window.toggleWishlist(id);
  }
};

if (moveAllButton) {
  moveAllButton.addEventListener("click", window.wishlistMoveAllToCart);
}

window.addEventListener("wishlist-updated", renderWishlist);
renderWishlist();
