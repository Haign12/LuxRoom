# LuxRoom Design Contract — 2026-09-01

## 1. Project truth

- Project: LuxRoom
- Type: redesign_existing / ecommerce / furniture & home decor
- Market: Vietnam, current UI copy in English
- Stack: static HTML/CSS/vanilla JavaScript on GitHub Pages
- Current catalog: compact curated collection; product data, filtering, variants, wishlist, cart, checkout and tracking already exist in source
- Brand guideline: no official brand book found in repository
- Brand source status: **C — LOGO AVAILABLE, NO BRAND GUIDELINE**
- System reality: search/cart/wishlist/checkout/tracking are prototype/static-browser experiences; contact is simulated and must not imply a live CRM or fulfilment backend

## 2. Business goal / primary conversion

### Primary business goal
Move a design-conscious visitor from visual interest to confident product evaluation and a clear purchase/consultation action.

### Primary conversions
1. Open a product detail page from a browse/search/room path.
2. Add a selected variant to cart and continue to checkout.
3. Start a room/object consultation when product certainty is not yet sufficient.

### Secondary goals
- Build LuxRoom recognition as a curated, considered furniture brand rather than a generic marketplace.
- Reduce uncertainty around size, material, availability, delivery and placement.
- Encourage saved-room/wishlist behaviour for longer decision cycles.

## 3. Primary audiences / entry contexts / top tasks

| Audience / context | Trigger | Top task | Main question | Evidence needed | Success |
|---|---|---|---|---|---|
| Design-conscious homeowner browsing | Wants to improve a room | Discover a direction and suitable objects | What belongs in my room and style? | room imagery, categories, curated edits, price | reaches relevant PLP/PDP |
| High-intent furniture shopper | Needs a specific object | Narrow options and evaluate fit | Will this fit, arrive when needed and work with my space? | dimensions, in-scale/lifestyle images, availability, lead time, materials | confident add-to-cart |
| Returning evaluator | Comparing saved options | Re-find and compare a shortlist | Which piece is the better fit/value? | preserved wishlist/cart, variant and delivery details | resumes decision quickly |
| Consultation-oriented buyer | Larger room project / uncertainty | Get human guidance | Can LuxRoom help me compose the room? | studio point of view, response expectation, contact route | submits a consultation request |

## 4. Owner wants ↔ user wants intersection

| Owner wants to show/prove | User wants to know/do | Intersection | Website responsibility | Proof needed | CTA timing |
|---|---|---|---|---|---|
| Curated taste | Find relevant pieces without browsing noise | Curation as faster product finding | expose category, room and edit paths early | representative products + room imagery | early exploratory CTA |
| Quality / considered living | Know whether a piece works in real life | aesthetics + practical confidence | surface fit/material/delivery before commitment | dimensions, material notes, availability | before add-to-cart |
| Studio service | Get reassurance for a high-consideration purchase | consultation reduces purchase risk | offer consultation as a secondary path, not a competing primary CTA | response time, scope of help | after user encounters uncertainty |
| Distinctive brand | Recognize a point of view | visual identity supports orientation | use ownable layout grammar rather than decorative effects | room-frame motif, catalogue numbering, consistent media | across all pages |

## 5. Primary journey

`Entry → orient → choose discovery path → narrow → evaluate → reduce fit/delivery risk → choose variant → add to cart → review costs → checkout → confirmation/tracking`

Alternative branch:

`Evaluate → uncertainty remains → room/object consultation → contact confirmation`

## 6. IA + page roles

| Page | Role | Primary question | Primary CTA |
|---|---|---|---|
| index.html | orientation + curated discovery | What does LuxRoom sell, and where should I begin? | Explore collection / shop by room |
| products.html | exploration + narrowing | Which objects fit my room/material/availability needs? | Open product |
| detail.html | evaluation + decision | Will this exact object fit, arrive and work for me? | Add to cart |
| cart.html | transaction review | Is my selection and delivery total correct? | Continue to checkout |
| checkout.html | transaction | Can I complete this order with confidence? | Place/review order |
| success.html / tracking.html | confirmation + post-purchase | What happens next? | Track / continue exploring |
| wishlist.html | long-cycle evaluation | What have I saved for this room? | Re-open product / request consultation |
| about.html | trust / brand point of view | Is this curator credible and relevant to my taste? | Explore current edit |
| contact.html | assisted conversion | How do I get useful help, and when will I hear back? | Send note |
| auth.html / profile.html | utility / continuity | Can I resume my saved activity? | Sign in / manage account |

### Global navigation refinement — 2026-09-01

Detailed evidence and rationale: `docs/navigation-ia-refinement.md`.

Locked primary navigation:

