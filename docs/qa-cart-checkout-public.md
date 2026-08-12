# QA — Cart & Checkout on Public Build

## Cart (ngh1aa.github.io/LuxRoom/cart.html)

The public Cart renders the intended sharp editorial system. The hero uses the Newsreader oversized headline "The room, in progress." with clay eyebrow and a right-aligned deck paragraph, matching the site-wide editorial split. The ledger columns (OBJECT / QUANTITY / TOTAL) use hairline rules and wide mineral-white spacing. The right-hand order summary panel shows "Your edit" with serif heading, hairline rows, a square-cornered dark CTA, and the delivery note. A bottom "Considered delivery" band with "SPEAK WITH US" outline button closes the page in the same voice as other sections. Cart badge, search, and account links in the topbar are functional and square-styled. Empty-cart state behaves correctly with "$0" totals.

Verdict: Cart is on-style; no structural defects observed.

## Checkout (ngh1aa.github.io/LuxRoom/checkout.html)

The public Checkout page carries the same editorial system as Cart. The hero headline "Bring the room home." uses the oversized serif with italic emphasis, the step headers (01 / Delivery, 02 / Payment) are numbered editorial sections, and form fields render as sharp underline-style inputs with hairline rules. The right-hand "Your edit" order ledger mirrors the Cart summary panel with serif heading, hairline rows and a square "Place order ↗" button. Navigation labels, cart badge and footer columns are consistent with the rest of the site. Transaction simulation disclaimer is present.

Verdict: Checkout is on-style; no structural defects observed.

## Wishlist plan

Create `wishlist.html` with `css/wishlist.css` and a `js/wishlist.js` runtime (localStorage persistence, heart toggle integration with `js/common.js` runtime, empty state, share/save CTA). Register a wishlist link in the topbar on all pages and footer navigation.

## Collection advanced filters

Extend `js/products.js` with color chips (Olive green, Cream, Charcoal, Terracotta, Natural oak) and material chips (Textile, Oak & ash, Stoneware, Stone) rendered in the REFINE THE EDIT panel, AND-logic combined with the existing Room/Material/Investment filters and pagination.
