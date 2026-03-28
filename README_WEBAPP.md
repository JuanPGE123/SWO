# SWO - Sistema Web de Gestión de Incidencias

Sistema completo de gestión de incidencias desarrollado con **Java Servlets**, **JSP** y **MySQL**.

## 📋 Características

- ✅ **Gestión de Incidencias**: Crear, listar, actualizar y eliminar incidencias
- 👥 **Gestión de Usuarios**: Registro y administración de usuarios con roles
- 📊 **Reportes y Estadísticas**: Dashboard con métricas del sistema
- 💬 **Chatbot de Asistencia**: Asistente virtual para ayuda y soporte
- 🔐 **Sistema de Login**: Autenticación de usuarios

## 🏗️ Arquitectura del Proyecto

```
SWO/
├── java/
│   └── src/
│       └── com/swo/
│           ├── controller/          # Servlets (Controladores)
│           │   ├── IncidenciaServlet.java
│           │   ├── UsuarioServlet.java
│           │   ├── ReporteServlet.java
│           │   └── ChatbotServlet.java
│           ├── dao/                 # Data Access Objects
│           │   ├── IncidenciaDAO.java
│           │   ├── UsuarioDAO.java
│           │   └── ...
│           ├── model/               # Modelos de datos
│           │   ├── Incidencia.java
│           │   ├── Usuario.java
│           │   └── ...
│           └── util/
│               └── ConexionBD.java  # Conexión a BD
└── webapp/
    ├── WEB-INF/
    │   └── web.xml                  # Configuración del proyecto
    ├── jsp/                         # Vistas dinámicas
    │   ├── listarIncidencias.jsp
    │   ├── listarUsuarios.jsp
    │   ├── reportes.jsp
    │   └── chatbot.jsp
    ├── index.html                   # Página principal
    ├── registroIncidencia.html      # Formulario de incidencias
    ├── registroUsuario.html         # Formulario de usuarios
    └── login.html                   # Página de login
```

## 🚀 Requisitos Previos

1. **Java JDK** 8 o superior
2. **Apache Tomcat** 9.0 o superior
3. **MySQL** 5.7 o superior
4. **Maven** (opcional, para gestión de dependencias)

## 📦 Instalación y Configuración

### 1. Configurar Base de Datos

```sql
-- Ejecutar el script de la base de datos
-- Ubicación: java/swo_database.sql
mysql -u root -p < java/swo_database.sql
```

### 2. Configurar Conexión a BD

Editar el archivo `java/src/com/swo/util/ConexionBD.java`:

```java
private static final String URL = "jdbc:mysql://localhost:3306/swo";
private static final String USER = "tu_usuario";
private static final String PASSWORD = "tu_contraseña";
```

### 3. Compilar el Proyecto

#### Opción A: Usando Java directamente

```bash
# Compilar las clases Java
cd java/src
javac -d ../bin -cp ".;mysql-connector-java.jar;servlet-api.jar" com/swo/**/*.java
```

#### Opción B: Usando Maven (si tienes pom.xml)

```bash
mvn clean package
```

### 4. Desplegar en Tomcat

1. Copiar la carpeta `webapp` a `TOMCAT_HOME/webapps/SWO`
2. Copiar los archivos `.class` compilados a `webapp/WEB-INF/classes/`
3. Agregar las librerías necesarias a `webapp/WEB-INF/lib/`:
   - `mysql-connector-java-8.x.x.jar`
   - Otras dependencias si las hay

### 5. Iniciar el Servidor

```bash
# En Windows
TOMCAT_HOME/bin/startup.bat

# En Linux/Mac
TOMCAT_HOME/bin/startup.sh
```

## 🌐 Acceder a la Aplicación

Una vez iniciado el servidor, accede a:

```
http://localhost:8080/SWO/
```

## 📚 Funcionalidades Principales

### 1. Gestión de Incidencias

