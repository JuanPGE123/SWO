# 🧪 Guía Completa de Pruebas - Sistema SWO

## 📋 Lista de Verificación Pre-Despliegue

Antes de iniciar el despliegue, verifica:

- [ ] ✅ Java JDK 8+ instalado (`java -version`)
- [ ] ✅ Apache Tomcat 9.0+ descargado
- [ ] ✅ MySQL 5.7+ instalado y corriendo
- [ ] ✅ Maven instalado (opcional) (`mvn -version`)
- [ ] ✅ Puerto 8080 disponible
- [ ] ✅ Puerto 3306 disponible (MySQL)

---

## 🚀 OPCIÓN 1: Despliegue Automatizado (Recomendado)

### Paso 1: Configurar Script

Edita `deploy_auto.ps1` y actualiza:

```powershell
$TOMCAT_HOME = "C:\ruta\a\tu\tomcat"
$MYSQL_PASSWORD = "tu_contraseña_mysql"
```

### Paso 2: Ejecutar

```powershell
# Ejecutar con PowerShell como Administrador
cd d:\OneDrive\SENA\PROYECTOS\SWO
.\deploy_auto.ps1
```

El script automáticamente:
- ✅ Verifica requisitos
- ✅ Crea la base de datos
- ✅ Compila el proyecto
- ✅ Despliega en Tomcat
- ✅ Inicia el servidor
- ✅ Abre el navegador

### Paso 3: Insertar Datos de Prueba

```bash
# En MySQL
mysql -u root -p < java\datos_prueba.sql
```

---

## 🔧 OPCIÓN 2: Despliegue Manual Paso a Paso

### PASO 1: Configurar Base de Datos

```bash
# 1. Iniciar MySQL
# Verifica que MySQL esté corriendo

# 2. Ejecutar script de BD
mysql -u root -p

# Dentro de MySQL:
source d:/OneDrive/SENA/PROYECTOS/SWO/java/swo_database.sql

# Verificar que se creó
SHOW DATABASES;
USE swo_db;
SHOW TABLES;
```

### PASO 2: Actualizar Credenciales

Edita `java/src/com/swo/util/ConexionBD.java`:

```java
private static final String USUARIO = "root";        // Tu usuario
private static final String CONTRASENA = "tu_pass";  // Tu contraseña
```

### PASO 3: Compilar Proyecto

#### Con Maven:

```bash
cd d:\OneDrive\SENA\PROYECTOS\SWO
mvn clean package
```

Resultado: `target/SWO.war`

#### Sin Maven (Manual):

```bash
# 1. Crear directorio de clases
mkdir webapp\WEB-INF\classes
mkdir webapp\WEB-INF\lib

# 2. Descargar mysql-connector-java-8.x.jar
# Colocarlo en: webapp\WEB-INF\lib\

# 3. Compilar
cd java\src
javac -d ..\..\webapp\WEB-INF\classes -cp "C:\ruta\tomcat\lib\servlet-api.jar;..\..\webapp\WEB-INF\lib\*" com\swo\**\*.java
```

### PASO 4: Desplegar en Tomcat

#### Opción A: Copiar WAR

```bash
copy target\SWO.war C:\tomcat\webapps\
```

#### Opción B: Copiar carpeta

```bash
xcopy /E /I webapp C:\tomcat\webapps\SWO
```

### PASO 5: Iniciar Tomcat

```bash
# Windows
C:\tomcat\bin\startup.bat

# Esperar 10-15 segundos
```

### PASO 6: Verificar Logs

```bash
# Ver logs en tiempo real
type C:\tomcat\logs\catalina.out

# O abrir con editor
notepad C:\tomcat\logs\catalina.out
```

Buscar errores relacionados con:
- ClassNotFoundException
- SQLException
- ServletException

---

## ✅ PRUEBAS FUNCIONALES

### 🧪 TEST 1: Verificar Página Principal

**URL**: `http://localhost:8080/SWO/`

**Resultado Esperado**:
- ✅ Página se carga correctamente
- ✅ Se muestra el menú con 6 opciones
- ✅ Diseño con gradiente morado
- ✅ Sin errores en consola del navegador

**Capturas**:
- Logo 🛠️ centrado
- Título "Sistema SWO"
- 6 tarjetas de menú

---

### 🧪 TEST 2: Insertar Datos de Prueba

```bash
# Ejecutar script de datos de prueba
mysql -u root -p < java\datos_prueba.sql

# Verificar datos insertados
mysql -u root -p
USE swo_db;

SELECT * FROM usuarios;
SELECT * FROM incidencias;
```

**Resultado Esperado**:
- ✅ 5 usuarios creados
- ✅ 15 incidencias creadas
- ✅ Incidencias con diferentes estados

---

### 🧪 TEST 3: Registrar Nueva Incidencia

**URL**: `http://localhost:8080/SWO/registroIncidencia.html`

