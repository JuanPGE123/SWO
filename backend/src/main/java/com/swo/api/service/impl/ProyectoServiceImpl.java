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
        log.info("[ProyectoService] Creando proyecto: {}", dto.getNombreProyecto());

        if (proyectoRepository.existsByNombre(dto.getNombreProyecto())) {
            throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
        }

        Proyecto proyecto = mapearDtoAEntidad(dto);
        Proyecto guardado = proyectoRepository.save(proyecto);
        log.info("[ProyectoService] Proyecto creado con ID: {}", guardado.getIdProyecto());
        return mapearEntidadADto(guardado);
    }

    @Override
    public ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto) {
        log.info("[ProyectoService] Actualizando proyecto ID: {}", id);

        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id));

        if (!proyecto.getNombre().equals(dto.getNombreProyecto()) &&
            proyectoRepository.existsByNombre(dto.getNombreProyecto())) {
            throw new BusinessException("Ya existe un proyecto con el nombre: " + dto.getNombreProyecto());
        }

        actualizarEntidadDesdeDto(proyecto, dto);
        return mapearEntidadADto(proyectoRepository.save(proyecto));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        if (!proyectoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Proyecto no encontrado con ID: " + id);
        }
        asignacionProyectoRepository.deleteByProyecto_IdProyecto(id);
        proyectoRepository.deleteById(id);
        log.info("Proyecto ID {} eliminado", id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProyectoResponseDTO obtenerPorId(Long id) {
        return mapearEntidadADto(proyectoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + id)));
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

        if (asignacionProyectoRepository.existsByProyecto_IdProyectoAndUsuario_IdUsuario(
                dto.getIdProyecto(), dto.getIdUsuario())) {
            throw new BusinessException("El usuario ya está asignado a este proyecto");
        }

        AsignacionProyecto asignacion = new AsignacionProyecto();
        asignacion.setProyecto(proyecto);
        asignacion.setUsuario(usuario);
        asignacion.setRolAsignado("Miembro");
        asignacionProyectoRepository.save(asignacion);

        return mapearEntidadADto(proyecto);
    }

    @Override
    public ProyectoResponseDTO removerUsuario(Long idProyecto, Long idUsuario) {
        Proyecto proyecto = proyectoRepository.findById(idProyecto)
            .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto));

        if (!usuarioRepository.existsById(idUsuario)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario);
        }
        if (!asignacionProyectoRepository.existsByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario)) {
            throw new BusinessException("El usuario no está asignado a este proyecto");
        }

        asignacionProyectoRepository.deleteByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario);
        return mapearEntidadADto(proyecto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> obtenerUsuariosAsignados(Long idProyecto) {
        if (!proyectoRepository.existsById(idProyecto)) {
            throw new ResourceNotFoundException("Proyecto no encontrado con ID: " + idProyecto);
        }
        return asignacionProyectoRepository.findByProyecto_IdProyecto(idProyecto).stream()
            .map(a -> mapearUsuarioADto(a.getUsuario()))
            .collect(Collectors.toList());
    }

    // ── Mapeos ───────────────────────────────────────────────────────────────

    private Proyecto mapearDtoAEntidad(ProyectoRequestDTO dto) {
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setEstado(EstadoProyecto.normalizar(dto.getEstado()));
        asignarJefe(dto.getIdJefe(), proyecto);
        return proyecto;
    }

    private void actualizarEntidadDesdeDto(Proyecto proyecto, ProyectoRequestDTO dto) {
        proyecto.setNombre(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        if (dto.getEstado() != null && !dto.getEstado().isBlank()) {
            proyecto.setEstado(EstadoProyecto.normalizar(dto.getEstado()));
        }
        asignarJefe(dto.getIdJefe(), proyecto);
    }

    private void asignarJefe(Long idJefe, Proyecto proyecto) {
        if (idJefe != null) {
            usuarioRepository.findById(idJefe).ifPresent(proyecto::setJefe);
        } else {
            proyecto.setJefe(null);
        }
    }

    private ProyectoResponseDTO mapearEntidadADto(Proyecto proyecto) {
        ProyectoResponseDTO dto = new ProyectoResponseDTO();
        dto.setIdProyecto(proyecto.getIdProyecto());
        dto.setNombreProyecto(proyecto.getNombre());
        dto.setDescripcion(proyecto.getDescripcion());
        dto.setEstado(proyecto.getEstado());
        dto.setFechaCreacion(proyecto.getFechaCreacion());
        dto.setFechaActualizacion(proyecto.getFechaActualizacion());
        if (proyecto.getJefe() != null) {
            dto.setIdJefe(proyecto.getJefe().getIdUsuario());
            dto.setNombreJefe(proyecto.getJefe().getNombreCompleto());
        }
        return dto;
    }

    private UsuarioResponseDTO mapearUsuarioADto(Usuario usuario) {
        if (usuario == null) return null;
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
