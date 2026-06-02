package com.swo.service;

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
import com.swo.api.service.impl.IncidenciaServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para IncidenciaServiceImpl.
 *
 * Cobertura:
 * - Happy Path: crear, actualizar, cambiar estado, eliminar, buscar
 * - Validaciones: estado inválido, usuario/categoría inexistente
 * - Edge Cases: cierre automático al cambiar estado a Cerrado/Resuelto
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("IncidenciaService - Pruebas Unitarias")
class IncidenciaServiceTest {

    @Mock
    private IncidenciaRepository incidenciaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private IncidenciaServiceImpl incidenciaService;

    private Usuario usuarioReporta;
    private Categoria categoria;
    private IncidenciaRequestDTO dtoValido;
    private Incidencia incidenciaGuardada;

    @BeforeEach
    void setUp() {
        usuarioReporta = new Usuario();
        usuarioReporta.setIdUsuario(1L);
        usuarioReporta.setNombreCompleto("Ana García");
        usuarioReporta.setCorreo("ana.garcia@swo.com");
        usuarioReporta.setRol("Soporte");
        usuarioReporta.setEstado(Boolean.TRUE);

        categoria = new Categoria();
        categoria.setIdCategoria(2L);
        categoria.setNombreCategoria("Hardware");
        categoria.setEstado(Boolean.TRUE);

        dtoValido = new IncidenciaRequestDTO();
        dtoValido.setTitulo("Falla en el sistema de autenticación");
        dtoValido.setDescripcion("Los usuarios no pueden iniciar sesión desde las 08:00 am.");
        dtoValido.setEstado("Abierto");
        dtoValido.setImpacto("Alto");
        dtoValido.setUbicacion("Piso 2 - Sala TI");
        dtoValido.setIdUsuarioReporta(1L);
        dtoValido.setIdCategoria(2L);

        incidenciaGuardada = new Incidencia();
        incidenciaGuardada.setIdIncidencia(10L);
        incidenciaGuardada.setTitulo("Falla en el sistema de autenticación");
        incidenciaGuardada.setDescripcion("Los usuarios no pueden iniciar sesión desde las 08:00 am.");
        incidenciaGuardada.setEstado("Abierto");
        incidenciaGuardada.setImpacto("Alto");
        incidenciaGuardada.setUbicacion("Piso 2 - Sala TI");
        incidenciaGuardada.setUsuarioReporta(usuarioReporta);
        incidenciaGuardada.setCategoria(categoria);
    }

