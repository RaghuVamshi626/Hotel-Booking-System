package com.hotel.booking.controller;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.Room;
import com.hotel.booking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return ResponseEntity.ok(hotelRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHotelById(@PathVariable Long id) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(id);
        if (hotelOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(hotelOpt.get());
    }

    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<?> addRoomToHotel(@PathVariable Long hotelId, @RequestBody Map<String, Object> request) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(hotelId);
        if (hotelOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Hotel hotel = hotelOpt.get();
        Room room = Room.builder()
                .number((String) request.get("number"))
                .type((String) request.get("type"))
                .description((String) request.get("description"))
                .price(Double.parseDouble(request.get("price").toString()))
                .maxGuests(Integer.parseInt(request.get("maxGuests").toString()))
                .amenities((List<String>) request.get("amenities"))
                .imageUrl((String) request.get("imageUrl"))
                .isAvailable(true)
                .hotel(hotel)
                .build();

        hotel.getRooms().add(room);
        hotelRepository.save(hotel);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("room", room);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{hotelId}/rooms/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long hotelId, @PathVariable Long roomId) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(hotelId);
        if (hotelOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Hotel hotel = hotelOpt.get();
        hotel.getRooms().removeIf(r -> r.getId().equals(roomId));
        hotelRepository.save(hotel);

        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Room deleted successfully");
        return ResponseEntity.ok(response);
    }
}
