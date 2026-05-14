package com.swo.api.service;

import com.swo.api.model.dto.request.AsignacionProyectoDTO;
import com.swo.api.model.dto.request.ProyectoRequestDTO;
import com.swo.api.model.dto.response.ProyectoResponseDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;

import java.util.List;

/**
 * Interfaz de servicio para la gestión de Proyectos.
 */
public interface ProyectoService {

    /**
     * Crea un nuevo proyecto.
     */
    ProyectoResponseDTO crear(ProyectoRequestDTO dto);

    /**
     * Actualiza un proyecto existente.
     */
    ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto);

    /**
     * Elimina un proyecto por ID.
     */
    void eliminar(Long id);

    /**
     * Obtiene un proyecto por ID.
     */
    ProyectoResponseDTO obtenerPorId(Long id);

    /**
     * Lista todos los proyectos.
     */
    List<ProyectoResponseDTO> listarTodos();

    /**
     * Lista proyectos por estado.
     */
    List<ProyectoResponseDTO> listarPorEstado(String estado);

    /**
     * Busca proyectos por nombre.
     */
    List<ProyectoResponseDTO> buscarPorNombre(String texto);

    /**
     * Asigna un usuario a un proyecto.
     */
    ProyectoResponseDTO asignarUsuario(AsignacionProyectoDTO dto);

    /**
     * Remueve un usuario de un proyecto.
     */
    ProyectoResponseDTO removerUsuario(Long idProyecto, Long idUsuario);

    /**
     * Obtiene la lista de usuarios asignados a un proyecto.
     */
    List<UsuarioResponseDTO> obtenerUsuariosAsignados(Long idProyecto);
}
