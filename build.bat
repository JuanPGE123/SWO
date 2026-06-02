@echo off
REM ════════════════════════════════════════════════════════════════════════════
REM BUILD SCRIPT MAESTRO - SWO (Windows)
REM ════════════════════════════════════════════════════════════════════════════
REM
REM Propósito: Compilar Frontend y Backend en una sola ejecución
REM Uso: .\build.bat [prod|dev|test|docker]
REM
REM Ejemplos:
REM   .\build.bat dev        - Compilar para desarrollo
REM   .\build.bat prod       - Compilar para producción (optimizado)
REM   .\build.bat test       - Compilar + ejecutar tests con cobertura
REM   .\build.bat docker     - Compilar con Docker
REM
REM ════════════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

REM ────────────────────────────────────────────────────────────────────────
REM COLORES Y ESTILOS
REM ────────────────────────────────────────────────────────────────────────
for /F %%A in ('echo prompt $H ^| cmd') do set "BS=%%A"

REM ────────────────────────────────────────────────────────────────────────
REM VARIABLES GLOBALES
REM ────────────────────────────────────────────────────────────────────────
set BUILD_MODE=%1
if "!BUILD_MODE!"=="" set BUILD_MODE=dev

set PROJECT_ROOT=%cd%
set BACKEND_DIR=%PROJECT_ROOT%\backend
set FRONTEND_DIR=%PROJECT_ROOT%
set LOGS_DIR=%PROJECT_ROOT%\logs
set DIST_DIR=%PROJECT_ROOT%\dist
set TIMESTAMP=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

REM Crear directorio de logs
if not exist "%LOGS_DIR%" mkdir "%LOGS_DIR%"
if not exist "%DIST_DIR%" mkdir "%DIST_DIR%"

REM ────────────────────────────────────────────────────────────────────────
REM FUNCIONES
REM ────────────────────────────────────────────────────────────────────────

REM Función para imprimir con colores
setlocal enabledelayedexpansion
set "info=[INFO]"
set "error=[ERROR]"
set "success=[SUCCESS]"
set "warning=[WARNING]"

REM ────────────────────────────────────────────────────────────────────────
REM MAIN SCRIPT
REM ────────────────────────────────────────────────────────────────────────

echo.
echo ════════════════════════════════════════════════════════════════════════
echo.  SWO BUILD SYSTEM - Windows
echo.  Modo: !BUILD_MODE!
echo.  Timestamp: %TIMESTAMP%
echo.  Ruta del proyecto: %PROJECT_ROOT%
echo.
echo ════════════════════════════════════════════════════════════════════════
echo.

REM ────────────────────────────────────────────────────────────────────────
REM VALIDAR REQUISITOS
REM ────────────────────────────────────────────────────────────────────────

echo %info% Validando requisitos...

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo %error% Node.js no está instalado. Descargar de: https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo   - Node.js: %NODE_VERSION%

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo %error% npm no está instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo   - npm: %NPM_VERSION%

REM Verificar Java 17+
java -version >nul 2>&1
if errorlevel 1 (
    echo %error% Java no está instalado. Requerido: Java 17+
    exit /b 1
)
for /f "tokens=2-5 delims=[,.]" %%i in ('java -version 2^>^&1') do (
    set JAVA_VERSION=%%i
)
echo   - Java: %JAVA_VERSION%

if %JAVA_VERSION% lss 17 (
    echo %error% Se requiere Java 17 o superior. Version actual: %JAVA_VERSION%
    exit /b 1
)

REM Verificar Maven
mvn --version >nul 2>&1
if errorlevel 1 (
    echo %error% Maven no está instalado
    echo   Opción 1: Descargar de https://maven.apache.org/download.cgi
    echo   Opción 2: Usar './mvnw' (Maven Wrapper incluido)
    exit /b 1
)
for /f "tokens=*" %%i in ('mvn --version') do set MAVEN_VERSION=%%i & goto maven_done
:maven_done
for /f "tokens=3" %%i in ('echo %MAVEN_VERSION%') do set MAVEN_VERSION=%%i
echo   - Maven: %MAVEN_VERSION%

echo %success% Todos los requisitos validados
echo.

REM ────────────────────────────────────────────────────────────────────────
REM INICIALIZAR FRONTEND
REM ────────────────────────────────────────────────────────────────────────

echo %info% FASE 1/4: Instalando dependencias del Frontend...
cd /d "%FRONTEND_DIR%"

REM Limpiar node_modules si es necesario
if "!BUILD_MODE!"=="clean" (
    echo %warning% Limpiando node_modules...
    if exist node_modules rmdir /s /q node_modules
    if exist package-lock.json del package-lock.json
)

npm install --legacy-peer-deps
if errorlevel 1 (
    echo %error% Error instalando dependencias de npm
    exit /b 1
)

echo %success% Dependencias del Frontend instaladas
echo.

REM ────────────────────────────────────────────────────────────────────────
REM COMPILAR FRONTEND
REM ────────────────────────────────────────────────────────────────────────

if "!BUILD_MODE!"=="prod" (
    echo %info% FASE 2/4: Compilando Frontend para PRODUCCIÓN...
    call npm run build:prod >> "%LOGS_DIR%\frontend-build-%TIMESTAMP%.log" 2>&1
) else if "!BUILD_MODE!"=="test" (
    echo %info% FASE 2/4: Ejecutando tests del Frontend...
    call npm run test:coverage >> "%LOGS_DIR%\frontend-test-%TIMESTAMP%.log" 2>&1
) else (
    echo %info% FASE 2/4: Compilando Frontend para DESARROLLO...
    call npm run build >> "%LOGS_DIR%\frontend-build-%TIMESTAMP%.log" 2>&1
)

