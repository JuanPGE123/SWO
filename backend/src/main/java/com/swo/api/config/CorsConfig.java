package com.swo.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuración global de CORS para la API SWO.
 * <p>
 * Permite peticiones desde el frontend Angular (localhost:4200) y otros orígenes
 * autorizados definidos en esta clase. En producción, reemplaza los orígenes
 * por los dominios oficiales del sistema.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ── Orígenes permitidos ──────────────────────────────────────────────
        config.setAllowedOrigins(List.of(
                "http://localhost:4200",    // Angular dev server
                "http://localhost:8080",    // Legacy Servlet module
                "http://127.0.0.1:4200"
        ));

        // ── Métodos HTTP permitidos ──────────────────────────────────────────
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // ── Headers permitidos en la petición ────────────────────────────────
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "X-Api-Key"
        ));

        // ── Headers expuestos en la respuesta ────────────────────────────────
        config.setExposedHeaders(List.of("Authorization", "Content-Disposition"));

        // ── Permitir cookies / credenciales ──────────────────────────────────
        config.setAllowCredentials(true);

        // ── Tiempo de caché del preflight (en segundos) ──────────────────────
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
