package com.swo.model;

import java.sql.Timestamp;

/**
 * Clase que representa un reporte generado en el sistema SWO.
 * Almacena un resumen estadístico de incidencias en un momento dado.
 */
public class Reporte {
    private int idReporte;
    private String nombre;
    private int totalIncidencias;
    private int abiertas;
    private int enProgreso;
    private int cerradas;
    private Timestamp fechaGeneracion;
    private Integer generadoPor;

    /** Constructor vacío requerido para instanciación desde ResultSet. */
    public Reporte() {}

    /**
     * Constructor con todos los campos estadísticos.
     * @param nombre            Nombre descriptivo del reporte
     * @param totalIncidencias  Total de incidencias incluidas
     * @param abiertas          Cantidad de incidencias abiertas
     * @param enProgreso        Cantidad en progreso
     * @param cerradas          Cantidad cerradas/resueltas
     * @param generadoPor       ID del usuario que generó el reporte (nullable)
     */
    public Reporte(String nombre, int totalIncidencias, int abiertas, int enProgreso, int cerradas, Integer generadoPor) {
        this.nombre = nombre;
        this.totalIncidencias = totalIncidencias;
        this.abiertas = abiertas;
        this.enProgreso = enProgreso;
        this.cerradas = cerradas;
        this.generadoPor = generadoPor;
    }

    public int getIdReporte() { return idReporte; }
    public void setIdReporte(int idReporte) { this.idReporte = idReporte; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getTotalIncidencias() { return totalIncidencias; }
    public void setTotalIncidencias(int totalIncidencias) { this.totalIncidencias = totalIncidencias; }

    public int getAbiertas() { return abiertas; }
    public void setAbiertas(int abiertas) { this.abiertas = abiertas; }

    public int getEnProgreso() { return enProgreso; }
    public void setEnProgreso(int enProgreso) { this.enProgreso = enProgreso; }

    public int getCerradas() { return cerradas; }
    public void setCerradas(int cerradas) { this.cerradas = cerradas; }

    public Timestamp getFechaGeneracion() { return fechaGeneracion; }
    public void setFechaGeneracion(Timestamp fechaGeneracion) { this.fechaGeneracion = fechaGeneracion; }

    public Integer getGeneradoPor() { return generadoPor; }
    public void setGeneradoPor(Integer generadoPor) { this.generadoPor = generadoPor; }
}
