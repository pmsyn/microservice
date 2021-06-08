package com.ms.serviceapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.ms.serviceapi.*")
public class ServiceapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceapiApplication.class, args);
    }

}
