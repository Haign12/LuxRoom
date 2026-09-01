# Header / Rooms navigation QA checkpoint

Date: 2026-09-01
Scope: global primary navigation refinement

## Rendered issues caught before merge

### NAV-P1-01 — mobile child links clipped by desktop expanded transform

- Severity: P1
- State: mobile menu open at 390px
- Before evidence: the first branch render exposed only even-numbered Shop and Rooms child links because the desktop expanded-state transform retained higher specificity on the flattened mobile flyout.
- Expected: every real product-category and room link is directly visible/accessible in the mobile navigation.
- Root owner: `css/experience-upgrade.css` shared discovery flyout responsive state.
- Fix: explicitly neutralized the flyout transform in the mobile owner with sufficient priority while keeping the compact direct two-column child-link layout.
- After evidence: the second rendered artifact shows all six Shop links and all five Rooms links with no horizontal overflow.

### NAV-P1-02 — current room scope not distinguishable inside mobile menu

- Severity: P1 contract mismatch
- State: `products.html?room=Living`, mobile menu open at 390px
- Before evidence: desktop correctly underlined `ROOMS`, but the shared mobile-menu rule suppressed all primary-nav active indicators, making `SHOP` and `ROOMS` look equivalent.
- Expected: current product-finding scope remains visually identifiable on mobile as well as desktop.
- Root owner: `css/experience-upgrade.css` shared discovery-nav mobile state.
- Fix: restore a short black active rule plus stronger text weight specifically for the active Shop/Rooms parent inside the mobile menu; this does not rely on color alone.
- Verification status: re-render required after this checkpoint commit. Do not merge on source evidence alone.

## Regression evidence

`qa/capture.mjs` includes:
- `home-desktop-shop`
- `home-desktop-rooms`
- `home-desktop-search`
- `home-mobile-menu`
- `collection-room-desktop`
- `collection-room-mobile-menu`

## Final gate for this change

PASS only after the new Chromium artifact confirms:
- desktop: `SHOP · ROOMS · OUR STORY · CONTACT`, no duplicate Home text item;
- Shop flyout shows all six categories;
- Rooms flyout shows all five rooms;
- room-scoped PLP marks Rooms, not Shop, as the active primary scope;
- room-scoped mobile menu also exposes a visible Rooms active indicator;
- mobile menu exposes all six Shop children and all five Rooms children without horizontal overflow;
- search/cart/header spacing remain intact.