`SHOP · ROOMS · OUR STORY · CONTACT`

- The LuxRoom wordmark is the Home affordance; duplicate `HOME` text navigation is retired.
- `SHOP` is the object-led axis and links to the full PLP, with Seating / Tables / Lighting / Storage / Textiles / Objects as children.
- `ROOMS` is the space-led axis and links to the existing homepage Shop-by-room hub, with Living / Dining / Bedroom / Office / Bathroom as children routed to real `products.html?room=...` filters.
- Desktop may use compact flyouts. Mobile must expose category and room children immediately in the open menu rather than requiring a nested disclosure.
- `SHOP` is active for general/category/collection/search PLP scope; `ROOMS` is active when a valid room scope is present.
- Do not add Collections / New / Journal / Trade / Sale to top-level navigation without new task/content evidence.

## 7. Preserve / change / remove / add

### Preserve
- Existing public URLs and JavaScript data/flows.
- Logo SVG and current local font assets.
- Product data including dimensions/materials/availability/lead-time/variants.
- Shop-by-room concept, curated edit, wishlist/Saved Room, cart, checkout and tracking.
- Existing editorial imagery that is already coherent with the brand direction.
- Accessibility work already present: semantic labels, live regions and reduced-motion hooks.

### Change
- Make homepage product scope and discovery paths visible sooner.
- Rebalance editorial storytelling with commerce orientation.
- Consolidate visual tokens into one canonical semantic system.
- Reduce rounded/pill/card conventions that conflict with the architectural logo geometry.
- Make PLP result count, applied filters, product facts and mobile filter/sort hierarchy clearer.
- Make PDP fit, dimension, delivery and variant evidence visually adjacent to purchase controls.
- Unify transaction/utility pages into the same brand grammar rather than generic form/card UI.

### Remove / retire
- CSS override-pile behaviour (`experience-upgrade.css`, `title-spacing.css`, `contact-hotfix.css`) from active page ownership.
- Decorative sections that repeat the same brand message without advancing a user question.
- Overuse of soft rounded containers and lift/shadow hover effects.

### Add
- Clear homepage discovery rail: category / room / current edit.
- Commerce trust strip focused on delivery, material guidance and considered returns/care.
- Consistent section labels and catalogue numbering.
- Strong focus-visible states and minimum mobile touch target rules.

## 8. Brand evidence

### Source status
**C — LOGO AVAILABLE, NO BRAND GUIDELINE**

### Evidence ledger

| Dimension | Finding | Source | Status | Confidence | UI implication |
|---|---|---|---|---|---|
| Logo geometry | nested rectangular room frames, square line caps | `img/logo/luxroom-mark.svg` | VERIFIED_FROM_OFFICIAL_ASSET | high | architectural grids, framed image crops, thin rules |
| Logo ink | `#171713` | logo SVG | VERIFIED_FROM_OFFICIAL_ASSET | high | text / dark surface anchor |
| Logo clay accent | `#956B3E` | logo SVG | VERIFIED_FROM_OFFICIAL_ASSET | high | focal marker / primary action accent, not universal fill |
| Current type assets | Newsreader + DM Sans local WOFF2 | repository | INFERRED_FROM_OFFICIAL_ASSETS | medium | retain for continuity and performance |
| Current imagery | warm interior, wood, stone, linen, soft daylight | repository | INFERRED_FROM_OFFICIAL_ASSETS | medium | preserve warm editorial art direction |
| Brand voice | quiet, considered, slow-living copy in current site | current source | INFERRED_FROM_OFFICIAL_ASSETS | medium | concise, sensory, practical; avoid luxury clichés |

## 9. Proposed brand guideline — logo-derived

### Semantic color roles

| Role | Token | Value | Status | Usage |
|---|---|---:|---|---|
| Ink | `--ink` | `#171713` | VERIFIED_FROM_OFFICIAL_ASSET | primary text, dark CTA, rules |
| Clay | `--clay` | `#956B3E` | VERIFIED_FROM_OFFICIAL_ASSET | focal accent, active state, selected filter |
| Canvas | `--canvas` | `#F4F0E8` | PROPOSED_FOR_DIGITAL | warm section background / nav field |
| Paper | `--paper` | `#FFFDFC` | PROPOSED_FOR_DIGITAL | main page and product surfaces |
| Stone | `--stone` | `#6E675E` | PROPOSED_FOR_DIGITAL | secondary text |
| Hairline | `--hairline` | `#D9D1C6` | PROPOSED_FOR_DIGITAL | borders / architectural rules |
| Moss | `--moss` | `#65705F` | INFERRED_FROM_OFFICIAL_ASSETS | low-frequency editorial secondary accent |
| Focus | `--focus` | `#2E5A88` | PROPOSED_FOR_ACCESSIBILITY | keyboard focus only |

