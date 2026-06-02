package com.swo.proyecto.service;

import com.swo.proyecto.dto.ProyectoDTO;
import com.swo.proyecto.entity.Proyecto;
import com.swo.proyecto.repository.ProyectoRepository;
import com.swo.usuario.entity.Usuario;
import com.swo.usuario.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para ProyectoService
 * 
 * Cobertura de escenarios:
 * - Happy Path: Creación exitosa de proyecto
 * - Validación: Fallo por datos incompletos
 * - Edge Cases: Proyecto duplicado, usuario no existe
 * 
 * @author Tech Lead - SWO Project
 * @version 1.0
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ProyectoService - Pruebas Unitarias")
class ProyectoServiceTest {

    @Mock
    private ProyectoRepository proyectoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private ProyectoService proyectoService;

    private ProyectoDTO proyectoDTOValido;
    private Usuario usuarioResponsable;
    private Proyecto proyectoEsperado;

    /**
     * Configuración inicial antes de cada test
     * Se ejecuta antes de cada método de prueba
     */
    @BeforeEach
    void setUp() {
        // Crear usuario responsable
        usuarioResponsable = new Usuario();
        usuarioResponsable.setId(1L);
        usuarioResponsable.setNombre("Juan Pérez");
        usuarioResponsable.setEmail("juan.perez@swo.com");
        usuarioResponsable.setRol("PROJECT_MANAGER");
        usuarioResponsable.setActivo(true);

        // Crear DTO de entrada válido
        proyectoDTOValido = new ProyectoDTO();
        proyectoDTOValido.setNombre("Sistema de Facturación");
        proyectoDTOValido.setDescripcion("Implementación de sistema de facturación para empresa retail");
        proyectoDTOValido.setResponsableId(1L);
        proyectoDTOValido.setEstado("ACTIVO");
        proyectoDTOValido.setPrioridad("ALTA");

        // Crear proyecto esperado en BD
        proyectoEsperado = new Proyecto();
        proyectoEsperado.setId(1L);
        proyectoEsperado.setNombre("Sistema de Facturación");
        proyectoEsperado.setDescripcion("Implementación de sistema de facturación para empresa retail");
        proyectoEsperado.setResponsable(usuarioResponsable);
        proyectoEsperado.setEstado("ACTIVO");
        proyectoEsperado.setPrioridad("ALTA");
        proyectoEsperado.setFechaCreacion(LocalDateTime.now());
    }

    /**
     * TEST 1: Happy Path - Creación exitosa de proyecto
     * 
     * Escenario:
     * - El usuario responsable existe en BD
     * - Los datos del DTO son válidos
     * - El proyecto no existe previamente
     * 
     * Resultado esperado:
     * - El proyecto se crea exitosamente
     * - Se retorna el proyecto guardado en BD
     * - El repositorio es llamado exactamente una vez
     */
    @Test
    @DisplayName("✅ HAPPY PATH: Crear proyecto exitosamente")
    void testCrearProyectoExitoso() {
        // ARRANGE - Configurar mocks
        when(usuarioRepository.findById(1L))
            .thenReturn(Optional.of(usuarioResponsable));
        when(proyectoRepository.existsByNombreAndResponsableId("Sistema de Facturación", 1L))
            .thenReturn(false);
        when(proyectoRepository.save(any(Proyecto.class)))
            .thenReturn(proyectoEsperado);

        // ACT - Ejecutar el método bajo prueba
        Proyecto proyectoCreado = proyectoService.crearProyecto(proyectoDTOValido);

        // ASSERT - Verificar resultados
        assertNotNull(proyectoCreado, "El proyecto creado no debe ser null");
        assertEquals(1L, proyectoCreado.getId(), "ID del proyecto debe ser 1");
        assertEquals("Sistema de Facturación", proyectoCreado.getNombre(), "Nombre debe coincidir");
        assertEquals("ACTIVO", proyectoCreado.getEstado(), "Estado debe ser ACTIVO");
        assertEquals("ALTA", proyectoCreado.getPrioridad(), "Prioridad debe ser ALTA");
        assertEquals(usuarioResponsable.getId(), proyectoCreado.getResponsable().getId(), 
                     "Responsable debe coincidir");

        // VERIFY - Verificar llamadas a mocks
        verify(usuarioRepository, times(1)).findById(1L);
        verify(proyectoRepository, times(1)).existsByNombreAndResponsableId("Sistema de Facturación", 1L);
        verify(proyectoRepository, times(1)).save(any(Proyecto.class));
    }

