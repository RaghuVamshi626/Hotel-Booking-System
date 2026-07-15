package com.hotel.booking.service;

import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.Room;
import java.util.List;

public interface HotelService {
    List<Hotel> getAllHotels();
    Hotel getHotelById(Long id);
    Room addRoomToHotel(Long hotelId, Room room);
    void deleteRoom(Long hotelId, Long roomId);
}
