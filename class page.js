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

const facilityIcons = {
  "AC": "AC.png",
  "SMART TV": "tv.png",
  "PROJECTOR": "projector.png",
  "WHITEBOARD": "papantulis.png"
};

const table = document.getElementById("kelasTable");
if (table) {
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let row of rows) {
    // Fasilitas ada di kolom ke-4 (index 3)
    const fasilitasCell = row.cells[3];
    if (fasilitasCell) {
      // Pisahkan fasilitas berdasarkan koma
      const fasilitasList = fasilitasCell.textContent.split(',').map(f => f.trim().toUpperCase());
      // Buat elemen <ul>
      const ul = document.createElement('ul');
      ul.style.margin = 0;
      ul.style.paddingLeft = "20px";
      fasilitasList.forEach(fasilitas => {
        const li = document.createElement('li');
        li.style.display = "flex";
        li.style.alignItems = "center";
        // Cek apakah ada ikon untuk fasilitas ini
        const iconFile = facilityIcons[fasilitas];
        if (iconFile) {
          const img = document.createElement('img');
          img.src = iconFile;
          img.alt = fasilitas;
          img.style.width = "20px";
          img.style.height = "20px";
          img.style.marginRight = "8px";
          li.appendChild(img);
        }
        li.appendChild(document.createTextNode(fasilitas.replace("SMART TV", "Smart TV").replace("AC", "AC").replace("PROJECTOR", "Projector").replace("WHITEBOARD", "Whiteboard")));
        ul.appendChild(li);
      });
      // Ganti isi cell dengan <ul> fasilitas + ikon
      fasilitasCell.innerHTML = "";
      fasilitasCell.appendChild(ul);
    }
  }
}

const container = document.getElementById('imageContainer');
const images = container.getElementsByClassName('slide-image');
let currentIndex = 0;

function showImage(index) {
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateX(-${index * 100}%)`;
  }
}

document.getElementById('arrowLeft').onclick = function() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage(currentIndex);
  }
};
document.getElementById('arrowRight').onclick = function() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    showImage(currentIndex);
  }
};

// Klik gambar
for (let img of images) {
  img.onclick = function() {
    alert('Gambar diklik: ' + img.alt);
    // Ganti aksi sesuai kebutuhan
  };
}

function bukaPopup() {
  document.getElementById("popupBooking").style.display = "block";
}

function tutupPopup() {
  document.getElementById("popupBooking").style.display = "none";
}

function bukaPopupSuccess() {
  document.getElementById("popupSuccess").style.display = "block";
  startConfetti();
}

function tutupPopupSuccess() {
  document.getElementById("popupSuccess").style.display = "none";
  stopConfetti();
}

function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  confetti.create(canvas, { resize: true })({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function stopConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cekJadwal() {
  document.getElementById("popupJadwal").style.display = "block";
  document.getElementById("jadwalTabel").innerHTML = `<tr><td colspan="2">Silakan pilih tanggal</td></tr>`;
}

function tutupPopupJadwal() {
  document.getElementById("popupJadwal").style.display = "none";
}

function ambilJadwal() {
  const tanggal = document.getElementById("tanggalJadwal").value;
  const tbody = document.getElementById("jadwalTabel");

  if (!tanggal) {
    alert("Pilih tanggal terlebih dahulu!");
    return;
  }

  fetch(`get_bookings.php?tanggal=${tanggal}`)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2">Tidak ada jadwal</td></tr>`;
      } else {
        data.forEach(item => {
          tbody.innerHTML += `
            <tr>
              <td>${item.jam}</td>
              <td><span class="badge">${item.status}</span></td>
            </tr>
          `;
        });
      }
    })
    .catch(err => {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="2">Gagal mengambil data</td></tr>`;
    });
}

let bulanSekarang = new Date().getMonth();
let tahunSekarang = new Date().getFullYear();

function cekJadwal() {
  document.getElementById("popupJadwal").style.display = "block";
  renderKalender(tahunSekarang, bulanSekarang);
}

function tutupPopupJadwal() {
  document.getElementById("popupJadwal").style.display = "none";
}

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

  for (let i = 0; i < startDay; i++) grid.appendChild(document.createElement("div"));

  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement("div");
    cell.textContent = d;
    const tgl = new Date(tahun, bulan, d);

    if (
      tgl.getDate() === today.getDate() &&
      tgl.getMonth() === today.getMonth() &&
      tgl.getFullYear() === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    cell.onclick = () => pilihTanggal(tahun, bulan + 1, d);
    grid.appendChild(cell);
  }
}

function pilihTanggal(th, bl, tgl) {
  const tanggalStr = `${th}-${bl.toString().padStart(2, '0')}-${tgl.toString().padStart(2, '0')}`;
  document.getElementById("judulTanggal").textContent = `Jadwal ${tanggalStr}`;

  fetch(`get_bookings.php?tanggal=${tanggalStr}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("jadwalTabel");
      tbody.innerHTML = "";

      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2">Tidak ada jadwal</td></tr>`;
      } else {
        data.forEach(item => {
          tbody.innerHTML += `
            <tr>
              <td>${item.jam}</td>
              <td><span class="badge">${item.status}</span></td>
            </tr>
          `;
        });
      }
    });
}



