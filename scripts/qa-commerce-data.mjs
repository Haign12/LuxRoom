import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

class MockElement {}

function makeClassList() {
  const values = new Set();
  return {
    add: (...items) => items.forEach((item) => values.add(item)),
    remove: (...items) => items.forEach((item) => values.delete(item)),
    toggle: (item, force) => {
      if (force === true) values.add(item);
      else if (force === false) values.delete(item);
      else if (values.has(item)) values.delete(item);
      else values.add(item);
      return values.has(item);
    },
    contains: (item) => values.has(item),
  };
}

function makeElement() {
  const element = new MockElement();
  Object.assign(element, {
    classList: makeClassList(),
    style: { setProperty() {}, removeProperty() {} },
    dataset: {},
    appendChild() {},
    prepend() {},
    remove() {},
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    matches: () => false,
    contains: () => false,
  });
  return element;
}

const storage = new Map();
const localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};
const document = {
  body: makeElement(),
  head: makeElement(),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createElement: () => makeElement(),
  addEventListener() {},
  dispatchEvent() {},
};
const window = {
  location: { pathname: "/index.html", href: "http://luxroom.test/index.html", origin: "http://luxroom.test", search: "", hash: "" },
  innerWidth: 1280,
  localStorage,
  matchMedia: () => ({ matches: true, addEventListener() {} }),
  addEventListener() {},
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (callback) => callback(),
};

const context = vm.createContext({
  window,
  document,
  localStorage,
  Element: MockElement,
  MutationObserver: class { observe() {} },
  CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
  Event: class { constructor(type) { this.type = type; } },
  URL,
  URLSearchParams,
  Intl,
  Date,
  Math,
  Number,
  String,
  JSON,
  Set,
  Map,
  console,
  requestAnimationFrame: window.requestAnimationFrame,
  setTimeout,
  clearTimeout,
});

const source = await readFile(resolve(process.cwd(), "js/common.js"), "utf8");
vm.runInContext(source, context, { filename: "js/common.js" });

const luxRoom = window.LuxRoom;
if (!luxRoom) throw new Error("LuxRoom runtime was not exported.");
if (luxRoom.products.length !== 17) throw new Error(`Expected 17 products, found ${luxRoom.products.length}.`);

const expectedCategories = ["Seating", "Tables", "Lighting", "Storage", "Textiles", "Objects"];
const actualCategories = new Set(luxRoom.products.map((product) => product.category));
for (const category of expectedCategories) if (!actualCategories.has(category)) throw new Error(`Missing category: ${category}`);

for (const product of luxRoom.products) {
  if (![product.dimensions.width, product.dimensions.depth, product.dimensions.height].every((value) => Number(value) > 0)) throw new Error(`${product.name}: invalid dimensions.`);
  if (product.variants.length < 2) throw new Error(`${product.name}: expected at least two variants.`);
  if (new Set(product.variants.map((variant) => variant.variantId)).size !== product.variants.length) throw new Error(`${product.name}: duplicate variant IDs.`);
  for (const variant of product.variants) {
    if (!variant.finish || !variant.material || !variant.stockStatus || !variant.images.length) throw new Error(`${product.name}: incomplete variant data.`);
    if (variant.leadTimeMin > variant.leadTimeMax) throw new Error(`${product.name}: invalid lead time.`);
  }
}

const product = luxRoom.products[0];
luxRoom.addToCart(product.id, 1, product.variants[0].variantId);
luxRoom.addToCart(product.id, 1, product.variants[1].variantId);
if (luxRoom.cartItems.length !== 2) throw new Error("Different variants were merged in the cart.");
if (!luxRoom.getArrivalWindow(luxRoom.cartItems[0]).label.includes("—")) throw new Error("Arrival window was not formatted.");
if (luxRoom.getCartTotals().shipping !== 0) throw new Error("HCMC room delivery should be included.");
luxRoom.updateDeliveryPreferences({ location: "hanoi" });
if (luxRoom.getCartTotals().shipping !== 20) throw new Error("Destination surcharge was not applied.");

console.log(`PASS: ${luxRoom.products.length} products, ${luxRoom.products.reduce((sum, item) => sum + item.variants.length, 0)} variants, delivery and cart normalization verified.`);
