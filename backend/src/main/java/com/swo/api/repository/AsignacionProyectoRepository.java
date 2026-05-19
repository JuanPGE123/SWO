package com.swo.api.repository;

import com.swo.api.model.entity.AsignacionProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la gestión de {@link AsignacionProyecto}.
 * <p>
 * Proporciona operaciones CRUD y consultas personalizadas para
 * asignaciones de usuarios a proyectos.
 */
@Repository
public interface AsignacionProyectoRepository extends JpaRepository<AsignacionProyecto, Long> {

    /**
     * Busca todas las asignaciones de un proyecto específico.
     *
     * @param idProyecto ID del proyecto
     * @return Lista de asignaciones del proyecto
     */
    List<AsignacionProyecto> findByProyecto_IdProyecto(Long idProyecto);

    /**
     * Busca todas las asignaciones de un usuario específico.
     *
     * @param idUsuario ID del usuario
     * @return Lista de asignaciones del usuario
     */
    List<AsignacionProyecto> findByUsuario_IdUsuario(Long idUsuario);

    /**
     * Busca una asignación específica por proyecto y usuario.
     *
     * @param idProyecto ID del proyecto
     * @param idUsuario ID del usuario
     * @return Optional con la asignación si existe
     */
    Optional<AsignacionProyecto> findByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    /**
     * Verifica si existe una asignación para un proyecto y usuario.
     *
     * @param idProyecto ID del proyecto
     * @param idUsuario ID del usuario
     * @return true si existe la asignación, false en caso contrario
     */
    boolean existsByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    /**
     * Elimina una asignación específica por proyecto y usuario.
     *
     * @param idProyecto ID del proyecto
     * @param idUsuario ID del usuario
     */
    void deleteByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    /**
     * Cuenta las asignaciones de un proyecto.
     *
     * @param idProyecto ID del proyecto
     * @return Número de usuarios asignados al proyecto
     */
    long countByProyecto_IdProyecto(Long idProyecto);
}
