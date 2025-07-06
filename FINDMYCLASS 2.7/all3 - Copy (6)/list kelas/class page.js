// ===================== SIDEBAR ===================== //
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
  overlay.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
});

// ===================== POPUP ===================== //
function bukaPopup(id) {
  document.getElementById(id).style.display = "block";
}

function tutupPopup(id) {
  document.getElementById(id).style.display = "none";
}

function bukaPopupSK() {
  bukaPopup("popupSK");
}

function tutupPopupSK() {
  tutupPopup("popupSK");
}

function bukaPopupSuccess() {
  bukaPopup("popupSuccess");
  startConfetti();
}

function tutupPopupSuccess() {
  tutupPopup("popupSuccess");
  stopConfetti();
}

// ===================== CONFETTI ===================== //
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  confetti.create(canvas, { resize: true })(
    {
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    }
  );
}

function stopConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ===================== BOOKING FLOW ===================== //
let tanggalDipilih = "";
let alurBooking = false;
let selectedCell = null;

function mulaiBooking() {
  alurBooking = true;
  bukaPopup("popupJadwal");
  renderKalender(tahunSekarang, bulanSekarang);
}

function mulaiCekJadwal() {
  alurBooking = false;
  bukaPopup("popupJadwal");
  renderKalender(tahunSekarang, bulanSekarang);
}

function lanjutKeBookingDariSK() {
  tutupPopupSK();
  mulaiBooking();
}

function pilihTanggal(th, bl, tgl) {
  const tglStr = `${th}-${bl.toString().padStart(2, '0')}-${tgl.toString().padStart(2, '0')}`;
  tanggalDipilih = tglStr;
  document.getElementById("judulTanggal").textContent = `Jadwal ${tglStr}`;
  tampilkanJadwalTanggal(tglStr);

  if (selectedCell) selectedCell.classList.remove("selected-cell");
  const grid = document.getElementById("kalenderGrid");
  const cells = grid.querySelectorAll("div");
  cells.forEach(cell => {
    if (cell.textContent == tgl) {
      cell.classList.add("selected-cell");
      selectedCell = cell;
    }
  });

  if (alurBooking) bukaPopup("popupFormPesan");
}

function lanjutKeBooking() {
  const mulai = document.getElementById("jamMulai").value;
  const selesai = document.getElementById("jamSelesai").value;
  if (!mulai || !selesai) return alert("Lengkapi jam mulai dan selesai.");
  if (mulai >= selesai) return alert("Jam mulai harus sebelum jam selesai.");

  document.getElementById("popupJam").textContent = `${mulai} - ${selesai}`;
  document.getElementById("popupTanggal").textContent = tanggalDipilih;

  tutupPopup("popupFormPesan");
  bukaPopup("popupBooking");
}

// ===================== KALENDER ===================== //
let bulanSekarang = new Date().getMonth();
let tahunSekarang = new Date().getFullYear();

function gantiBulan(offset) {
  bulanSekarang += offset;
  if (bulanSekarang < 0) {
    bulanSekarang = 11;
    tahunSekarang--;
  } else if (bulanSekarang > 11) {
    bulanSekarang = 0;
    tahunSekarang++;
  }
  renderKalender(tahunSekarang, bulanSekarang);
}

function renderKalender(tahun, bulan) {
  const grid = document.getElementById("kalenderGrid");
  const label = document.getElementById("kalenderLabel");
  const namaBulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  label.textContent = `${namaBulan[bulan]} ${tahun}`;
  grid.innerHTML = "";

  const hari = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  hari.forEach(h => {
    const head = document.createElement("div");
    head.textContent = h;
    head.classList.add("header");
    grid.appendChild(head);
  });

  const firstDay = new Date(tahun, bulan, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(tahun, bulan + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalisasi waktu

  for (let i = 0; i < startDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;
    const tgl = new Date(tahun, bulan, d);
    tgl.setHours(0, 0, 0, 0); // normalisasi waktu

    // Mark today
    if (tgl.getTime() === today.getTime()) {
      cell.classList.add("today");
    }

    // Disable tanggal yang sudah lewat
    if (tgl < today) {
      cell.classList.add("disabled-cell");
    } else {
      cell.onclick = () => {
        // Unselect tanggal sebelumnya
        const allCells = grid.querySelectorAll("div");
        allCells.forEach(c => c.classList.remove("selected-cell"));

        // Tambahkan class ke yang baru diklik
        cell.classList.add("selected-cell");

        // Simpan tanggal terpilih dan tampilkan jadwal
        pilihTanggal(tahun, bulan + 1, d);
      };
    }

    grid.appendChild(cell);
  }
}


async function tampilkanJadwalTanggal(tanggal) {
  const kelasId = document.getElementById("kelasId").value;

  try {
    const res = await fetch(`http://localhost:8080/api/bookings?kelasId=${kelasId}&tanggal=${tanggal}`);
    const data = await res.json();

    const tbody = document.getElementById("jadwalTabel");
    if (!data.length) {
      tbody.innerHTML = "<tr><td colspan='2'>Belum ada booking</td></tr>";
      return;
    }

    let rows = "";
    data.forEach(b => {
      rows += `<tr><td>${b.jamMulai.slice(0,5)} - ${b.jamSelesai.slice(0,5)}</td><td>Terbooking</td></tr>`;
    });

    tbody.innerHTML = rows;
  } catch (error) {
    console.error("Gagal mengambil data booking:", error);
    alert("Gagal menampilkan jadwal.");
  }
}

// ===================== BOOKING ===================== //
async function konfirmasiBooking() {
  const jamMulaiRaw = document.getElementById("jamMulai").value;
  const jamSelesaiRaw = document.getElementById("jamSelesai").value;
  const jamMulai = jamMulaiRaw.length === 5 ? jamMulaiRaw + ":00" : jamMulaiRaw;
  const jamSelesai = jamSelesaiRaw.length === 5 ? jamSelesaiRaw + ":00" : jamSelesaiRaw;

  const tanggal = tanggalDipilih;
  const kelasId = document.getElementById("kelasId").value;
  const userId = localStorage.getItem("userId") || document.getElementById("userId").value;

  if (!jamMulai || !jamSelesai) {
    alert("Silakan isi jam mulai dan jam selesai.");
    return;
  }

  if (jamMulai >= jamSelesai) {
    alert("Jam mulai harus lebih awal dari jam selesai.");
    return;
  }

  const bookingData = {
    tanggal: tanggal,
    jamMulai: jamMulai,
    jamSelesai: jamSelesai,
    kelas: { id: parseInt(kelasId) },
    user: { id: parseInt(userId) }
  };

  try {
    const res = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    if (!res.ok) {
      const errText = await res.text();
      alert("Gagal booking: " + errText);
      return;
    }

    tutupPopup("popupBooking");
    bukaPopupSuccess();
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat memproses booking.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderKalender(tahunSekarang, bulanSekarang);
});

const submenuToggles = document.querySelectorAll(".has-submenu > a");

submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", function (event) {
        event.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("open");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("user-greeting");

  if (username && greetingElement) {
    greetingElement.textContent = `Halo, ${username}`;
  }
});