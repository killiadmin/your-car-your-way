package com.poc.your_car_your_way.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "ADDRESS")
public class Address {

    @Id
    @Column(name = "address_id", columnDefinition = "CHAR(36)")
    private UUID address_id;

    @NotBlank(message = "Street is mandatory")
    @Column(name = "street", nullable = false)
    private String street;

    @NotBlank(message = "City is mandatory")
    @Column(name = "city", nullable = false)
    private String city;

    @NotBlank(message = "Postal code is mandatory")
    @Column(name = "postal_code", nullable = false)
    private String postal_code;

    @NotBlank(message = "Country is mandatory")
    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "entity_id", columnDefinition = "CHAR(36)", nullable = false)
    private UUID entity_id;

    public Address() {
        this.address_id = UUID.randomUUID();
    }

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }
}
