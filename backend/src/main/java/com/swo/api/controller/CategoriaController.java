package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.CategoriaRequestDTO;
import com.swo.api.model.dto.response.CategoriaResponseDTO;
import com.swo.api.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de categorías de incidencias.
 * <p>
 * Base URL: {@code /api/v1/categorias}
 */
@RestController
@RequestMapping("/v1/categorias")
@RequiredArgsConstructor
@Tag(name = "Categorías", description = "Gestión de las categorías que clasifican las incidencias del sistema")
public class CategoriaController {

    private final CategoriaService categoriaService;

    // ── GET /v1/categorias ───────────────────────────────────────────────────

    @GetMapping
    @Operation(summary = "Listar todas las categorías")
    public ResponseEntity<ApiResponse<List<CategoriaResponseDTO>>> listarTodas() {
        return ResponseEntity.ok(ApiResponse.ok(categoriaService.listarTodas()));
    }

    // ── GET /v1/categorias/activas ───────────────────────────────────────────

    @GetMapping("/activas")
    @Operation(summary = "Listar únicamente las categorías activas",
               description = "Endpoint usado para poblar desplegables en el frontend.")
    public ResponseEntity<ApiResponse<List<CategoriaResponseDTO>>> listarActivas() {
        return ResponseEntity.ok(ApiResponse.ok(categoriaService.listarActivas()));
    }

    // ── GET /v1/categorias/{id} ──────────────────────────────────────────────

    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoría por ID")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Categoría encontrada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Categoría no encontrada")
    })
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(categoriaService.buscarPorId(id)));
    }

    // ── POST /v1/categorias ──────────────────────────────────────────────────

    @PostMapping
    @Operation(summary = "Crear una nueva categoría",
               description = "El nombre de la categoría debe ser único en el sistema.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Categoría creada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Ya existe una categoría con ese nombre")
    })
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> crear(
            @Valid @RequestBody CategoriaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(categoriaService.crear(dto)));
    }

    // ── PUT /v1/categorias/{id} ──────────────────────────────────────────────

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una categoría existente")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Categoría actualizada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Nombre ya en uso")
    })
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CategoriaRequestDTO dto) {
        return ResponseEntity.ok(
                ApiResponse.ok("Categoría actualizada exitosamente", categoriaService.actualizar(id, dto)));
    }

    // ── PATCH /v1/categorias/{id}/desactivar ─────────────────────────────────

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar una categoría (soft delete)")
    public ResponseEntity<ApiResponse<Void>> desactivar(@PathVariable Long id) {
        categoriaService.desactivar(id);
        return ResponseEntity.ok(ApiResponse.ok("Categoría desactivada exitosamente", null));
    }

    // ── DELETE /v1/categorias/{id} ───────────────────────────────────────────

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una categoría permanentemente")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Categoría eliminada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Categoría no encontrada")
    })
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        categoriaService.eliminar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.noContent());
    }
}
