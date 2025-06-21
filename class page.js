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




