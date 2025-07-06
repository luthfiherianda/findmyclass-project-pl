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

// Toggle submenu di sidebar
function toggleSubmenu(event) {
  event.preventDefault();
  const submenu = event.target.nextElementSibling;
  submenu.classList.toggle("active");
}

// Form laporan kerusakan
document.getElementById('laporForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const lokasi = document.getElementById('lokasi').value.trim();
  const deskripsi = document.getElementById('deskripsi').value.trim();

  if (!lokasi || !deskripsi) {
    alert("Lokasi dan deskripsi harus diisi.");
    return;
  }

  const reportData = { name, email, lokasi, deskripsi };

  try {
    const res = await fetch('http://localhost:8080/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    });

    if (res.ok) {
      this.reset();
      document.getElementById('laporSuccess').classList.remove('hidden');
    } else {
      const errText = await res.text();
      alert("Gagal mengirim laporan: " + errText);
    }
  } catch (err) {
    console.error("Error:", err);
    alert('Terjadi kesalahan saat mengirim laporan.');
  }
});
