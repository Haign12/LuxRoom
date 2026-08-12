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

## Public verification

- GitHub Pages workflow `31596597823` completed successfully for commit `1cf120b`.
- Public Collection route verified at `https://ngh1aa.github.io/LuxRoom/products.html?v=1cf120b#collection`; it renders the editorial hero, 12-object catalog summary, filters, product grid, pagination and newsletter. Navigation labels render as Home, Collection, Our story and Contact.
