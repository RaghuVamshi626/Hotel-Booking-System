package com.hotel.booking.config;

import com.hotel.booking.model.User;
import com.hotel.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PasswordHasherRunner implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            String rawPassword = user.getPassword();
            // BCrypt hashes normally start with $2a$, $2b$, or $2y$ and are 60 characters long
            if (rawPassword != null && !rawPassword.startsWith("$2a$") && !rawPassword.startsWith("$2b$") && !rawPassword.startsWith("$2y$")) {
                String hashedPassword = passwordEncoder.encode(rawPassword);
                user.setPassword(hashedPassword);
                userRepository.save(user);
                System.out.println("Encoded plain text password for user: " + user.getEmail());
            }
        }
    }
}
