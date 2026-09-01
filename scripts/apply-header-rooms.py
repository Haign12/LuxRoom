from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise SystemExit(f"{label}: expected source block not found")
    return text.replace(old, new, 1)


# Prompt 1 / Design Contract addendum.
contract_path = Path("docs/DESIGN-CONTRACT.md")
contract = contract_path.read_text()
nav_addendum = """### Global navigation refinement — 2026-09-01

Detailed evidence and rationale: `docs/navigation-ia-refinement.md`.

Locked primary navigation:

`SHOP · ROOMS · OUR STORY · CONTACT`

- The LuxRoom wordmark is the Home affordance; duplicate `HOME` text navigation is retired.
- `SHOP` is the object-led axis and links to the full PLP, with Seating / Tables / Lighting / Storage / Textiles / Objects as children.
- `ROOMS` is the space-led axis and links to the existing homepage Shop-by-room hub, with Living / Dining / Bedroom / Office / Bathroom as children routed to real `products.html?room=...` filters.
- Desktop may use compact flyouts. Mobile must expose category and room children immediately in the open menu rather than requiring a nested disclosure.
- `SHOP` is active for general/category/collection/search PLP scope; `ROOMS` is active when a valid room scope is present.
- Do not add Collections / New / Journal / Trade / Sale to top-level navigation without new task/content evidence.

"""
if "### Global navigation refinement — 2026-09-01" not in contract:
    contract = replace_once(
        contract,
        "## 7. Preserve / change / remove / add",
        nav_addendum + "## 7. Preserve / change / remove / add",
        "Design Contract",
    )
    contract_path.write_text(contract)


# Prompt 2 / root JS owner.
common_path = Path("js/common.js")
common = common_path.read_text()
new_navigation = r'''function initDiscoveryNavigation() {
  const categories = ["Seating", "Tables", "Lighting", "Storage", "Textiles", "Objects"];
  const rooms = ["Living", "Dining", "Bedroom", "Office", "Bathroom"];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const query = new URLSearchParams(window.location.search);
  const hasRoomScope = Boolean(query.get("room"));
  const mobileMenuQuery = window.matchMedia("(max-width: 820px)");

  const setupFlyout = (wrapper, trigger, flyout) => {
    const setExpanded = (expanded) => trigger.setAttribute("aria-expanded", String(mobileMenuQuery.matches || expanded));
    setExpanded(false);
    wrapper.addEventListener("mouseenter", () => setExpanded(true));
    wrapper.addEventListener("mouseleave", () => setExpanded(false));
    wrapper.addEventListener("focusin", () => setExpanded(true));
    wrapper.addEventListener("focusout", (event) => {
      if (!wrapper.contains(event.relatedTarget)) setExpanded(false);
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" || mobileMenuQuery.matches) return;
      event.preventDefault();
      setExpanded(true);
      flyout.querySelector("a")?.focus();
    });
    wrapper.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || mobileMenuQuery.matches) return;
      setExpanded(false);
      trigger.focus();
    });
    mobileMenuQuery.addEventListener?.("change", () => setExpanded(false));
  };

  document.querySelectorAll(".main-nav").forEach((nav) => {
    const directLinks = Array.from(nav.children).filter((node) => node.matches?.("a"));
    const homeLink = directLinks.find((node) => node.matches?.('a[href*="index.html"]'));
    const collectionLink = directLinks.find((node) => node.matches?.('a[href*="products.html"]'));
    if (!collectionLink || collectionLink.closest(".nav-shop")) return;

    homeLink?.remove();

    const shop = document.createElement("div");
    shop.className = "nav-shop nav-discovery";
    collectionLink.before(shop);
    shop.appendChild(collectionLink);
    collectionLink.textContent = "Shop";
    collectionLink.setAttribute("aria-haspopup", "true");
    collectionLink.setAttribute("aria-expanded", "false");

    const shopFlyout = document.createElement("div");
    shopFlyout.className = "nav-shop-flyout nav-discovery-flyout";
    shopFlyout.setAttribute("aria-label", "Shop by category");
    shopFlyout.innerHTML = categories
      .map((category) => `<a href="products.html?category=${encodeURIComponent(category)}">${category}</a>`)
      .join("");
    shop.appendChild(shopFlyout);

    const roomNav = document.createElement("div");
    roomNav.className = "nav-rooms nav-discovery";
    roomNav.innerHTML = '<a class="nav-rooms-link" href="index.html#room-edit-title" aria-haspopup="true" aria-expanded="false">Rooms</a>';
    const roomsLink = roomNav.querySelector(".nav-rooms-link");
    const roomsFlyout = document.createElement("div");
    roomsFlyout.className = "nav-rooms-flyout nav-discovery-flyout";
    roomsFlyout.setAttribute("aria-label", "Shop by room");
    roomsFlyout.innerHTML = rooms
      .map((room) => `<a href="products.html?room=${encodeURIComponent(room)}#room=${encodeURIComponent(room)}">${room}</a>`)
      .join("");
    roomNav.appendChild(roomsFlyout);
    shop.after(roomNav);

    const isCollection = currentPage === "products.html";
    collectionLink.classList.toggle("active", isCollection && !hasRoomScope);
    roomsLink.classList.toggle(
      "active",
      (isCollection && hasRoomScope) || (currentPage === "index.html" && window.location.hash === "#room-edit-title"),
    );

    setupFlyout(shop, collectionLink, shopFlyout);
    setupFlyout(roomNav, roomsLink, roomsFlyout);
  });
}

initDiscoveryNavigation();'''
common, count = re.subn(
    r"function initShopNavigation\(\) \{.*?\n\}\n\ninitShopNavigation\(\);",
    new_navigation,
    common,
    count=1,
    flags=re.S,
)
if count != 1:
    raise SystemExit(f"common.js: expected one initShopNavigation block, replaced {count}")
