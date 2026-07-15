package com.hotel.booking.controller;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.Room;
import com.hotel.booking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping({"/api/hotels", "/hotels"})
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @GetMapping({"/api/hotels/{id}", "/hotel/{id}"})
    public ResponseEntity<?> getHotelById(@PathVariable Long id) {
        try {
            Hotel hotel = hotelService.getHotelById(id);
            return ResponseEntity.ok(hotel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping({"/api/hotels/{hotelId}/rooms", "/hotels/{hotelId}/rooms"})
    public ResponseEntity<?> addRoomToHotel(@PathVariable Long hotelId, @RequestBody Map<String, Object> request) {
        try {
            Room room = Room.builder()
                    .number((String) request.get("number"))
                    .type((String) request.get("type"))
                    .description((String) request.get("description"))
                    .price(Double.parseDouble(request.get("price").toString()))
                    .maxGuests(Integer.parseInt(request.get("maxGuests").toString()))
                    .amenities((List<String>) request.get("amenities"))
                    .imageUrl((String) request.get("imageUrl"))
                    .isAvailable(true)
                    .build();

            Room savedRoom = hotelService.addRoomToHotel(hotelId, room);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("room", savedRoom);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping({"/api/hotels/{hotelId}/rooms/{roomId}", "/hotels/{hotelId}/rooms/{roomId}"})
    public ResponseEntity<?> deleteRoom(@PathVariable Long hotelId, @PathVariable Long roomId) {
        try {
            hotelService.deleteRoom(hotelId, roomId);
            Map<String, String> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Room deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
