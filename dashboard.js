// Ambil elemen-elemen yang dibutuhkan dari DOM
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Fungsi untuk membuka sidebar
function openSidebar() {
    sidebar.classList.add('show');
    overlay.classList.add('show');
}

// Fungsi untuk menutup sidebar
function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
}

// Tambahkan event listener untuk tombol menu
menuBtn.addEventListener('click', openSidebar);

// Tambahkan event listener untuk tombol tutup
closeBtn.addEventListener('click', closeSidebar);

// Tambahkan event listener untuk overlay (menutup sidebar saat area gelap diklik)
overlay.addEventListener('click', closeSidebar);

function toggleSubmenu(event) {
  event.preventDefault();
  const parent = event.target.closest('li');
  parent.classList.toggle('open');
}

