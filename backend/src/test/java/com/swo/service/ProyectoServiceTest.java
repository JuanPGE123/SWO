package com.swo.service;

import com.swo.api.exception.BusinessException;
import com.swo.api.exception.ResourceNotFoundException;
import com.swo.api.model.dto.request.ProyectoRequestDTO;
import com.swo.api.model.dto.response.ProyectoResponseDTO;
import com.swo.api.model.entity.Proyecto;
import com.swo.api.repository.AsignacionProyectoRepository;
import com.swo.api.repository.ProyectoRepository;
import com.swo.api.repository.UsuarioRepository;
import com.swo.api.service.impl.ProyectoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ProyectoService - Pruebas Unitarias")
class ProyectoServiceTest {

    @Mock
    private ProyectoRepository proyectoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;

    @InjectMocks
    private ProyectoServiceImpl proyectoService;

    private ProyectoRequestDTO dtoValido;
    private Proyecto proyectoGuardado;

    @BeforeEach
    void setUp() {
        dtoValido = new ProyectoRequestDTO();
        dtoValido.setNombreProyecto("Sistema de Nómina");
        dtoValido.setDescripcion("Automatización del proceso de nómina empresarial");
        dtoValido.setEstado("Activo");

        proyectoGuardado = new Proyecto();
        proyectoGuardado.setIdProyecto(1L);
        proyectoGuardado.setNombre("Sistema de Nómina");
        proyectoGuardado.setDescripcion("Automatización del proceso de nómina empresarial");
        proyectoGuardado.setEstado("Activo");
        proyectoGuardado.setFechaCreacion(LocalDateTime.now());
    }

    // ── Creación ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Crear proyecto con nombre único")
    void testCrearProyectoExitoso() {
        when(proyectoRepository.existsByNombre("Sistema de Nómina")).thenReturn(false);
        when(proyectoRepository.save(any(Proyecto.class))).thenReturn(proyectoGuardado);

        ProyectoResponseDTO resultado = proyectoService.crear(dtoValido);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdProyecto());
        assertEquals("Sistema de Nómina", resultado.getNombreProyecto());
        assertEquals("Activo", resultado.getEstado());

        verify(proyectoRepository, times(1)).existsByNombre("Sistema de Nómina");
        verify(proyectoRepository, times(1)).save(any(Proyecto.class));
    }

    @Test
    @DisplayName("❌ VALIDACIÓN: Crear proyecto con nombre duplicado lanza BusinessException")
    void testCrearProyectoNombreDuplicado() {
        when(proyectoRepository.existsByNombre("Sistema de Nómina")).thenReturn(true);

        BusinessException excepcion = assertThrows(BusinessException.class,
            () -> proyectoService.crear(dtoValido),
            "Debe lanzar BusinessException para nombre duplicado");

        assertTrue(excepcion.getMessage().contains("Sistema de Nómina"));
        verify(proyectoRepository, never()).save(any());
    }

    // ── Listado ───────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Listar todos los proyectos")
    void testListarProyectos() {
        Proyecto p2 = new Proyecto();
        p2.setIdProyecto(2L);
        p2.setNombre("Portal Web");
        p2.setEstado("En Pausa");

        when(proyectoRepository.findAll()).thenReturn(List.of(proyectoGuardado, p2));

        List<ProyectoResponseDTO> resultado = proyectoService.listarTodos();

        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Sistema de Nómina", resultado.get(0).getNombreProyecto());
        assertEquals("Portal Web", resultado.get(1).getNombreProyecto());
        verify(proyectoRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("✅ HAPPY PATH: Listar proyectos por estado")
    void testListarProyectosPorEstado() {
        when(proyectoRepository.findByEstado("Activo")).thenReturn(List.of(proyectoGuardado));

        List<ProyectoResponseDTO> resultado = proyectoService.listarPorEstado("Activo");

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Activo", resultado.get(0).getEstado());
        verify(proyectoRepository, times(1)).findByEstado("Activo");
    }

    // ── Búsqueda ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Buscar proyecto por ID existente")
    void testObtenerPorIdExitoso() {
        when(proyectoRepository.findById(1L)).thenReturn(Optional.of(proyectoGuardado));

        ProyectoResponseDTO resultado = proyectoService.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdProyecto());
        assertEquals("Sistema de Nómina", resultado.getNombreProyecto());
    }

    @Test
    @DisplayName("❌ ERROR: Buscar proyecto por ID inexistente lanza ResourceNotFoundException")
    void testObtenerPorIdNoExiste() {
        when(proyectoRepository.findById(999L)).thenReturn(Optional.empty());

        ResourceNotFoundException excepcion = assertThrows(ResourceNotFoundException.class,
            () -> proyectoService.obtenerPorId(999L));

        assertTrue(excepcion.getMessage().contains("999"));
    }

    // ── Actualización ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Actualizar proyecto existente con nuevo nombre")
    void testActualizarProyectoExitoso() {
        dtoValido.setNombreProyecto("Sistema de Nómina v2");
        Proyecto actualizado = new Proyecto();
        actualizado.setIdProyecto(1L);
        actualizado.setNombre("Sistema de Nómina v2");
        actualizado.setEstado("Activo");

        when(proyectoRepository.findById(1L)).thenReturn(Optional.of(proyectoGuardado));
        when(proyectoRepository.existsByNombre("Sistema de Nómina v2")).thenReturn(false);
        when(proyectoRepository.save(any(Proyecto.class))).thenReturn(actualizado);

        ProyectoResponseDTO resultado = proyectoService.actualizar(1L, dtoValido);

        assertNotNull(resultado);
        assertEquals("Sistema de Nómina v2", resultado.getNombreProyecto());
        verify(proyectoRepository, times(1)).findById(1L);
        verify(proyectoRepository, times(1)).save(any(Proyecto.class));
    }

    @Test
    @DisplayName("❌ ERROR: Actualizar proyecto inexistente lanza ResourceNotFoundException")
    void testActualizarProyectoNoExiste() {
        when(proyectoRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
            () -> proyectoService.actualizar(999L, dtoValido));

        verify(proyectoRepository, never()).save(any());
    }

    // ── Eliminación ──────────────────────────────────────────────────────────

    @Test
    @DisplayName("✅ HAPPY PATH: Eliminar proyecto existente")
    void testEliminarProyectoExistente() {
        when(proyectoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(proyectoRepository).deleteById(1L);

        assertDoesNotThrow(() -> proyectoService.eliminar(1L));

        verify(proyectoRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("❌ ERROR: Eliminar proyecto inexistente lanza ResourceNotFoundException")
    void testEliminarProyectoNoExiste() {
        when(proyectoRepository.existsById(999L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class,
            () -> proyectoService.eliminar(999L));

        verify(proyectoRepository, never()).deleteById(anyLong());
    }
}
