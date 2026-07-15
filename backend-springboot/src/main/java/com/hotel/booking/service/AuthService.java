package com.hotel.booking.service;

import com.hotel.booking.payload.LoginRequest;
import com.hotel.booking.payload.SignupRequest;
import com.hotel.booking.payload.JwtResponse;

public interface AuthService {
    JwtResponse register(SignupRequest signupRequest);
    JwtResponse login(LoginRequest loginRequest);
}
