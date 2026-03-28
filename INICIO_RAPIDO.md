# 🎯 INICIO RÁPIDO - Sistema SWO

> **¿Primera vez desplegando?** Sigue esta guía paso a paso

---

## ⚡ OPCIÓN 1: Despliegue Automatizado (5 minutos)

### Paso 1: Configuración Inicial

Abre `deploy.bat` y actualiza estas 2 líneas:

```batch
set TOMCAT_HOME=C:\apache-tomcat-9.0.XX   👈 Ruta de tu Tomcat
set MYSQL_PASSWORD=tu_password            👈 Contraseña de MySQL
```

### Paso 2: Ejecutar

Doble clic en:
```
📁 deploy.bat
```

### Paso 3: ¡Listo!

El navegador se abrirá automáticamente en:
```
http://localhost:8080/SWO/
```

---

## 🛠️ OPCIÓN 2: Despliegue Manual (10 minutos)

### 1️⃣ Base de Datos

```bash
# Abrir terminal/CMD en la carpeta del proyecto
cd d:\OneDrive\SENA\PROYECTOS\SWO

# Ejecutar scripts SQL
mysql -u root -p < java\swo_database.sql
mysql -u root -p < java\datos_prueba.sql
```

**✅ Verificar:**
```sql
mysql -u root -p
SHOW DATABASES;  -- Debe aparecer "swo_db"
USE swo_db;
SHOW TABLES;     -- Debe mostrar las tablas
```

---

### 2️⃣ Configurar Conexión

Edita: `java\src\com\swo\util\ConexionBD.java`

```java
private static final String USUARIO = "root";           // ← Tu usuario
private static final String CONTRASENA = "tu_password"; // ← Tu contraseña
```

---

### 3️⃣ Compilar (Elige uno)

**Con Maven:**
```bash
mvn clean package
# Genera: target/SWO.war
```

**Sin Maven:**
```bash
# Copiar carpeta directamente
xcopy /E /I webapp C:\ruta\tomcat\webapps\SWO
```

---

### 4️⃣ Verificar Librerías

Asegúrate de tener:
```
webapp\WEB-INF\lib\mysql-connector-java-8.x.jar ✅
```

Si no está, descarga de:
https://dev.mysql.com/downloads/connector/j/

---

### 5️⃣ Iniciar Tomcat

```bash
C:\ruta\tomcat\bin\startup.bat
```

Espera 10-15 segundos

---

### 6️⃣ Abrir en Navegador

```
http://localhost:8080/SWO/
```

---

## ✅ VERIFICACIÓN RÁPIDA (2 minutos)

Marca cada uno después de probarlo:

### Página Principal
- [ ] Abre http://localhost:8080/SWO/
- [ ] Muestra logo 🛠️ y menú con 6 opciones

### Crear Incidencia
- [ ] Ir a "Nueva Incidencia"
- [ ] Llenar formulario
- [ ] Clic "Registrar"
- [ ] Aparece en la lista ✅

### Ver Reportes
- [ ] Ir a "Reportes"
- [ ] Muestra 4 tarjetas con números
- [ ] Barras de progreso visibles

### Chatbot
- [ ] Ir a "Asistente Virtual"
- [ ] Escribir "Hola"
- [ ] Recibe respuesta ✅

---

## 🔥 CREDENCIALES DE PRUEBA

### Usuario Administrador:
```
Email: admin@swo.com
Password: admin123
```

### Usuario Técnico:
```
Email: maria@swo.com
Password: maria123
```

---

## 🐛 PROBLEMAS FRECUENTES

### ❌ "Error 404 - Página no encontrada"

**Causa:** Aplicación no desplegada

**Solución:**
```bash
# Verificar
dir C:\tomcat\webapps\SWO

# Si no existe, copiar de nuevo
xcopy /E /I webapp C:\tomcat\webapps\SWO
```

---

### ❌ "Error 500 - Internal Server Error"

