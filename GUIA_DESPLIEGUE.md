# 🚀 Guía Rápida de Despliegue - SWO

## ✅ PASO 1: Verificar Requisitos

Asegúrate de tener instalado:

- ✅ Java JDK 8 o superior
- ✅ Apache Tomcat 9.0+
- ✅ MySQL 5.7+
- ✅ Maven (opcional)

## 📦 PASO 2: Configurar Base de Datos

```bash
# 1. Iniciar MySQL
mysql -u root -p

# 2. Ejecutar el script de BD
source java/swo_database.sql

# O usando comando directo:
mysql -u root -p < java/swo_database.sql
```

## 🔧 PASO 3: Configurar Conexión

Editar `java/src/com/swo/util/ConexionBD.java`:

```java
private static final String URL = "jdbc:mysql://localhost:3306/swo";
private static final String USER = "root";          // Tu usuario
private static final String PASSWORD = "tu_password"; // Tu contraseña
```

## 🏗️ PASO 4: Compilar Proyecto

### Opción A: Con Maven (Recomendado)

```bash
# Desde la raíz del proyecto
mvn clean package

# Esto genera: target/SWO.war
```

### Opción B: Manualmente

```bash
# 1. Compilar clases
cd java/src
javac -d ../bin -cp ".;servlet-api.jar;mysql-connector.jar" com/swo/**/*.java

# 2. Copiar clases compiladas
mkdir -p ../../webapp/WEB-INF/classes
cp -r ../bin/* ../../webapp/WEB-INF/classes/

# 3. Descargar y copiar dependencias a webapp/WEB-INF/lib/
# - mysql-connector-java-8.x.x.jar
```

## 🚢 PASO 5: Desplegar en Tomcat

### Opción A: Copiar carpeta webapp

```bash
# Copiar webapp a Tomcat
cp -r webapp TOMCAT_HOME/webapps/SWO
```

### Opción B: Desplegar archivo WAR

```bash
# Si usaste Maven
cp target/SWO.war TOMCAT_HOME/webapps/
```

## ▶️ PASO 6: Iniciar Tomcat

```bash
# Windows
TOMCAT_HOME\bin\startup.bat

# Linux/Mac
TOMCAT_HOME/bin/startup.sh
```

## 🌐 PASO 7: Acceder a la Aplicación

Abrir en el navegador:

```
http://localhost:8080/SWO/
```

## 📋 URLs Importantes

| Función | URL |
|---------|-----|
| Página Principal | `http://localhost:8080/SWO/` |
| Nueva Incidencia | `http://localhost:8080/SWO/registroIncidencia.html` |
| Listar Incidencias | `http://localhost:8080/SWO/IncidenciaServlet` |
| Nuevo Usuario | `http://localhost:8080/SWO/registroUsuario.html` |
| Listar Usuarios | `http://localhost:8080/SWO/UsuarioServlet` |
| Reportes | `http://localhost:8080/SWO/ReporteServlet` |
| Chatbot | `http://localhost:8080/SWO/ChatbotServlet` |
| Login | `http://localhost:8080/SWO/login.html` |

## 🧪 Probar la Aplicación

### 1. Crear Usuario

```
URL: http://localhost:8080/SWO/registroUsuario.html

Datos de prueba:
- Nombre: Juan Pérez
- Correo: juan@test.com
- Contraseña: 123456
- Rol: Administrador
- Teléfono: 3001234567
- Departamento: Sistemas
```

### 2. Crear Incidencia

```
URL: http://localhost:8080/SWO/registroIncidencia.html

Datos de prueba:
- Título: Error en sistema de login
- Descripción: Los usuarios no pueden acceder al sistema
- Estado: Abierto
```

### 3. Ver Reportes

```
URL: http://localhost:8080/SWO/ReporteServlet
```

## 🐛 Solución de Problemas Comunes

### Error: "Driver not found"

```bash
Solución:
1. Descargar mysql-connector-java-8.x.jar
2. Copiar a: webapp/WEB-INF/lib/
3. Reiniciar Tomcat
```

### Error: "Connection refused"

```bash
Solución:
1. Verificar que MySQL esté corriendo
2. Revisar credenciales en ConexionBD.java
3. Verificar que la BD 'swo' exista
```

### Error: "HTTP 404"

```bash
Solución:
1. Verificar que Tomcat esté corriendo
2. Confirmar que la carpeta esté en webapps/SWO
3. Revisar logs: TOMCAT_HOME/logs/catalina.out
```

### Error: "ClassNotFoundException: com.swo.controller.*"

```bash
Solución:
1. Verificar que las clases estén compiladas
2. Confirmar ubicación: webapp/WEB-INF/classes/com/swo/
3. Recompilar el proyecto
```

## 📊 Estructura de Archivos Críticos

```
SWO/
├── webapp/
│   ├── WEB-INF/
│   │   ├── web.xml                    ✅ Configuración
│   │   ├── classes/                   ✅ Clases compiladas
│   │   │   └── com/swo/...
│   │   └── lib/                       ✅ Librerías .jar
│   │       └── mysql-connector.jar
│   ├── jsp/                           ✅ Vistas JSP
│   ├── index.html                     ✅ Página principal
│   └── *.html                         ✅ Formularios
└── java/
    └── src/com/swo/                   ✅ Código fuente
```

## 🔑 Credenciales por Defecto

Para pruebas iniciales, crear usuario con:

```
Correo: admin@swo.com
Contraseña: admin123
Rol: Administrador
```

## 📞 Soporte

Si encuentras problemas:

1. Revisar logs de Tomcat: `TOMCAT_HOME/logs/`
2. Verificar conexión a BD
3. Confirmar que todas las dependencias estén en `WEB-INF/lib/`

---

**¡Listo! El sistema SWO está funcionando** 🎉
