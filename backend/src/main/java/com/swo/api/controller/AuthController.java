package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/login")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoint de login del sistema SWO")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping
    @Operation(summary = "Iniciar sesión", description = "Autentica al usuario con correo y contraseña")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(
            @RequestBody Map<String, String> body) {

        String correo   = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "");

        if (correo.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.badRequest("Correo y contraseña son obligatorios"));
        }

        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario == null || !Boolean.TRUE.equals(usuario.getEstado())) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error(401, "Credenciales inválidas o usuario inactivo"));
        }

        if (!passwordEncoder.matches(password, usuario.getPasswordHash())) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error(401, "Credenciales inválidas"));
        }

        // Actualizar última conexión
        usuario.setUltimaConexion(LocalDateTime.now());
        usuarioRepository.save(usuario);

        Map<String, Object> data = Map.of(
                "success",     true,
                "id",          usuario.getIdUsuario(),
                "nombre",      usuario.getNombreCompleto(),
                "correo",      usuario.getCorreo(),
                "rol",         usuario.getRol(),
                "departamento", usuario.getDepartamento() != null ? usuario.getDepartamento() : "",
                "telefono",    usuario.getTelefono() != null ? usuario.getTelefono() : ""
        );

        log.info("Login exitoso: {}", correo);
        return ResponseEntity.ok(ApiResponse.ok("Login exitoso", data));
    }
}
