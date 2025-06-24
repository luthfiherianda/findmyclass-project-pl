
package com.findmyclass.controller;

import com.findmyclass.model.Booking;
import com.findmyclass.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setBookingTime(LocalDateTime.now());
        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings(@RequestParam(required = false) String user) {
        if (user != null) {
            return bookingRepository.findByUsername(user);
        }
        return bookingRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
