package com.swo.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Punto de entrada de la aplicación SWO API.
 * <p>
 * Expone los servicios REST en: http://localhost:8081/api
 * Swagger UI disponible en:    http://localhost:8081/api/swagger-ui.html
 */
@SpringBootApplication
@EnableJpaAuditing
public class SwoApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SwoApiApplication.class, args);
    }
}