- **Crear**: `http://localhost:8080/SWO/registroIncidencia.html`
- **Listar**: `http://localhost:8080/SWO/IncidenciaServlet`

**Campos del formulario:**
- Título (obligatorio)
- Descripción (obligatorio)
- Estado: Abierto, En Progreso, Cerrado

### 2. Gestión de Usuarios

- **Crear**: `http://localhost:8080/SWO/registroUsuario.html`
- **Listar**: `http://localhost:8080/SWO/UsuarioServlet`

**Roles disponibles:**
- Administrador
- Técnico
- Usuario

### 3. Reportes y Estadísticas

- **Dashboard**: `http://localhost:8080/SWO/ReporteServlet`

Muestra:
- Total de incidencias
- Estadísticas por estado
- Métricas de usuarios
- Gráficos de progreso

### 4. Chatbot de Asistencia

- **Interfaz**: `http://localhost:8080/SWO/ChatbotServlet`

Comandos disponibles:
- "¿Cuántas incidencias hay?"
- "Crear incidencia"
- "Ayuda"
- "Reportes"

## 🔧 Arquitectura MVC

El proyecto sigue el patrón **Modelo-Vista-Controlador**:

- **Modelo**: Clases en `com.swo.model` (Incidencia, Usuario, etc.)
- **Vista**: Archivos JSP y HTML en `webapp/jsp` y `webapp/`
- **Controlador**: Servlets en `com.swo.controller`
- **DAO**: Acceso a datos en `com.swo.dao`

## 📊 Flujo de Datos

```
Browser → Servlet (doPost/doGet) → DAO → Database
                ↓
           JSP/HTML ← setAttribute
```

**Ejemplo: Crear Incidencia**

1. Usuario llena formulario `registroIncidencia.html`
2. POST a `IncidenciaServlet`
3. Servlet captura parámetros y crea objeto `Incidencia`
4. Llama a `IncidenciaDAO.insertarIncidencia()`
5. DAO ejecuta INSERT en MySQL
6. Redirect a `IncidenciaServlet` (GET) para listar
7. Forward a `listarIncidencias.jsp`

## 🛡️ Seguridad

- ✅ Validación de parámetros en servlets
- ✅ Caracteres UTF-8 para evitar problemas de encoding
- ✅ Sanitización de inputs
- ⚠️ **Pendiente**: Hash de contraseñas (actualmente texto plano)
- ⚠️ **Pendiente**: Protección CSRF
- ⚠️ **Pendiente**: Filtro de autenticación

## 🐛 Solución de Problemas

### Error: ClassNotFoundException

```
Causa: No se encuentra el driver de MySQL
Solución: Agregar mysql-connector-java.jar a WEB-INF/lib/
```

### Error: 404 Not Found

```
Causa: La aplicación no está desplegada correctamente
Solución: Verificar que la carpeta esté en webapps/SWO
```

### Error: Connection refused

```
Causa: MySQL no está corriendo o credenciales incorrectas
Solución: Verificar ConexionBD.java y estado de MySQL
```

## 📝 Tareas Pendientes

- [ ] Implementar hash de contraseñas (BCrypt)
- [ ] Agregar filtro de autenticación para proteger rutas
- [ ] Implementar paginación en listados
- [ ] Agregar búsqueda y filtros
- [ ] Implementar AJAX para operaciones asíncronas
- [ ] Pruebas unitarias con JUnit

## 👨‍💻 Desarrollo

**Tecnologías utilizadas:**
- Java EE 8 (Servlets 4.0, JSP 2.3)
- MySQL 5.7+
- HTML5, CSS3, JavaScript
- Apache Tomcat 9

**Convenciones de código:**
- Java: PascalCase para clases, camelCase para variables
- SQL: snake_case para tablas y columnas
- JSP: Uso de scriptlets y JSTL según necesidad

## 📄 Licencia

Proyecto desarrollado para el **SENA** - Formación académica 2026

---

**© 2026 SENA - Sistema Web de Gestión de Incidencias v1.0.0**
