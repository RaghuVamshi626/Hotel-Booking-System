package com.hotel.booking.service.impl;

import com.hotel.booking.model.Booking;
import com.hotel.booking.model.Room;
import com.hotel.booking.model.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import com.hotel.booking.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Map<String, Object> getDashboardStatistics() {
        List<User> users = userRepository.findAll();
        List<Booking> bookings = bookingRepository.findAll();
        List<Room> rooms = roomRepository.findAll();

        long totalUsers = users.size();
        long totalHotels = hotelRepository.count();
        long totalBookings = bookings.size();

        // Today's Bookings
        LocalDate today = LocalDate.now();
        long todaysBookings = bookings.stream()
                .filter(b -> b.getCreatedAt() != null && b.getCreatedAt().toLocalDate().equals(today))
                .count();

        // Revenue: Sum of totalAmount for non-cancelled bookings
        double revenue = bookings.stream()
                .filter(b -> !"CANCELLED".equalsIgnoreCase(b.getStatus()))
                .mapToDouble(Booking::getTotalAmount)
                .sum();

        // Pending/Upcoming Bookings
        long pendingBookings = bookings.stream()
                .filter(b -> "UPCOMING".equalsIgnoreCase(b.getStatus()) || "PENDING".equalsIgnoreCase(b.getStatus()))
                .count();

        // Cancelled Bookings
        long cancelledBookings = bookings.stream()
                .filter(b -> "CANCELLED".equalsIgnoreCase(b.getStatus()))
                .count();

        // Rooms availability
        long availableRooms = rooms.stream().filter(Room::isAvailable).count();
        long occupiedRooms = rooms.stream().filter(r -> !r.isAvailable()).count();

        // Recent Bookings (top 5)
        List<Booking> recentBookings = bookings.stream()
                .sorted((b1, b2) -> {
                    LocalDateTime t1 = b1.getCreatedAt() != null ? b1.getCreatedAt() : LocalDateTime.MIN;
                    LocalDateTime t2 = b2.getCreatedAt() != null ? b2.getCreatedAt() : LocalDateTime.MIN;
                    return t2.compareTo(t1); // descending
                })
                .limit(5)
                .collect(Collectors.toList());

        // Recent Users (top 5 sorted by ID desc)
        List<User> recentUsers = users.stream()
                .sorted((u1, u2) -> u2.getId().compareTo(u1.getId()))
                .limit(5)
                .collect(Collectors.toList());

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalHotels", totalHotels);
        stats.put("totalBookings", totalBookings);
        stats.put("todaysBookings", todaysBookings);
        stats.put("revenue", revenue);
        stats.put("pendingBookings", pendingBookings);
        stats.put("cancelledBookings", cancelledBookings);
        stats.put("availableRooms", availableRooms);
        stats.put("occupiedRooms", occupiedRooms);
        stats.put("recentBookings", recentBookings);
        stats.put("recentUsers", recentUsers);

        return stats;
    }
}
