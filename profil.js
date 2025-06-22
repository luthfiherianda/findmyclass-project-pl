// profil.js

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");

    // Toggle Sidebar
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        overlay.classList.add("show");
    });

    // Close Sidebar
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    });

    // Toggle Submenu
    const submenuToggles = document.querySelectorAll(".has-submenu > a");

    submenuToggles.forEach(toggle => {
        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle("open");
        });
    });
});
