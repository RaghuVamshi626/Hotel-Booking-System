package com.hotel.booking.service.impl;

import com.hotel.booking.model.Booking;
import com.hotel.booking.model.Hotel;
import com.hotel.booking.model.Room;
import com.hotel.booking.model.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.UserRepository;
import com.hotel.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getBookingsByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return bookingRepository.findByUserId(userOpt.get().getId());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Booking createBooking(Booking booking) {
        // Generate a ticket ID if not present
        if (booking.getTicketId() == null || booking.getTicketId().isEmpty()) {
            booking.setTicketId("AH-" + (int)(100000 + Math.random() * 900000));
        }
        booking.setStatus("UPCOMING");
        booking.setPaymentStatus("PAID");

        // Save booking
        bookingRepository.save(booking);

        // Update Room availability to false
        Optional<Hotel> hotelOpt = hotelRepository.findById(booking.getHotelId());
        if (hotelOpt.isPresent()) {
            Hotel hotel = hotelOpt.get();
            for (Room room : hotel.getRooms()) {
                if (room.getNumber().equals(booking.getRoomNumber())) {
                    room.setAvailable(false);
                    break;
                }
            }
            hotelRepository.save(hotel);
        }

        // Award loyalty points to user
        Optional<User> userOpt = userRepository.findById(booking.getUserId());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if ("GUEST".equals(user.getRole())) {
                int ptsEarned = (int) Math.round(booking.getTotalAmount() * 0.1);
                user.setLoyaltyPoints(user.getLoyaltyPoints() + ptsEarned);
                user.setLoyaltyTier(user.getLoyaltyPoints() > 3000 ? "Platinum" : "Gold");
                userRepository.save(user);
            }
        }

        return booking;
    }

    @Override
    @Transactional
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        String oldStatus = booking.getStatus();
        booking.setStatus(status);

        if ("CANCELLED".equals(status)) {
            booking.setPaymentStatus("REFUNDED");

            // Make room available again
            Optional<Hotel> hotelOpt = hotelRepository.findById(booking.getHotelId());
            if (hotelOpt.isPresent()) {
                Hotel hotel = hotelOpt.get();
                for (Room room : hotel.getRooms()) {
                    if (room.getNumber().equals(booking.getRoomNumber())) {
                        room.setAvailable(true);
                        break;
                    }
                }
                hotelRepository.save(hotel);
            }
        } else if ("UPCOMING".equals(status) && "CANCELLED".equals(oldStatus)) {
            // Re-booking a cancelled reservation makes room unavailable again
            Optional<Hotel> hotelOpt = hotelRepository.findById(booking.getHotelId());
            if (hotelOpt.isPresent()) {
                Hotel hotel = hotelOpt.get();
                for (Room room : hotel.getRooms()) {
                    if (room.getNumber().equals(booking.getRoomNumber())) {
                        room.setAvailable(false);
                        break;
                    }
                }
                hotelRepository.save(hotel);
            }
        }

        return bookingRepository.save(booking);
    }
}
