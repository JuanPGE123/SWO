package com.swo.service;

import com.swo.dto.IncidentRequest;
import com.swo.model.Incident;
import com.swo.model.User;
import com.swo.repository.IncidentRepository;
import com.swo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * ════════════════════════════════════════════════════════════════════════════
 * PLANTILLA DE TEST - SERVICIO CON JUNIT5 Y MOCKITO
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Propósito: Template reutilizable para tests de Servicios/Lógica de Negocio
 * 
 * Características:
 * - JUnit 5 parametrizados para múltiples casos
 * - Mocking de repositories
 * - Tests de lógica de negocio compleja
 * - Validación de excepciones
 * - Tests de transacciones
 * 
 * Cómo usar:
 * 1. Copiar como: src/test/java/com/swo/service/IncidentServiceTest.java
 * 2. Reemplazar IncidentService y IncidentRepository
 * 3. Adaptar tests a tu lógica de negocio
 * 4. Ejecutar: mvn test -Dtest=IncidentServiceTest
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

@ExtendWith(MockitoExtension.class)
@DisplayName("Test Suite: IncidentService (Lógica de Negocio)")
class IncidentServiceTest {

    // ────────────────────────────────────────────────────────────────────────
    // MOCKS
    // ────────────────────────────────────────────────────────────────────────

    @Mock
    private IncidentRepository incidentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private IncidentService incidentService;

    // ────────────────────────────────────────────────────────────────────────
    // FIXTURES (Datos de prueba)
    // ────────────────────────────────────────────────────────────────────────

    private Incident testIncident;
    private User testUser;
    private IncidentRequest testRequest;

