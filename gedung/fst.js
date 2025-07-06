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

const table = document.getElementById("kelasTable");
if (table) {
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let row of rows) {
    for (let cell of row.cells) {
      cell.style.cursor = "pointer";
      cell.onclick = function() {
        // Ambil kode kelas dari kolom pertama pada baris ini
        const kode = row.cells[0].textContent.trim();
        const nomor = kode.replace(/\D/g, "");
        window.location.href = `../list kelas/FST/classpage${nomor}FST.html`;
      };
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("user-greeting");

  if (username && greetingElement) {
    greetingElement.textContent = `Halo, ${username}`;
  }
});
