package com.hotel.booking.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Email
    @Size(max = 100)
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    private String role; // "GUEST" or "ADMIN"

    private String preferredBeverage;
    private String preferredPillow;
    private String preferredSoundscape;
}