    @BeforeEach
    @DisplayName("Inicializar datos de prueba")
    void setUp() {
        // Usuario de prueba
        testUser = User.builder()
            .id(1L)
            .nombre("Usuario Test")
            .email("test@example.com")
            .rol("USUARIO")
            .estado("ACTIVO")
            .build();

        // Incidencia de prueba
        testIncident = Incident.builder()
            .id(1L)
            .titulo("Test Incident")
            .descripcion("Descripción de prueba")
            .prioridad("MEDIA")
            .estado("ABIERTA")
            .usuario(testUser)
            .fechaCreacion(LocalDateTime.now())
            .build();

        // Request de prueba
        testRequest = IncidentRequest.builder()
            .titulo("Test Incident")
            .descripcion("Descripción de prueba")
            .prioridad("MEDIA")
            .usuarioId(1L)
            .build();
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: CREAR INCIDENCIA
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Crear incidencia exitosamente")
    void testCreateIncidentSuccess() {
        // GIVEN: Usuario existe y request es válido
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(incidentRepository.save(any(Incident.class))).thenReturn(testIncident);

        // WHEN: Llamar al servicio
        Incident result = incidentService.createIncident(testRequest);

        // THEN: Validar resultado
        assertThat(result)
            .isNotNull()
            .extracting("id", "titulo", "estado")
            .containsExactly(1L, "Test Incident", "ABIERTA");

        // Verificar interacciones
        verify(userRepository).findById(1L);
        verify(incidentRepository).save(any(Incident.class));
    }

    @Test
    @DisplayName("Error: Usuario no encontrado al crear incidencia")
    void testCreateIncidentUserNotFound() {
        // GIVEN: Usuario no existe
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        IncidentRequest invalidRequest = testRequest.toBuilder()
            .usuarioId(999L)
            .build();

        // WHEN & THEN: Lanzar excepción
        assertThatThrownBy(() -> incidentService.createIncident(invalidRequest))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Usuario no encontrado");

        // Repository no debe ser llamado
        verify(incidentRepository, never()).save(any());
    }

    @Test
    @DisplayName("Error: Validación de campos requeridos")
    void testCreateIncidentMissingFields() {
        // GIVEN: Request sin título
        IncidentRequest invalidRequest = IncidentRequest.builder()
            .descripcion("Sin título")
            .usuarioId(1L)
            .build();

        // WHEN & THEN: Lanzar excepción de validación
        assertThatThrownBy(() -> incidentService.createIncident(invalidRequest))
            .isInstanceOf(ValidationException.class);
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: OBTENER INCIDENCIA
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Obtener incidencia por ID")
    void testGetIncidentById() {
        // GIVEN
        when(incidentRepository.findById(1L)).thenReturn(Optional.of(testIncident));

        // WHEN
        Incident result = incidentService.getIncidentById(1L);

        // THEN
        assertThat(result)
            .isNotNull()
            .isEqualTo(testIncident);

        verify(incidentRepository).findById(1L);
    }

    @Test
    @DisplayName("Obtener incidencia por ID - No encontrada")
    void testGetIncidentByIdNotFound() {
        // GIVEN
        when(incidentRepository.findById(999L)).thenReturn(Optional.empty());

        // WHEN & THEN
        assertThatThrownBy(() -> incidentService.getIncidentById(999L))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Incidencia no encontrada");
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: LISTAR INCIDENCIAS
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Obtener todas las incidencias")
    void testGetAllIncidents() {
        // GIVEN: Repository retorna lista
        List<Incident> incidents = Arrays.asList(testIncident);
        when(incidentRepository.findAll()).thenReturn(incidents);

        // WHEN
        List<Incident> result = incidentService.getAllIncidents();

        // THEN
        assertThat(result)
            .isNotNull()
            .hasSize(1)
            .contains(testIncident);

        verify(incidentRepository).findAll();
    }

    @Test
    @DisplayName("Obtener todas las incidencias - Lista vacía")
    void testGetAllIncidentsEmpty() {
        // GIVEN
        when(incidentRepository.findAll()).thenReturn(Arrays.asList());

        // WHEN
        List<Incident> result = incidentService.getAllIncidents();

        // THEN
        assertThat(result).isEmpty();
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: FILTROS (Parámetrizados)
    // ────────────────────────────────────────────────────────────────────────

    @ParameterizedTest
    @ValueSource(strings = {"ABIERTA", "EN_PROGRESO", "RESUELTA", "CERRADA"})
    @DisplayName("Filtrar incidencias por estado")
    void testGetIncidentsByStatus(String estado) {
        // GIVEN: Incidencia con estado específico
        Incident incident = testIncident.toBuilder().estado(estado).build();
        when(incidentRepository.findByEstado(estado))
            .thenReturn(Arrays.asList(incident));

        // WHEN
        List<Incident> result = incidentService.getIncidentsByStatus(estado);

        // THEN
        assertThat(result)
            .isNotEmpty()
            .allMatch(i -> i.getEstado().equals(estado));

        verify(incidentRepository).findByEstado(estado);
    }

    @Test
    @DisplayName("Filtrar incidencias por usuario")
    void testGetIncidentsByUser() {
        // GIVEN
        when(incidentRepository.findByUsuarioId(1L))
            .thenReturn(Arrays.asList(testIncident));

        // WHEN
        List<Incident> result = incidentService.getIncidentsByUser(1L);

        // THEN
        assertThat(result)
            .isNotEmpty()
            .allMatch(i -> i.getUsuario().getId().equals(1L));
    }

    @Test
    @DisplayName("Filtrar incidencias por prioridad")
    void testGetIncidentsByPriority() {
        // GIVEN
        when(incidentRepository.findByPrioridad("ALTA"))
            .thenReturn(Arrays.asList(testIncident.toBuilder().prioridad("ALTA").build()));

        // WHEN
        List<Incident> result = incidentService.getIncidentsByPriority("ALTA");

        // THEN
        assertThat(result)
            .isNotEmpty()
            .allMatch(i -> i.getPrioridad().equals("ALTA"));
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: ACTUALIZAR INCIDENCIA
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Actualizar incidencia exitosamente")
    void testUpdateIncidentSuccess() {
        // GIVEN
        IncidentRequest updateRequest = testRequest.toBuilder()
            .titulo("Título actualizado")
            .prioridad("ALTA")
            .build();

        Incident updatedIncident = testIncident.toBuilder()
            .titulo("Título actualizado")
            .prioridad("ALTA")
            .build();

        when(incidentRepository.findById(1L)).thenReturn(Optional.of(testIncident));
        when(incidentRepository.save(any(Incident.class))).thenReturn(updatedIncident);

        // WHEN
        Incident result = incidentService.updateIncident(1L, updateRequest);

        // THEN
        assertThat(result)
            .extracting("titulo", "prioridad")
            .containsExactly("Título actualizado", "ALTA");

        verify(incidentRepository).findById(1L);
        verify(incidentRepository).save(any(Incident.class));
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: CAMBIAR ESTADO
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Cambiar estado de incidencia (ABIERTA -> EN_PROGRESO)")
    void testChangeIncidentStatus() {
        // GIVEN
        Incident inProgressIncident = testIncident.toBuilder()
            .estado("EN_PROGRESO")
            .build();

        when(incidentRepository.findById(1L)).thenReturn(Optional.of(testIncident));
        when(incidentRepository.save(any(Incident.class))).thenReturn(inProgressIncident);

        // WHEN
        Incident result = incidentService.updateStatus(1L, "EN_PROGRESO");

        // THEN
        assertThat(result.getEstado()).isEqualTo("EN_PROGRESO");
    }

    @Test
    @DisplayName("Error: Transición de estado inválida")
    void testInvalidStatusTransition() {
        // GIVEN: Incidencia cerrada no puede volver a abierta
        Incident closedIncident = testIncident.toBuilder().estado("CERRADA").build();
        when(incidentRepository.findById(1L)).thenReturn(Optional.of(closedIncident));

        // WHEN & THEN
        assertThatThrownBy(() -> incidentService.updateStatus(1L, "ABIERTA"))
            .isInstanceOf(BusinessLogicException.class)
            .hasMessageContaining("estado inválido");
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: ASIGNAR TÉCNICO
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Asignar técnico a incidencia")
    void testAssignTechnicianToIncident() {
        // GIVEN
        User techUser = User.builder()
            .id(2L)
            .nombre("Técnico Test")
            .rol("TECNICO")
            .build();

        Incident assignedIncident = testIncident.toBuilder()
            .tecnicoAsignado(techUser)
            .estado("EN_PROGRESO")
            .build();

        when(incidentRepository.findById(1L)).thenReturn(Optional.of(testIncident));
        when(userRepository.findById(2L)).thenReturn(Optional.of(techUser));
        when(incidentRepository.save(any(Incident.class))).thenReturn(assignedIncident);

        // WHEN
        Incident result = incidentService.assignTechnician(1L, 2L);

        // THEN
        assertThat(result.getTecnicoAsignado())
            .isNotNull()
            .extracting("id", "nombre")
            .containsExactly(2L, "Técnico Test");

        verify(userRepository).findById(2L);
        verify(incidentRepository).save(any(Incident.class));
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: ELIMINAR INCIDENCIA
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Eliminar incidencia exitosamente")
    void testDeleteIncident() {
        // GIVEN
        when(incidentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(incidentRepository).deleteById(1L);

        // WHEN
        incidentService.deleteIncident(1L);

        // THEN
        verify(incidentRepository).deleteById(1L);
    }

    @Test
    @DisplayName("Error: Eliminar incidencia no existente")
    void testDeleteIncidentNotFound() {
        // GIVEN
        when(incidentRepository.existsById(999L)).thenReturn(false);

        // WHEN & THEN
        assertThatThrownBy(() -> incidentService.deleteIncident(999L))
            .isInstanceOf(ResourceNotFoundException.class);

        verify(incidentRepository, never()).deleteById(any());
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: ESTADÍSTICAS Y REPORTES
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Obtener estadísticas de incidencias")
    void testGetStatistics() {
        // GIVEN
        when(incidentRepository.countByEstado("ABIERTA")).thenReturn(5L);
        when(incidentRepository.countByEstado("EN_PROGRESO")).thenReturn(3L);
        when(incidentRepository.countByEstado("RESUELTA")).thenReturn(12L);

        // WHEN
        IncidentStatistics stats = incidentService.getStatistics();

        // THEN
        assertThat(stats)
            .extracting("openCount", "inProgressCount", "resolvedCount")
            .containsExactly(5L, 3L, 12L);
    }

}

/**
 * ════════════════════════════════════════════════════════════════════════════
 * PATRONES Y MEJORES PRÁCTICAS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * 1. FIXTURES:
 *    - Utilizar @BeforeEach para crear datos de prueba comunes
 *    - Builder pattern para constructores simples
 *    - Reutilizar datos para múltiples tests
 * 
 * 2. MOCKITO:
 *    - when().thenReturn() para valores
 *    - doNothing().when() para void
 *    - doThrow().when() para excepciones
 *    - verify() para validar interacciones
 * 
 * 3. ASSERTIONS (AssertJ):
 *    - isNotNull() - Validar no nulo
 *    - isEqualTo() - Igualdad
 *    - contains() - Contiene elemento
 *    - hasSize() - Tamaño de colección
 *    - extracting() - Extraer propiedades
 *    - allMatch() - Todos cumplen condición
 * 
 * 4. TESTS PARAMETRIZADOS:
 *    - @ParameterizedTest + @ValueSource para múltiples casos
 *    - Reduce código duplicado
 *    - Un test por cada variante de entrada
 * 
 * 5. COBERTURA:
 *    - Casos positivos: Cuando funciona correctamente
 *    - Casos negativos: Excepciones y errores
 *    - Casos edge: Límites y valores especiales
 * 
 * 6. EJECUCIÓN:
 *    mvn clean test -Dtest=IncidentServiceTest
 *    mvn clean test -Ptest-coverage  # Con cobertura JaCoCo
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */
