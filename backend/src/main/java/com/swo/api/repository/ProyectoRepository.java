package com.swo.api.repository;

import com.swo.api.model.entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link Proyecto}.
 * Proporciona métodos CRUD y queries personalizadas.
 */
@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

    /**
     * Encuentra proyectos por estado.
     */
    List<Proyecto> findByEstado(String estado);

    /**
     * Busca proyectos cuyo nombre contiene el texto especificado (case-insensitive).
     */
    @Query("SELECT p FROM Proyecto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))")
    List<Proyecto> buscarPorNombre(@Param("texto") String texto);

    /**
     * Cuenta la cantidad de proyectos por estado.
     */
    Long countByEstado(String estado);

    /**
     * Verifica si existe un proyecto con el nombre especificado.
     */
    boolean existsByNombre(String nombre);
}