if errorlevel 1 (
    echo %error% Error compilando Frontend
    type "%LOGS_DIR%\frontend-build-%TIMESTAMP%.log"
    exit /b 1
)

echo %success% Frontend compilado exitosamente
if exist dist (
    for /f %%i in ('dir /b /s dist ^| find /c /v ""') do set FILE_COUNT=%%i
    echo   - Archivos generados: !FILE_COUNT!
)
echo.

REM ────────────────────────────────────────────────────────────────────────
REM COMPILAR BACKEND
REM ────────────────────────────────────────────────────────────────────────

cd /d "%BACKEND_DIR%"

if "!BUILD_MODE!"=="test" (
    echo %info% FASE 3/4: Compilando Backend con cobertura (80%% minimo)...
    call mvn clean package -Ptest-coverage >> "%LOGS_DIR%\backend-build-%TIMESTAMP%.log" 2>&1
) else if "!BUILD_MODE!"=="prod" (
    echo %info% FASE 3/4: Compilando Backend para PRODUCCIÓN...
    call mvn clean package -DskipTests -Pprod >> "%LOGS_DIR%\backend-build-%TIMESTAMP%.log" 2>&1
) else (
    echo %info% FASE 3/4: Compilando Backend para DESARROLLO...
    call mvn clean package -DskipTests -Pdev >> "%LOGS_DIR%\backend-build-%TIMESTAMP%.log" 2>&1
)

if errorlevel 1 (
    echo %error% Error compilando Backend
    type "%LOGS_DIR%\backend-build-%TIMESTAMP%.log"
    exit /b 1
)

if not exist target\swo-api-1.0.0.jar (
    echo %error% JAR no fue generado: target\swo-api-1.0.0.jar
    exit /b 1
)

echo %success% Backend compilado exitosamente
echo   - JAR: target\swo-api-1.0.0.jar
if exist target\swo-api-1.0.0.jar (
    for /f %%i in ('dir target\swo-api-1.0.0.jar ^| find ".jar"') do (
        echo   - Tamaño: %%i
    )
)
echo.

REM ────────────────────────────────────────────────────────────────────────
REM COMPILACIÓN CON DOCKER (Opcional)
REM ────────────────────────────────────────────────────────────────────────

if "!BUILD_MODE!"=="docker" (
    echo %info% FASE 4/4: Compilando imagen Docker...
    cd /d "%PROJECT_ROOT%"
    
    docker --version >nul 2>&1
    if errorlevel 1 (
        echo %error% Docker no está instalado
        exit /b 1
    )
    
    docker build -t swo:latest -f Dockerfile . >> "%LOGS_DIR%\docker-build-%TIMESTAMP%.log" 2>&1
    if errorlevel 1 (
        echo %error% Error compilando Docker
        type "%LOGS_DIR%\docker-build-%TIMESTAMP%.log"
        exit /b 1
    )
    
    echo %success% Imagen Docker compilada exitosamente
    echo   - Tag: swo:latest
    echo   - Usar: docker run -p 8080:8080 swo:latest
    echo.
)

REM ────────────────────────────────────────────────────────────────────────
REM REPORTE FINAL
REM ────────────────────────────────────────────────────────────────────────

cd /d "%PROJECT_ROOT%"

echo.
echo ════════════════════════════════════════════════════════════════════════
echo %success% COMPILACIÓN COMPLETADA EXITOSAMENTE
echo ════════════════════════════════════════════════════════════════════════
echo.
echo ARTEFACTOS GENERADOS:
echo   Frontend:
if exist "dist\swo-servicedesk" (
    echo     - %PROJECT_ROOT%\dist\swo-servicedesk\
) else (
    echo     - No encontrado (verificar logs)
)
echo.
echo   Backend:
if exist "%BACKEND_DIR%\target\swo-api-1.0.0.jar" (
    echo     - %BACKEND_DIR%\target\swo-api-1.0.0.jar
) else (
    echo     - No encontrado (verificar logs)
)
echo.
echo PRÓXIMOS PASOS:
echo.

if "!BUILD_MODE!"=="prod" (
    echo   1. Desplegar Frontend (en servidor web):
    echo      - Copiar contenido de dist/swo-servicedesk/ a /var/www/swo
    echo.
    echo   2. Desplegar Backend (en servidor aplicaciones):
    echo      - Copiar backend\target\swo-api-1.0.0.jar a servidor
    echo      - Ejecutar: java -jar swo-api-1.0.0.jar
    echo.
) else if "!BUILD_MODE!"=="docker" (
    echo   1. Iniciar contenedor:
    echo      docker run -d -p 80:80 -p 8080:8080 ^
    echo        -e DB_HOST=db -e DB_USER=swo_prod ^
    echo        -e DB_PASSWORD=mypassword swo:latest
    echo.
    echo   2. O usar Docker Compose:
    echo      docker-compose up -d
    echo.
) else (
    echo   1. Frontend Dev Server:
    echo      npm start
    echo      - URL: http://localhost:4200
    echo.
    echo   2. Backend Dev Server:
    echo      cd backend
    echo      mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
    echo      - URL: http://localhost:8080/api
    echo.
)

echo LOG FILES:
echo   - %LOGS_DIR%\
echo.
echo ════════════════════════════════════════════════════════════════════════
echo.

endlocal
exit /b 0
