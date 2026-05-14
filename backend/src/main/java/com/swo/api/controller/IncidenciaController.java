package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.IncidenciaRequestDTO;
import com.swo.api.model.dto.response.IncidenciaResponseDTO;
import com.swo.api.service.IncidenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para la gestión de incidencias (tickets) del sistema SWO.
 * <p>
 * Base URL: {@code /api/v1/incidencias}
 */
@RestController
@RequestMapping("/v1/incidencias")
@RequiredArgsConstructor
@Tag(name = "Incidencias", description = "Gestión del ciclo de vida completo de las incidencias (tickets)")
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    // ── GET /v1/incidencias ──────────────────────────────────────────────────

    @GetMapping
    @Operation(summary = "Listar todas las incidencias (paginado)",
               description = "Retorna una página de incidencias ordenadas por fecha de creación descendente.")
    public ResponseEntity<ApiResponse<Page<IncidenciaResponseDTO>>> listarTodas(
            @Parameter(description = "Número de página (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Cantidad de registros por página", example = "10")
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.listarTodas(pageable)));
    }

    // ── GET /v1/incidencias/estado/{estado} ──────────────────────────────────

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Filtrar incidencias por estado",
               description = "Valores válidos: Abierto | En Progreso | Pendiente | Resuelto | Cerrado | Cancelado")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Listado filtrado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Estado inválido")
    })
    public ResponseEntity<ApiResponse<Page<IncidenciaResponseDTO>>> listarPorEstado(
            @PathVariable String estado,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.listarPorEstado(estado, pageable)));
    }

    // ── GET /v1/incidencias/usuario/{idUsuario} ──────────────────────────────

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Listar incidencias reportadas por un usuario")
    public ResponseEntity<ApiResponse<Page<IncidenciaResponseDTO>>> listarPorUsuario(
            @PathVariable Long idUsuario,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.listarPorUsuario(idUsuario, pageable)));
    }

    // ── GET /v1/incidencias/buscar ────────────────────────────────────────────

    @GetMapping("/buscar")
    @Operation(summary = "Búsqueda de texto libre en incidencias",
               description = "Busca coincidencias en el título y la descripción de las incidencias.")
    public ResponseEntity<ApiResponse<Page<IncidenciaResponseDTO>>> buscarPorTexto(
            @Parameter(description = "Texto a buscar", example = "autenticación")
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.buscarPorTexto(q, pageable)));
    }

    // ── GET /v1/incidencias/{id} ─────────────────────────────────────────────

    @GetMapping("/{id}")
    @Operation(summary = "Obtener incidencia por ID")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Incidencia encontrada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Incidencia no encontrada")
    })
    public ResponseEntity<ApiResponse<IncidenciaResponseDTO>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.buscarPorId(id)));
    }

    // ── POST /v1/incidencias ─────────────────────────────────────────────────

    @PostMapping
    @Operation(summary = "Registrar una nueva incidencia",
               description = "Crea una incidencia en estado 'Abierto'. El campo idUsuarioReporta es obligatorio.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Incidencia creada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Usuario o categoría no encontrada")
    })
    public ResponseEntity<ApiResponse<IncidenciaResponseDTO>> crear(
            @Valid @RequestBody IncidenciaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(incidenciaService.crear(dto)));
    }

    // ── PUT /v1/incidencias/{id} ─────────────────────────────────────────────

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una incidencia existente")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Incidencia actualizada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Incidencia no encontrada")
    })
    public ResponseEntity<ApiResponse<IncidenciaResponseDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody IncidenciaRequestDTO dto) {
        return ResponseEntity.ok(
                ApiResponse.ok("Incidencia actualizada exitosamente", incidenciaService.actualizar(id, dto)));
    }

    // ── PATCH /v1/incidencias/{id}/estado ────────────────────────────────────

    @PatchMapping("/{id}/estado")
    @Operation(summary = "Cambiar el estado de una incidencia",
               description = "Endpoint dedicado para transiciones de estado (Ej: Abierto → En Progreso → Resuelto).")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Estado actualizado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Estado inválido"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Incidencia no encontrada")
    })
    public ResponseEntity<ApiResponse<IncidenciaResponseDTO>> cambiarEstado(
            @PathVariable Long id,
            @Parameter(description = "Nuevo estado de la incidencia", example = "En Progreso")
            @RequestParam String nuevoEstado) {
        return ResponseEntity.ok(ApiResponse.ok(incidenciaService.cambiarEstado(id, nuevoEstado)));
    }

    // ── DELETE /v1/incidencias/{id} ──────────────────────────────────────────

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una incidencia permanentemente")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Incidencia eliminada"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Incidencia no encontrada")
    })
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        incidenciaService.eliminar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.noContent());
    }
}
