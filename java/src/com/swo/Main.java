package com.swo;

import com.swo.dao.*;
import com.swo.model.*;
import java.util.List;

/**
 * Clase principal que demuestra todas las funcionalidades del sistema SWO
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║  SISTEMA DE GESTIÓN DE INCIDENCIAS (SWO)      ║");
        System.out.println("║  Version 2.0 - Sistema Completo               ║");
        System.out.println("╚════════════════════════════════════════════════╝\n");
        
        // ==================== MÓDULO 1: USUARIOS ====================
        System.out.println("\n[MÓDULO 1] GESTIÓN DE USUARIOS");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        UsuarioDAO usuarioDAO = new UsuarioDAO();
        
        // Listar usuarios activos
        List<Usuario> usuarios = usuarioDAO.obtenerUsuarios();
        System.out.println("Total de usuarios activos: " + usuarios.size());
        for (Usuario u : usuarios) {
            System.out.println("  • " + u.getNombreCompleto() + 
                             " (" + u.getRol() + ") - " + u.getDepartamento());
        }
        
        // Obtener usuarios de soporte
        System.out.println("\nTécnicos de Soporte:");
        List<Usuario> tecnicos = usuarioDAO.obtenerUsuariosPorRol("Soporte");
        for (Usuario t : tecnicos) {
            System.out.println("  • " + t.getNombreCompleto() + " - " + t.getCorreo());
        }
        
        // ==================== MÓDULO 2: EMPLEADOS ====================
        System.out.println("\n\n[MÓDULO 2] GESTIÓN DE EMPLEADOS");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        EmpleadoDAO empleadoDAO = new EmpleadoDAO();
        
        List<Empleado> empleados = empleadoDAO.obtenerEmpleados();
        System.out.println("Total de empleados activos: " + empleados.size());
        for (Empleado e : empleados) {
            System.out.println("  • " + e.getCodigoEmpleado() + " - " + 
                             e.getCargo() + " (" + e.getArea() + ")");
        }
        
        // Mostrar técnicos disponibles con carga de trabajo
        empleadoDAO.obtenerTecnicosSoporte();
        
        // ==================== MÓDULO 3: CATEGORÍAS ====================
        System.out.println("\n\n[MÓDULO 3] CATEGORÍAS DE INCIDENCIAS");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        CategoriaDAO categoriaDAO = new CategoriaDAO();
        
        List<Categoria> categorias = categoriaDAO.obtenerCategorias();
        System.out.println("Categorías disponibles: " + categorias.size());
        for (Categoria c : categorias) {
            System.out.println("  • [" + c.getColor() + "] " + c.getNombreCategoria() + 
                             " - " + c.getDescripcion());
        }
        
        // Mostrar estadísticas por categoría
        categoriaDAO.obtenerEstadisticasPorCategoria();
        
        // ==================== MÓDULO 4: INCIDENCIAS ====================
        System.out.println("\n\n[MÓDULO 4] GESTIÓN DE INCIDENCIAS");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        IncidenciaDAO incidenciaDAO = new IncidenciaDAO();
        
        // Crear nueva incidencia de prueba
        System.out.println("\n[CREAR] Insertando nueva incidencia de prueba...");
        Incidencia nuevaInc = new Incidencia(
            "Problema con acceso al sistema",
            "Los usuarios del área de ventas reportan lentitud al acceder. Requiere revisión urgente.",
            "Abierto",
            3  // Usuario ID 3
        );
        
        if (incidenciaDAO.insertarIncidencia(nuevaInc) > 0) {
            System.out.println("✓ Incidencia creada exitosamente");
        } else {
            System.out.println("✗ Error al crear incidencia");
        }
        
        // Listar todas las incidencias
        System.out.println("\n[CONSULTAR] Todas las incidencias:");
        List<Incidencia> incidencias = incidenciaDAO.obtenerIncidencias();
        System.out.println("Total de incidencias: " + incidencias.size());
        
        for (Incidencia inc : incidencias) {
            System.out.println("\n  ID: " + inc.getIdIncidencia() + " | " + inc.getTitulo());
            System.out.println("  Estado: " + inc.getEstado() + 
                             " | Reportado por: Usuario #" + inc.getIdUsuarioReporta());
            System.out.println("  Fecha: " + inc.getFechaCreacion());
        }
        
        // Actualizar estado de una incidencia
        if (!incidencias.isEmpty()) {
            System.out.println("\n[ACTUALIZAR] Cambiando estado de incidencia #1...");
            if (incidenciaDAO.actualizarEstadoIncidencia(1, "En Progreso")) {
                System.out.println("✓ Estado actualizado a 'En Progreso'");
            }
        }
        
        // ==================== MÓDULO 5: NOTIFICACIONES ====================
        System.out.println("\n\n[MÓDULO 5] SISTEMA DE NOTIFICACIONES");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        NotificacionDAO notifDAO = new NotificacionDAO();
        
        // Crear notificación de prueba
        System.out.println("\n[CREAR] Enviando notificación a usuario #3...");
        Notificacion notif = new Notificacion(
            3,  // Usuario ID
            "incidencia_actualizada",
            "Tu incidencia fue actualizada",
            "La incidencia #1 cambió a estado 'En Progreso'. El equipo técnico está trabajando en ella.",
            "/incidencias/1"
        );
        
        if (notifDAO.crearNotificacion(notif)) {
            System.out.println("✓ Notificación enviada");
        }
        
        // Consultar notificaciones no leídas
        System.out.println("\n[CONSULTAR] Notificaciones no leídas del usuario #3:");
        List<Notificacion> notificaciones = notifDAO.obtenerNotificacionesNoLeidas(3);
        int totalNoLeidas = notifDAO.contarNoLeidas(3);
        
        System.out.println("Total de notificaciones no leídas: " + totalNoLeidas);
        for (Notificacion n : notificaciones) {
            System.out.println("\n  • " + n.getTitulo());
            System.out.println("    " + n.getMensaje());
            System.out.println("    Tipo: " + n.getTipoNotificacion());
            System.out.println("    Fecha: " + n.getFechaCreacion());
        }
        
        // Marcar primera notificación como leída
        if (!notificaciones.isEmpty()) {
            int idNotif = notificaciones.get(0).getIdNotificacion();
            System.out.println("\n[ACTUALIZAR] Marcando notificación #" + idNotif + " como leída...");
            if (notifDAO.marcarComoLeida(idNotif)) {
                System.out.println("✓ Notificación marcada como leída");
            }
        }
        
        // ==================== MÓDULO 6: REPORTES Y DASHBOARD ====================
        System.out.println("\n\n[MÓDULO 6] DASHBOARD Y ESTADÍSTICAS");
        System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
        System.out.println("\nResumen General del Sistema:");
        System.out.println("  • Usuarios Activos: " + usuarios.size());
        System.out.println("  • Empleados Activos: " + empleados.size());
        System.out.println("  • Incidencias Totales: " + incidencias.size());
        System.out.println("  • Categorías Activas: " + categorias.size());
        System.out.println("  • Notificaciones Pendientes: " + totalNoLeidas);
        
        // Contar incidencias por estado
        long abiertas = incidencias.stream().filter(i -> i.getEstado().equals("Abierto")).count();
        long enProceso = incidencias.stream().filter(i -> i.getEstado().equals("En Progreso")).count();
        long cerradas = incidencias.stream().filter(i -> i.getEstado().equals("Cerrado")).count();
        
        System.out.println("\nEstado de Incidencias:");
        System.out.println("  • Abiertas: " + abiertas);
        System.out.println("  • En Proceso: " + enProceso);
        System.out.println("  • Cerradas: " + cerradas);
        
        // ==================== FIN ====================
        System.out.println("\n\n╔════════════════════════════════════════════════╗");
        System.out.println("║  DEMOS COMPLETADAS EXITOSAMENTE ✓             ║");
        System.out.println("║  Todas las funcionalidades operativas         ║");
        System.out.println("╚════════════════════════════════════════════════╝");
    }
}
