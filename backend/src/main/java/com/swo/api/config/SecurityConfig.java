package com.swo.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuración de Spring Security para la API SWO.
 * <p>
 * Estado actual: todos los endpoints son públicos para facilitar el desarrollo.
 * TODO: implementar autenticación JWT antes del despliegue a producción.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /** Rutas siempre públicas (Swagger UI, actuator, etc.). */
    private static final String[] PUBLIC_PATHS = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/actuator/health"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   CorsConfig corsConfig) throws Exception {
        http
            // Usar la configuración CORS centralizada
            .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
            // Deshabilitar CSRF (API stateless)
            .csrf(AbstractHttpConfigurer::disable)
            // Sin sesión HTTP (stateless REST)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Autorización: TODO → reemplazar por JWT en producción
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(PUBLIC_PATHS).permitAll()
                    .anyRequest().permitAll()  // ← Cambiar a .authenticated() con JWT
            );

        return http.build();
    }

    /**
     * Bean de BCrypt para hashear contraseñas con factor de trabajo 12.
     * Inyectado en los servicios que gestionan usuarios.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
