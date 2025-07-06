package com.rajakoding.FindMyClass.service;

import com.rajakoding.FindMyClass.model.Booking;
import com.rajakoding.FindMyClass.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(Booking newBooking) {
        // Cegah booking tanggal lampau
        if (newBooking.getTanggal().isBefore(LocalDate.now())) {
            throw new RuntimeException("Tidak bisa booking untuk tanggal yang sudah lewat.");
        }

        List<Booking> existingBookings = bookingRepository.findByKelasAndTanggal(
                newBooking.getKelas().getId(),
                newBooking.getTanggal()
        );

        for (Booking b : existingBookings) {
            if (waktuBentrok(newBooking.getJamMulai(), newBooking.getJamSelesai(),
                             b.getJamMulai(), b.getJamSelesai())) {
                throw new RuntimeException("Jadwal bentrok dengan booking lain.");
            }
        }

        return bookingRepository.save(newBooking);
    }

    public List<Booking> getBookingsByDateAndClass(LocalDate tanggal, Long kelasId) {
        return bookingRepository.findByTanggalAndKelas_Id(tanggal, kelasId);
    }

    // ✅ Method untuk hapus booking yang sudah lewat
    public void hapusBookingLama() {
        List<Booking> semuaBooking = bookingRepository.findAll();
        LocalDate hariIni = LocalDate.now();

        for (Booking booking : semuaBooking) {
            if (booking.getTanggal().isBefore(hariIni)) {
                bookingRepository.delete(booking);
            }
        }
    }

    private boolean waktuBentrok(LocalTime mulai1, LocalTime selesai1, LocalTime mulai2, LocalTime selesai2) {
        return !selesai1.isBefore(mulai2) && !mulai1.isAfter(selesai2);
    }
}