**Pasos**:
1. Completar formulario:
   - **Título**: "Prueba de registro"
   - **Descripción**: "Esta es una incidencia de prueba"
   - **Estado**: "Abierto"
2. Clic en "Registrar Incidencia"

**Resultado Esperado**:
- ✅ Redirige a lista de incidencias
- ✅ Muestra mensaje de éxito
- ✅ La nueva incidencia aparece en la tabla
- ✅ Estadísticas se actualizan

**Verificar en BD**:
```sql
SELECT * FROM incidencias ORDER BY id_incidencia DESC LIMIT 1;
```

---

### 🧪 TEST 4: Listar Incidencias

**URL**: `http://localhost:8080/SWO/IncidenciaServlet`

**Resultado Esperado**:
- ✅ Muestra tabla con todas las incidencias
- ✅ Tarjetas de estadísticas muestran números correctos
- ✅ Estados se muestran con colores diferentes:
  - 🟡 Abierto (amarillo)
  - 🔵 En Progreso (azul)
  - 🟢 Cerrado (verde)
- ✅ Fechas formateadas correctamente

**Verificar**:
- Total de incidencias coincide con BD
- Filtros por estado funcionan
- Datos se muestran completos

---

### 🧪 TEST 5: Registrar Nuevo Usuario

**URL**: `http://localhost:8080/SWO/registroUsuario.html`

**Pasos**:
1. Completar formulario:
   - **Nombre**: "Pedro López Test"
   - **Correo**: "pedro@test.com"
   - **Contraseña**: "test123"
   - **Rol**: "Usuario"
   - **Teléfono**: "3001112222"
   - **Departamento**: "Testing"
2. Clic en "Registrar Usuario"

**Resultado Esperado**:
- ✅ Redirige a lista de usuarios
- ✅ Mensaje de éxito
- ✅ Usuario aparece en la tabla

**Verificar en BD**:
```sql
SELECT * FROM usuarios WHERE correo = 'pedro@test.com';
```

---

### 🧪 TEST 6: Listar Usuarios

**URL**: `http://localhost:8080/SWO/UsuarioServlet`

**Resultado Esperado**:
- ✅ Muestra todos los usuarios
- ✅ Estadísticas de roles correctas
- ✅ Badges de roles con colores:
  - 🔴 Administrador (rojo)
  - 🔵 Técnico (azul)
  - 🟢 Usuario (verde)
- ✅ Estado activo/inactivo visible

---

### 🧪 TEST 7: Ver Reportes

**URL**: `http://localhost:8080/SWO/ReporteServlet`

**Resultado Esperado**:
- ✅ Dashboard se carga correctamente
- ✅ 4 tarjetas de estadísticas con números
- ✅ Barras de progreso muestran porcentajes
- ✅ Colores diferentes por estado
- ✅ Información detallada de usuarios

**Cálculos a verificar**:
```sql
-- Verificar estadísticas manualmente
SELECT estado, COUNT(*) 
FROM incidencias 
GROUP BY estado;

SELECT COUNT(*) FROM usuarios;
```

---

### 🧪 TEST 8: Probar Chatbot

**URL**: `http://localhost:8080/SWO/ChatbotServlet`

**Pasos de Prueba**:

1. **Test de Saludo**:
   - Escribir: "Hola"
   - Esperado: Mensaje de bienvenida

2. **Test de Estadísticas**:
   - Escribir: "¿Cuántas incidencias hay?"
   - Esperado: Resumen con números de BD

3. **Test de Ayuda**:
   - Escribir: "ayuda"
   - Esperado: Lista de comandos disponibles

4. **Test de Acciones Rápidas**:
   - Clic en botón "📊 Estadísticas"
   - Esperado: Respuesta con datos

**Resultado Esperado**:
- ✅ Chatbot responde en menos de 2 segundos
- ✅ Respuestas contextuales correctas
- ✅ Interfaz intuitiva
- ✅ Indicador de escritura funciona

---

### 🧪 TEST 9: Login de Usuario

**URL**: `http://localhost:8080/SWO/login.html`

**Credenciales de Prueba**:
```
Correo: admin@swo.com
Contraseña: admin123
```

**Pasos**:
1. Ingresar credenciales
2. Clic en "Iniciar Sesión"

**Resultado Esperado**:
- ✅ Redirige a dashboard de incidencias
- ✅ Sesión creada correctamente

**Test con credenciales incorrectas**:
- Correo: test@error.com
- Contraseña: wrong
- Esperado: Mensaje de error

---

### 🧪 TEST 10: Navegación Entre Páginas

**Probar todos los enlaces**:

1. Desde `index.html` → Cada opción del menú
2. Desde `listarIncidencias.jsp` → Enlaces de navegación
3. Desde `listarUsuarios.jsp` → Enlaces de navegación
4. Desde `reportes.jsp` → Enlaces de navegación
5. Desde `chatbot.jsp` → Enlaces de navegación

