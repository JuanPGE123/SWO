package com.swo.model;

import java.math.BigDecimal;
import java.sql.Date;

/**
 * Clase que representa un empleado en el sistema
 */
public class Empleado {
    private int idEmpleado;
    private int idUsuario;
    private String codigoEmpleado;
    private String cargo;
    private String area;
    private Integer jefeInmediato;
    private BigDecimal salario;
    private Date fechaIngreso;
    private Date fechaSalida;
    private String estadoLaboral;

    // Constructor vacío
    public Empleado() {
    }

    // Constructor completo
    public Empleado(int idEmpleado, int idUsuario, String codigoEmpleado, String cargo, String area,
                   Integer jefeInmediato, BigDecimal salario, Date fechaIngreso, String estadoLaboral) {
        this.idEmpleado = idEmpleado;
        this.idUsuario = idUsuario;
        this.codigoEmpleado = codigoEmpleado;
        this.cargo = cargo;
        this.area = area;
        this.jefeInmediato = jefeInmediato;
        this.salario = salario;
        this.fechaIngreso = fechaIngreso;
        this.estadoLaboral = estadoLaboral;
    }

    // Getters y Setters
    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getCodigoEmpleado() {
        return codigoEmpleado;
    }

    public void setCodigoEmpleado(String codigoEmpleado) {
        this.codigoEmpleado = codigoEmpleado;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getJefeInmediato() {
        return jefeInmediato;
    }

    public void setJefeInmediato(Integer jefeInmediato) {
        this.jefeInmediato = jefeInmediato;
    }

    public BigDecimal getSalario() {
        return salario;
    }

    public void setSalario(BigDecimal salario) {
        this.salario = salario;
    }

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getEstadoLaboral() {
        return estadoLaboral;
    }

    public void setEstadoLaboral(String estadoLaboral) {
        this.estadoLaboral = estadoLaboral;
    }

    @Override
    public String toString() {
        return "Empleado{" +
                "idEmpleado=" + idEmpleado +
                ", codigoEmpleado='" + codigoEmpleado + '\'' +
                ", cargo='" + cargo + '\'' +
                ", area='" + area + '\'' +
                ", estadoLaboral='" + estadoLaboral + '\'' +
                '}';
    }
}
