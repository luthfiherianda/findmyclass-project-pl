package com.rajakoding.FindMyClass.controller;

import com.rajakoding.FindMyClass.model.Booking;
import com.rajakoding.FindMyClass.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking saved = bookingService.saveBooking(booking);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping
    public List<Booking> getJadwalKelas(@RequestParam Long kelasId, @RequestParam String tanggal) {
        bookingService.hapusBookingLama(); // ✅ Hapus booking lama sebelum ambil data
        LocalDate tgl = LocalDate.parse(tanggal);
        return bookingService.getBookingsByDateAndClass(tgl, kelasId);
    }
}