Prohibited: using clay as background for every section; using moss for critical status; tinting the logo to fit arbitrary backgrounds.

### Typography
- Display: Newsreader, existing local asset, status `INFERRED_FROM_OFFICIAL_ASSETS`.
- UI/body: DM Sans, existing local asset, status `INFERRED_FROM_OFFICIAL_ASSETS`.
- Display type is for hierarchy, not long body copy.
- UI copy should remain 15–17px on mobile for readability; controls minimum 16px where zoom risk exists.

### Shape / depth
- Primary geometry: square/near-square, 0–4px radius.
- Lines: 1px hairlines and framed edges.
- Shadows: only for modal/overlay separation; not routine product-card hover decoration.
- Buttons: rectangular/architectural with restrained 0–2px radius; selected states may use clay rules/dots.

### Imagery
- Warm natural light, tactile close-ups, full-room context and in-scale product scenes.
- Avoid isolated white-background imagery as the only evidence for furniture scale.
- Product and room images should link directly to shoppable objects where possible.

### Motion
- Purpose: orientation, reveal, state transition.
- Low amplitude, 180–450ms; no decorative parallax required for core flow.
- Respect `prefers-reduced-motion`.

## 10. Design DNA / visual signature

### Concrete attributes
1. Architectural framing rather than floating rounded cards.
2. Warm paper/canvas surfaces with deep ink and a single clay focal point.
3. Editorial serif hierarchy paired with compact sans-serif catalogue metadata.
4. Asymmetric image-led compositions with visible product decision objects.
5. Thin-rule rhythm and numbered catalogue markers.
6. Tactile, lived-in room photography rather than sterile luxury imagery.

### Visual signatures
- **Room Frame:** nested/inset rectangular rules derived from the logo; used sparingly around key images, filters and transaction summaries.
- **Clay Point:** small clay marker/rule for active state, current scope and key CTA emphasis.
- **Object Index:** `01 / Seating`, `02 / Lighting` style metadata that creates catalogue continuity.

Logo-hidden recognition test: LuxRoom should remain recognizable through warm paper fields + architectural hairlines + Newsreader/DM Sans hierarchy + object numbering + clay focus marker.

## 11. Page-role composition matrix

| Page role | User question | Owner message | First visual anchor | Top composition | Decision object | CTA | Mobile transformation |
|---|---|---|---|---|---|---|---|
| Home / orientation | Where do I begin? | curated living, not marketplace noise | lived-in hero room + visible discovery rail | asymmetric editorial hero followed immediately by 3 find paths | category/room/current edit choices | Explore collection | hero becomes image → copy → horizontal discovery rail; no tiny overlay copy |
| PLP / narrowing | Which objects match my constraints? | a curated but usable catalogue | result scope + category index | compact intro + sticky-ish filter/sort rhythm + product grid | applied filters, availability, price, material | Open product | filter/sort become equal primary controls; drawer/stack; 2-column product grid where viable |
| PDP / evaluation | Will this fit and arrive? | considered object + service | product scene/gallery | media-led split with purchase/fit evidence visible together | dimensions, finish, availability, arrival | Add to cart | media first, then title/price/fit; sticky purchase bar after initial evidence |
| Cart / review | Is selection + total correct? | delivery is considered | item ledger | editorial heading + ledger / order summary split | quantity, variant, delivery destination, total | Checkout | summary follows items; sticky CTA only if it does not obscure edit controls |
| Contact / assisted conversion | Can someone help? | studio listens first | concise request context | intro + contact proof + clear form | help type, response time | Send note | single-column; helper information before submit |
| Story / trust | Why LuxRoom? | point of view + materials | strong editorial image | magazine-like story composition | principles + real-life rationale | Explore edit | full-bleed/stacked image-text, reduced copy |
| Utility/account | Can I resume? | continuity | clear task title | calm two-column or single-card utility layout | saved/order/account state | task-specific | one-column, large controls |

## 12. Representative composition proofs

### A. Homepage

```text
[fixed architectural nav]
[hero image 58%] [eyebrow + H1 + 2 discovery CTAs]
[category path] [shop by room] [current edit]
[best/current objects — direct product access]
[room inspiration — every image shoppable]
[material/delivery trust]
[studio consultation]
```

Mobile:

```text
[nav]
[hero image]
[H1 + primary CTA]
[horizontal discovery rail]
[2-col product edit]
[room cards]
[trust rows]
```

### B. Collection / PLP

```text
[compact page intro + result count]
[category index horizontal]
[filter + applied chips + sort]
[product grid with image / category / name / price / availability]
[editorial room insertion only if it links to products]
```

