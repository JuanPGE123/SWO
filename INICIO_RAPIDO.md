# 🚀 Guía Rápida - Iniciar Tomcat para Pruebas

**Fecha:** 19 de abril de 2026  
**Versión:** 2.0.0

---

## ⚡ Inicio Rápido (Automático)

### Opción 1: Script Todo-en-Uno (Recomendado)

```powershell
# Doble clic en el archivo o ejecutar:
.\INICIAR_TODO.bat
```

**Este script hace TODO automáticamente:**
1. ✅ Verifica MySQL (puerto 3306)
2. ✅ Verifica Node.js y Maven
3. ✅ Compila el backend si es necesario
4. ✅ Instala dependencias npm si faltan
5. ✅ Inicia Tomcat en ventana separada
6. ✅ Inicia Angular en ventana separada
7. ✅ Abre el navegador en http://localhost:4200

**Resultado:**
- Backend: http://localhost:8080/SWO
- Frontend: http://localhost:4200
- Navegador abierto automáticamente

---

## 🛠️ Inicio Manual

### Paso 1: Verificar MySQL

```powershell
# Verificar si MySQL está corriendo
netstat -an | findstr ":3306"

# Si no aparece nada, iniciar MySQL:
net start MySQL80

# O desde XAMPP Control Panel:
# Click en "Start" junto a MySQL
```

### Paso 2: Compilar Backend

```powershell
# Limpiar y compilar
mvn clean package

# Si todo sale bien, verás:
# [INFO] BUILD SUCCESS
# [INFO] Total time: X seconds
```

**Archivo generado:** `target/SWO.war`

### Paso 3: Iniciar Tomcat con Maven

```powershell
# Iniciar Tomcat embebido
mvn tomcat7:run
```

**Verás en consola:**
```
[INFO] Running war on http://localhost:8080/SWO
[INFO] Tomcat 7.x started on port [8080]
```

### Paso 4: Verificar Backend

Abre el navegador en:
- http://localhost:8080/SWO
- http://localhost:8080/SWO/api/usuarios
- http://localhost:8080/SWO/api/incidencias

**Respuesta esperada:** JSON con datos

### Paso 5: Iniciar Frontend (Terminal Separada)

```powershell
# Abrir NUEVA terminal PowerShell
# Navegar al proyecto
cd d:\OneDrive\SENA\PROYECTOS\SWO

# Iniciar Angular
npm start

# O explícitamente:
ng serve
```

**Verás en consola:**
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully
```

### Paso 6: Acceder a la Aplicación

Abre el navegador en:
- **http://localhost:4200**

**Credenciales:**
- Email: `admin@swo.com`
- Password: `123456`

---

## 🐛 Solución de Problemas

### Error: "Puerto 8080 ya está en uso"

```powershell
# 1. Buscar proceso que usa el puerto
netstat -ano | findstr :8080

# Salida ejemplo:
# TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    12345

# 2. Matar el proceso (reemplazar 12345 con el PID real)
taskkill /PID 12345 /F

# 3. Reintentar
mvn tomcat7:run
```

### Error: "Cannot connect to database"

```powershell
# 1. Verificar que MySQL está corriendo
net start MySQL80

# 2. Verificar credenciales en el código Java
# Archivo: java/src/com/swo/util/ConexionDB.java
# Debe tener:
# URL: jdbc:mysql://localhost:3306/swo_db
# User: root
# Password: (tu password de MySQL)

# 3. Verificar que la base de datos existe
mysql -u root -p
mysql> SHOW DATABASES LIKE 'swo_db';
mysql> USE swo_db;
mysql> SHOW TABLES;
```

### Error: "Maven command not found"

```powershell
# 1. Verificar instalación
mvn --version

# Si no está instalado:
# 1. Descargar desde: https://maven.apache.org/download.cgi
# 2. Extraer a C:\apache-maven-3.x.x
# 3. Agregar a PATH:
#    - Panel de Control > Sistema > Variables de entorno
#    - PATH > Editar > Nuevo: C:\apache-maven-3.x.x\bin
# 4. Reiniciar terminal y verificar:
mvn --version
```

### Error: "BUILD FAILURE" en Maven

```powershell
# 1. Limpiar cache de Maven
mvn clean

# 2. Forzar actualización de dependencias
mvn clean install -U

# 3. Si persiste, eliminar repositorio local
rm -r C:\Users\<TuUsuario>\.m2\repository
mvn install
```

### Error: "Angular CLI not found"

```powershell
# 1. Verificar instalación
ng version

# Si no está instalado:
npm install -g @angular/cli

