package com.example.example3.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.example3.entity.User; // Import the User entity

public interface UserService { // Rename the interface

    public User createUser(User user); // Rename the methods
    public User getUserById(Long userId);
    public Page<User> getAllUsers(Pageable pageable);
    public User updateUser(User user);
    public void deleteUser(Long userId);
}
