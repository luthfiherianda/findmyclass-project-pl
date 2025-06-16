// Ambil elemen yang dibutuhkan
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Buka sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
  overlay.classList.add("show");
});

// Tutup sidebar
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
});

// Klik overlay = tutup juga
overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
});

// Toggle submenu dropdown
function toggleSubmenu(event) {
  event.preventDefault();
  const parent = event.target.closest("li");
  parent.classList.toggle("open");
}
