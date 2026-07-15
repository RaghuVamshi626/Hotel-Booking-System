package com.hotel.booking.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticketId; // e.g. "AH-193821"
    private Long userId;
    private Long hotelId;
    private String hotelName;
    private String roomNumber;
    private String roomType;
    private String checkIn;
    private String checkOut;
    private int guests;
    private double totalAmount;
    private String status; // "UPCOMING", "COMPLETED", "CANCELLED"
    private String paymentStatus; // "PAID", "REFUNDED"

    @ElementCollection
    private List<String> addons;

    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
    }
}