    /**
     * TEST 2: Validación - Fallo por nombre vacío
     * 
     * Escenario:
     * - El DTO contiene un nombre vacío
     * 
     * Resultado esperado:
     * - Se lanza IllegalArgumentException
     * - El repositorio NO es llamado
     * - El mensaje de error es descriptivo
     */
    @Test
    @DisplayName("❌ VALIDACIÓN: Fallo por nombre vacío")
    void testCrearProyectoSinNombre() {
        // ARRANGE
        proyectoDTOValido.setNombre(""); // Nombre vacío

        // ACT & ASSERT
        IllegalArgumentException excepcion = assertThrows(
            IllegalArgumentException.class,
            () -> proyectoService.crearProyecto(proyectoDTOValido),
            "Debe lanzar IllegalArgumentException para nombre vacío"
        );

        // Verificar mensaje de error
        assertTrue(excepcion.getMessage().contains("nombre"), 
                   "Mensaje debe mencionar el campo nombre");

        // VERIFY - El repositorio NO debe ser llamado
        verify(proyectoRepository, never()).save(any(Proyecto.class));
    }

    /**
     * TEST 3: Validación - Fallo por usuario responsable no existe
     * 
     * Escenario:
     * - El ID del responsable no existe en BD
     * 
     * Resultado esperado:
     * - Se lanza excepción personalizada UsuarioNoEncontradoException
     * - No se crea el proyecto
     */
    @Test
    @DisplayName("❌ VALIDACIÓN: Fallo por usuario responsable no existe")
    void testCrearProyectoConResponsableInexistente() {
        // ARRANGE
        when(usuarioRepository.findById(1L))
            .thenReturn(Optional.empty()); // Usuario no existe

        // ACT & ASSERT
        RuntimeException excepcion = assertThrows(
            RuntimeException.class,
            () -> proyectoService.crearProyecto(proyectoDTOValido),
            "Debe lanzar excepción cuando usuario no existe"
        );

        // VERIFY
        verify(usuarioRepository, times(1)).findById(1L);
        verify(proyectoRepository, never()).save(any(Proyecto.class));
    }

    /**
     * TEST 4: Validación - Fallo por proyecto duplicado
     * 
     * Escenario:
     * - Ya existe un proyecto con el mismo nombre del mismo responsable
     * 
     * Resultado esperado:
     * - Se lanza IllegalStateException
     * - El proyecto NO se crea
     */
    @Test
    @DisplayName("❌ VALIDACIÓN: Fallo por proyecto duplicado")
    void testCrearProyectoDuplicado() {
        // ARRANGE
        when(usuarioRepository.findById(1L))
            .thenReturn(Optional.of(usuarioResponsable));
        when(proyectoRepository.existsByNombreAndResponsableId("Sistema de Facturación", 1L))
            .thenReturn(true); // Proyecto ya existe

        // ACT & ASSERT
        IllegalStateException excepcion = assertThrows(
            IllegalStateException.class,
            () -> proyectoService.crearProyecto(proyectoDTOValido),
            "Debe lanzar IllegalStateException para proyecto duplicado"
        );

        // VERIFY
        verify(usuarioRepository, times(1)).findById(1L);
        verify(proyectoRepository, times(1)).existsByNombreAndResponsableId("Sistema de Facturación", 1L);
        verify(proyectoRepository, never()).save(any(Proyecto.class));
    }

