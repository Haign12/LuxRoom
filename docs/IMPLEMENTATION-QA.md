# LuxRoom Research-Driven Redesign — Implementation & QA

Date: 2026-09-01
Branch: `uiux/luxroom-research-v2`
Design direction: **Quiet Architectural Commerce**

## Implementation status

The redesign implementation is complete across the representative and supporting route families defined in `docs/DESIGN-CONTRACT.md`.

Representative pages were implemented first:
1. Home — orientation + object/room/search discovery.
2. Collection — catalogue workbench + narrowing.
3. Product detail — media + fit/delivery/purchase decision.

The system was then rolled across Story, Contact, Cart, Checkout, Wishlist, Auth, Profile, Success and Tracking without reintroducing the historical page-level override pile.

## Root owners

- `css/design-system.css` — semantic brand/design tokens.
- `css/common.css` — shared navigation/search/base UI.
- Route CSS — page-role composition ownership.
- `css/experience-upgrade.css` — JS-created runtime components only.
- `css/title-spacing.css` and `css/contact-hotfix.css` — compatibility shims only.

## System reality

- Search/filter: real within the static client dataset.
- Cart/wishlist/recent state: real within browser storage.
- Checkout/payment: simulated/partial and disclosed as prototype behavior.
- Contact: simulated/prototype; no guaranteed CRM-delivery claim.
- Tracking: static/simulated stored order state.

## Final visual QA status

**VISUAL QA: PASSED within the tested representative scope.**

The earlier source-only QA gate was superseded by actual Chromium rendering and inspection. See `docs/FINAL-QA.md` for the final issue log, before/after remediation and release result.

Rendered coverage includes:
- 1440 × 1000 and 390 × 844 across Home, Collection, PDP, Story, Contact, Cart and Checkout;
- 768 × 1024 and 1024 × 900 across Home, Collection and PDP;
- representative 1920 Home;
- scrolled header, mobile menu, mobile search, mobile filter and PDP lower/spec states.

The final material P1 found by rendered inspection — PDP mobile product identity falling below the first viewport — was fixed at `css/detail.css` and re-rendered successfully.

## Regression protection

- `.github/workflows/visual-qa.yml`
- `qa/capture.mjs`
- `docs/visual-regression-plan.md`
- committed desktop/mobile contact sheets
- runtime overflow/console/failed-response report
- full workflow screenshot artifact

## Release gate

No actionable P0/P1/P2 remains in the tested representative scope. The branch is suitable for merge to `main`; the same rendered Visual QA workflow must run on `main` as the post-merge GitHub Pages smoke gate.
