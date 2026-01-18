package com.poc.your_car_your_way.repository;

import com.poc.your_car_your_way.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
