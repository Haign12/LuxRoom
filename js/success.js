function readLastOrder() {
  try {
    return JSON.parse(localStorage.getItem("luxroom-last-order") || "null");
  } catch {
    return null;
  }
}

const order = readLastOrder();
const orderIdNode = document.querySelector("#success-order-id");
const arrivalNode = document.querySelector("#success-arrival");
const deliveryNode = document.querySelector("#success-delivery");
const paymentNode = document.querySelector("#success-payment");
const trackLink = document.querySelector("#track-order-link");
const timeline = document.querySelector("#success-timeline");

if (order) {
  document.title = `LuxRoom | ${order.id} confirmed`;
  if (orderIdNode) orderIdNode.textContent = `Order confirmed / ${order.id}`;
  if (arrivalNode) arrivalNode.textContent = order.delivery.arrival;
  if (deliveryNode) deliveryNode.textContent = order.delivery.methodLabel;
  if (paymentNode) paymentNode.textContent = order.payment.method;
  if (trackLink) trackLink.href = `tracking.html?order=${encodeURIComponent(order.id)}`;

  if (timeline) {
    const descriptions = {
      Confirmed: "Your order and delivery details are safely recorded.",
      Processing: "Each selected finish is checked and prepared.",
      "In production": "Your made-to-order piece is now with the workshop.",
      "Quality check": "Materials, finish and construction are reviewed.",
      "Delivery scheduled": "Our room team confirms a suitable delivery window.",
      "Out for delivery": "Your objects begin their final journey to the room.",
      Delivered: "Placed with care according to your selected service.",
    };
    timeline.innerHTML = order.timeline.map((step, index) => `
      <li class="${step.complete ? "is-complete" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${step.status}</strong><p>${descriptions[step.status] || "We will share an update when this step begins."}</p></div></li>`).join("");
  }
} else {
  if (orderIdNode) orderIdNode.textContent = "Order confirmation";
  if (trackLink) {
    trackLink.href = "products.html";
    trackLink.innerHTML = 'Return to the collection <span aria-hidden="true">↗</span>';
  }
}