# 2. Reinstalar dependencias del proyecto
rm -r node_modules
rm package-lock.json
npm install
```

### Error: CORS en peticiones HTTP

**Síntoma:** En la consola del navegador (F12) ves:
```
Access to XMLHttpRequest at 'http://localhost:8080/SWO/api/...' 
from origin 'http://localhost:4200' has been blocked by CORS policy
```

**Solución:**

Verificar que el backend tiene configurado CORS. En Java:

```java
// Archivo: java/src/com/swo/controller/CORSFilter.java
response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
```

O usar el interceptor HTTP del frontend (ya configurado):
```typescript
// src/app/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpInterceptor]) // ✅ Ya configurado
    )
  ]
};
```

---

## 📊 Verificar que Todo Funciona

### Test 1: Backend API

```powershell
# Opción A: Navegador
start http://localhost:8080/SWO/api/usuarios

# Opción B: PowerShell
Invoke-RestMethod -Uri "http://localhost:8080/SWO/api/usuarios"

# Opción C: curl (si está instalado)
curl http://localhost:8080/SWO/api/usuarios
```

**Resultado esperado:** JSON con array de usuarios

### Test 2: Frontend

1. Abrir http://localhost:4200
2. Debe cargar la página de login
3. Ingresar: `admin@swo.com` / `123456`
4. Debe redirigir a `/dashboard`
5. Navegar a `/incidents`
6. Debe mostrar tabla de incidencias

### Test 3: Integración Completa

1. En http://localhost:4200/incidents
2. Click en "Nueva Incidencia"
3. Llenar formulario:
   - Título: "Prueba desde frontend"
   - Descripción: "Esta es una prueba de la integración completa del sistema con formularios reactivos y validación en tiempo real"
4. Click en "Crear Incidencia"
5. Debe aparecer en la tabla
6. Verificar en base de datos:
   ```sql
   SELECT * FROM incidencias ORDER BY id DESC LIMIT 1;
   ```

---

## 📝 Comandos Útiles

### Maven

```powershell
# Compilar sin ejecutar tests
mvn clean compile -DskipTests

# Empaquetar WAR
mvn package

# Limpiar todo
mvn clean

# Ver dependencias
mvn dependency:tree

# Actualizar dependencias
mvn versions:display-dependency-updates
```

### npm (Angular)

```powershell
# Iniciar con puerto custom
ng serve --port 4201

# Build de producción
npm run build:prod

# Limpiar cache
npm cache clean --force

# Listar paquetes desactualizados
npm outdated

# Actualizar paquetes
npm update
```

### Git

```powershell
# Ver estado
git status

# Ver log de commits
git log --oneline -10

# Ver cambios no commiteados
git diff

# Ver remotes
git remote -v
```

---

## 🔄 Workflow Típico de Desarrollo

### Día a día:

```powershell
# 1. Iniciar proyecto
.\INICIAR_TODO.bat

# 2. Hacer cambios en el código
# - Frontend: src/app/**/*.ts
# - Backend: java/src/**/*.java

# 3. Hot reload automático:
# - Frontend: Angular CLI recarga automáticamente
# - Backend: Reiniciar Tomcat (Ctrl+C y mvn tomcat7:run)

# 4. Commit cambios
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# 5. Al terminar: Ctrl+C en ambas ventanas (Tomcat y Angular)
```

---

## 📦 Desplegar en Producción

### Preparar para producción:

```powershell
# 1. Build del frontend
npm run build:prod
# Genera archivos en: target/SWO/

# 2. Empaquetar backend con frontend incluido
mvn clean package
# Genera: target/SWO.war

# 3. Copiar WAR a Tomcat de producción
copy target\SWO.war \\servidor-produccion\tomcat\webapps\

# 4. Reiniciar Tomcat en servidor
# (depende del servidor)
```

---

## 🎯 Checklist de Inicio

Antes de comenzar a desarrollar, verifica:

- [ ] MySQL corriendo (puerto 3306)
- [ ] Base de datos `swo_db` creada
- [ ] Tablas creadas con `swo_database.sql`
- [ ] Datos de prueba cargados con `datos_prueba.sql`
- [ ] Node.js instalado (v18+)
- [ ] Maven instalado (v3.8+)
- [ ] Dependencias npm instaladas (`node_modules` existe)
- [ ] Backend compila sin errores (`mvn clean compile`)
- [ ] Frontend compila sin errores (`ng build`)
- [ ] Puerto 8080 disponible (backend)
- [ ] Puerto 4200 disponible (frontend)

---

## 📞 Ayuda Adicional

**Documentación:**
- [GUIA_DESARROLLO.md](GUIA_DESARROLLO.md) - Guía completa de desarrollo
- [shared/components/README.md](src/app/shared/components/README.md) - Componentes UI
- [shared/validators/README.md](src/app/shared/validators/README.md) - Validadores

**Stack Técnico:**
- Angular: https://angular.io/docs
- Maven: https://maven.apache.org/guides/
- Tomcat: https://tomcat.apache.org/tomcat-7.0-doc/
- MySQL: https://dev.mysql.com/doc/

---

**¡Listo para desarrollar!** 🚀

Si tienes problemas, revisa:
1. Esta guía de solución de problemas
2. GUIA_DESARROLLO.md (más detallada)
3. Logs en las consolas de Tomcat y Angular

**Versión:** 2.0.0  
**Última actualización:** 19 de abril de 2026
