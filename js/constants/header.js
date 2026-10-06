export function hamburgerMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector("#navbar ul");

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}