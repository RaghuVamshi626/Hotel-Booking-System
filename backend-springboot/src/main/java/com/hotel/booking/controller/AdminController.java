package com.hotel.booking.controller;

import com.hotel.booking.model.Booking;
import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.UserRepository;
import com.hotel.booking.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping({"/api/admin/dashboard", "/admin/dashboard"})
    public ResponseEntity<Map<String, Object>> getDashboardStatistics() {
        return ResponseEntity.ok(adminService.getDashboardStatistics());
    }

    @GetMapping({"/api/admin/bookings", "/admin/bookings"})
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping({"/api/admin/users", "/admin/users"})
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping({"/api/admin/hotel", "/admin/hotel"})
    public ResponseEntity<?> createHotel(@RequestBody Hotel hotel) {
        try {
            Hotel savedHotel = hotelRepository.save(hotel);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("hotel", savedHotel);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Supports PUT with ID in body, path, or query parameter
    @PutMapping({"/api/admin/hotel", "/admin/hotel", "/api/admin/hotel/{id}", "/admin/hotel/{id}"})
    public ResponseEntity<?> updateHotel(
            @PathVariable(required = false) Long id,
            @RequestParam(required = false) Long idParam,
            @RequestBody Hotel hotelDetails) {
        try {
            Long hotelId = id != null ? id : (idParam != null ? idParam : hotelDetails.getId());
            if (hotelId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Hotel ID is required for update"));
            }

            Optional<Hotel> hotelOpt = hotelRepository.findById(hotelId);
            if (hotelOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Hotel hotel = hotelOpt.get();
            if (hotelDetails.getName() != null) hotel.setName(hotelDetails.getName());
            if (hotelDetails.getLocation() != null) hotel.setLocation(hotelDetails.getLocation());
            if (hotelDetails.getRating() > 0) hotel.setRating(hotelDetails.getRating());
            if (hotelDetails.getDescription() != null) hotel.setDescription(hotelDetails.getDescription());
            if (hotelDetails.getBasePrice() > 0) hotel.setBasePrice(hotelDetails.getBasePrice());
            if (hotelDetails.getAmenities() != null) hotel.setAmenities(hotelDetails.getAmenities());
            if (hotelDetails.getImageUrl() != null) hotel.setImageUrl(hotelDetails.getImageUrl());

            Hotel updatedHotel = hotelRepository.save(hotel);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("hotel", updatedHotel);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Supports DELETE with ID in path or query parameter
    @DeleteMapping({"/api/admin/hotel/{id}", "/admin/hotel/{id}", "/api/admin/hotel", "/admin/hotel"})
    public ResponseEntity<?> deleteHotel(
            @PathVariable(required = false) Long id,
            @RequestParam(required = false) Long idParam) {
        try {
            Long hotelId = id != null ? id : idParam;
            if (hotelId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Hotel ID is required for deletion"));
            }

            if (!hotelRepository.existsById(hotelId)) {
                return ResponseEntity.notFound().build();
            }

            hotelRepository.deleteById(hotelId);
            Map<String, String> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Hotel deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