**Causa:** Error de conexión a BD o clases faltantes

**Solución:**
```bash
# Ver logs
type C:\tomcat\logs\catalina.out

# Verificar MySQL
mysql -u root -p
USE swo_db;

# Verificar mysql-connector.jar
dir webapp\WEB-INF\lib\
```

---

### ❌ Pantalla en blanco

**Solución:**
1. Presiona F12 (Consola del navegador)
2. Tab "Console" → Ver errores
3. Tab "Network" → Ver qué falla

---

## 📚 GUÍAS COMPLETAS

Para más información, consulta:

| Guía | Descripción | Cuándo usar |
|------|-------------|-------------|
| [CHECKLIST_RAPIDO.md](CHECKLIST_RAPIDO.md) | Lista rápida de verificación | Primer despliegue |
| [GUIA_PRUEBAS.md](GUIA_PRUEBAS.md) | Guía completa de testing | Validación exhaustiva |
| [GUIA_DESPLIEGUE.md](GUIA_DESPLIEGUE.md) | Instrucciones detalladas | Problemas de despliegue |
| [INVENTARIO.md](INVENTARIO.md) | Lista de archivos del proyecto | Referencia completa |
| [README_WEBAPP.md](README_WEBAPP.md) | Documentación técnica | Desarrollo y arquitectura |

---

## 🎯 ESTADO DEL SISTEMA

Tu sistema está **funcionando correctamente** si:

✅ La página principal carga  
✅ Puedes crear incidencias  
✅ Puedes ver la lista de incidencias  
✅ Los reportes muestran gráficos  
✅ El chatbot responde  
✅ El login funciona  

---

## 📊 DATOS DE PRUEBA

Después de ejecutar `datos_prueba.sql`:

```
✅ 5 usuarios creados
✅ 15 incidencias creadas
   - 5 Abiertas
   - 5 En Progreso
   - 5 Cerradas
```

---

## 🚀 SIGUIENTES PASOS

1. ✅ Desplegar el sistema
2. ✅ Insertar datos de prueba
3. ✅ Probar funcionalidades principales
4. 📝 Personalizar según necesidades
5. 🔒 Implementar seguridad adicional (BCrypt)
6. 📱 Agregar más funcionalidades

---

## 💡 COMANDOS ÚTILES

### Reiniciar Tomcat:
```bash
C:\tomcat\bin\shutdown.bat
timeout /t 5
C:\tomcat\bin\startup.bat
```

### Ver logs en vivo:
```bash
Get-Content C:\tomcat\logs\catalina.out -Wait -Tail 50
```

### Verificar puerto 8080:
```bash
netstat -ano | findstr :8080
```

### Recompilar con Maven:
```bash
mvn clean package
```

---

## 🆘 AYUDA

Si después de seguir esta guía aún tienes problemas:

1. **Revisa logs de Tomcat**
2. **Verifica que MySQL esté corriendo**
3. **Confirma que Tomcat esté en el puerto 8080**
4. **Consulta la [GUIA_PRUEBAS.md](GUIA_PRUEBAS.md)**

---

## ✨ ESTRUCTURA DEL PROYECTO

```
SWO/
├── 📁 webapp/              → Aplicación web
│   ├── 📁 jsp/            → Vistas dinámicas
│   ├── 📁 WEB-INF/        → Configuración
│   └── 📄 *.html          → Páginas estáticas
├── 📁 java/
│   ├── 📁 src/            → Código fuente Java
│   ├── 📄 swo_database.sql → Script de BD
│   └── 📄 datos_prueba.sql → Datos de ejemplo
├── 📄 deploy.bat          → Script de despliegue
├── 📄 pom.xml             → Configuración Maven
└── 📚 Guías              → Documentación
```

---

**¡Listo para comenzar!** 🚀

Cualquier duda, consulta las guías detalladas o revisa los logs de Tomcat.

---

**© 2026 SENA - Sistema SWO v1.0.0**
