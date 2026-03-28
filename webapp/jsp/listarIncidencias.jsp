<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.swo.model.Incidencia" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Incidencias - SWO</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        h1 {
            color: #333;
            font-size: 28px;
        }
        
        .btn-nuevo {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .btn-nuevo:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .alert {
            padding: 15px 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        .stat-card h3 {
            font-size: 32px;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }
        
        thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        
        tbody tr:hover {
            background-color: #f5f5f5;
        }
        
        .estado-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }
        
        .estado-abierto {
            background-color: #fff3cd;
            color: #856404;
        }
        
        .estado-progreso {
            background-color: #cce5ff;
            color: #004085;
        }
        
        .estado-cerrado {
            background-color: #d4edda;
            color: #155724;
        }
        
        .descripcion-corta {
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .empty-state h3 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #333;
        }
        
        .nav-links {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
        }
        
        .nav-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
        }
        
        .nav-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📋 Gestión de Incidencias</h1>
            <a href="registroIncidencia.html" class="btn-nuevo">+ Nueva Incidencia</a>
        </header>
        
        <%
            // Recuperar el atributo enviado por el Servlet
            String mensaje = (String) request.getAttribute("mensaje");
            String tipoMensaje = (String) request.getAttribute("tipoMensaje");
            
            if (mensaje != null && !mensaje.isEmpty()) {
        %>
            <div class="alert alert-<%= tipoMensaje != null ? tipoMensaje : "success" %>">
                <%= mensaje %>
            </div>
        <%
            }
            
            // Recuperar la lista de incidencias
            @SuppressWarnings("unchecked")
            List<Incidencia> listaIncidencias = (List<Incidencia>) request.getAttribute("listaIncidencias");
            
            if (listaIncidencias != null && !listaIncidencias.isEmpty()) {
                // Calcular estadísticas con bucles (compatibilidad Tomcat 8.5)
                long abiertas = 0, enProgreso = 0, cerradas = 0;
                for (Incidencia _i : listaIncidencias) {
                    if ("Abierto".equals(_i.getEstado())) abiertas++;
                    else if ("En Progreso".equals(_i.getEstado())) enProgreso++;
                    else if ("Cerrado".equals(_i.getEstado())) cerradas++;
                }
        %>
        
        <div class="stats">
            <div class="stat-card">
                <h3><%= listaIncidencias.size() %></h3>
                <p>Total de Incidencias</p>
            </div>
            <div class="stat-card">
                <h3><%= abiertas %></h3>
                <p>Abiertas</p>
            </div>
            <div class="stat-card">
                <h3><%= enProgreso %></h3>
                <p>En Progreso</p>
            </div>
            <div class="stat-card">
                <h3><%= cerradas %></h3>
                <p>Cerradas</p>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>T&iacute;tulo</th>
                    <th>Descripci&oacute;n</th>
                    <th>Estado</th>
                    <th>Impacto</th>
                    <th>Ubicaci&oacute;n</th>
                    <th>Fecha Creaci&oacute;n</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <%
                    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
                    for (Incidencia inc : listaIncidencias) {
                        String estadoClass = "";
                        if ("Abierto".equals(inc.getEstado())) estadoClass = "estado-abierto";
                        else if ("En Progreso".equals(inc.getEstado())) estadoClass = "estado-progreso";
                        else if ("Cerrado".equals(inc.getEstado())) estadoClass = "estado-cerrado";

                        String impactoClass = "";
                        String impacto = inc.getImpacto() != null ? inc.getImpacto() : "Medio";
                        if ("Critico".equals(impacto)) impactoClass = "style=\"color:#c0392b;font-weight:bold\"";
                        else if ("Alto".equals(impacto)) impactoClass = "style=\"color:#e67e22;font-weight:bold\"";
                        else if ("Medio".equals(impacto)) impactoClass = "style=\"color:#2980b9\"";
                        else impactoClass = "style=\"color:#27ae60\"";
                %>
                <tr>
                    <td><strong>#<%= inc.getIdIncidencia() %></strong></td>
                    <td><strong><%= inc.getTitulo() %></strong></td>
                    <td>
                        <div class="descripcion-corta" title="<%= inc.getDescripcion() %>">
                            <%= inc.getDescripcion().length() > 60 ? inc.getDescripcion().substring(0,60) + "..." : inc.getDescripcion() %>
                        </div>
                    </td>
                    <td>
                        <span class="estado-badge <%= estadoClass %>">
                            <%= inc.getEstado() %>
                        </span>
                    </td>
                    <td><span <%= impactoClass %>><%= impacto %></span></td>
                    <td><%= inc.getUbicacion() != null && !inc.getUbicacion().isEmpty() ? inc.getUbicacion() : "-" %></td>
                    <td>
                        <%= inc.getFechaCreacion() != null ? sdf.format(inc.getFechaCreacion()) : "N/A" %>
                    </td>
                    <td>
                        <a href="registroIncidencia.html" style="color:#667eea;font-size:12px">Editar</a>
                    </td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
        
        <%
            } else {
        %>
        <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <h3>No hay incidencias registradas</h3>
            <p>Comienza registrando tu primera incidencia haciendo clic en el botón "Nueva Incidencia"</p>
        </div>
        <%
            }
        %>
        
        <div class="nav-links">
            <a href="registroIncidencia.html">📝 Nueva Incidencia</a> |
            <a href="UsuarioServlet">👥 Usuarios</a> |
            <a href="ReporteServlet">📊 Reportes</a> |
            <a href="ChatbotServlet">💬 Chatbot</a> |
            <a href="index.html">🏠 Inicio</a>
        </div>
    </div>
</body>
</html>
