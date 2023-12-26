package com.example.example3.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.example3.entity.Order; 

public interface OrderService {  
    
    public Order createOrder(Order order); 
    public Order getOrderById(Long orderId);  
    public Page<Order> getAllOrders(Pageable pageable);
    public Order updateOrder(Order order); 
    public void deleteOrder(Long orderId); 
}
