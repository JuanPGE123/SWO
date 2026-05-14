package com.swo.api.service.impl;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.UsuarioRequestDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementación de {@link UsuarioService}.
 * <p>
 * Responsabilidades:
 * <ul>
 *   <li>Hashear contraseñas con BCrypt antes de persistir.</li>
 *   <li>Validar unicidad de correo electrónico.</li>
 *   <li>Mapear entidad ↔ DTO sin exponer datos sensibles.</li>
 * </ul>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

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

        // Si el correo cambia, verificar que no esté en uso por otro usuario
        if (!usuario.getCorreo().equalsIgnoreCase(dto.getCorreo())
                && usuarioRepository.existsByCorreo(dto.getCorreo())) {
            throw new BusinessException("El correo '" + dto.getCorreo() + "' ya está en uso por otro usuario.");
        }

        mapDtoToEntity(dto, usuario);

        // Solo actualiza el hash si se envió una nueva contraseña
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        return toResponseDTO(usuarioRepository.save(usuario));
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
        usuarioRepository.deleteById(id);
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
    }

    private UsuarioResponseDTO toResponseDTO(Usuario u) {
        return new UsuarioResponseDTO(
                u.getIdUsuario(),
                u.getNombreCompleto(),
                u.getCorreo(),
                u.getRol(),
                u.getEstado(),
                u.getTelefono(),
                u.getDepartamento(),
                u.getFotoPerfil(),
                u.getFechaRegistro(),
                u.getUltimaConexion()
        );
    }
}
