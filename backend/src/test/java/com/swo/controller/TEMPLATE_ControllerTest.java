package com.swo.controller;

import com.swo.dto.IncidentRequest;
import com.swo.dto.IncidentResponse;
import com.swo.model.Incident;
import com.swo.service.IncidentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * ════════════════════════════════════════════════════════════════════════════
 * PLANTILLA DE TEST - CONTROLADOR CON JUNIT5 Y MOCKITO
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Propósito: Template reutilizable para tests de Controllers REST
 * 
 * Características:
 * - JUnit 5 (Jupiter)
 * - Mockito para mocking
 * - AssertJ para assertions fluidas
 * - MockMvc para testing HTTP sin servidor
 * - Validación de excepciones y manejo de errores
 * 
 * Cómo usar:
 * 1. Copiar este archivo como: src/test/java/com/swo/controller/IncidentControllerTest.java
 * 2. Reemplazar "Incident" por tu modelo
 * 3. Reemplazar los métodos de test según tus endpoints
 * 4. Ejecutar: mvn test -Dtest=IncidentControllerTest
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */

@ExtendWith(MockitoExtension.class)
@DisplayName("Test Suite: IncidentController REST API")
class IncidentControllerTest {

    // ────────────────────────────────────────────────────────────────────────
    // SETUP & FIXTURES
    // ────────────────────────────────────────────────────────────────────────

    @Mock
    private IncidentService incidentService;

    @InjectMocks
    private IncidentController incidentController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private Incident testIncident;
    private IncidentRequest testRequest;
    private IncidentResponse testResponse;

    @BeforeEach
    @DisplayName("Inicializar fixtures antes de cada test")
    void setUp() {
        // Inicializar MockMvc con el controlador mockado
        mockMvc = MockMvcBuilders.standaloneSetup(incidentController).build();
        objectMapper = new ObjectMapper();

        // ── Crear datos de prueba ──
        testIncident = Incident.builder()
            .id(1L)
            .titulo("Test Incident")
            .descripcion("Test Description")
            .prioridad("MEDIA")
            .estado("ABIERTA")
            .usuarioId(1L)
            .fechaCreacion(LocalDateTime.now())
            .build();

        testRequest = IncidentRequest.builder()
            .titulo("Test Incident")
            .descripcion("Test Description")
            .prioridad("MEDIA")
            .usuarioId(1L)
            .build();

        testResponse = IncidentResponse.builder()
            .id(1L)
            .titulo("Test Incident")
            .descripcion("Test Description")
            .prioridad("MEDIA")
            .estado("ABIERTA")
            .fechaCreacion(LocalDateTime.now())
            .build();
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: GET (Lectura)
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/incidents - Obtener todas las incidencias")
    void testGetAllIncidents() throws Exception {
        // GIVEN: Service retorna lista de incidencias
        List<IncidentResponse> incidents = Arrays.asList(testResponse);
        when(incidentService.getAllIncidents()).thenReturn(incidents);

        // WHEN: Realizar petición GET
        mockMvc.perform(get("/api/incidents")
                .contentType("application/json"))

            // THEN: Validar respuesta HTTP 200
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].titulo").value("Test Incident"));

        // Verificar que el servicio fue llamado una sola vez
        verify(incidentService, times(1)).getAllIncidents();
        verifyNoMoreInteractions(incidentService);
    }

