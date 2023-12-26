package com.example.example3.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.example3.entity.Order;
import com.example.example3.service.OrderService;  // Thay thế CategoryService bằng OrderService

@RestController
@AllArgsConstructor
@RequestMapping("api/orders")  // Thay đổi đường dẫn thành "api/orders"
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class OrderController {

    private OrderService orderService;  // Thay thế CategoryService bằng OrderService

    // Create Order REST API
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {  // Thay thế Category bằng Order
        Order savedOrder = orderService.createOrder(order);  // Thay thế CategoryService bằng OrderService
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    // Get Order by id REST API
    // http://localhost:8080/api/orders/1  // Thay đổi đường dẫn
    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long orderId) {  // Thay thế categoryId bằng orderId
        Order order = orderService.getOrderById(orderId);  // Thay thế getCategoryById bằng getOrderById
        if (order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get All Orders REST API
    // http://localhost:8080/api/orders  // Thay đổi đường dẫn
    @GetMapping
    public ResponseEntity<Page<Order>> getAllOrders(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderService.getAllOrders(pageable);  // Thay thế Categories bằng orders
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Update Order REST API
    @PutMapping("{id}")
    // http://localhost:8080/api/orders/1  // Thay đổi đường dẫn
    public ResponseEntity<Order> updateOrder(@PathVariable("id") Long orderId,
            @RequestBody Order order) {  // Thay thế Category bằng Order
        order.setId(orderId);
        Order updatedOrder = orderService.updateOrder(order);  // Thay thế CategoryService bằng OrderService
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    // Delete Order REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable("id") Long orderId) {  // Thay thế categoryId bằng orderId
        orderService.deleteOrder(orderId);  // Thay thế deleteCategory bằng deleteOrder
        return new ResponseEntity<>("Order successfully deleted!", HttpStatus.OK);
    }
}
