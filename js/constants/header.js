export function hamburgerMenu() {
    document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.getElementById("menu-toggle");
        const navbar = document.getElementById("navbar");
        menuToggle.addEventListener("click", function () {
            navbar.querySelector("ul").classList.toggle("active");
        });
    });

}
