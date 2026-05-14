package com.swo.api.service;

import com.swo.api.model.dto.request.UsuarioRequestDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;

import java.util.List;

/** Contrato de negocio para la gestión de usuarios. */
public interface UsuarioService {

    List<UsuarioResponseDTO> listarTodos();

    List<UsuarioResponseDTO> listarActivos();

    UsuarioResponseDTO buscarPorId(Long id);

    UsuarioResponseDTO buscarPorCorreo(String correo);

    UsuarioResponseDTO crear(UsuarioRequestDTO dto);

    UsuarioResponseDTO actualizar(Long id, UsuarioRequestDTO dto);

    void desactivar(Long id);

    void activar(Long id);

    void eliminar(Long id);
}
