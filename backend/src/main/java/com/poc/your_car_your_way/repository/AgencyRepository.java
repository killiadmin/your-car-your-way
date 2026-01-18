package com.poc.your_car_your_way.repository;

import com.poc.your_car_your_way.model.Agency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgencyRepository extends JpaRepository<Agency, String> {
}
