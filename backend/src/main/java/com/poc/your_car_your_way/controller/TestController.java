package com.poc.your_car_your_way.controller;

import com.poc.your_car_your_way.model.Agency;
import com.poc.your_car_your_way.service.AgencyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final AgencyService agencyService;

    public TestController(AgencyService agencyService) {
        this.agencyService = agencyService;
    }

    @GetMapping("/agencies")
    public List<Agency> getAgencies() {
        return agencyService.findAll();
    }

    @PostMapping("/agencies")
    public Agency createAgency(@RequestBody Agency agency) {
        return agencyService.save(agency);
    }
}
