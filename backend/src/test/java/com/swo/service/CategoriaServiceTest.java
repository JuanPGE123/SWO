package com.swo.service;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.CategoriaRequestDTO;
import com.swo.api.model.dto.response.CategoriaResponseDTO;
import com.swo.api.model.entity.Categoria;
import com.swo.api.repository.CategoriaRepository;
import com.swo.api.service.impl.CategoriaServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para CategoriaServiceImpl.
 *
 * Cobertura:
 * - Happy Path: crear, listar, buscar, actualizar, desactivar, eliminar
 * - Validaciones: nombre duplicado
 * - Errores: categoría no encontrada
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("CategoriaService - Pruebas Unitarias")
class CategoriaServiceTest {

    @Mock
    private CategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriaServiceImpl categoriaService;

    private CategoriaRequestDTO dtoValido;
    private Categoria categoriaGuardada;

    @BeforeEach
    void setUp() {
        dtoValido = new CategoriaRequestDTO();
        dtoValido.setNombreCategoria("Hardware");
        dtoValido.setDescripcion("Incidencias relacionadas con equipos físicos");
        dtoValido.setColor("#FF5722");
        dtoValido.setIcono("computer");

        categoriaGuardada = new Categoria();
        categoriaGuardada.setIdCategoria(1L);
        categoriaGuardada.setNombreCategoria("Hardware");
        categoriaGuardada.setDescripcion("Incidencias relacionadas con equipos físicos");
        categoriaGuardada.setColor("#FF5722");
        categoriaGuardada.setIcono("computer");
        categoriaGuardada.setEstado(Boolean.TRUE);
    }

    // ── Creación ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Crear categoría con nombre único")
    void testCrearCategoriaExitosa() {
        when(categoriaRepository.existsByNombreCategoria("Hardware")).thenReturn(false);
        when(categoriaRepository.save(any(Categoria.class))).thenReturn(categoriaGuardada);

        CategoriaResponseDTO resultado = categoriaService.crear(dtoValido);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdCategoria());
        assertEquals("Hardware", resultado.getNombreCategoria());
        assertEquals("#FF5722", resultado.getColor());
        assertTrue(resultado.getEstado());

        verify(categoriaRepository, times(1)).existsByNombreCategoria("Hardware");
        verify(categoriaRepository, times(1)).save(any(Categoria.class));
    }

    @Test
    @DisplayName("❌ VALIDACIÓN: Crear categoría con nombre duplicado lanza BusinessException")
    void testCrearCategoriaNombreDuplicado() {
        when(categoriaRepository.existsByNombreCategoria("Hardware")).thenReturn(true);

        BusinessException excepcion = assertThrows(BusinessException.class,
            () -> categoriaService.crear(dtoValido),
            "Debe lanzar BusinessException para nombre duplicado");

        assertTrue(excepcion.getMessage().contains("Hardware"));
        verify(categoriaRepository, never()).save(any());
    }

    // ── Listado ───────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Listar todas las categorías")
    void testListarCategorias() {
        Categoria cat2 = new Categoria();
        cat2.setIdCategoria(2L);
        cat2.setNombreCategoria("Software");
        cat2.setEstado(Boolean.TRUE);

        when(categoriaRepository.findAll()).thenReturn(List.of(categoriaGuardada, cat2));

        List<CategoriaResponseDTO> resultado = categoriaService.listarTodas();

        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Hardware", resultado.get(0).getNombreCategoria());
        assertEquals("Software", resultado.get(1).getNombreCategoria());
        verify(categoriaRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Listar solo categorías activas")
    void testListarCategoriasActivas() {
        when(categoriaRepository.findByEstadoTrue()).thenReturn(List.of(categoriaGuardada));

        List<CategoriaResponseDTO> resultado = categoriaService.listarActivas();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertTrue(resultado.get(0).getEstado());
        verify(categoriaRepository, times(1)).findByEstadoTrue();
    }

    // ── Búsqueda ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Buscar categoría por ID existente")
    void testBuscarPorIdExitoso() {
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoriaGuardada));

        CategoriaResponseDTO resultado = categoriaService.buscarPorId(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdCategoria());
        assertEquals("Hardware", resultado.getNombreCategoria());
    }

    @Test
    @DisplayName("❌ ERROR: Buscar categoría por ID inexistente lanza ResourceNotFoundException")
    void testObtenerCategoriaPorIdNoExiste() {
        when(categoriaRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException excepcion = assertThrows(ResourceNotFoundException.class,
            () -> categoriaService.buscarPorId(999L));

        assertTrue(excepcion.getMessage().contains("999"));
    }

    // ── Actualización ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Actualizar categoría con nuevo nombre único")
    void testActualizarCategoriaExitosa() {
        dtoValido.setNombreCategoria("Hardware v2");
        Categoria actualizada = new Categoria();
        actualizada.setIdCategoria(1L);
        actualizada.setNombreCategoria("Hardware v2");
        actualizada.setEstado(Boolean.TRUE);

        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoriaGuardada));
        when(categoriaRepository.existsByNombreCategoria("Hardware v2")).thenReturn(false);
        when(categoriaRepository.save(any(Categoria.class))).thenReturn(actualizada);

        CategoriaResponseDTO resultado = categoriaService.actualizar(1L, dtoValido);

        assertNotNull(resultado);
        assertEquals("Hardware v2", resultado.getNombreCategoria());
    }

    // ── Desactivar / Eliminar ─────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Desactivar categoría existente")
    void testDesactivarCategoria() {
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoriaGuardada));
        when(categoriaRepository.save(any(Categoria.class))).thenAnswer(inv -> inv.getArgument(0));

        assertDoesNotThrow(() -> categoriaService.desactivar(1L));

        verify(categoriaRepository, times(1)).save(argThat(c -> !c.getEstado()));
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Eliminar categoría existente")
    void testEliminarCategoriaExistente() {
        when(categoriaRepository.existsById(1L)).thenReturn(true);
        doNothing().when(categoriaRepository).deleteById(1L);

        assertDoesNotThrow(() -> categoriaService.eliminar(1L));

        verify(categoriaRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("❌ ERROR: Eliminar categoría inexistente lanza ResourceNotFoundException")
    void testEliminarCategoriaNoExiste() {
        when(categoriaRepository.existsById(999L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class,
            () -> categoriaService.eliminar(999L));

        verify(categoriaRepository, never()).deleteById(anyLong());
    }
}