Mobile:

```text
[title + count]
[scrollable categories]
[Filter] [Sort]
[applied filters]
[2-col product grid]
```

### C. Product detail

```text
[gallery 56–60%] [object index / title / price]
                [finish]
                [dimensions + availability + delivery]
                [Add to cart]
[dimension visual + measure guide]
[materials / care / returns]
[related room objects]
```

Mobile:

```text
[gallery]
[title + price]
[key facts]
[finish]
[arrival]
[CTA]
[dimension visual]
[accordions]
[related]
[sticky purchase bar only after content starts]
```

## 13. Reference synthesis

- **HAY:** use collection/family storytelling and inspiration as a bridge into products; do not copy bright pop-color identity.
- **Muuto:** use clear category taxonomy and product-family structure; do not copy B2B/professional density.
- **Ferm Living:** use room universe / shop-by-room as a discovery path and combine editorial room context with real products; do not copy its much larger catalog hierarchy.
- **Audo Copenhagen:** use availability/lead-time/material filters and rich variation cues; do not copy dense filter taxonomy that exceeds LuxRoom data.
- **Design Within Reach:** use useful product-card variation/price information; do not copy promotion-heavy merchandising.
- **Baymard research:** homepage must support category/search/curated finding; furniture PDP must support dimension/scale confidence and delivery clarity.

## 14. Mobile transformation rules

- Do not simply stack desktop sections unchanged.
- Navigation becomes explicit menu with 44px targets; search/cart remain available.
- Hero text must never rely on image contrast overlays.
- Product discovery rails can scroll horizontally; primary category labels remain readable without truncation.
- PLP filtering and sorting are peer controls, not hidden behind tiny icons.
- Product cards show name + price + one useful status; hover-only details must have touch equivalents.
- PDP key facts appear before long editorial copy; dimensions and arrival remain reachable before commitment.
- Forms use single column and 48px+ controls.

## 15. System reality

- Search: `REAL` within static client-side product dataset.
- Product filtering/sorting: `REAL` within static dataset.
- Cart/wishlist/recently viewed: `REAL` in browser storage.
- Checkout/payment: `SIMULATED/PARTIAL`; must not claim captured real payment.
- Contact: `SIMULATED`; success copy must say request is prepared/received in prototype terms, not guarantee backend delivery.
- Tracking: `STATIC/SIMULATED` using stored mock order state.

## 16. Visible redesign delta

| Current visible problem | New behaviour | Expected visible delta | Verification |
|---|---|---|---|
| Homepage reads as editorial story before product-finding | discovery paths appear directly after/within hero | visitor understands what/how to shop in first 1–2 viewports | desktop/mobile screenshot review |
| Generic pill/card/shadow remnants across utility pages | architectural frame/hairline system | brand feels coherent across commerce + utility pages | cross-page contact sheet |
| Multiple token/override owners | canonical semantic tokens + route owners | fewer visual inconsistencies | source audit |
| PLP filter density competes with products | clearer result/filter hierarchy | more product-first scanning | mobile/desktop PLP review |
| PDP practical evidence can feel secondary to editorial layout | fit/delivery/availability visually tied to buy section | confidence information is visible before CTA commitment | PDP screenshot + task walkthrough |

## 17. DO / DO NOT

### DO
- Preserve quiet luxury through proportion, type, material imagery and whitespace.
- Make product finding visible early.
- Use 1px frames/rules and square geometry.
- Use clay as focal emphasis, not wallpaper.
- Keep product data and practical proof close to the buying decision.
- Make inspiration shoppable.
- Keep mobile controls explicit and large.

### DO NOT
- Do not use one universal hero for every page.
- Do not add glassmorphism, neon gradients or oversized rounded pills because they are trendy.
- Do not hide price, availability or delivery until checkout.
- Do not use fake scarcity, fake reviews or fake live stock.
- Do not append another global hotfix stylesheet as the redesign strategy.
- Do not turn every section into centered heading + 3 cards.

## 18. Visual acceptance conditions

- Homepage, PLP and PDP must be visibly different page compositions while sharing the same visual grammar.
- Brand remains recognizable without logo through architectural frame + catalogue index + warm paper + clay focal point.
- All primary pages must render with stable logo/nav/CTA contrast on desktop and mobile.
- PLP has clear current scope, count, applied filters, sort and product information.
- PDP shows dimensions, availability and arrival before/adjacent to add-to-cart.
- Cart/checkout/contact/account pages visually belong to LuxRoom, not generic form templates.
- No active `experience-upgrade.css`, `title-spacing.css` or `contact-hotfix.css` dependency after rollout.
- No P0/P1 focus, touch-target, overflow or reduced-motion issue in inspected breakpoints.
