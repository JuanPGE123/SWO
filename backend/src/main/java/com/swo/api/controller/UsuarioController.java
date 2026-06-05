package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.CambiarPasswordDTO;
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

@RestController
@RequestMapping("/v1/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Operaciones CRUD sobre los usuarios del sistema SWO")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Listar todos los usuarios")
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> listarTodos() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listarTodos()));
    }

    @GetMapping("/activos")
    @Operation(summary = "Listar usuarios activos")
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> listarActivos() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listarActivos()));
    }

    @GetMapping("/jefes")
    @Operation(summary = "Listar usuarios con roles de jefatura",
               description = "Retorna usuarios con rol Jefe, Administrador, Gerente o Coordinador, para asignar como jefe directo.")
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> listarJefes() {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.listarJefes()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> buscarPorId(
            @Parameter(description = "ID único del usuario", example = "1")
            @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.buscarPorId(id)));
    }

    @GetMapping("/correo/{correo}")
    @Operation(summary = "Obtener usuario por correo electrónico")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> buscarPorCorreo(
            @Parameter(description = "Correo electrónico del usuario")
            @PathVariable String correo) {
        return ResponseEntity.ok(ApiResponse.ok(usuarioService.buscarPorCorreo(correo)));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo usuario",
               description = "Registra un nuevo usuario. La contraseña se almacena hasheada con BCrypt.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Usuario creado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Correo ya registrado")
    })
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> crear(
            @Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO creado = usuarioService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created(creado));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un usuario existente")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Usuario actualizado exitosamente", usuarioService.actualizar(id, dto)));
    }

    @PatchMapping("/{id}/cambiar-password")
    @Operation(summary = "Cambiar contraseña de usuario",
               description = "Permite a un administrador cambiar la contraseña de cualquier usuario.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Contraseña actualizada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Contraseña inválida"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<ApiResponse<Void>> cambiarPassword(
            @PathVariable Long id,
            @Valid @RequestBody CambiarPasswordDTO dto) {
        usuarioService.cambiarPassword(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Contraseña actualizada exitosamente", null));
    }

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar un usuario (soft delete)")
    public ResponseEntity<ApiResponse<Void>> desactivar(@PathVariable Long id) {
        usuarioService.desactivar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario desactivado exitosamente", null));
    }

    @PatchMapping("/{id}/activar")
    @Operation(summary = "Activar un usuario")
    public ResponseEntity<ApiResponse<Void>> activar(@PathVariable Long id) {
        usuarioService.activar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario activado exitosamente", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un usuario permanentemente")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.ok(ApiResponse.ok("Usuario eliminado exitosamente", null));
    }
}
