# LuxRoom E-commerce UX Upgrade — Implementation Notes

Date: 23/08/2026  
Source specification: `luxroom-ecommerce-ux-upgrade.md`

## Scope completed

### P0

- Real product dimensions and category-specific detail fields.
- Technical dimension visual and measure guide on PDP.
- Structured material, finish and care data.
- Variant-specific image order, price, stock state, lead time and SKU.
- PDP arrival estimate by delivery destination.
- Delivery type and destination fee shown before checkout.
- Cart persists the exact variant and estimated arrival.
- Checkout contact includes required phone number.
- Vietnam-ready address: province/city, district, ward and delivery note.
- Room delivery and room delivery + placement methods.
- Card, bank transfer/QR, VNPay and conditional made-to-order deposit choices.
- Live Review section with editable contact, address, delivery and payment data.
- Dynamic order ID, confirmation summary and delivery timeline.
- Delivery, returns, made-to-order cancellation and damage process on PDP.

### P1

- Size, availability and lead-time filters.
- Mobile filter drawer.
- Recently viewed products.
- Saved Room total, move-to-cart, share link and consultation handoff.
- Measure guide.
- Notes from Homes section.
- Order tracking page and latest order in account history.
- Functional global search across product, category, room, material, tone, collection and style.

## Data persistence

The prototype keeps device-local state in `localStorage`:

- `luxroom-cart-items`
- `luxroom-wishlist`
- `luxroom-delivery-preferences`
- `luxroom-recently-viewed`
- `luxroom-last-order`
- `luxroom-orders`

Legacy cart items from the previous `{ id, quantity }` structure are normalized into the new product + variant structure when the site loads.

## Deliberately deferred

- Product comparison.
- Shop the Room multi-select bundle.
- Full consultation intake with room photo upload.
- Automatic fit calculator.
- AR, 3D planner and AI interior design.

These remain P2/P3 so the first release improves purchase confidence without changing LuxRoom's visual direction or adding marketplace-style density.
