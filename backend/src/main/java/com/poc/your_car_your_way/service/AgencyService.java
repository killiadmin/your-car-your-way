package com.poc.your_car_your_way.service;

import com.poc.your_car_your_way.model.Agency;
import com.poc.your_car_your_way.repository.AgencyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgencyService {

    private final AgencyRepository agencyRepository;

    public AgencyService(AgencyRepository agencyRepository) {
        this.agencyRepository = agencyRepository;
    }

    public List<Agency> findAll() {
        return agencyRepository.findAll();
    }

    public Agency save(Agency agency) {
        return agencyRepository.save(agency);
    }
}
