package com.hotel.booking.service.impl;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.Room;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));
    }

    @Override
    @Transactional
    public Room addRoomToHotel(Long hotelId, Room room) {
        Hotel hotel = getHotelById(hotelId);
        room.setHotel(hotel);
        hotel.getRooms().add(room);
        hotelRepository.save(hotel);
        return room;
    }

    @Override
    @Transactional
    public void deleteRoom(Long hotelId, Long roomId) {
        Hotel hotel = getHotelById(hotelId);
        hotel.getRooms().removeIf(r -> r.getId().equals(roomId));
        hotelRepository.save(hotel);
    }
}
