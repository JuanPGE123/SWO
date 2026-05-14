package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.IncidenciaRequestDTO;
import com.swo.api.model.dto.response.IncidenciaResponseDTO;
import com.swo.api.model.entity.Categoria;
import com.swo.api.model.entity.Incidencia;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.CategoriaRepository;
import com.swo.api.repository.IncidenciaRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.IncidenciaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Implementación de {@link IncidenciaService}.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class IncidenciaServiceImpl implements IncidenciaService {

    private static final Set<String> ESTADOS_VALIDOS =
            Set.of("Abierto", "En Progreso", "Pendiente", "Resuelto", "Cerrado", "Cancelado");

    private final IncidenciaRepository incidenciaRepository;
    private final UsuarioRepository    usuarioRepository;
    private final CategoriaRepository  categoriaRepository;

    // ── Lectura ─────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<IncidenciaResponseDTO> listarTodas(Pageable pageable) {
        return incidenciaRepository.findAll(pageable).map(this::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<IncidenciaResponseDTO> listarPorEstado(String estado, Pageable pageable) {
        validarEstado(estado);
        return incidenciaRepository.findByEstado(estado, pageable).map(this::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<IncidenciaResponseDTO> listarPorUsuario(Long idUsuario, Pageable pageable) {
        return incidenciaRepository.findByUsuarioReporta_IdUsuario(idUsuario, pageable)
                .map(this::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<IncidenciaResponseDTO> buscarPorTexto(String query, Pageable pageable) {
        return incidenciaRepository.buscarPorTexto(query, pageable).map(this::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public IncidenciaResponseDTO buscarPorId(Long id) {
        return toResponseDTO(findOrThrow(id));
    }

    // ── Escritura ────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public IncidenciaResponseDTO crear(IncidenciaRequestDTO dto) {
        log.info("Creando incidencia: {}", dto.getTitulo());

        Usuario usuarioReporta = usuarioRepository.findById(dto.getIdUsuarioReporta())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario reportador no encontrado con ID: " + dto.getIdUsuarioReporta()));

        Incidencia incidencia = new Incidencia();
        incidencia.setTitulo(dto.getTitulo());
        incidencia.setDescripcion(dto.getDescripcion());
        incidencia.setEstado(dto.getEstado() != null ? dto.getEstado() : "Abierto");
        incidencia.setImpacto(dto.getImpacto() != null ? dto.getImpacto() : "Medio");
        incidencia.setUbicacion(dto.getUbicacion());
        incidencia.setUsuarioReporta(usuarioReporta);

        if (dto.getIdCategoria() != null) {
            Categoria categoria = categoriaRepository.findById(dto.getIdCategoria())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoría no encontrada con ID: " + dto.getIdCategoria()));
            incidencia.setCategoria(categoria);
        }

        return toResponseDTO(incidenciaRepository.save(incidencia));
    }

    @Override
    @Transactional
    public IncidenciaResponseDTO actualizar(Long id, IncidenciaRequestDTO dto) {
        log.info("Actualizando incidencia ID: {}", id);
        Incidencia incidencia = findOrThrow(id);

        incidencia.setTitulo(dto.getTitulo());
        incidencia.setDescripcion(dto.getDescripcion());
        incidencia.setUbicacion(dto.getUbicacion());
        incidencia.setImpacto(dto.getImpacto());

        if (dto.getEstado() != null) {
            validarEstado(dto.getEstado());
            incidencia.setEstado(dto.getEstado());
        }

        if (dto.getIdCategoria() != null) {
            Categoria categoria = categoriaRepository.findById(dto.getIdCategoria())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoría no encontrada con ID: " + dto.getIdCategoria()));
            incidencia.setCategoria(categoria);
        }

        return toResponseDTO(incidenciaRepository.save(incidencia));
    }

    @Override
    @Transactional
    public IncidenciaResponseDTO cambiarEstado(Long id, String nuevoEstado) {
        validarEstado(nuevoEstado);
        Incidencia incidencia = findOrThrow(id);
        incidencia.setEstado(nuevoEstado);

        // Si se cierra o resuelve, registrar la fecha de cierre
        if (nuevoEstado.equals("Cerrado") || nuevoEstado.equals("Resuelto")) {
            incidencia.setFechaCierre(LocalDateTime.now());
        }

        return toResponseDTO(incidenciaRepository.save(incidencia));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        log.warn("Eliminando incidencia ID: {}", id);
        if (!incidenciaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Incidencia no encontrada con ID: " + id);
        }
        incidenciaRepository.deleteById(id);
    }

    // ── Helpers privados ─────────────────────────────────────────────────────

    private Incidencia findOrThrow(Long id) {
        return incidenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incidencia no encontrada con ID: " + id));
    }

    private void validarEstado(String estado) {
        if (!ESTADOS_VALIDOS.contains(estado)) {
            throw new BusinessException("Estado inválido: '" + estado
                    + "'. Valores permitidos: " + ESTADOS_VALIDOS);
        }
    }

    private IncidenciaResponseDTO toResponseDTO(Incidencia i) {
        return new IncidenciaResponseDTO(
                i.getIdIncidencia(),
                i.getTitulo(),
                i.getDescripcion(),
                i.getEstado(),
                i.getImpacto(),
                i.getUbicacion(),
                i.getFechaCreacion(),
                i.getFechaActualizacion(),
                i.getFechaCierre(),
                i.getUsuarioReporta() != null ? i.getUsuarioReporta().getIdUsuario() : null,
                i.getUsuarioReporta() != null ? i.getUsuarioReporta().getNombreCompleto() : null,
                i.getCategoria() != null ? i.getCategoria().getIdCategoria() : null,
                i.getCategoria() != null ? i.getCategoria().getNombreCategoria() : null
        );
    }
}
