# LuxRoom Header Navigation IA Refinement

Date: 2026-09-01
Scope: shared primary navigation only
Status: RESEARCH / DESIGN-CONTRACT ADDENDUM — no code decision is allowed to override this without new evidence.

## Prompt / skill routing used

- MASTER PRE-DESIGN RESEARCH PROMPT V3.0 — lock the IA decision before code.
- `audience-intent-and-top-tasks` — prioritize product-finding tasks over page-name symmetry.
- `information-architecture` — labels by user mental model; avoid unnecessary intermediary layers.
- `journey-driven-content-and-layout` — navigation should move users from orientation into the next discovery decision.
- `ecommerce-website` — preserve discover → browse/search → narrow → evaluate.
- `interaction-patterns-and-form-ux` — clear active scope and no deep menu nesting on mobile.
- `responsive-and-device-strategy` — desktop and mobile navigation are separate composition decisions.

## Project truth

- LuxRoom is a compact curated furniture catalogue, not a department-store-scale taxonomy.
- The logo already links to `index.html`, so a second primary `HOME` text link duplicates the same destination.
- `products.html` already supports real URL-backed room filtering for `Living`, `Dining`, `Bedroom`, `Bathroom`, and `Office`.
- The homepage already contains a real `Shop by room` section with the same five room paths.
- Product-type discovery already exists through `Seating`, `Tables`, `Lighting`, `Storage`, `Textiles`, and `Objects`.

## External research synthesis

### Baymard — homepage/category navigation UX (2025)
Source: https://baymard.com/blog/ecommerce-navigation-best-practice

Transfer principles:
- Main navigation is a key product-finding mechanism.
- Current scope should be visibly highlighted.
- Dropdowns become overwhelming when too many subcategory options are presented; LuxRoom should keep each discovery group compact.
- Parent navigation headers should remain useful/clickable rather than being shallow labels only.

### Baymard — mobile product categories
Source: https://baymard.com/blog/main-navigation-product-categories

Transfer principle:
- On mobile, product categories should be exposed immediately when the main menu opens rather than hidden behind another nested `Shop` interaction.

### Baymard — overcategorization
Source: https://baymard.com/blog/ecommerce-over-categorization

Transfer principle:
- Do not create extra intermediary pages/categories where filters and existing catalogue views already satisfy the task.

### Current furniture-market examples
- West Elm currently exposes `Shop by Room` including Living Room, Bedroom, Dining Room, Home Office, Bathroom and other spaces: https://www.westelm.com/
- Crate & Barrel currently operates a dedicated `Shop by Room` discovery path with Living Room, Bedroom, Dining Room, Office / Workspace and other room filters: https://www.crateandbarrel.com/shop-by-room

Use these as category-behavior evidence only; do not copy their visual identity or mega-menu density.

## Owner wants ↔ user wants

| Owner wants | User wants | Intersection | Navigation responsibility |
|---|---|---|---|
| Present LuxRoom as curated, calm and premium | Find products without marketplace noise | Fewer but stronger discovery axes | Keep the primary nav compact |
| Promote the catalogue | Browse by known object type | Object-led product finding | `SHOP` + category flyout |
| Sell a room point of view | Start from the space being furnished | Space-led product finding | `ROOMS` + room flyout |
| Retain brand/story/service trust | Understand brand and get help | Secondary decision support | Keep `OUR STORY` and `CONTACT` |

## Locked desktop navigation

`SHOP · ROOMS · OUR STORY · CONTACT`

Logo/wordmark remains the Home route.

### SHOP
Parent destination: `products.html`

Children:
1. Seating
2. Tables
3. Lighting
4. Storage
5. Textiles
6. Objects

### ROOMS
Parent destination: homepage `Shop by room` hub (`index.html#room-edit-title`).

Children:
1. Living
2. Dining
3. Bedroom
4. Office
5. Bathroom

Each child routes directly to the existing real PLP room filter, e.g. `products.html?room=Living`.

## Mobile transformation

Do not reproduce the desktop hover dependency.

When the mobile menu opens:
- show the `SHOP` parent followed immediately by its six product categories;
- show the `ROOMS` parent followed immediately by its five room paths;
- keep `OUR STORY` and `CONTACT` visibly separated as secondary navigation;
- keep all touch targets at least 44px;
- no second tap is required merely to reveal product categories;
- current scope remains visually identifiable.

## Active-state contract

- `products.html` with no `room` parameter → `SHOP` active.
- `products.html?category=...`, `?collection=...`, or `?search=...` → `SHOP` active unless a room scope is also present.
- `products.html?room=...` → `ROOMS` active and `SHOP` inactive.
- Home has no text-nav active item because the wordmark is the Home affordance.
- `about.html` and `contact.html` preserve their existing active states.

## Preserve / do not add

Preserve:
- existing URLs;
- existing room/category PLP filters;
- current logo-as-home behavior;
- search/cart/wishlist/account utilities;
- current Quiet Architectural Commerce visual grammar.

Do not add now:
- `HOME` as a duplicate text link;
- `COLLECTIONS`, `NEW`, `JOURNAL`, `TRADE`, or `SALE` as top-level items without new content/task evidence;
- a new `rooms.html` intermediary page for the current compact catalogue;
- a desktop mega-menu copied into mobile as nested hover/dropdown behavior.

## Acceptance conditions

The implementation may proceed to Prompt 2 only if:
- desktop shows exactly four primary text labels: `SHOP`, `ROOMS`, `OUR STORY`, `CONTACT`;
- both object-led and room-led routes are real and clickable;
- mobile exposes category/room links without extra nested disclosure;
- `ROOMS` is active on a room-scoped PLP;
- keyboard can enter/exit desktop flyouts and Escape returns focus;
- no visual regression is introduced in logo, search, cart or header spacing.
