package com.swo.api.repository;

import com.swo.api.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@link Usuario}.
 * Extiende {@link JpaRepository} para obtener CRUD completo + paginación.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /** Busca un usuario por correo (usado en autenticación). */
    Optional<Usuario> findByCorreo(String correo);

    /** Verifica si ya existe un usuario con el correo dado. */
    boolean existsByCorreo(String correo);

    /** Lista todos los usuarios por rol. */
    List<Usuario> findByRol(String rol);

    /** Lista todos los usuarios activos. */
    List<Usuario> findByEstadoTrue();

    /** Búsqueda parcial por nombre (case-insensitive). */
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombreCompleto) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Usuario> buscarPorNombre(@Param("nombre") String nombre);
}