    // ── Pruebas de creación ──────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Crear incidencia con todos los campos válidos")
    void testCrearIncidenciaExitosa() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioReporta));
        when(categoriaRepository.findById(2L)).thenReturn(Optional.of(categoria));
        when(incidenciaRepository.save(any(Incidencia.class))).thenReturn(incidenciaGuardada);

        IncidenciaResponseDTO resultado = incidenciaService.crear(dtoValido);

        assertNotNull(resultado);
        assertEquals(10L, resultado.getIdIncidencia());
        assertEquals("Falla en el sistema de autenticación", resultado.getTitulo());
        assertEquals("Abierto", resultado.getEstado());
        assertEquals("Alto", resultado.getImpacto());
        assertEquals(1L, resultado.getIdUsuarioReporta());
        assertEquals("Ana García", resultado.getNombreUsuarioReporta());

        verify(usuarioRepository, times(1)).findById(1L);
        verify(categoriaRepository, times(1)).findById(2L);
        verify(incidenciaRepository, times(1)).save(any(Incidencia.class));
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Crear incidencia sin categoría (campo opcional)")
    void testCrearIncidenciaConCategoria() {
        dtoValido.setIdCategoria(null);
        Incidencia sinCategoria = new Incidencia();
        sinCategoria.setIdIncidencia(11L);
        sinCategoria.setTitulo(dtoValido.getTitulo());
        sinCategoria.setDescripcion(dtoValido.getDescripcion());
        sinCategoria.setEstado("Abierto");
        sinCategoria.setImpacto("Medio");
        sinCategoria.setUsuarioReporta(usuarioReporta);

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioReporta));
        when(incidenciaRepository.save(any(Incidencia.class))).thenReturn(sinCategoria);

        IncidenciaResponseDTO resultado = incidenciaService.crear(dtoValido);

        assertNotNull(resultado);
        assertNull(resultado.getIdCategoria());
        verify(categoriaRepository, never()).findById(anyLong());
    }

    @Test
    @DisplayName("❌ ERROR: Crear incidencia con usuario inexistente lanza excepción")
    void testCrearIncidenciaUsuarioNoExiste() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> incidenciaService.crear(dtoValido),
            "Debe lanzar ResourceNotFoundException cuando el usuario no existe");

        verify(incidenciaRepository, never()).save(any());
    }

    @Test
    @DisplayName("❌ ERROR: Crear incidencia con categoría inexistente lanza excepción")
    void testCrearIncidenciaCategoriaNoExiste() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioReporta));
        when(categoriaRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> incidenciaService.crear(dtoValido),
            "Debe lanzar ResourceNotFoundException cuando la categoría no existe");

        verify(incidenciaRepository, never()).save(any());
    }

    // ── Pruebas de cambio de estado ───────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Cambiar estado a 'En Progreso'")
    void testCambiarEstadoValido() {
        incidenciaGuardada.setEstado("En Progreso");
        when(incidenciaRepository.findById(10L)).thenReturn(Optional.of(incidenciaGuardada));
        when(incidenciaRepository.save(any(Incidencia.class))).thenReturn(incidenciaGuardada);

        IncidenciaResponseDTO resultado = incidenciaService.cambiarEstado(10L, "En Progreso");

        assertNotNull(resultado);
        assertEquals("En Progreso", resultado.getEstado());
        verify(incidenciaRepository, times(1)).findById(10L);
        verify(incidenciaRepository, times(1)).save(any(Incidencia.class));
    }

    @Test
    @DisplayName("❌ VALIDACIÓN: Estado inválido lanza BusinessException")
    void testCambiarEstadoInvalido() {
        assertThrows(BusinessException.class,
            () -> incidenciaService.cambiarEstado(10L, "ESTADO_INEXISTENTE"),
            "Debe lanzar BusinessException para estado inválido");

        verify(incidenciaRepository, never()).findById(anyLong());
        verify(incidenciaRepository, never()).save(any());
    }

    @Test
    @DisplayName("✅ EDGE CASE: Cambiar estado a 'Cerrado' registra fecha de cierre")
    void testCambiarEstadoACerrado_RegistraFechaCierre() {
        when(incidenciaRepository.findById(10L)).thenReturn(Optional.of(incidenciaGuardada));
        when(incidenciaRepository.save(any(Incidencia.class))).thenAnswer(inv -> {
            Incidencia i = inv.getArgument(0);
            assertNotNull(i.getFechaCierre(), "La fecha de cierre debe registrarse al cerrar");
            return i;
        });

        incidenciaService.cambiarEstado(10L, "Cerrado");

        verify(incidenciaRepository, times(1)).save(any(Incidencia.class));
    }

    @Test
    @DisplayName("✅ EDGE CASE: Cambiar estado a 'Resuelto' también registra fecha de cierre")
    void testCambiarEstadoAResuelto_RegistraFechaCierre() {
        when(incidenciaRepository.findById(10L)).thenReturn(Optional.of(incidenciaGuardada));
        when(incidenciaRepository.save(any(Incidencia.class))).thenAnswer(inv -> {
            Incidencia i = inv.getArgument(0);
            assertNotNull(i.getFechaCierre(), "La fecha de cierre debe registrarse al resolver");
            return i;
        });

        incidenciaService.cambiarEstado(10L, "Resuelto");

        verify(incidenciaRepository, times(1)).save(any(Incidencia.class));
    }

    // ── Pruebas de eliminación ────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Eliminar incidencia existente")
    void testEliminarIncidenciaExistente() {
        when(incidenciaRepository.existsById(10L)).thenReturn(true);
        doNothing().when(incidenciaRepository).deleteById(10L);

        assertDoesNotThrow(() -> incidenciaService.eliminar(10L));

        verify(incidenciaRepository, times(1)).existsById(10L);
        verify(incidenciaRepository, times(1)).deleteById(10L);
    }

    @Test
    @DisplayName("❌ ERROR: Eliminar incidencia inexistente lanza excepción")
    void testEliminarIncidenciaNoExiste() {
        when(incidenciaRepository.existsById(999L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class,
            () -> incidenciaService.eliminar(999L));

        verify(incidenciaRepository, never()).deleteById(anyLong());
    }

    // ── Pruebas de búsqueda ──────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Buscar incidencia por ID existente")
    void testBuscarPorIdExitoso() {
        when(incidenciaRepository.findById(10L)).thenReturn(Optional.of(incidenciaGuardada));

        IncidenciaResponseDTO resultado = incidenciaService.buscarPorId(10L);

        assertNotNull(resultado);
        assertEquals(10L, resultado.getIdIncidencia());
        assertEquals("Falla en el sistema de autenticación", resultado.getTitulo());
        verify(incidenciaRepository, times(1)).findById(10L);
    }

    @Test
    @DisplayName("❌ ERROR: Buscar incidencia por ID inexistente lanza excepción")
    void testBuscarPorIdNoExiste() {
        when(incidenciaRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> incidenciaService.buscarPorId(999L),
            "Debe lanzar ResourceNotFoundException cuando la incidencia no existe");

        verify(incidenciaRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Listar todas las incidencias paginadas")
    void testListarTodasPaginado() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Incidencia> paginaMock = new PageImpl<>(List.of(incidenciaGuardada));
        when(incidenciaRepository.findAll(pageable)).thenReturn(paginaMock);

        Page<IncidenciaResponseDTO> resultado = incidenciaService.listarTodas(pageable);

        assertNotNull(resultado);
        assertEquals(1, resultado.getTotalElements());
        verify(incidenciaRepository, times(1)).findAll(pageable);
    }
}
