package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.CambiarPasswordDTO;
import com.swo.api.model.dto.request.UsuarioRequestDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.AsignacionProyectoRepository;
import com.swo.api.repository.IncidenciaRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private static final List<String> ROLES_JEFE = Arrays.asList(
            "Jefe", "Administrador", "Gerente", "Coordinador"
    );

    private final UsuarioRepository             usuarioRepository;
    private final AsignacionProyectoRepository  asignacionProyectoRepository;
    private final IncidenciaRepository          incidenciaRepository;
    private final BCryptPasswordEncoder         passwordEncoder;

    // ── Lectura ─────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        log.debug("Listando todos los usuarios");
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarActivos() {
        return usuarioRepository.findByEstadoTrue()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarJefes() {
        return usuarioRepository.findByRolIn(ROLES_JEFE)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorId(Long id) {
        return toResponseDTO(findOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado con correo: " + correo));
    }

    // ── Escritura ────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public UsuarioResponseDTO crear(UsuarioRequestDTO dto) {
        log.info("Creando usuario con correo: {}", dto.getCorreo());

        if (usuarioRepository.existsByCorreo(dto.getCorreo())) {
            throw new BusinessException("Ya existe un usuario registrado con el correo: " + dto.getCorreo());
        }

        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new BusinessException("La contraseña es obligatoria para crear un usuario");
        }

        Usuario usuario = new Usuario();
        mapDtoToEntity(dto, usuario);
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        usuario.setEstado(Boolean.TRUE);

        Usuario guardado = usuarioRepository.save(usuario);
        log.info("Usuario creado con ID: {}", guardado.getIdUsuario());
        return toResponseDTO(guardado);
    }

    @Override
    @Transactional
    public UsuarioResponseDTO actualizar(Long id, UsuarioRequestDTO dto) {
        log.info("Actualizando usuario ID: {}", id);
        Usuario usuario = findOrThrow(id);

        if (!usuario.getCorreo().equalsIgnoreCase(dto.getCorreo())
                && usuarioRepository.existsByCorreo(dto.getCorreo())) {
            throw new BusinessException("El correo '" + dto.getCorreo() + "' ya está en uso por otro usuario.");
        }

        mapDtoToEntity(dto, usuario);

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        return toResponseDTO(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional
    public void cambiarPassword(Long id, CambiarPasswordDTO dto) {
        log.info("Cambiando contraseña del usuario ID: {}", id);
        Usuario usuario = findOrThrow(id);
        usuario.setPasswordHash(passwordEncoder.encode(dto.getNuevaPassword()));
        usuarioRepository.save(usuario);
        log.info("Contraseña actualizada para usuario ID: {}", id);
    }

    @Override
    @Transactional
    public void desactivar(Long id) {
        log.info("Desactivando usuario ID: {}", id);
        Usuario usuario = findOrThrow(id);
        usuario.setEstado(Boolean.FALSE);
        usuarioRepository.save(usuario);
    }

    @Override
    @Transactional
    public void activar(Long id) {
        log.info("Activando usuario ID: {}", id);
        Usuario usuario = findOrThrow(id);
        usuario.setEstado(Boolean.TRUE);
        usuarioRepository.save(usuario);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        log.warn("Eliminando usuario ID: {}", id);
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
        }
        asignacionProyectoRepository.deleteByUsuario_IdUsuario(id);
        incidenciaRepository.deleteByUsuarioReporta_IdUsuario(id);
        usuarioRepository.deleteById(id);
        log.info("Usuario ID {} eliminado junto con sus registros relacionados", id);
    }

    // ── Helpers privados ─────────────────────────────────────────────────────

    private Usuario findOrThrow(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
    }

    private void mapDtoToEntity(UsuarioRequestDTO dto, Usuario entity) {
        entity.setNombreCompleto(dto.getNombreCompleto());
        entity.setCorreo(dto.getCorreo());
        entity.setRol(dto.getRol());
        entity.setTelefono(dto.getTelefono());
        entity.setDepartamento(dto.getDepartamento());

        if (dto.getIdJefe() != null) {
            usuarioRepository.findById(dto.getIdJefe()).ifPresent(entity::setJefe);
        } else {
            entity.setJefe(null);
        }
    }

    private UsuarioResponseDTO toResponseDTO(Usuario u) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setIdUsuario(u.getIdUsuario());
        dto.setNombreCompleto(u.getNombreCompleto());
        dto.setCorreo(u.getCorreo());
        dto.setRol(u.getRol());
        dto.setEstado(u.getEstado());
        dto.setTelefono(u.getTelefono());
        dto.setDepartamento(u.getDepartamento());
        dto.setFotoPerfil(u.getFotoPerfil());
        dto.setFechaRegistro(u.getFechaRegistro());
        dto.setUltimaConexion(u.getUltimaConexion());
        if (u.getJefe() != null) {
            dto.setIdJefe(u.getJefe().getIdUsuario());
            dto.setNombreJefe(u.getJefe().getNombreCompleto());
        }
        return dto;
    }
}
