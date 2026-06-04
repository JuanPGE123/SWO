package com.swo.api.controller;

import com.swo.api.common.ApiResponse;
import com.swo.api.repository.IncidenciaRepository;
import com.swo.api.repository.ProyectoRepository;
import com.swo.api.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
@Tag(name = "Reportes", description = "Estadísticas y reportes del sistema")
public class ReporteController {

    private final IncidenciaRepository incidenciaRepository;
    private final ProyectoRepository   proyectoRepository;
    private final UsuarioRepository    usuarioRepository;

    /** GET /v1/estadisticas — Resumen general del sistema */
    @GetMapping("/estadisticas")
    @Operation(summary = "Estadísticas generales del sistema SWO")
    public ResponseEntity<ApiResponse<Map<String, Object>>> estadisticas() {

        List<Object[]> porEstado = incidenciaRepository.contarPorEstado();

        long totalIncidencias  = 0;
        long abiertas          = 0;
        long enProgreso        = 0;
        long pendientes        = 0;
        long resueltas         = 0;
        long cerradas          = 0;

        for (Object[] fila : porEstado) {
            String estado = (String) fila[0];
            long   cuenta = (Long)   fila[1];
            totalIncidencias += cuenta;
            switch (estado) {
                case "Abierto"      -> abiertas    = cuenta;
                case "En Progreso"  -> enProgreso  = cuenta;
                case "Pendiente"    -> pendientes  = cuenta;
                case "Resuelto"     -> resueltas   = cuenta;
                case "Cerrado"      -> cerradas    = cuenta;
            }
        }

        double pctResueltas = totalIncidencias > 0
                ? Math.round((resueltas + cerradas) * 100.0 / totalIncidencias * 10) / 10.0
                : 0.0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalIncidencias",    totalIncidencias);
        stats.put("incidenciasAbiertas", abiertas);
        stats.put("incidenciasEnProgreso", enProgreso);
        stats.put("incidenciasPendientes", pendientes);
        stats.put("incidenciasResueltas",  resueltas);
        stats.put("incidenciasCerradas",   cerradas);
        stats.put("porcentajeResueltas",   pctResueltas);
        stats.put("totalProyectos",  proyectoRepository.count());
        stats.put("totalUsuarios",   usuarioRepository.count());
        stats.put("proyectosActivos", proyectoRepository.countByEstado("Activo"));

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    /** GET /v1/reportes — Lista los últimos reportes generados (simulado) */
    @GetMapping("/reportes")
    @Operation(summary = "Últimos reportes generados")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listarReportes() {
        // Retorna vacío hasta que se implemente persistencia de reportes
        return ResponseEntity.ok(ApiResponse.ok(List.of()));
    }

    /** POST /v1/reportes — Registra un reporte generado */
    @PostMapping("/reportes")
    @Operation(summary = "Registrar un reporte generado")
    public ResponseEntity<ApiResponse<Map<String, Object>>> crearReporte(
            @RequestBody Map<String, Object> body) {
        log.info("Reporte registrado: {}", body.get("nombre"));
        // Por ahora retorna confirmación — se puede persistir en una tabla futura
        return ResponseEntity.ok(ApiResponse.ok("Reporte registrado", body));
    }
}