common_path.write_text(common)


# Prompt 2 / root runtime CSS owner.
css_path = Path("css/experience-upgrade.css")
css = css_path.read_text()
navigation_css = r'''/* Discovery navigation — compact object-led + space-led flyouts. */
.nav-shop,
.nav-rooms { position: relative; display: flex; align-items: center; }
.nav-shop > a,
.nav-rooms > a { min-height: var(--nav-h); }
.nav-discovery-flyout {
  position: absolute;
  z-index: 120;
  top: calc(100% - 1px);
  left: 50%;
  width: min(430px, calc(100vw - 32px));
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 0;
  padding: 14px 16px 16px;
  background: var(--paper);
  border: 1px solid var(--hairline);
  box-shadow: 0 24px 68px rgba(20,20,20,.11);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(-50%, 10px);
  transition: opacity var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), visibility var(--duration-fast) var(--ease-out);
}
.nav-rooms-flyout { width: min(390px, calc(100vw - 32px)); }
.nav-discovery-flyout::before {
  grid-column: 1 / -1;
  min-height: 42px;
  display: flex;
  align-items: center;
  color: var(--stone);
  font: 600 var(--text-2xs)/1 var(--font-ui);
  letter-spacing: .14em;
  text-transform: uppercase;
}
.nav-shop-flyout::before { content: "Shop by category"; }
.nav-rooms-flyout::before { content: "Shop by room"; }
.nav-shop:hover .nav-shop-flyout,
.nav-shop:focus-within .nav-shop-flyout,
.nav-shop > a[aria-expanded="true"] + .nav-shop-flyout,
.nav-rooms:hover .nav-rooms-flyout,
.nav-rooms:focus-within .nav-rooms-flyout,
.nav-rooms > a[aria-expanded="true"] + .nav-rooms-flyout {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate(-50%, 0);
}
.nav-discovery-flyout a {
  min-height: 52px !important;
  display: grid !important;
  grid-template-columns: 28px minmax(0,1fr);
  align-items: center !important;
  gap: 8px;
  padding: 0 12px !important;
  background: transparent;
  border: 0 !important;
  border-top: 1px solid var(--hairline) !important;
  color: var(--ink) !important;
  font-size: var(--text-sm) !important;
  font-weight: 500 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  transition: background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}
.nav-discovery-flyout a:nth-of-type(even) { border-left: 1px solid var(--hairline) !important; }
.nav-discovery-flyout a::after { display: none !important; }
.nav-discovery-flyout a::before { color: var(--stone); font: 600 .56rem/1 var(--font-ui); letter-spacing: .1em; }
.nav-shop-flyout a:nth-of-type(1)::before, .nav-rooms-flyout a:nth-of-type(1)::before { content: "01"; }
.nav-shop-flyout a:nth-of-type(2)::before, .nav-rooms-flyout a:nth-of-type(2)::before { content: "02"; }
.nav-shop-flyout a:nth-of-type(3)::before, .nav-rooms-flyout a:nth-of-type(3)::before { content: "03"; }
.nav-shop-flyout a:nth-of-type(4)::before, .nav-rooms-flyout a:nth-of-type(4)::before { content: "04"; }
.nav-shop-flyout a:nth-of-type(5)::before, .nav-rooms-flyout a:nth-of-type(5)::before { content: "05"; }
.nav-shop-flyout a:nth-of-type(6)::before { content: "06"; }
.nav-discovery-flyout a:hover,
.nav-discovery-flyout a:focus-visible { background: var(--surface); color: var(--ink) !important; }
.nav-discovery-flyout a:hover::before,
.nav-discovery-flyout a:focus-visible::before { color: var(--clay); }

'''
css, count = re.subn(
    r"/\* Shop — compact editorial flyout instead of a boxed 3×2 matrix\. \*/.*?(?=/\* Search —)",
    navigation_css,
    css,
    count=1,
    flags=re.S,
)
if count != 1:
    raise SystemExit(f"experience-upgrade.css: expected one Shop block, replaced {count}")

