package com.poc.your_car_your_way.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "AGENCY")
public class Agency {

    @Id
    @Column(name = "agencyId", columnDefinition = "CHAR(36)")
    private String agencyId;

    @Column(name = "name", nullable = false)
    private String name;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Agency() {
        this.agencyId = UUID.randomUUID().toString();
    }
}
