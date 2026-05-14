package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.AsignacionProyectoDTO;
import com.swo.api.model.dto.request.ProyectoRequestDTO;
import com.swo.api.model.dto.response.ProyectoResponseDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.model.entity.Proyecto;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.ProyectoRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de Proyectos.
 * Gestiona la lógica de negocio y las asignaciones de usuarios.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ProyectoResponseDTO crear(ProyectoRequestDTO dto) {
        // Validar que no exista un proyecto con el mismo nombre
        if (proyectoRepository.existsByNombreProyecto(dto.getNombreProyecto())) {
            throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
        }

        Proyecto proyecto = mapearDtoAEntidad(dto);
        Proyecto guardado = proyectoRepository.save(proyecto);
        
        return mapearEntidadADto(guardado);
    }

    @Override
    public ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto) {
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id));

        // Validar nombre duplicado solo si cambió
        if (!proyecto.getNombreProyecto().equals(dto.getNombreProyecto()) &&
            proyectoRepository.existsByNombreProyecto(dto.getNombreProyecto())) {
            throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
        }

        actualizarEntidadDesdeDto(proyecto, dto);
        Proyecto actualizado = proyectoRepository.save(proyecto);
        
        return mapearEntidadADto(actualizado);
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
        Proyecto proyecto = proyectoRepository.findById(dto.getIdProyecto())
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + dto.getIdProyecto()));

        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + dto.getIdUsuario()));

        // Validar que el usuario no esté ya asignado
        if (proyecto.getUsuariosAsignados().contains(usuario)) {
            throw new BusinessException("El usuario ya está asignado a este proyecto");
        }

        proyecto.getUsuariosAsignados().add(usuario);
        Proyecto actualizado = proyectoRepository.save(proyecto);
        
        return mapearEntidadADto(actualizado);
    }

    @Override
    public ProyectoResponseDTO removerUsuario(Long idProyecto, Long idUsuario) {
        Proyecto proyecto = proyectoRepository.findById(idProyecto)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto));

        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario));

        if (!proyecto.getUsuariosAsignados().contains(usuario)) {
            throw new BusinessException("El usuario no está asignado a este proyecto");
        }

        proyecto.getUsuariosAsignados().remove(usuario);
        Proyecto actualizado = proyectoRepository.save(proyecto);
        
        return mapearEntidadADto(actualizado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> obtenerUsuariosAsignados(Long idProyecto) {
        Proyecto proyecto = proyectoRepository.findById(idProyecto)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto));

        return proyecto.getUsuariosAsignados().stream()
            .map(this::mapearUsuarioADto)
            .collect(Collectors.toList());
    }

    // Métodos auxiliares de mapeo
    private Proyecto mapearDtoAEntidad(ProyectoRequestDTO dto) {
        Proyecto proyecto = new Proyecto();
        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        proyecto.setEstado(dto.getEstado() != null ? dto.getEstado() : "Activo");
        proyecto.setPresupuesto(dto.getPresupuesto());
        proyecto.setPrioridad(dto.getPrioridad());
        return proyecto;
    }

    private void actualizarEntidadDesdeDto(Proyecto proyecto, ProyectoRequestDTO dto) {
        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        if (dto.getEstado() != null) {
            proyecto.setEstado(dto.getEstado());
        }
        proyecto.setPresupuesto(dto.getPresupuesto());
        proyecto.setPrioridad(dto.getPrioridad());
    }

    private ProyectoResponseDTO mapearEntidadADto(Proyecto proyecto) {
        ProyectoResponseDTO dto = new ProyectoResponseDTO();
        dto.setIdProyecto(proyecto.getIdProyecto());
        dto.setNombreProyecto(proyecto.getNombreProyecto());
        dto.setDescripcion(proyecto.getDescripcion());
        dto.setFechaInicio(proyecto.getFechaInicio());
        dto.setFechaFin(proyecto.getFechaFin());
        dto.setEstado(proyecto.getEstado());
        dto.setPresupuesto(proyecto.getPresupuesto());
        dto.setPrioridad(proyecto.getPrioridad());
        dto.setFechaCreacion(proyecto.getFechaCreacion());
        dto.setFechaActualizacion(proyecto.getFechaActualizacion());

        // Mapear usuarios asignados
        List<ProyectoResponseDTO.UsuarioResumenDTO> usuariosDto = proyecto.getUsuariosAsignados().stream()
            .map(usuario -> {
                ProyectoResponseDTO.UsuarioResumenDTO resumen = new ProyectoResponseDTO.UsuarioResumenDTO();
                resumen.setIdUsuario(usuario.getIdUsuario());
                resumen.setNombreCompleto(usuario.getNombreCompleto());
                resumen.setCorreo(usuario.getCorreo());
                resumen.setRol(usuario.getRol());
                return resumen;
            })
            .collect(Collectors.toList());
        
        dto.setUsuariosAsignados(usuariosDto);
        return dto;
    }

    private UsuarioResponseDTO mapearUsuarioADto(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombreCompleto(usuario.getNombreCompleto());
        dto.setCorreo(usuario.getCorreo());
        dto.setRol(usuario.getRol());
        dto.setEstado(usuario.getEstado());
        dto.setTelefono(usuario.getTelefono());
        dto.setDepartamento(usuario.getDepartamento());
        dto.setFechaRegistro(usuario.getFechaRegistro());
        return dto;
    }
}
