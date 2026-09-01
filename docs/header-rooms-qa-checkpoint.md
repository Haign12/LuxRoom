# Header / Rooms navigation QA checkpoint

Date: 2026-09-01
Scope: global primary navigation refinement

## FINAL RESULT: PASSED — branch representative scope

The final branch gate used actual Chromium renders from the Visual QA workflow, not source/build status as a substitute.

## Rendered issues caught and remediated before merge

### NAV-P1-01 — mobile child links clipped by desktop expanded transform

- Severity: P1
- State: mobile menu open at 390px
- Before evidence: the first branch render exposed only even-numbered Shop and Rooms child links because the desktop expanded-state transform retained higher specificity on the flattened mobile flyout.
- Expected: every real product-category and room link is directly visible/accessible in the mobile navigation.
- Root owner: `css/experience-upgrade.css` shared discovery flyout responsive state.
- Fix: explicitly neutralized the flyout transform in the mobile owner with sufficient priority while keeping the compact direct two-column child-link layout.
- After evidence: final rendered evidence shows all six Shop links and all five Rooms links with no horizontal overflow.

### NAV-P1-02 — current room scope not distinguishable inside mobile menu

- Severity: P1 contract mismatch
- State: `products.html?room=Living`, mobile menu open at 390px
- Before evidence: desktop correctly underlined `ROOMS`, but the shared mobile-menu rule suppressed all primary-nav active indicators, making `SHOP` and `ROOMS` look equivalent.
- Expected: current product-finding scope remains visually identifiable on mobile as well as desktop.
- Root owner: `css/experience-upgrade.css` shared discovery-nav mobile state.
- Fix: restored a short black active rule plus stronger text weight specifically for the active Shop/Rooms parent inside the mobile menu; this does not rely on color alone.
- After evidence: final room-scoped mobile render visibly marks `ROOMS` while preserving all child links.

## Final rendered evidence inspected

- Home desktop top
- Home desktop Shop open
- Home desktop Rooms open
- Home desktop Search open
- Collection / room scope desktop
- Home mobile menu open
- Collection / room scope mobile menu open
- Cross-page desktop/mobile contact sheets
- Runtime report across 31 captures

## Final gate result

Verified from the final artifact:
- desktop primary nav is `SHOP · ROOMS · OUR STORY · CONTACT`; duplicate Home text item is gone;
- LuxRoom wordmark remains the Home affordance;
- Shop flyout shows all six categories;
- Rooms flyout shows all five rooms;
- room-scoped PLP marks Rooms, not Shop, as the active primary scope;
- room-scoped mobile menu exposes a visible Rooms active indicator;
- mobile menu exposes all six Shop children and all five Rooms children;
- runtime report found no horizontal overflow in captured states;
- search/cart/header spacing remain intact in inspected representative states.

Known pre-existing diagnostic note: Contact desktop still reports one generic console 404 without a response-level failed URL, with no visible/task regression. This is the same P3 diagnostic noise already documented by the site-wide Final QA and is unrelated to the navigation change.
