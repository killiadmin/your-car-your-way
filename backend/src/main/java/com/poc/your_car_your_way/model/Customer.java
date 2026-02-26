package com.poc.your_car_your_way.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "CUSTOMER")
public class Customer {

    @Id
    @Column(name = "customer_id", columnDefinition = "CHAR(36)")
    private UUID customer_id;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank(message = "First name is mandatory")
    @Column(name = "first_name", nullable = false)
    private String first_name;

    @NotBlank(message = "Last name is mandatory")
    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(name = "phone", nullable = false)
    private String phone;

    @NotNull(message = "Birthday is mandatory")
    @Past(message = "Birthday must be in the past")
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Transient
    private List<Address> addresses = new ArrayList<>();

    public Customer() {
        this.customer_id = UUID.randomUUID();
    }

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }

    public void addAddress(Address address) {
        address.setEntity_id(this.customer_id);
        this.addresses.add(address);
    }

    public void removeAddress(Address address) {
        this.addresses.remove(address);
    }
}
