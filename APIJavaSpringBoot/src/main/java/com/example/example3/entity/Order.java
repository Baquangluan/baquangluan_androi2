package com.example.example3.entity;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fullname;

    @Column
    private Date order_date;

    @Column
    private BigDecimal total_money;

    @Column
    private String title;

    @Column
    private String description;

    @JsonIgnore
    public void setOrderDate(Date order_date) {
        this.order_date = order_date;
    }

    public void setTotalMoney(BigDecimal total_money) {
        this.total_money = total_money;
    }

    public BigDecimal getTotalMoney() {
        return total_money;
    }

    public Date getOrderDate() {
        return order_date;
    }


}
