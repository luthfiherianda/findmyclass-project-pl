
package com.findmyclass.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.findmyclass.model.User;
import com.findmyclass.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> userMap) {
        String username = userMap.get("username");
        String password = userMap.get("password");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return Map.of("message", "Login successful", "username", username);
        } else {
            return Map.of("error", "Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody Map<String, String> userMap) {
    String username = userMap.get("username");
    String password = userMap.get("password");

    if (userRepository.findByUsername(username).isPresent()) {
        return Map.of("error", "Username sudah digunakan");
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);

    return Map.of("message", "Signup berhasil", "username", username);
}
}
