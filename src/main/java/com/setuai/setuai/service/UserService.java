package com.setuai.setuai.service;

import com.setuai.setuai.model.User;
import com.setuai.setuai.model.LoginRequest;
import com.setuai.setuai.repository.UserRepository;
import com.setuai.setuai.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // REGISTER
    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // Encrypt the password using BCrypt
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // LOGIN
    public String loginUser(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isPresent()) {
            // Verify BCrypt password
            if (passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
                // Generate and return JWT Token
                return jwtUtil.generateToken(user.get().getEmail());
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong Password");
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}