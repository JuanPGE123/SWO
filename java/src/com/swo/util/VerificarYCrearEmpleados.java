package com.swo.util;

import java.sql.*;

public class VerificarYCrearEmpleados {
    public static void main(String[] args) {
        System.out.println("=".repeat(80));
        System.out.println("VERIFICACION Y CREACION DE EMPLEADOS");
        System.out.println("=".repeat(80));
        
        try (Connection con = ConexionBD.obtenerConexion()) {
            if (con == null) {
                System.err.println("No se pudo conectar a la base de datos");
                return;
            }
            
            // 1. Ver todos los usuarios
            System.out.println("\n1. USUARIOS EXISTENTES:");
            System.out.println("-".repeat(80));
            String sql1 = "SELECT id_usuario, nombre_completo, correo, rol FROM usuarios";
            
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql1)) {
                while (rs.next()) {
                    System.out.printf("  Usuario ID: %d | Nombre: %s | Correo: %s | Rol: %s%n",
                        rs.getInt("id_usuario"),
                        rs.getString("nombre_completo"),
                        rs.getString("correo"),
                        rs.getString("rol"));
                }
            }
            
            // 2. Ver empleados existentes
            System.out.println("\n2. EMPLEADOS EXISTENTES:");
            System.out.println("-".repeat(80));
            String sql2 = "SELECT e.id_empleado, e.id_usuario, u.nombre_completo, e.estado_laboral " +
                         "FROM empleados e LEFT JOIN usuarios u ON e.id_usuario = u.id_usuario";
            
            int countEmpleados = 0;
            try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql2)) {
                while (rs.next()) {
                    countEmpleados++;
                    System.out.printf("  Empleado ID: %d | Usuario ID: %d | Nombre: %s | Estado: %s%n",
                        rs.getInt("id_empleado"),
                        rs.getInt("id_usuario"),
                        rs.getString("nombre_completo"),
                        rs.getString("estado_laboral"));
                }
            }
            
            if (countEmpleados == 0) {
                System.out.println("  No hay empleados registrados.");
                
                // 3. Crear empleados para todos los usuarios
                System.out.println("\n3. CREANDO EMPLEADOS PARA TODOS LOS USUARIOS:");
                System.out.println("-".repeat(80));
                
                String sqlInsert = "INSERT INTO empleados (id_usuario, codigo_empleado, cargo, area, fecha_ingreso, estado_laboral) " +
                                  "VALUES (?, ?, 'Empleado', 'Soporte Técnico', CURDATE(), 'Activo')";
                String sqlGetUsers = "SELECT id_usuario, nombre_completo FROM usuarios WHERE id_usuario NOT IN (SELECT id_usuario FROM empleados)";
                
                try (Statement st = con.createStatement(); 
                     ResultSet rs = st.executeQuery(sqlGetUsers);
                     PreparedStatement pst = con.prepareStatement(sqlInsert)) {
                    
                    int creados = 0;
                    while (rs.next()) {
                        int idUsuario = rs.getInt("id_usuario");
                        String nombre = rs.getString("nombre_completo");
                        String codigoEmpleado = "EMP" + String.format("%04d", idUsuario);
                        
                        pst.setInt(1, idUsuario);
                        pst.setString(2, codigoEmpleado);
                        int result = pst.executeUpdate();
                        
                        if (result > 0) {
                            creados++;
                            System.out.printf("  ✓ Empleado creado para usuario ID %d (%s) - Código: %s%n", 
                                idUsuario, nombre, codigoEmpleado);
                        }
                    }
                    
                    System.out.println("\nTotal empleados creados: " + creados);
                }
                
                // 4. Verificar empleados después de crear
                System.out.println("\n4. EMPLEADOS DESPUES DE LA CREACION:");
                System.out.println("-".repeat(80));
                
                try (Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql2)) {
                    while (rs.next()) {
                        System.out.printf("  Empleado ID: %d | Usuario ID: %d | Nombre: %s | Estado: %s%n",
                            rs.getInt("id_empleado"),
                            rs.getInt("id_usuario"),
                            rs.getString("nombre_completo"),
                            rs.getString("estado_laboral"));
                    }
                }
            }
            
            System.out.println("\n" + "=".repeat(80));
            
        } catch (SQLException e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
