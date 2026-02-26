package com.poc.your_car_your_way.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "AGENCY")
public class Agency {

    @Id
    @Column(name = "agency_id", columnDefinition = "CHAR(36)")
    private String agency_id;

    @Column(name = "name", nullable = false)
    private String name;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime created_at;

    @Transient
    private List<Address> addresses = new ArrayList<>();

    public void addAddress(Address address) {
        address.setEntity_id(UUID.fromString(this.agency_id));
        this.addresses.add(address);
    }

    public Agency() {
        this.agency_id = UUID.randomUUID().toString();
    }

    public void removeAddress(Address address) {
        this.addresses.remove(address);
    }

}
