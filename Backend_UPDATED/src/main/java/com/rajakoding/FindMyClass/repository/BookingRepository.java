package com.rajakoding.FindMyClass.repository;

import com.rajakoding.FindMyClass.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Untuk lihat semua booking di tanggal dan kelas tertentu (buat "cek jadwal")
    List<Booking> findByTanggalAndKelas_Id(LocalDate tanggal, Long kelasId);

    // Untuk pengecekan bentrok manual di BookingService
    @Query("SELECT b FROM Booking b WHERE b.kelas.id = :kelasId AND b.tanggal = :tanggal")
    List<Booking> findByKelasAndTanggal(@Param("kelasId") Long kelasId, @Param("tanggal") LocalDate tanggal);

}
