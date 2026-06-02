package com.swo.service;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.UsuarioRequestDTO;
import com.swo.api.model.dto.response.UsuarioResponseDTO;
import com.swo.api.model.entity.Usuario;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.impl.UsuarioServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para UsuarioServiceImpl.
 *
 * Cobertura:
 * - Happy Path: crear, actualizar, desactivar, activar, eliminar
 * - Validaciones: email duplicado
 * - Errores: usuario no encontrado
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("UsuarioService - Pruebas Unitarias")
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    private UsuarioRequestDTO dtoValido;
    private Usuario usuarioGuardado;

    @BeforeEach
    void setUp() {
        dtoValido = new UsuarioRequestDTO();
        dtoValido.setNombreCompleto("Carlos Andrés Pérez");
        dtoValido.setCorreo("carlos.perez@swo.com");
        dtoValido.setPassword("Segura@2024");
        dtoValido.setRol("Soporte");
        dtoValido.setTelefono("+573001234567");
        dtoValido.setDepartamento("Soporte TI");

        usuarioGuardado = new Usuario();
        usuarioGuardado.setIdUsuario(5L);
        usuarioGuardado.setNombreCompleto("Carlos Andrés Pérez");
        usuarioGuardado.setCorreo("carlos.perez@swo.com");
        usuarioGuardado.setPasswordHash("$2a$10$hasheado");
        usuarioGuardado.setRol("Soporte");
        usuarioGuardado.setEstado(Boolean.TRUE);
        usuarioGuardado.setTelefono("+573001234567");
        usuarioGuardado.setDepartamento("Soporte TI");
    }

    // ── Creación ─────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Crear usuario con datos válidos")
    void testCrearUsuarioExitoso() {
        when(usuarioRepository.existsByCorreo("carlos.perez@swo.com")).thenReturn(false);
        when(passwordEncoder.encode("Segura@2024")).thenReturn("$2a$10$hasheado");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioGuardado);

        UsuarioResponseDTO resultado = usuarioService.crear(dtoValido);

        assertNotNull(resultado);
        assertEquals(5L, resultado.getIdUsuario());
        assertEquals("Carlos Andrés Pérez", resultado.getNombreCompleto());
        assertEquals("carlos.perez@swo.com", resultado.getCorreo());
        assertEquals("Soporte", resultado.getRol());
        assertTrue(resultado.getEstado());

        verify(usuarioRepository, times(1)).existsByCorreo("carlos.perez@swo.com");
        verify(passwordEncoder, times(1)).encode("Segura@2024");
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("❌ VALIDACIÓN: Crear usuario con email ya registrado lanza BusinessException")
    void testCrearUsuarioEmailDuplicado() {
        when(usuarioRepository.existsByCorreo("carlos.perez@swo.com")).thenReturn(true);

        BusinessException excepcion = assertThrows(BusinessException.class,
            () -> usuarioService.crear(dtoValido),
            "Debe lanzar BusinessException para correo duplicado");

        assertTrue(excepcion.getMessage().contains("carlos.perez@swo.com"));
        verify(usuarioRepository, never()).save(any());
        verify(passwordEncoder, never()).encode(anyString());
    }

    // ── Actualización ────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Actualizar usuario existente")
    void testActualizarUsuarioExitoso() {
        dtoValido.setNombreCompleto("Carlos A. Pérez Actualizado");
        dtoValido.setPassword(null);

        Usuario actualizado = new Usuario();
        actualizado.setIdUsuario(5L);
        actualizado.setNombreCompleto("Carlos A. Pérez Actualizado");
        actualizado.setCorreo("carlos.perez@swo.com");
        actualizado.setRol("Soporte");
        actualizado.setEstado(Boolean.TRUE);

        when(usuarioRepository.findById(5L)).thenReturn(Optional.of(usuarioGuardado));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(actualizado);

        UsuarioResponseDTO resultado = usuarioService.actualizar(5L, dtoValido);

        assertNotNull(resultado);
        assertEquals("Carlos A. Pérez Actualizado", resultado.getNombreCompleto());
        verify(usuarioRepository, times(1)).findById(5L);
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    @DisplayName("❌ ERROR: Actualizar usuario inexistente lanza ResourceNotFoundException")
    void testActualizarUsuarioNoExiste() {
        when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> usuarioService.actualizar(999L, dtoValido));

        verify(usuarioRepository, never()).save(any());
    }

    // ── Desactivar / Activar ─────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Desactivar usuario existente")
    void testDesactivarUsuario() {
        when(usuarioRepository.findById(5L)).thenReturn(Optional.of(usuarioGuardado));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        assertDoesNotThrow(() -> usuarioService.desactivar(5L));

        verify(usuarioRepository, times(1)).findById(5L);
        verify(usuarioRepository, times(1)).save(argThat(u -> !u.getEstado()));
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Activar usuario desactivado")
    void testActivarUsuario() {
        usuarioGuardado.setEstado(Boolean.FALSE);
        when(usuarioRepository.findById(5L)).thenReturn(Optional.of(usuarioGuardado));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        assertDoesNotThrow(() -> usuarioService.activar(5L));

        verify(usuarioRepository, times(1)).save(argThat(Usuario::getEstado));
    }

    // ── Búsqueda ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Buscar usuario por ID existente")
    void testObtenerUsuarioPorIdExitoso() {
        when(usuarioRepository.findById(5L)).thenReturn(Optional.of(usuarioGuardado));

        UsuarioResponseDTO resultado = usuarioService.buscarPorId(5L);

        assertNotNull(resultado);
        assertEquals(5L, resultado.getIdUsuario());
        assertEquals("Carlos Andrés Pérez", resultado.getNombreCompleto());
    }

    @Test
    @DisplayName("❌ ERROR: Buscar usuario por ID inexistente lanza ResourceNotFoundException")
    void testObtenerUsuarioPorIdNoExiste() {
        when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> usuarioService.buscarPorId(999L));
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Listar todos los usuarios activos")
    void testListarActivos() {
        when(usuarioRepository.findByEstadoTrue()).thenReturn(List.of(usuarioGuardado));

        List<UsuarioResponseDTO> resultado = usuarioService.listarActivos();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertTrue(resultado.get(0).getEstado());
        verify(usuarioRepository, times(1)).findByEstadoTrue();
    }

    // ── Eliminación ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Eliminar usuario existente")
    void testEliminarUsuarioExistente() {
        when(usuarioRepository.existsById(5L)).thenReturn(true);
        doNothing().when(usuarioRepository).deleteById(5L);

        assertDoesNotThrow(() -> usuarioService.eliminar(5L));

        verify(usuarioRepository, times(1)).deleteById(5L);
    }

    @Test
    @DisplayName("❌ ERROR: Eliminar usuario inexistente lanza ResourceNotFoundException")
    void testEliminarUsuarioNoExiste() {
        when(usuarioRepository.existsById(999L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class,
            () -> usuarioService.eliminar(999L));

        verify(usuarioRepository, never()).deleteById(anyLong());
    }
}