    @Test
    @DisplayName("GET /api/incidents/{id} - Obtener incidencia por ID")
    void testGetIncidentById() throws Exception {
        // GIVEN
        Long incidentId = 1L;
        when(incidentService.getIncidentById(incidentId)).thenReturn(testResponse);

        // WHEN & THEN
        mockMvc.perform(get("/api/incidents/{id}", incidentId)
                .contentType("application/json"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.titulo").value("Test Incident"));

        verify(incidentService).getIncidentById(incidentId);
    }

    @Test
    @DisplayName("GET /api/incidents/{id} - Retorna 404 cuando no existe")
    void testGetIncidentByIdNotFound() throws Exception {
        // GIVEN
        Long incidentId = 999L;
        when(incidentService.getIncidentById(incidentId))
            .thenThrow(new ResourceNotFoundException("Incidencia no encontrada"));

        // WHEN & THEN
        mockMvc.perform(get("/api/incidents/{id}", incidentId))
            .andExpect(status().isNotFound());

        verify(incidentService).getIncidentById(incidentId);
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: POST (Creación)
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/incidents - Crear nueva incidencia")
    void testCreateIncident() throws Exception {
        // GIVEN: Service retorna la incidencia creada
        when(incidentService.createIncident(any(IncidentRequest.class)))
            .thenReturn(testResponse);

        // WHEN: Realizar petición POST con JSON
        mockMvc.perform(post("/api/incidents")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(testRequest)))

            // THEN: Validar respuesta HTTP 201 Created
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.titulo").value("Test Incident"));

        // Verificar que el servicio fue llamado con los argumentos correctos
        verify(incidentService, times(1)).createIncident(any(IncidentRequest.class));
    }

    @Test
    @DisplayName("POST /api/incidents - Validar campos requeridos")
    void testCreateIncidentMissingFields() throws Exception {
        // GIVEN: Request con campos faltantes
        IncidentRequest invalidRequest = IncidentRequest.builder()
            .descripcion("Sin título")
            .build();

        // WHEN & THEN: Validar que se retorna 400 Bad Request
        mockMvc.perform(post("/api/incidents")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(invalidRequest)))
            .andExpect(status().isBadRequest());

        // El servicio NO debe ser llamado si fallan validaciones
        verify(incidentService, never()).createIncident(any());
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: PUT (Actualización)
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("PUT /api/incidents/{id} - Actualizar incidencia existente")
    void testUpdateIncident() throws Exception {
        // GIVEN
        Long incidentId = 1L;
        IncidentRequest updateRequest = IncidentRequest.builder()
            .titulo("Updated Title")
            .prioridad("ALTA")
            .build();

        IncidentResponse updatedResponse = testResponse.toBuilder()
            .titulo("Updated Title")
            .prioridad("ALTA")
            .build();

        when(incidentService.updateIncident(eq(incidentId), any(IncidentRequest.class)))
            .thenReturn(updatedResponse);

        // WHEN & THEN
        mockMvc.perform(put("/api/incidents/{id}", incidentId)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(updateRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.titulo").value("Updated Title"))
            .andExpect(jsonPath("$.prioridad").value("ALTA"));

        verify(incidentService).updateIncident(eq(incidentId), any(IncidentRequest.class));
    }

    @Test
    @DisplayName("PUT /api/incidents/{id} - Retorna 404 si no existe")
    void testUpdateIncidentNotFound() throws Exception {
        // GIVEN
        Long incidentId = 999L;
        when(incidentService.updateIncident(eq(incidentId), any()))
            .thenThrow(new ResourceNotFoundException("No existe"));

        // WHEN & THEN
        mockMvc.perform(put("/api/incidents/{id}", incidentId)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(testRequest)))
            .andExpect(status().isNotFound());
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: DELETE (Eliminación)
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("DELETE /api/incidents/{id} - Eliminar incidencia")
    void testDeleteIncident() throws Exception {
        // GIVEN
        Long incidentId = 1L;
        doNothing().when(incidentService).deleteIncident(incidentId);

        // WHEN & THEN: Debe retornar 204 No Content
        mockMvc.perform(delete("/api/incidents/{id}", incidentId))
            .andExpect(status().isNoContent());

        verify(incidentService).deleteIncident(incidentId);
    }

    @Test
    @DisplayName("DELETE /api/incidents/{id} - Retorna 404 si no existe")
    void testDeleteIncidentNotFound() throws Exception {
        // GIVEN
        Long incidentId = 999L;
        doThrow(new ResourceNotFoundException("No existe"))
            .when(incidentService).deleteIncident(incidentId);

        // WHEN & THEN
        mockMvc.perform(delete("/api/incidents/{id}", incidentId))
            .andExpect(status().isNotFound());
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: FILTROS Y BÚSQUEDA
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/incidents?estado=ABIERTA - Filtrar por estado")
    void testFilterIncidentsByStatus() throws Exception {
        // GIVEN
        List<IncidentResponse> openIncidents = Arrays.asList(testResponse);
        when(incidentService.getIncidentsByStatus("ABIERTA"))
            .thenReturn(openIncidents);

        // WHEN & THEN
        mockMvc.perform(get("/api/incidents")
                .param("estado", "ABIERTA"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].estado").value("ABIERTA"));

        verify(incidentService).getIncidentsByStatus("ABIERTA");
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: MANEJO DE EXCEPCIONES
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Manejo de excepción: BadRequestException")
    void testBadRequestException() throws Exception {
        // GIVEN
        when(incidentService.createIncident(any()))
            .thenThrow(new BadRequestException("Datos inválidos"));

        // WHEN & THEN: Debe retornar 400
        mockMvc.perform(post("/api/incidents")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(testRequest)))
            .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Manejo de excepción: UnauthorizedException")
    void testUnauthorizedException() throws Exception {
        // GIVEN
        when(incidentService.updateIncident(any(), any()))
            .thenThrow(new UnauthorizedException("No autorizado"));

        // WHEN & THEN: Debe retornar 401
        mockMvc.perform(put("/api/incidents/1")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(testRequest)))
            .andExpect(status().isUnauthorized());
    }

    // ────────────────────────────────────────────────────────────────────────
    // TESTS: VALIDACIÓN DE RESPUESTAS
    // ────────────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("Validar estructura de respuesta JSON")
    void testResponseStructure() throws Exception {
        // GIVEN
        when(incidentService.getIncidentById(1L)).thenReturn(testResponse);

        // WHEN & THEN: Validar que todos los campos están presentes
        mockMvc.perform(get("/api/incidents/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.titulo").exists())
            .andExpect(jsonPath("$.descripcion").exists())
            .andExpect(jsonPath("$.prioridad").exists())
            .andExpect(jsonPath("$.estado").exists())
            .andExpect(jsonPath("$.fechaCreacion").exists());
    }

}

/**
 * ════════════════════════════════════════════════════════════════════════════
 * NOTAS DE IMPLEMENTACIÓN
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * 1. ANOTACIONES KEY:
 *    @ExtendWith(MockitoExtension.class) - Habilita Mockito en JUnit5
 *    @Mock - Crea un mock del servicio
 *    @InjectMocks - Inyecta mocks en el controlador
 *    @BeforeEach - Se ejecuta antes de cada test
 * 
 * 2. PATRONES DE TEST (AAA):
 *    - Arrange (GIVEN): Preparar datos y configurar mocks
 *    - Act (WHEN): Ejecutar la operación
 *    - Assert (THEN): Validar resultados
 * 
 * 3. MOCKITO METHODS:
 *    when(x).thenReturn(y) - Mock retorna valor
 *    doNothing().when(x) - Mock no retorna nada
 *    doThrow().when(x) - Mock lanza excepción
 *    verify(x).method() - Verifica que fue llamado
 *    times(n) - Verifica número de llamadas
 *    any() - Matcher para cualquier argumento
 *    eq() - Matcher para argumentos iguales
 * 
 * 4. ASSERTIONS (AssertJ):
 *    assertThat(value).isEqualTo(expected)
 *    assertThat(value).contains(item)
 *    assertThat(value).hasSize(n)
 *    assertThat(value).isNotNull()
 * 
 * 5. EJECUCIÓN:
 *    mvn test - Todos los tests
 *    mvn test -Dtest=IncidentControllerTest - Test específico
 *    mvn clean test -Ptest-coverage - Con cobertura (JaCoCo)
 * 
 * 6. COVERAGE MÍNIMO: 80% (configurado en pom.xml)
 *    Verificar en: backend/target/site/jacoco/index.html
 * 
 * ════════════════════════════════════════════════════════════════════════════
 */
