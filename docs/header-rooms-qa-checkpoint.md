# Header / Rooms navigation QA checkpoint

Date: 2026-09-01
Scope: global primary navigation refinement

## Rendered issue caught before merge

- ID: NAV-P1-01
- Severity: P1
- State: mobile menu open at 390px
- Before evidence: the first branch render exposed only even-numbered Shop and Rooms child links because the desktop expanded-state transform retained higher specificity on the flattened mobile flyout.
- Expected: every real product-category and room link is directly visible/accessible in the mobile navigation.
- Root owner: `css/experience-upgrade.css` shared discovery flyout responsive state.
- Fix: explicitly neutralize the flyout transform in the mobile owner with sufficient priority; keep the intended direct two-column child-link layout.
- Regression evidence: `qa/capture.mjs` includes `home-mobile-menu` and `collection-room-mobile-menu`; desktop coverage includes both Shop and Rooms open states.
- Verification status: re-render required after this checkpoint commit. Do not merge on source evidence alone.

## Final gate for this change

PASS only after the new Chromium artifact confirms:
- desktop: `SHOP · ROOMS · OUR STORY · CONTACT`, no duplicate Home text item;
- Shop flyout shows all six categories;
- Rooms flyout shows all five rooms;
- room-scoped PLP marks Rooms, not Shop, as the active primary scope;
- mobile menu exposes all six Shop children and all five Rooms children without horizontal overflow;
- search/cart/header spacing remain intact.