mobile_old = '''@media (max-width: 820px) {
  .nav-shop { display: contents; }
  .nav-shop-flyout { display: none !important; }
'''
mobile_new = '''@media (max-width: 820px) {
  .nav-shop, .nav-rooms { display: contents; }
  .nav-shop-flyout, .nav-rooms-flyout {
    position: static;
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 0;
    padding: 4px 0 18px;
    border: 0;
    border-bottom: 1px solid var(--hairline);
    background: transparent;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
  }
  .nav-shop-flyout::before, .nav-rooms-flyout::before { display: none; }
  .topbar.menu-open .nav-discovery-flyout a {
    min-height: 44px !important;
    padding: 0 10px !important;
    border: 0 !important;
    color: var(--stone) !important;
    font-size: .7rem !important;
  }
  .topbar.menu-open .nav-discovery-flyout a:nth-of-type(even) { border-left: 0 !important; }
  .topbar.menu-open .nav-discovery-flyout a:hover,
  .topbar.menu-open .nav-discovery-flyout a:focus-visible { background: var(--surface); color: var(--ink) !important; }
'''
css = replace_once(css, mobile_old, mobile_new, "experience-upgrade.css mobile")
css_path.write_text(css)


# Prompt Final / rendered-state regression coverage.
capture_path = Path("qa/capture.mjs")
capture = capture_path.read_text()
if "home-desktop-rooms" not in capture:
    additions = '''await capture('home-desktop-rooms', 'index.html', desktop, async page => {
  const roomsLink = page.locator('.nav-rooms > a');
  await roomsLink.hover();
  await page.locator('.nav-rooms-flyout').waitFor({ state: 'visible' });
});
await capture('collection-room-desktop', 'products.html?room=Living', desktop);
await capture('collection-room-mobile-menu', 'products.html?room=Living', mobile, async page => {
  await page.locator('.mobile-menu-toggle').click();
});
'''
    capture = replace_once(
        capture,
        "await capture('home-desktop-search', 'index.html', desktop, async page => {",
        additions + "await capture('home-desktop-search', 'index.html', desktop, async page => {",
        "qa/capture.mjs",
    )
    capture_path.write_text(capture)

workflow_path = Path(".github/workflows/visual-qa.yml")
workflow = workflow_path.read_text()
if "uiux/header-rooms-navigation" not in workflow:
    workflow = replace_once(
        workflow,
        "      - uiux/luxroom-research-v2\n      - main",
        "      - uiux/luxroom-research-v2\n      - uiux/header-rooms-navigation\n      - main",
        "visual-qa branch list",
    )
workflow = workflow.replace(
    "'desktop': ['home-desktop','collection-desktop','detail-desktop','about-desktop','contact-desktop','cart-desktop','checkout-desktop','home-scrolled-desktop','home-desktop-shop','home-desktop-search'],",
    "'desktop': ['home-desktop','collection-desktop','detail-desktop','about-desktop','contact-desktop','cart-desktop','checkout-desktop','home-scrolled-desktop','home-desktop-shop','home-desktop-rooms','home-desktop-search','collection-room-desktop'],",
)
workflow = workflow.replace(
    "'mobile': ['home-mobile','collection-mobile','detail-mobile','about-mobile','contact-mobile','cart-mobile','checkout-mobile','home-mobile-menu','home-mobile-search','collection-mobile-filter','detail-mobile-lower'],",
    "'mobile': ['home-mobile','collection-mobile','detail-mobile','about-mobile','contact-mobile','cart-mobile','checkout-mobile','home-mobile-menu','home-mobile-search','collection-mobile-filter','collection-room-mobile-menu','detail-mobile-lower'],",
)
workflow_path.write_text(workflow)

plan_path = Path("docs/visual-regression-plan.md")
plan = plan_path.read_text()
if "- Home desktop Rooms open" not in plan:
    plan = plan.replace(
        "- Home desktop top\n",
        "- Home desktop top\n- Home desktop Shop open\n- Home desktop Rooms open\n- Home desktop Search open\n",
        1,
    )
    plan = plan.replace(
        "- Home mobile menu open\n",
        "- Home mobile menu open\n- Room-scoped Collection mobile menu open\n",
        1,
    )
    plan_path.write_text(plan)

print("Header Rooms navigation patch applied successfully.")
