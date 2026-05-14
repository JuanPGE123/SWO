package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.model.dto.request.AsignacionProyectoDTO;
import com.swo.api.model.dto.request.ProyectoRequestDTO;
import com.swo.api.model.dto.response.ProyectoResponseDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.service.ProyectoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de Proyectos.
 * Expone endpoints para CRUD y asignación de usuarios a proyectos.
 */
@RestController
@RequestMapping("/v1/proyectos")
@RequiredArgsConstructor
@Tag(name = "Proyectos", description = "Gestión de proyectos del sistema")
public class ProyectoController {

    private final ProyectoService proyectoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear nuevo proyecto", description = "Registra un nuevo proyecto en el sistema")
    public ApiResponse<ProyectoResponseDTO> crear(@Valid @RequestBody ProyectoRequestDTO dto) {
        ProyectoResponseDTO proyecto = proyectoService.crear(dto);
        return ApiResponse.created(proyecto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar proyecto", description = "Actualiza todos los campos de un proyecto existente")
    public ApiResponse<ProyectoResponseDTO> actualizar(
            @Parameter(description = "ID del proyecto") @PathVariable Long id,
            @Valid @RequestBody ProyectoRequestDTO dto) {
        ProyectoResponseDTO proyecto = proyectoService.actualizar(id, dto);
        return ApiResponse.ok("Proyecto actualizado exitosamente", proyecto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar proyecto", description = "Elimina un proyecto por ID")
    public ApiResponse<Void> eliminar(@Parameter(description = "ID del proyecto") @PathVariable Long id) {
        proyectoService.eliminar(id);
        return ApiResponse.noContent();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener proyecto por ID", description = "Retorna los detalles completos de un proyecto")
    public ApiResponse<ProyectoResponseDTO> obtenerPorId(
            @Parameter(description = "ID del proyecto") @PathVariable Long id) {
        ProyectoResponseDTO proyecto = proyectoService.obtenerPorId(id);
        return ApiResponse.ok(proyecto);
    }

    @GetMapping
    @Operation(summary = "Listar todos los proyectos", description = "Retorna la lista completa de proyectos")
    public ApiResponse<List<ProyectoResponseDTO>> listarTodos() {
        List<ProyectoResponseDTO> proyectos = proyectoService.listarTodos();
        return ApiResponse.ok(proyectos);
    }

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Filtrar proyectos por estado", 
               description = "Retorna proyectos con el estado especificado (Activo, En Pausa, Completado, Cancelado)")
    public ApiResponse<List<ProyectoResponseDTO>> listarPorEstado(
            @Parameter(description = "Estado del proyecto") @PathVariable String estado) {
        List<ProyectoResponseDTO> proyectos = proyectoService.listarPorEstado(estado);
        return ApiResponse.ok(proyectos);
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar proyectos por nombre", description = "Busca proyectos cuyo nombre contenga el texto especificado")
    public ApiResponse<List<ProyectoResponseDTO>> buscarPorNombre(
            @Parameter(description = "Texto a buscar en el nombre") @RequestParam String q) {
        List<ProyectoResponseDTO> proyectos = proyectoService.buscarPorNombre(q);
        return ApiResponse.ok(proyectos);
    }

    @PostMapping("/asignar-usuario")
    @Operation(summary = "Asignar usuario a proyecto", 
               description = "Asigna un usuario específico a un proyecto. Retorna el proyecto con la lista actualizada de usuarios")
    public ApiResponse<ProyectoResponseDTO> asignarUsuario(@Valid @RequestBody AsignacionProyectoDTO dto) {
        ProyectoResponseDTO proyecto = proyectoService.asignarUsuario(dto);
        return ApiResponse.ok("Usuario asignado al proyecto exitosamente", proyecto);
    }

    @DeleteMapping("/{idProyecto}/usuario/{idUsuario}")
    @Operation(summary = "Remover usuario de proyecto", 
               description = "Remueve un usuario asignado de un proyecto")
    public ApiResponse<ProyectoResponseDTO> removerUsuario(
            @Parameter(description = "ID del proyecto") @PathVariable Long idProyecto,
            @Parameter(description = "ID del usuario") @PathVariable Long idUsuario) {
        ProyectoResponseDTO proyecto = proyectoService.removerUsuario(idProyecto, idUsuario);
        return ApiResponse.ok("Usuario removido del proyecto exitosamente", proyecto);
    }

    @GetMapping("/{idProyecto}/usuarios")
    @Operation(summary = "Listar usuarios asignados", 
               description = "Retorna la lista de todos los usuarios asignados a un proyecto específico")
    public ApiResponse<List<UsuarioResponseDTO>> obtenerUsuariosAsignados(
            @Parameter(description = "ID del proyecto") @PathVariable Long idProyecto) {
        List<UsuarioResponseDTO> usuarios = proyectoService.obtenerUsuariosAsignados(idProyecto);
        return ApiResponse.ok(usuarios);
    }
}
