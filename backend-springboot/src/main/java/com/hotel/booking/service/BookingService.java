package com.hotel.booking.service;

import com.hotel.booking.model.Booking;
import java.util.List;

public interface BookingService {
    List<Booking> getBookingsByUserId(Long userId);
    List<Booking> getBookingsByEmail(String email);
    Booking createBooking(Booking booking);
    Booking updateBookingStatus(Long id, String status);
}
