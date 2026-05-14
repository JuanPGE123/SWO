package com.swo.api.service;

import com.swo.api.model.dto.request.IncidenciaRequestDTO;
import com.swo.api.model.dto.response.IncidenciaResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/** Contrato de negocio para la gestión de incidencias. */
public interface IncidenciaService {

    Page<IncidenciaResponseDTO> listarTodas(Pageable pageable);

    Page<IncidenciaResponseDTO> listarPorEstado(String estado, Pageable pageable);

    Page<IncidenciaResponseDTO> listarPorUsuario(Long idUsuario, Pageable pageable);

    Page<IncidenciaResponseDTO> buscarPorTexto(String query, Pageable pageable);

    IncidenciaResponseDTO buscarPorId(Long id);

    IncidenciaResponseDTO crear(IncidenciaRequestDTO dto);

    IncidenciaResponseDTO actualizar(Long id, IncidenciaRequestDTO dto);

    IncidenciaResponseDTO cambiarEstado(Long id, String nuevoEstado);

    void eliminar(Long id);
}
