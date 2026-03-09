package com.swo.model;

import java.sql.Timestamp;

/**
 * Clase que representa una notificación del sistema
 */
public class Notificacion {
    private int idNotificacion;
    private int idUsuario;
    private String tipoNotificacion;
    private String titulo;
    private String mensaje;
    private boolean leida;
    private Timestamp fechaCreacion;
    private Timestamp fechaLectura;
    private String enlace;

    // Constructor vacío
    public Notificacion() {
    }

    // Constructor completo
    public Notificacion(int idUsuario, String tipoNotificacion, String titulo, String mensaje, String enlace) {
        this.idUsuario = idUsuario;
        this.tipoNotificacion = tipoNotificacion;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.enlace = enlace;
        this.leida = false;
    }

    // Getters y Setters
    public int getIdNotificacion() {
        return idNotificacion;
    }

    public void setIdNotificacion(int idNotificacion) {
        this.idNotificacion = idNotificacion;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTipoNotificacion() {
        return tipoNotificacion;
    }

    public void setTipoNotificacion(String tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public boolean isLeida() {
        return leida;
    }

    public void setLeida(boolean leida) {
        this.leida = leida;
    }

    public Timestamp getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Timestamp fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Timestamp getFechaLectura() {
        return fechaLectura;
    }

    public void setFechaLectura(Timestamp fechaLectura) {
        this.fechaLectura = fechaLectura;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    @Override
    public String toString() {
        return "Notificacion{" +
                "idNotificacion=" + idNotificacion +
                ", titulo='" + titulo + '\'' +
                ", mensaje='" + mensaje + '\'' +
                ", leida=" + leida +
                ", fechaCreacion=" + fechaCreacion +
                '}';
    }
}
