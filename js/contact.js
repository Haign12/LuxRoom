const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! Our team will get back to you shortly.");
    contactForm.reset();
  });
}
