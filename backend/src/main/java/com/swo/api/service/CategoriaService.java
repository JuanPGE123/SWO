package com.swo.api.service;

import com.swo.api.model.dto.request.CategoriaRequestDTO;
import com.swo.api.model.dto.response.CategoriaResponseDTO;

import java.util.List;

/** Contrato de negocio para la gestión de categorías. */
public interface CategoriaService {

    List<CategoriaResponseDTO> listarTodas();

    List<CategoriaResponseDTO> listarActivas();

    CategoriaResponseDTO buscarPorId(Long id);

    CategoriaResponseDTO crear(CategoriaRequestDTO dto);

    CategoriaResponseDTO actualizar(Long id, CategoriaRequestDTO dto);

    void desactivar(Long id);

    void eliminar(Long id);
}
