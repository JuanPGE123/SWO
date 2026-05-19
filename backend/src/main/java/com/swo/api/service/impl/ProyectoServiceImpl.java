package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.AsignacionProyectoDTO;
import com.swo.api.model.dto.request.ProyectoRequestDTO;
import com.swo.api.model.dto.response.ProyectoResponseDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.model.entity.AsignacionProyecto;
import com.swo.api.model.entity.Proyecto;
import com.swo.api.model.entity.Usuario;
import com.swo.api.model.enums.EstadoProyecto;
import com.swo.api.repository.AsignacionProyectoRepository;
import com.swo.api.repository.ProyectoRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de Proyectos.
 * Gestiona la lógica de negocio y las asignaciones de usuarios.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;

    @Override
    public ProyectoResponseDTO crear(ProyectoRequestDTO dto) {
        log.info("[ProyectoService] Iniciando creación de proyecto: {}", dto.getNombreProyecto());
        
        try {
            // Validar que no exista un proyecto con el mismo nombre
            if (proyectoRepository.existsByNombre(dto.getNombreProyecto())) {
                log.warn("[ProyectoService] Ya existe un proyecto con el nombre: {}", dto.getNombreProyecto());
                throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
            }

            Proyecto proyecto = mapearDtoAEntidad(dto);
            Proyecto guardado = proyectoRepository.save(proyecto);
            log.info("[ProyectoService] Proyecto creado exitosamente con ID: {}", guardado.getIdProyecto());
            
            return mapearEntidadADto(guardado);
        } catch (BusinessException e) {
            throw e; // Relanzar excepción de negocio
        } catch (Exception e) {
            log.error("[ProyectoService] Error inesperado al crear proyecto: {}", dto.getNombreProyecto(), e);
            throw new RuntimeException("Error al crear el proyecto: " + e.getMessage(), e);
        }
    }

    @Override
    public ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto) {
        log.info("[ProyectoService] Actualizando proyecto con ID: {}", id);
        
        try {
            Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("[ProyectoService] Proyecto no encontrado con ID: {}", id);
                    return new ResourceNotFoundException("Proyecto no encontrado con ID: " + id);
                });

            // Validar nombre duplicado solo si cambió
            if (!proyecto.getNombre().equals(dto.getNombreProyecto()) &&
                proyectoRepository.existsByNombre(dto.getNombreProyecto())) {
                log.warn("[ProyectoService] Ya existe otro proyecto con el nombre: {}", dto.getNombreProyecto());
                throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
            }

            actualizarEntidadDesdeDto(proyecto, dto);
            Proyecto actualizado = proyectoRepository.save(proyecto);
            log.info("[ProyectoService] Proyecto ID {} actualizado exitosamente", id);
            
            return mapearEntidadADto(actualizado);
        } catch (ResourceNotFoundException | BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("[ProyectoService] Error inesperado al actualizar proyecto ID: {}", id, e);
            throw new RuntimeException("Error al actualizar el proyecto: " + e.getMessage(), e);
        }
    }

    @Override
    public void eliminar(Long id) {
        if (!proyectoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Proyecto no encontrado con ID: " + id);
        }
        proyectoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProyectoResponseDTO obtenerPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id));
        
        return mapearEntidadADto(proyecto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProyectoResponseDTO> listarTodos() {
        return proyectoRepository.findAll().stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProyectoResponseDTO> listarPorEstado(String estado) {
        return proyectoRepository.findByEstado(estado).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProyectoResponseDTO> buscarPorNombre(String texto) {
        return proyectoRepository.buscarPorNombre(texto).stream()
            .map(this::mapearEntidadADto)
            .collect(Collectors.toList());
    }

    @Override
    public ProyectoResponseDTO asignarUsuario(AsignacionProyectoDTO dto) {
        log.info("[ProyectoService] Asignando usuario {} al proyecto {}", dto.getIdUsuario(), dto.getIdProyecto());
        
        try {
            // Validar que el proyecto exista
            Proyecto proyecto = proyectoRepository.findById(dto.getIdProyecto())
                .orElseThrow(() -> {
                    log.warn("[ProyectoService] Proyecto no encontrado con ID: {}", dto.getIdProyecto());
                    return new ResourceNotFoundException("Proyecto no encontrado con ID: " + dto.getIdProyecto());
                });

            // Validar que el usuario exista
            Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() -> {
                    log.warn("[ProyectoService] Usuario no encontrado con ID: {}", dto.getIdUsuario());
                    return new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getIdUsuario());
                });

            // Verificar si ya existe la asignación
            if (asignacionProyectoRepository.existsByProyecto_IdProyectoAndUsuario_IdUsuario(
                    dto.getIdProyecto(), dto.getIdUsuario())) {
                log.warn("[ProyectoService] El usuario {} ya está asignado al proyecto {}", 
                         dto.getIdUsuario(), dto.getIdProyecto());
                throw new BusinessException("El usuario ya está asignado a este proyecto");
            }

            // Crear la asignación
            AsignacionProyecto asignacion = new AsignacionProyecto();
            asignacion.setProyecto(proyecto);
            asignacion.setUsuario(usuario);
            asignacion.setRolAsignado("Miembro");
            asignacionProyectoRepository.save(asignacion);
            
            log.info("[ProyectoService] Usuario {} asignado exitosamente al proyecto {}", 
                     dto.getIdUsuario(), dto.getIdProyecto());

            return mapearEntidadADto(proyecto);
        } catch (ResourceNotFoundException | BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("[ProyectoService] Error inesperado al asignar usuario {} al proyecto {}", 
                      dto.getIdUsuario(), dto.getIdProyecto(), e);
            throw new RuntimeException("Error al asignar usuario al proyecto: " + e.getMessage(), e);
        }
    }

    @Override
    public ProyectoResponseDTO removerUsuario(Long idProyecto, Long idUsuario) {
        // Validar que el proyecto exista
        Proyecto proyecto = proyectoRepository.findById(idProyecto)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto));

        // Validar que el usuario exista
        if (!usuarioRepository.existsById(idUsuario)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario);
        }

        // Verificar si existe la asignación
        if (!asignacionProyectoRepository.existsByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario)) {
            throw new BusinessException("El usuario no está asignado a este proyecto");
        }

        // Eliminar la asignación
        asignacionProyectoRepository.deleteByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario);

        return mapearEntidadADto(proyecto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> obtenerUsuariosAsignados(Long idProyecto) {
        log.info("[ProyectoService] Obteniendo usuarios asignados al proyecto {}", idProyecto);
        
        try {
            // Validar que el proyecto exista
            if (!proyectoRepository.existsById(idProyecto)) {
                log.warn("[ProyectoService] Proyecto no encontrado con ID: {}", idProyecto);
                throw new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto);
            }

            // Obtener todas las asignaciones del proyecto
            List<AsignacionProyecto> asignaciones = asignacionProyectoRepository.findByProyecto_IdProyecto(idProyecto);
            log.info("[ProyectoService] Se encontraron {} usuarios asignados al proyecto {}", 
                     asignaciones.size(), idProyecto);

            // Mapear los usuarios a DTOs
            return asignaciones.stream()
                .map(asignacion -> mapearUsuarioADto(asignacion.getUsuario()))
                .collect(Collectors.toList());
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("[ProyectoService] Error inesperado al obtener usuarios del proyecto {}", idProyecto, e);
            throw new RuntimeException("Error al obtener usuarios asignados: " + e.getMessage(), e);
        }
    }

    // Métodos auxiliares de mapeo
    private Proyecto mapearDtoAEntidad(ProyectoRequestDTO dto) {
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        // Normalizar y validar el estado usando el enum
        proyecto.setEstado(EstadoProyecto.normalizar(dto.getEstado()));
        log.debug("[ProyectoService] Estado normalizado: {}", proyecto.getEstado());
        return proyecto;
    }

    private void actualizarEntidadDesdeDto(Proyecto proyecto, ProyectoRequestDTO dto) {
        proyecto.setNombre(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        if (dto.getEstado() != null && !dto.getEstado().trim().isEmpty()) {
            // Normalizar y validar el estado usando el enum
            String estadoNormalizado = EstadoProyecto.normalizar(dto.getEstado());
            proyecto.setEstado(estadoNormalizado);
            log.debug("[ProyectoService] Estado actualizado y normalizado: {}", estadoNormalizado);
        }
    }

    private ProyectoResponseDTO mapearEntidadADto(Proyecto proyecto) {
        ProyectoResponseDTO dto = new ProyectoResponseDTO();
        dto.setIdProyecto(proyecto.getIdProyecto());
        dto.setNombreProyecto(proyecto.getNombre());
        dto.setDescripcion(proyecto.getDescripcion());
        dto.setEstado(proyecto.getEstado());
        dto.setFechaCreacion(proyecto.getFechaCreacion());
        return dto;
    }

    private UsuarioResponseDTO mapearUsuarioADto(Usuario usuario) {
        if (usuario == null) {
            log.warn("[ProyectoService] Intento de mapear usuario null");
            return null;
        }
        
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombreCompleto(usuario.getNombreCompleto() != null ? usuario.getNombreCompleto() : "Sin nombre");
        dto.setCorreo(usuario.getCorreo());
        dto.setRol(usuario.getRol());
        dto.setEstado(usuario.getEstado());
        dto.setTelefono(usuario.getTelefono());
        dto.setDepartamento(usuario.getDepartamento());
        dto.setFechaRegistro(usuario.getFechaRegistro());
        return dto;
    }
}
