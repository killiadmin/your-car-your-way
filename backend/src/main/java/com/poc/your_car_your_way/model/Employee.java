package com.poc.your_car_your_way.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "EMPLOYEE")
public class Employee {

    @Id
    @Column(name = "employeeId", columnDefinition = "CHAR(36)")
    private String employeeId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "role", nullable = false)
    private String role;

    @ManyToOne
    @JoinColumn(name = "agencyId", nullable = false)
    private Agency agency;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    public Employee() {
        this.employeeId = UUID.randomUUID().toString();
    }
}
