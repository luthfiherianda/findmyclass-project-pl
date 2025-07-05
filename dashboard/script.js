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

// Tangani form feedback agar tidak reload (opsional)
document.querySelector('.feedback-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Terima kasih atas masukan Anda!");
});

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("user-greeting");

  if (username && greetingElement) {
    greetingElement.textContent = `Halo, ${username}`;
  }
});

document.querySelector('.feedback-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const message = document.getElementById('message').value.trim();
  const username = sessionStorage.getItem("username"); // diasumsikan username login disimpan di sessionStorage
  if (!message) {
    alert("Pesan tidak boleh kosong.");
    return;
  }

  // Ambil data user dari backend berdasarkan username
  const userResponse = await fetch(`http://localhost:8080/api/user/by-username/${username}`);
  const user = await userResponse.json();

  const feedback = {
    message: message,
    user: {
      id: user.id
    }
  };

  try {
    const response = await fetch("http://localhost:8080/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedback)
    });

    if (response.ok) {
      alert("Terima kasih atas masukan Anda!");
      document.querySelector('.feedback-form').reset();
    } else {
      alert("Gagal mengirim feedback. Coba lagi.");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat mengirim feedback.");
  }
});
