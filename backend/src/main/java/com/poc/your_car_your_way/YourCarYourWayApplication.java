package com.poc.your_car_your_way;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class YourCarYourWayApplication {
	public static void main(String[] args) {
		SpringApplication.run(YourCarYourWayApplication.class, args);
	}
}
