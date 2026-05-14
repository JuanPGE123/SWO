package com.swo.api.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Entidad JPA que mapea la tabla {@code usuarios} del esquema {@code swo_db}.
 * <p>
 * Roles válidos: Soporte | Jefe | Usuario | Administrador | Técnico
 */
@Entity
@Table(name = "usuarios")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "nombre_completo", nullable = false, length = 100)
    private String nombreCompleto;

    @Column(name = "correo", nullable = false, unique = true, length = 100)
    private String correo;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "rol", nullable = false, length = 20)
    private String rol;

    @Column(name = "estado", nullable = false)
    private Boolean estado = Boolean.TRUE;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "departamento", length = 50)
    private String departamento;

    @Column(name = "foto_perfil", length = 255)
    private String fotoPerfil;

    @CreatedDate
    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    @LastModifiedDate
    @Column(name = "ultima_conexion")
    private LocalDateTime ultimaConexion;
}
