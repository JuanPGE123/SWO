<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes y Estadísticas - SWO</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        h1 {
            color: #333;
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-card.green {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        
        .stat-card.orange {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }
        
        .stat-card.red {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .stat-icon {
            font-size: 40px;
            margin-bottom: 10px;
        }
        
        .stat-value {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        .chart-container {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .progress-bar-container {
            margin-bottom: 25px;
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
            color: #333;
        }
        
        .progress-bar {
            height: 30px;
            background: #e0e0e0;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            transition: width 1s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 13px;
        }
        
        .progress-fill.green {
            background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
        }
        
        .progress-fill.orange {
            background: linear-gradient(90deg, #fa709a 0%, #fee140 100%);
        }
        
        .progress-fill.red {
            background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .info-card {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
        }
        
        .info-card h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .info-item:last-child {
            border-bottom: none;
        }
        
        .info-label {
            color: #666;
            font-size: 14px;
        }
        
        .info-value {
            font-weight: bold;
            color: #333;
            font-size: 14px;
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
            font-weight: 600;
        }
        
        .nav-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📊 Panel de Reportes y Estadísticas</h1>
            <p class="subtitle">Dashboard de métricas del sistema SWO</p>
        </header>
        
        <%
            @SuppressWarnings("unchecked")
            Map<String, Object> stats = (Map<String, Object>) request.getAttribute("estadisticas");
            DecimalFormat df = new DecimalFormat("#.##");
            
            if (stats != null) {
        %>
        
        <!-- Tarjetas de Estadísticas Generales -->
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-icon">📋</div>
                <div class="stat-value"><%= stats.get("totalIncidencias") %></div>
                <div class="stat-label">Total Incidencias</div>
            </div>
            
            <div class="stat-card green">
                <div class="stat-icon">✓</div>
                <div class="stat-value"><%= stats.get("incidenciasCerradas") %></div>
                <div class="stat-label">Incidencias Cerradas</div>
            </div>
            
            <div class="stat-card orange">
                <div class="stat-icon">⚙</div>
                <div class="stat-value"><%= stats.get("incidenciasEnProgreso") %></div>
                <div class="stat-label">En Progreso</div>
            </div>
            
            <div class="stat-card red">
                <div class="stat-icon">⚠</div>
                <div class="stat-value"><%= stats.get("incidenciasAbiertas") %></div>
                <div class="stat-label">Abiertas</div>
            </div>
        </div>
        
        <!-- Gráfico de Progreso -->
        <div class="section">
            <h2 class="section-title">Estado de Incidencias</h2>
            <div class="chart-container">
                <%
                    // Calcular anchos de las barras de progreso
                    double porcentajeCerradas = (Double) stats.get("porcentajeCerradas");
                    double porcentajeEnProgreso = (Double) stats.get("porcentajeEnProgreso");
                    double porcentajeAbiertas = (Double) stats.get("porcentajeAbiertas");
                %>
                
                <div class="progress-bar-container">
                    <div class="progress-label">
                        <span><strong>Cerradas</strong></span>
                        <span><strong><%= df.format(porcentajeCerradas) %>%</strong></span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill green" 
                             style="width: <%= porcentajeCerradas %>%">
                            <%= stats.get("incidenciasCerradas") %> incidencias
                        </div>
                    </div>
                </div>
                
                <div class="progress-bar-container">
                    <div class="progress-label">
                        <span><strong>En Progreso</strong></span>
                        <span><strong><%= df.format(porcentajeEnProgreso) %>%</strong></span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill orange" 
                             style="width: <%= porcentajeEnProgreso %>%">
                            <%= stats.get("incidenciasEnProgreso") %> incidencias
                        </div>
                    </div>
                </div>
                
                <div class="progress-bar-container">
                    <div class="progress-label">
                        <span><strong>Abiertas</strong></span>
                        <span><strong><%= df.format(porcentajeAbiertas) %>%</strong></span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill red" 
                             style="width: <%= porcentajeAbiertas %>%">
                            <%= stats.get("incidenciasAbiertas") %> incidencias
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Información Detallada -->
        <div class="section">
            <h2 class="section-title">Información del Sistema</h2>
            <div class="info-grid">
                <div class="info-card">
                    <h3>👥 Estadísticas de Usuarios</h3>
                    <div class="info-item">
                        <span class="info-label">Total de Usuarios:</span>
                        <span class="info-value"><%= stats.get("totalUsuarios") %></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Usuarios Activos:</span>
                        <span class="info-value"><%= stats.get("usuariosActivos") %></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Administradores:</span>
                        <span class="info-value"><%= stats.get("administradores") %></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Técnicos:</span>
                        <span class="info-value"><%= stats.get("tecnicos") %></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Usuarios Regulares:</span>
                        <span class="info-value"><%= stats.get("usuariosRegulares") %></span>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>📈 Rendimiento del Sistema</h3>
                    <div class="info-item">
                        <span class="info-label">Tasa de Resolución:</span>
                        <span class="info-value"><%= df.format(stats.get("porcentajeCerradas")) %>%</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Incidencias Activas:</span>
                        <span class="info-value">
                            <%= (Long)stats.get("incidenciasAbiertas") + (Long)stats.get("incidenciasEnProgreso") %>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Promedio por Usuario:</span>
                        <span class="info-value">
                            <%= (Long)stats.get("totalUsuarios") > 0 ? 
                               df.format((double)(Long)stats.get("totalIncidencias") / (Long)stats.get("totalUsuarios")) 
                               : "0" %>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <%
            } else {
        %>
        <div style="text-align: center; padding: 60px; color: #666;">
            <h3>No hay datos disponibles para generar reportes</h3>
        </div>
        <%
            }
        %>
        
        <div class="nav-links">
            <a href="IncidenciaServlet">📋 Incidencias</a> |
            <a href="UsuarioServlet">👥 Usuarios</a> |
            <a href="ChatbotServlet">💬 Chatbot</a> |
            <a href="index.html">🏠 Inicio</a>
        </div>
    </div>
</body>
</html>
