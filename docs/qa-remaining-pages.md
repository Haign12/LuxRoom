# QA — Remaining Pages Redesign

## Visual checks

- **Collection preview:** Hero có hierarchy editorial rõ ràng, navigation hoạt động, filter groups và product grid hiển thị đầy đủ. The layout maintains sharp image surfaces and wide mineral-white negative space.
- **Contact preview:** Contact page renders with the intended editorial split: oversize Newsreader headline, concise studio information, and a clear consultation form. The global navigation now labels the route **Contact** consistently and the supplied Vietnamese phone number is present as a tel link.

## Static checks

- `node scripts/qa-all-pages.mjs` passed **94** structural, dependency and sharp-layout assertions.
- `node scripts/qa-product-detail.mjs` passed all required hooks, local dependency checks and square-surface verification.
- `git diff --check` completed without whitespace errors.

## Follow-up

- Product and commerce runtime hooks have been preserved; deeper user-input flows remain simulated because this is a static portfolio storefront.
