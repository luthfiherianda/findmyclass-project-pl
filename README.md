🎓 FindMyClass – Sistem Booking Ruangan Kelas Kampus UIN Syarif Hidayatullah Jakarta

FindMyClass merupakan aplikasi web berbasis Java Spring Boot yang dikembangkan untuk mengatasi permasalahan terkait penggunaan ruang kelas yang tidak terstruktur di lingkungan kampus. Melalui sistem ini, mahasiswa dan dosen dapat melakukan pemesanan ruang kelas secara digital, terorganisasi, dan efisien. FindMyClass hadir sebagai solusi untuk meminimalisasi konflik jadwal serta memastikan ketersediaan ruang kuliah yang lebih transparan dan terkendali.
📌 DAFTAR ISI
1.	[Latar Belakang]
2.	[Fitur Utama]
3.	[Teknologi yang Digunakan]
4.	[Cara Instalasi dan Menjalankan]
5.	[Nama Para Pengembang/Developers]
6.	[Lisensi]

🎯 LATAR BELAKANG
Di lingkungan kampus kami, kerap terjadi perebutan ruang kelas akibat ketiadaan sistem pemesanan yang terstruktur. Kondisi ini sering kali menimbulkan kebingungan, benturan jadwal, bahkan pembatalan perkuliahan.
Sebagai solusi atas permasalahan tersebut, kami mengembangkan FindMyClass, sebuah aplikasi berbasis web yang menawarkan sistem pemesanan ruang kelas secara digital. Aplikasi ini dirancang agar mudah digunakan oleh seluruh sivitas akademika, guna menciptakan pengelolaan ruang yang lebih tertib, efisien, dan transparan.

⚙️ FITUR UTAMA
1.	🗓️ Booking Ruangan Kelas
Pengguna dapat memesan ruang kelas berdasarkan tanggal, jam, dan kapasitas ruangan.
2.	👤 Profil Pengguna
Setelah login, pengguna dapat melihat dan mengedit profil mereka, termasuk daftar booking yang telah dilakukan.
3.	 🚨 Laporan Kerusakan Ruangan
Pengguna dapat melaporkan kondisi ruangan yang tidak layak atau rusak, agar pihak pengelola dapat menindaklanjuti.
4.	💬 Feedback dan Saran  
Pengguna dapat memberikan masukan terhadap website untuk pengembangan lebih lanjut.

💻 TEKNOLOGI YANG DIGUNAKAN
1.	Backend Framework: Spring Boot (Java)
2.	Frontend: HTML, CSS, JavaScript
3.	Database: H2
4.	Dependency Management: Maven

🚀 CARA INSTALASI DAN MENJALANKAN
A.	Prasyarat
Pastikan kamu telah menginstal:
1.	Java JDK 21
2.	Maven
3.	H2
4.	IDE (VSCode)

B.	Langkah-langkah
1.	Clone repositori ini
git clone https://github.com/luthfiherianda/findmyclass-project-pl.git
cd findmyclass-project-pl

2.	Konfigurasi database
Ubah konfigurasi di application.properties agar sesuai dengan koneksi database lokal kamu:
spring.datasource.url=jdbc:mysql://localhost:3306/findmyclass
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

3.	Build dan jalankan project ini
mvn spring-boot:run

4.	Akses Website
Buka browser dan akses http://localhost:8080

🤝 NAMA PARA PENGEMBANG/DEVELOPERS (Mahasiswa Sistem Informasi 2024 - Fakultas Sains dan Teknologi - Kelas 2C)
1.	Azrielle Farello
2.	Faridz Kurniawan Ekananta
3.	Gemma Althaf Hayyan Naqi
4.	Luthfi Herianda Putra
5.	Rizky Pratama Wahyuliawan Putra

📄 LISENSI
Proyek ini dirilis menggunakan lisensi MIT, yang memungkinkan penggunaan, modifikasi, dan distribusi dengan bebas. Informasi selengkapnya dapat dilihat pada file [LICENSE](./LICENSE).

