function readOrders() {
  try { return JSON.parse(localStorage.getItem("luxroom-orders") || "[]"); }
  catch { return []; }
}

const requestedOrder = new URLSearchParams(window.location.search).get("order");
const orders = readOrders();
const order = orders.find((item) => item.id === requestedOrder) || orders[0] || (() => {
  try { return JSON.parse(localStorage.getItem("luxroom-last-order") || "null"); }
  catch { return null; }
})();

const content = document.querySelector("#tracking-content");
const empty = document.querySelector("#tracking-empty");

if (!order) {
  if (content) content.hidden = true;
  if (empty) empty.hidden = false;
} else {
  document.title = `LuxRoom | Track ${order.id}`;
  document.querySelector("#tracking-order-id").textContent = `Order / ${order.id}`;
  document.querySelector("#tracking-current-status").textContent = order.status;
  document.querySelector("#tracking-arrival").textContent = order.delivery.arrival;
  document.querySelector("#tracking-delivery").textContent = order.delivery.methodLabel;
  document.querySelector("#tracking-payment").textContent = order.payment.method;
  document.querySelector("#tracking-total").textContent = window.LuxRoom.formatMoney(order.totals.total);
  document.querySelector("#tracking-address").textContent = [order.address.address, order.address.ward, order.address.district, order.address.province].filter(Boolean).join(", ");

  const timeline = document.querySelector("#tracking-timeline");
  timeline.innerHTML = order.timeline.map((step, index) => `
    <li class="${step.complete ? "is-complete" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${step.status}</strong><small>${step.complete ? "Complete" : "We will notify you when this step begins."}</small></div></li>`).join("");

  const items = document.querySelector("#tracking-items");
  items.innerHTML = order.items.map((item) => `
    <article><span style="background-image:url('${item.image}')" role="img" aria-label="${item.name}"></span><div><strong>${item.name}</strong><small>${item.finish} · Qty ${item.quantity}</small></div><em>${window.LuxRoom.formatMoney(item.price * item.quantity)}</em></article>`).join("");
}
