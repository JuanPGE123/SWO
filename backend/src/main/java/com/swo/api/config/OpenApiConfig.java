package com.swo.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de OpenAPI 3 / Swagger UI para la API SWO.
 * <p>
 * Acceso:
 * <ul>
 *   <li>Swagger UI: http://localhost:8081/api/swagger-ui.html</li>
 *   <li>OpenAPI JSON: http://localhost:8081/api/v3/api-docs</li>
 * </ul>
 */
@Configuration
public class OpenApiConfig {

    @Value("${server.port:8081}")
    private String serverPort;

    @Bean
    public OpenAPI swoOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SWO API — Sistema de Gestión de Incidencias")
                        .description("""
                                API RESTful para el sistema SWO (Sistema Web de Operaciones).
                                Proporciona endpoints para la gestión de **Usuarios**, **Incidencias** y **Categorías**.
                                
                                ## Convenciones
                                - Todas las respuestas siguen el envelope `ApiResponse<T>`.
                                - Los errores retornan `success: false` con un mensaje descriptivo.
                                - Paginación disponible en listados con los parámetros `page` y `size`.
                                """)
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo SWO")
                                .email("dev@swo.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:" + serverPort + "/api")
                                .description("Servidor de Desarrollo"),
                        new Server()
                                .url("https://api.swo.com")
                                .description("Servidor de Producción (referencia)")
                ));
    }
}
