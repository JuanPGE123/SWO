package com.swo.api.config;

import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializa datos esenciales del sistema al arrancar.
 * Crea el usuario administrador si no existe.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        crearAdminSiNoExiste();
    }

    private void crearAdminSiNoExiste() {
        if (!usuarioRepository.existsByCorreo("admin@swo.com")) {
            Usuario admin = new Usuario();
            admin.setNombreCompleto("Administrador SWO");
            admin.setCorreo("admin@swo.com");
            admin.setPasswordHash(passwordEncoder.encode("Admin1234"));
            admin.setRol("Administrador");
            admin.setEstado(true);
            admin.setDepartamento("TI");
            admin.setTelefono("3000000000");
            Usuario guardado = usuarioRepository.save(admin);
            log.info("✅ Usuario admin creado con ID: {}", guardado.getIdUsuario());
        } else {
            Long id = usuarioRepository.findByCorreo("admin@swo.com")
                    .map(u -> u.getIdUsuario()).orElse(1L);
            log.info("ℹ️ Usuario admin ya existe con ID: {}", id);
        }
    }
}
