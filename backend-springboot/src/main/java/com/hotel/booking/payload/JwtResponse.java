package com.hotel.booking.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String status = "SUCCESS";
    private UserDetailsResponse user;

    public JwtResponse(String accessToken, UserDetailsResponse user) {
        this.token = accessToken;
        this.user = user;
    }

    @Data
    @AllArgsConstructor
    public static class UserDetailsResponse {
        private Long id;
        private String email;
        private String fullName;
        private String role;
        private int loyaltyPoints;
        private String loyaltyTier;
        private String preferredBeverage;
        private String preferredPillow;
        private String preferredSoundscape;
    }
}
