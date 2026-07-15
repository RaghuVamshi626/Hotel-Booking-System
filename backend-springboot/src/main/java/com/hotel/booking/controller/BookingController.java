package com.hotel.booking.controller;

import com.hotel.booking.model.Booking;
import com.hotel.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> request) {
        Booking booking = Booking.builder()
                .ticketId("AH-" + (int)(100000 + Math.random() * 900000))
                .userId(Long.parseLong(request.get("userId").toString()))
                .hotelId(Long.parseLong(request.get("hotelId").toString()))
                .hotelName((String) request.get("hotelName"))
                .roomNumber((String) request.get("roomNumber"))
                .roomType((String) request.get("roomType"))
                .checkIn((String) request.get("checkIn"))
                .checkOut((String) request.get("checkOut"))
                .guests(Integer.parseInt(request.get("guests").toString()))
                .totalAmount(Double.parseDouble(request.get("totalAmount").toString()))
                .status("UPCOMING")
                .paymentStatus("PAID")
                .addons((List<String>) request.get("addons"))
                .build();

        bookingRepository.save(booking);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("booking", booking);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = bookingOpt.get();
        String newStatus = request.get("status");
        booking.setStatus(newStatus);
        
        if (newStatus.equals("CANCELLED")) {
            booking.setPaymentStatus("REFUNDED");
        }

        bookingRepository.save(booking);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("booking", booking);
        return ResponseEntity.ok(response);
    }
}
