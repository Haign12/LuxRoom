const tabLogin = document.querySelector("#tab-login");
const tabRegister = document.querySelector("#tab-register");
const formLogin = document.querySelector("#form-login");
const formRegister = document.querySelector("#form-register");

if (tabLogin && tabRegister && formLogin && formRegister) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    formLogin.classList.add("active");
    formRegister.classList.remove("active");
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    formRegister.classList.add("active");
    formLogin.classList.remove("active");
  });

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
  });

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
  });
}
