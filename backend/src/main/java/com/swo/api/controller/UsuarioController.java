package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.UsuarioRequestDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de usuarios del sistema SWO.
 * <p>
 * Base URL: {@code /api/v1/usuarios}
 */
@RestController
@RequestMapping("/v1/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Operaciones CRUD sobre los usuarios del sistema SWO")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // ── GET /v1/usuarios ────────────────────────────────────────────────────

    @GetMapping
    @Operation(summary = "Listar todos los usuarios",
               description = "Retorna la lista completa de usuarios registrados. No expone contraseñas.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200",
            description = "Lista obtenida exitosamente")
    })
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> listarTodos() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listarTodos()));
    }

    // ── GET /v1/usuarios/activos ─────────────────────────────────────────────

    @GetMapping("/activos")
    @Operation(summary = "Listar usuarios activos",
               description = "Retorna únicamente los usuarios con estado activo (estado = true).")
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> listarActivos() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listarActivos()));
    }

    // ── GET /v1/usuarios/{id} ────────────────────────────────────────────────

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID",
               description = "Busca y retorna un usuario específico por su identificador único.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> buscarPorId(
            @Parameter(description = "ID único del usuario", example = "1")
            @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.buscarPorId(id)));
    }

    // ── GET /v1/usuarios/correo/{correo} ─────────────────────────────────────

    @GetMapping("/correo/{correo}")
    @Operation(summary = "Obtener usuario por correo electrónico")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> buscarPorCorreo(
            @Parameter(description = "Correo electrónico del usuario", example = "admin@swo.com")
            @PathVariable String correo) {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.buscarPorCorreo(correo)));
    }

    // ── POST /v1/usuarios ───────────────────────────────────────────────────

    @PostMapping
    @Operation(summary = "Crear un nuevo usuario",
               description = "Registra un nuevo usuario en el sistema. La contraseña se almacena hasheada con BCrypt.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Usuario creado exitosamente"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "El correo ya está registrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> crear(
            @Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO creado = usuarioService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(creado));
    }

    // ── PUT /v1/usuarios/{id} ────────────────────────────────────────────────

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un usuario existente",
               description = "Actualiza todos los campos de un usuario. Si se incluye contraseña, se re-hashea.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario actualizado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Usuario actualizado exitosamente", usuarioService.actualizar(id, dto)));
    }

    // ── PATCH /v1/usuarios/{id}/desactivar ───────────────────────────────────

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar un usuario (soft delete)",
               description = "Marca el usuario como inactivo sin eliminarlo físicamente de la base de datos.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario desactivado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<Void>> desactivar(@PathVariable Long id) {
        usuarioService.desactivar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario desactivado exitosamente", null));
    }

    // ── PATCH /v1/usuarios/{id}/activar ──────────────────────────────────────

    @PatchMapping("/{id}/activar")
    @Operation(summary = "Activar un usuario",
               description = "Marca el usuario como activo. Útil para reactivar usuarios previamente desactivados.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario activado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<Void>> activar(@PathVariable Long id) {
        usuarioService.activar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario activado exitosamente", null));
    }

    // ── DELETE /v1/usuarios/{id} ─────────────────────────────────────────────

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un usuario permanentemente",
               description = "Elimina físicamente el usuario de la base de datos. Operación irreversible.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Usuario eliminado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.noContent());
    }
}
