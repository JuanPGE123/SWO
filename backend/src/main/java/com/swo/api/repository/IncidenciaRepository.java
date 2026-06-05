package com.swo.api.repository;

import com.swo.api.model.entity.Incidencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link Incidencia}.
 */
@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {

    /**
     * Lista todas las incidencias paginadas con sus relaciones cargadas en un solo JOIN,
     * evitando el problema N+1 al acceder a usuarioReporta y categoria en el DTO.
     */
    @EntityGraph(attributePaths = {"usuarioReporta", "categoria"})
    Page<Incidencia> findAll(Pageable pageable);

    /** Lista incidencias paginadas por estado (con JOIN a relaciones). */
    @EntityGraph(attributePaths = {"usuarioReporta", "categoria"})
    Page<Incidencia> findByEstado(String estado, Pageable pageable);

    /** Lista incidencias de un usuario específico (paginadas, con JOIN a relaciones). */
    @EntityGraph(attributePaths = {"usuarioReporta", "categoria"})
    Page<Incidencia> findByUsuarioReporta_IdUsuario(Long idUsuario, Pageable pageable);

    /** Lista incidencias de una categoría (paginadas). */
    Page<Incidencia> findByCategoria_IdCategoria(Long idCategoria, Pageable pageable);

    /** Incidencias por impacto. */
    List<Incidencia> findByImpacto(String impacto);

    /**
     * Búsqueda de texto en título o descripción (con JOIN a relaciones para evitar N+1).
     * Se define countQuery separado para que la paginación no aplique DISTINCT al COUNT.
     */
    @EntityGraph(attributePaths = {"usuarioReporta", "categoria"})
    @Query(value = """
           SELECT i FROM Incidencia i
           WHERE LOWER(i.titulo) LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(i.descripcion) LIKE LOWER(CONCAT('%', :q, '%'))
           """,
           countQuery = """
           SELECT COUNT(i) FROM Incidencia i
           WHERE LOWER(i.titulo) LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(i.descripcion) LIKE LOWER(CONCAT('%', :q, '%'))
           """)
    Page<Incidencia> buscarPorTexto(@Param("q") String query, Pageable pageable);

    /** Conteo de incidencias agrupadas por estado (para dashboard). */
    @Query("SELECT i.estado, COUNT(i) FROM Incidencia i GROUP BY i.estado")
    List<Object[]> contarPorEstado();

    /** Verifica si un usuario tiene incidencias asociadas. */
    boolean existsByUsuarioReporta_IdUsuario(Long idUsuario);

    /** Elimina todas las incidencias de un usuario (cascada al eliminar usuario). */
    void deleteByUsuarioReporta_IdUsuario(Long idUsuario);
}
