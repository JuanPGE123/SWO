package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.CategoriaRequestDTO;
import com.swo.api.model.dto.response.CategoriaResponseDTO;
import com.swo.api.model.entity.Categoria;
import com.swo.api.repository.CategoriaRepository;
import com.swo.api.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Implementación de {@link CategoriaService}. */
@Slf4j
@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> listarTodas() {
        return categoriaRepository.findAll().stream().map(this::toResponseDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> listarActivas() {
        return categoriaRepository.findByEstadoTrue().stream().map(this::toResponseDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponseDTO buscarPorId(Long id) {
        return toResponseDTO(findOrThrow(id));
    }

    @Override
    @Transactional
    public CategoriaResponseDTO crear(CategoriaRequestDTO dto) {
        if (categoriaRepository.existsByNombreCategoria(dto.getNombreCategoria())) {
            throw new BusinessException("Ya existe una categoría con el nombre: " + dto.getNombreCategoria());
        }
        Categoria categoria = new Categoria();
        mapDtoToEntity(dto, categoria);
        return toResponseDTO(categoriaRepository.save(categoria));
    }

    @Override
    @Transactional
    public CategoriaResponseDTO actualizar(Long id, CategoriaRequestDTO dto) {
        Categoria categoria = findOrThrow(id);

        // Validar unicidad de nombre si cambia
        if (!categoria.getNombreCategoria().equalsIgnoreCase(dto.getNombreCategoria())
                && categoriaRepository.existsByNombreCategoria(dto.getNombreCategoria())) {
            throw new BusinessException("Ya existe una categoría con el nombre: " + dto.getNombreCategoria());
        }

        mapDtoToEntity(dto, categoria);
        return toResponseDTO(categoriaRepository.save(categoria));
    }

    @Override
    @Transactional
    public void desactivar(Long id) {
        Categoria categoria = findOrThrow(id);
        categoria.setEstado(Boolean.FALSE);
        categoriaRepository.save(categoria);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoría no encontrada con ID: " + id);
        }
        categoriaRepository.deleteById(id);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Categoria findOrThrow(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + id));
    }

    private void mapDtoToEntity(CategoriaRequestDTO dto, Categoria entity) {
        entity.setNombreCategoria(dto.getNombreCategoria());
        entity.setDescripcion(dto.getDescripcion());
        entity.setColor(dto.getColor() != null ? dto.getColor() : "#4CAF50");
        entity.setIcono(dto.getIcono());
    }

    private CategoriaResponseDTO toResponseDTO(Categoria c) {
        return new CategoriaResponseDTO(
                c.getIdCategoria(),
                c.getNombreCategoria(),
                c.getDescripcion(),
                c.getColor(),
                c.getIcono(),
                c.getEstado(),
                c.getFechaCreacion()
        );
    }
}
