package com.example.example3.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.example3.entity.User; // Import the User entity
import com.example.example3.service.UserService; // Import the UserService

@RestController
@AllArgsConstructor
@RequestMapping("api/users")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class UserController { 

    private UserService userService; // Rename the service

    // Create User REST API
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) { // Rename the method
        User savedUser = userService.createUser(user); // Rename the service method
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get User by id REST API
    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long userId) { // Rename the method and parameter
        User user = userService.getUserById(userId); // Rename the service method
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get All Users REST API
    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.getAllUsers(pageable); // Rename the service method
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Update User REST API
    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long userId,
            @RequestBody User user) { // Rename the method and parameter
        user.setId(userId);
        User updatedUser = userService.updateUser(user); // Rename the service method
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) { // Rename the parameter
        userService.deleteUser(userId); // Rename the service method
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }
}
