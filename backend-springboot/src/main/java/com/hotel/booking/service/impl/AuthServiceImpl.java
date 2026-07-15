package com.hotel.booking.service.impl;

import com.hotel.booking.model.User;
import com.hotel.booking.payload.LoginRequest;
import com.hotel.booking.payload.SignupRequest;
import com.hotel.booking.payload.JwtResponse;
import com.hotel.booking.payload.JwtResponse.UserDetailsResponse;
import com.hotel.booking.repository.UserRepository;
import com.hotel.booking.security.JwtUtils;
import com.hotel.booking.security.CustomUserDetails;
import com.hotel.booking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public JwtResponse register(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered.");
        }

        String role = signupRequest.getRole() != null ? signupRequest.getRole() : "GUEST";

        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .fullName(signupRequest.getFullName())
                .role(role)
                .loyaltyPoints(role.equals("GUEST") ? 1250 : 0)
                .loyaltyTier("Gold")
                .preferredBeverage(signupRequest.getPreferredBeverage() != null ? signupRequest.getPreferredBeverage() : "Champagne")
                .preferredPillow(signupRequest.getPreferredPillow() != null ? signupRequest.getPreferredPillow() : "Goose Down")
                .preferredSoundscape(signupRequest.getPreferredSoundscape() != null ? signupRequest.getPreferredSoundscape() : "Ocean Waves")
                .build();

        userRepository.save(user);

        // Generate token immediately on registration
        String jwt = jwtUtils.generateJwtTokenForUsername(user.getEmail());

        UserDetailsResponse userResponse = new UserDetailsResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getLoyaltyPoints(),
                user.getLoyaltyTier(),
                user.getPreferredBeverage(),
                user.getPreferredPillow(),
                user.getPreferredSoundscape()
        );

        return new JwtResponse(jwt, userResponse);
    }

    @Override
    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        UserDetailsResponse userResponse = new UserDetailsResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getFullName(),
                userDetails.getRole(),
                userDetails.getLoyaltyPoints(),
                userDetails.getLoyaltyTier(),
                userDetails.getPreferredBeverage(),
                userDetails.getPreferredPillow(),
                userDetails.getPreferredSoundscape()
        );

        return new JwtResponse(jwt, userResponse);
    }
}
