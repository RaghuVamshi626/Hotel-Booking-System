package com.hotel.booking.security;

import com.hotel.booking.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String email;

    @JsonIgnore
    private String password;
    private String fullName;
    private String role;
    private int loyaltyPoints;
    private String loyaltyTier;
    private String preferredBeverage;
    private String preferredPillow;
    private String preferredSoundscape;

    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, String email, String password, String fullName, String role,
                             int loyaltyPoints, String loyaltyTier, String preferredBeverage,
                             String preferredPillow, String preferredSoundscape,
                             Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.loyaltyPoints = loyaltyPoints;
        this.loyaltyTier = loyaltyTier;
        this.preferredBeverage = preferredBeverage;
        this.preferredPillow = preferredPillow;
        this.preferredSoundscape = preferredSoundscape;
        this.authorities = authorities;
    }

    public static CustomUserDetails build(User user) {
        // Ensure role is prefixed with ROLE_ for Spring Security role-based matching
        String roleWithPrefix = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" + user.getRole();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roleWithPrefix);

        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getFullName(),
                user.getRole(),
                user.getLoyaltyPoints(),
                user.getLoyaltyTier(),
                user.getPreferredBeverage(),
                user.getPreferredPillow(),
                user.getPreferredSoundscape(),
                Collections.singletonList(authority)
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getRole() {
        return role;
    }

    public int getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public String getLoyaltyTier() {
        return loyaltyTier;
    }

    public String getPreferredBeverage() {
        return preferredBeverage;
    }

    public String getPreferredPillow() {
        return preferredPillow;
    }

    public String getPreferredSoundscape() {
        return preferredSoundscape;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // Email acts as the username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomUserDetails user = (CustomUserDetails) o;
        return Objects.equals(id, user.id);
    }
}
