package com.hotel.booking.controller;

import com.hotel.booking.model.User;
import com.hotel.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String fullName = request.get("fullName");
        String role = request.getOrDefault("role", "GUEST");

        if (userRepository.findByEmail(email).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Email is already registered.");
            return ResponseEntity.badRequest().body(response);
        }

        User user = User.builder()
                .email(email)
                .password(password) // Note: In production, please use BCryptPasswordEncoder
                .fullName(fullName)
                .role(role)
                .loyaltyPoints(role.equals("GUEST") ? 1250 : 0)
                .loyaltyTier("Gold")
                .build();

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid email or password credentials.");
            return ResponseEntity.status(401).body(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("user", userOpt.get());
        return ResponseEntity.ok(response);
    }
}
