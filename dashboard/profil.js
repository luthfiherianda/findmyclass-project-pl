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

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("user-greeting");

  if (username && greetingElement) {
    greetingElement.textContent = `Halo, ${username}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("user-greeting");

  if (username && greetingElement) {
    greetingElement.textContent = `Halo, ${username}`;
    
    // Ambil data user dari backend
    fetch(`http://localhost:8080/api/user/by-username/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return response.json();
      })
      .then(user => {
        // Tampilkan data di profil
        document.querySelector(".info-value.nama").textContent = user.username;
        document.querySelector(".info-value.nim").textContent = user.nim;
        document.querySelector(".info-value.email").textContent = user.email;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
});