**Resultado Esperado**:
- ✅ Todos los enlaces funcionan
- ✅ No hay errores 404
- ✅ Navegación fluida

---

## 🔍 VERIFICACIÓN DE CONSOLA DEL NAVEGADOR

Presiona **F12** en el navegador y verifica:

### Tab Console:
- ✅ Sin errores en rojo
- ⚠️ Advertencias aceptables (fuentes, etc.)
- ✅ No hay "404 Not Found"
- ✅ No hay "500 Internal Server Error"

### Tab Network:
- ✅ Todos los recursos cargan (código 200)
- ✅ Servlets responden correctamente
- ✅ Tiempos de carga < 500ms

---

## 🐛 DIAGNÓSTICO DE PROBLEMAS

### Problema: Error 404 - Página no encontrada

**Causas posibles**:
1. Aplicación no desplegada correctamente
2. URL incorrecta
3. Tomcat no iniciado

**Solución**:
```bash
# Verificar que existe
dir C:\tomcat\webapps\SWO

# Verificar que Tomcat está corriendo
netstat -ano | findstr :8080

# Revisar logs
type C:\tomcat\logs\catalina.out
```

---

### Problema: Error 500 - Internal Server Error

**Causas posibles**:
1. Error en conexión a BD
2. ClassNotFoundException
3. SQLException

**Solución**:
```bash
# Ver logs de Tomcat
type C:\tomcat\logs\catalina.out | findstr "Error"

# Verificar conexión a BD
mysql -u root -p
SHOW DATABASES;
```

**Verificar en código**:
- ConexionBD.java tiene credenciales correctas
- mysql-connector.jar está en WEB-INF/lib/

---

### Problema: No se conecta a la BD

**Diagnóstico**:
```sql
-- Probar conexión
mysql -u root -p
USE swo_db;

-- Verificar usuario y permisos
SELECT User, Host FROM mysql.user WHERE User = 'root';
```

**Solución**:
1. Verificar que MySQL está corriendo
2. Revisar credenciales en ConexionBD.java
3. Verificar que existe la BD "swo_db"

---

### Problema: Clases no encontradas

**Error típico**:
```
ClassNotFoundException: com.swo.controller.IncidenciaServlet
```

**Solución**:
```bash
# Verificar que las clases están compiladas
dir webapp\WEB-INF\classes\com\swo\controller

# Recompilar
mvn clean package
```

---

## ✅ CHECKLIST FINAL DE PRUEBAS

Marca cada item después de probarlo:

### Funcionalidades Core
- [ ] ✅ Página principal carga
- [ ] ✅ Crear incidencia funciona
- [ ] ✅ Listar incidencias funciona
- [ ] ✅ Crear usuario funciona
- [ ] ✅ Listar usuarios funciona
- [ ] ✅ Reportes se generan
- [ ] ✅ Chatbot responde
- [ ] ✅ Login funciona

### Base de Datos
- [ ] ✅ BD "swo_db" existe
- [ ] ✅ Tablas creadas
- [ ] ✅ Datos de prueba insertados
- [ ] ✅ Consultas funcionan

### Interfaz
- [ ] ✅ Diseño responsive
- [ ] ✅ Estilos se aplican
- [ ] ✅ Iconos se muestran
- [ ] ✅ Sin errores en consola

### Navegación
- [ ] ✅ Todos los enlaces funcionan
- [ ] ✅ Breadcrumbs correctos
- [ ] ✅ Redirects funcionan
- [ ] ✅ Forward a JSP funciona

---

## 📊 DATOS ESPERADOS DESPUÉS DE PRUEBAS

### Usuarios en BD:
```
5 usuarios de prueba + los que crees = mínimo 6
```

### Incidencias en BD:
```
15 incidencias de prueba + las que crees = mínimo 16
```

### Distribución de estados:
```
- Abiertas: ~33%
- En Progreso: ~33%
- Cerradas: ~33%
```

---

## 🎯 CRITERIOS DE ÉXITO

El sistema está **completamente funcional** si:

✅ Todos los servlets responden  
✅ Todas las vistas JSP se renderizan  
✅ CRUD de incidencias funciona  
✅ CRUD de usuarios funciona  
✅ Reportes muestran estadísticas reales  
✅ Chatbot responde correctamente  
✅ No hay errores en logs de Tomcat  
✅ Base de datos tiene datos consistentes  

---

## 📞 SOPORTE

Si encuentras problemas:

1. **Revisar logs**: `C:\tomcat\logs\catalina.out`
2. **Verificar BD**: Ejecutar consultas de verificación
3. **Consola navegador**: Buscar errores JavaScript
4. **Recompilar**: `mvn clean package`
5. **Reiniciar Tomcat**: `shutdown.bat` + `startup.bat`

---

**¡Sistema SWO listo para producción!** 🎉
