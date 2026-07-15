package com.hotel.booking.controller;

import com.hotel.booking.model.Booking;
import com.hotel.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping({"/api/bookings/user/{userId}", "/bookings/user/{userId}"})
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    // Resolves bookings for the currently authenticated user session
    @GetMapping({"/api/bookings/user", "/booking/user"})
    public ResponseEntity<List<Booking>> getBookingsForCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        String email = authentication.getName();
        return ResponseEntity.ok(bookingService.getBookingsByEmail(email));
    }

    @PostMapping({"/api/bookings", "/booking"})
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> request) {
        try {
            Booking booking = Booking.builder()
                    .userId(Long.parseLong(request.get("userId").toString()))
                    .hotelId(Long.parseLong(request.get("hotelId").toString()))
                    .hotelName((String) request.get("hotelName"))
                    .roomNumber((String) request.get("roomNumber"))
                    .roomType((String) request.get("roomType"))
                    .checkIn((String) request.get("checkIn"))
                    .checkOut((String) request.get("checkOut"))
                    .guests(Integer.parseInt(request.get("guests").toString()))
                    .totalAmount(Double.parseDouble(request.get("totalAmount").toString()))
                    .addons((List<String>) request.get("addons"))
                    .build();

            Booking savedBooking = bookingService.createBooking(booking);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("booking", savedBooking);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping({"/api/bookings/{id}/status", "/booking/{id}", "/api/bookings/{id}"})
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String newStatus = request.get("status");
            Booking updatedBooking = bookingService.updateBookingStatus(id, newStatus);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("booking", updatedBooking);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping({"/api/bookings/{id}", "/booking/{id}"})
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            // Cancel booking sets status to CANCELLED and refund payment status
            Booking cancelledBooking = bookingService.updateBookingStatus(id, "CANCELLED");

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("booking", cancelledBooking);
            response.put("message", "Booking cancelled successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
