package com.swo.api.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Actualiza el CHECK constraint de la columna `rol` en la tabla `usuarios`
 * para incluir todos los roles válidos del sistema.
 * Hibernate ddl-auto=update no gestiona CHECK constraints, por eso se hace aquí.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RolesSchemaUpdater implements ApplicationRunner {

    private final JdbcTemplate jdbcTemplate;

    private static final String ROLES_VALIDOS =
            "'Soporte','Jefe','Usuario','Administrador','Técnico'," +
            "'Analista','Desarrollador','Mesa de Servicio','Consultor'," +
            "'Auditor','Coordinador','Gerente','QA'";

    @Override
    public void run(ApplicationArguments args) {
        try {
            actualizarConstraintRol();
            actualizarLongitudRol();
        } catch (Exception e) {
            log.warn("[RolesSchemaUpdater] No se pudo actualizar el constraint de rol: {}", e.getMessage());
        }
    }

    private void actualizarConstraintRol() {
        try {
            // Obtener nombres de CHECK constraints existentes sobre la tabla usuarios
            String sql = """
                SELECT CONSTRAINT_NAME
                FROM information_schema.TABLE_CONSTRAINTS
                WHERE TABLE_SCHEMA = DATABASE()
                  AND TABLE_NAME = 'usuarios'
                  AND CONSTRAINT_TYPE = 'CHECK'
                """;

            jdbcTemplate.queryForList(sql, String.class).forEach(constraintName -> {
                try {
                    jdbcTemplate.execute("ALTER TABLE usuarios DROP CHECK `" + constraintName + "`");
                    log.info("[RolesSchemaUpdater] Constraint eliminado: {}", constraintName);
                } catch (Exception ex) {
                    log.debug("[RolesSchemaUpdater] No se pudo eliminar constraint {}: {}", constraintName, ex.getMessage());
                }
            });

            // Agregar nuevo constraint con todos los roles
            jdbcTemplate.execute(
                "ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_check " +
                "CHECK (rol IN (" + ROLES_VALIDOS + "))"
            );
            log.info("[RolesSchemaUpdater] CHECK constraint de roles actualizado exitosamente");

        } catch (Exception e) {
            log.warn("[RolesSchemaUpdater] Error actualizando constraint de rol: {}", e.getMessage());
        }
    }

    private void actualizarLongitudRol() {
        try {
            jdbcTemplate.execute("ALTER TABLE usuarios MODIFY COLUMN rol VARCHAR(30) NOT NULL");
            log.info("[RolesSchemaUpdater] Longitud de columna rol actualizada a VARCHAR(30)");
        } catch (Exception e) {
            log.debug("[RolesSchemaUpdater] Columna rol ya tiene la longitud correcta: {}", e.getMessage());
        }
    }
}
