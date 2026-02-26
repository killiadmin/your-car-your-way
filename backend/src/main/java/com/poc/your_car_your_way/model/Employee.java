package com.poc.your_car_your_way.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "EMPLOYEE")
public class Employee {

    @Id
    @Column(name = "employee_id", columnDefinition = "CHAR(36)")
    private UUID employee_id;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "First name is mandatory")
    @Column(name = "first_name", nullable = false)
    private String first_name;

    @NotBlank(message = "Last name is mandatory")
    @Column(name = "last_name", nullable = false)
    private String last_name;

    @NotBlank(message = "Role is mandatory")
    @Column(name = "role", nullable = false)
    private String role;

    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    public Employee() {
        this.employee_id = UUID.randomUUID();
    }

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }
}