    /**
     * TEST 5: Validación - Fallo por descripción nula
     * 
     * Escenario:
     * - El DTO contiene una descripción nula
     * 
     * Resultado esperado:
     * - Se lanza NullPointerException con mensaje descriptivo
     */
    @Test
    @DisplayName("❌ VALIDACIÓN: Fallo por descripción nula")
    void testCrearProyectoSinDescripcion() {
        // ARRANGE
        proyectoDTOValido.setDescripcion(null); // Descripción nula

        // ACT & ASSERT
        NullPointerException excepcion = assertThrows(
            NullPointerException.class,
            () -> proyectoService.crearProyecto(proyectoDTOValido),
            "Debe lanzar NullPointerException para descripción nula"
        );

        // VERIFY
        verify(proyectoRepository, never()).save(any(Proyecto.class));
    }

    /**
     * TEST 6: Actualizar proyecto - Happy Path
     * 
     * Escenario:
     * - El proyecto existe
     * - Los datos de actualización son válidos
     * 
     * Resultado esperado:
     * - El proyecto se actualiza correctamente
     */
    @Test
    @DisplayName("✅ HAPPY PATH: Actualizar proyecto exitosamente")
    void testActualizarProyectoExitoso() {
        // ARRANGE
        Long proyectoId = 1L;
        ProyectoDTO actualizacion = new ProyectoDTO();
        actualizacion.setNombre("Sistema de Facturación v2.0");
        actualizacion.setEstado("EN_PROGRESO");

        Proyecto proyectoActualizado = new Proyecto();
        proyectoActualizado.setId(proyectoId);
        proyectoActualizado.setNombre("Sistema de Facturación v2.0");
        proyectoActualizado.setEstado("EN_PROGRESO");

        when(proyectoRepository.findById(proyectoId))
            .thenReturn(Optional.of(proyectoEsperado));
        when(proyectoRepository.save(any(Proyecto.class)))
            .thenReturn(proyectoActualizado);

        // ACT
        Proyecto resultado = proyectoService.actualizarProyecto(proyectoId, actualizacion);

        // ASSERT
        assertNotNull(resultado);
        assertEquals("Sistema de Facturación v2.0", resultado.getNombre());
        assertEquals("EN_PROGRESO", resultado.getEstado());

        // VERIFY
        verify(proyectoRepository, times(1)).findById(proyectoId);
        verify(proyectoRepository, times(1)).save(any(Proyecto.class));
    }

    /**
     * TEST 7: Obtener proyecto por ID - Happy Path
     * 
     * Escenario:
     * - El proyecto existe en BD
     * 
     * Resultado esperado:
     * - Se retorna el proyecto correctamente
     */
    @Test
    @DisplayName("✅ HAPPY PATH: Obtener proyecto por ID")
    void testObtenerProyectoPorIdExitoso() {
        // ARRANGE
        Long proyectoId = 1L;
        when(proyectoRepository.findById(proyectoId))
            .thenReturn(Optional.of(proyectoEsperado));

        // ACT
        Proyecto resultado = proyectoService.obtenerProyectoPorId(proyectoId);

        // ASSERT
        assertNotNull(resultado);
        assertEquals(proyectoId, resultado.getId());
        assertEquals("Sistema de Facturación", resultado.getNombre());

        // VERIFY
        verify(proyectoRepository, times(1)).findById(proyectoId);
    }

    /**
     * TEST 8: Obtener proyecto por ID - Proyecto no existe
     * 
     * Escenario:
     * - El proyecto no existe en BD
     * 
     * Resultado esperado:
     * - Se lanza excepción de recurso no encontrado
     */
    @Test
    @DisplayName("❌ ERROR: Proyecto no existe")
    void testObtenerProyectoPorIdNoExiste() {
        // ARRANGE
        Long proyectoId = 999L;
        when(proyectoRepository.findById(proyectoId))
            .thenReturn(Optional.empty());

        // ACT & ASSERT
        RuntimeException excepcion = assertThrows(
            RuntimeException.class,
            () -> proyectoService.obtenerProyectoPorId(proyectoId),
            "Debe lanzar excepción cuando proyecto no existe"
        );

        // VERIFY
        verify(proyectoRepository, times(1)).findById(proyectoId);
    }
}
