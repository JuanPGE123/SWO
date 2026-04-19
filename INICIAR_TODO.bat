@echo off
REM ====================================
REM Script TODO-EN-UNO - Sistema SWO
REM Inicia Backend y Frontend automáticamente
REM Versión: 2.0.0
REM ====================================

title Sistema SWO - Inicio Completo

color 0A
echo.
echo ========================================
echo   SISTEMA SWO v2.0 - INICIO COMPLETO
echo ========================================
echo.

REM Verificar MySQL
echo [1/4] Verificando MySQL...
netstat -an | findstr ":3306" | findstr "LISTENING" >nul
if errorlevel 1 (
    color 0C
    echo   [X] MySQL NO esta corriendo
    echo.
    echo   [!] ACCION REQUERIDA:
    echo   [!] 1. Abre XAMPP Control Panel
    echo   [!] 2. Click en "Start" para MySQL
    echo   [!] 3. Vuelve a ejecutar este script
    echo.
    echo   O ejecuta:
    echo   net start MySQL80
    echo.
    pause
    exit /b 1
) else (
    echo   [OK] MySQL corriendo en puerto 3306
)

REM Verificar Node.js
echo.
echo [2/4] Verificando Node.js...
where node >nul 2>&1
if errorlevel 1 (
    color 0C
    echo   [X] Node.js NO esta instalado
    echo.
    echo   [!] Descarga Node.js desde: https://nodejs.org
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo   [OK] Node.js !NODE_VERSION! instalado
)

REM Verificar Maven
echo.
echo [3/4] Verificando Maven...
where mvn >nul 2>&1
if errorlevel 1 (
    color 0C
    echo   [X] Maven NO esta instalado
    echo.
    echo   [!] Descarga Maven desde: https://maven.apache.org
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=3" %%i in ('mvn --version ^| findstr "Apache Maven"') do set MAVEN_VERSION=%%i
    echo   [OK] Maven !MAVEN_VERSION! instalado
)

REM Verificar compilacion
echo.
echo [4/4] Verificando compilacion del backend...
if exist "target\classes\com\swo" (
    echo   [OK] Backend ya compilado
) else (
    echo   [*] Compilando backend con Maven...
    call mvn clean compile -q
    if errorlevel 1 (
        color 0C
        echo   [X] Error en compilacion del backend
        pause
        exit /b 1
    )
    echo   [OK] Compilacion exitosa
)

REM Verificar node_modules
echo.
echo [*] Verificando dependencias del frontend...
if exist "node_modules" (
    echo   [OK] Dependencias de npm ya instaladas
) else (
    echo   [*] Instalando dependencias con npm...
    call npm install --silent
    if errorlevel 1 (
        color 0C
        echo   [X] Error instalando dependencias
        pause
        exit /b 1
    )
    echo   [OK] Dependencias instaladas
)

REM Verificar Tomcat
echo.
echo [*] Verificando Tomcat...
netstat -an | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo   [*] Tomcat NO esta corriendo
    echo.
    goto iniciar_servidores
) else (
    echo   [!] ADVERTENCIA: Puerto 8080 ya esta en uso
    echo   [!] Puede ser Tomcat u otra aplicacion
    echo.
    choice /C SN /M "Deseas continuar de todos modos"
    if errorlevel 2 exit /b 0
    goto iniciar_frontend
)

:iniciar_servidores
color 0E
cls
echo.
echo ========================================
echo   INICIANDO SERVIDORES
echo ========================================
echo.
echo   [*] Backend (Tomcat):  http://localhost:8080/SWO
echo   [*] Frontend (Angular): http://localhost:4200
echo.
echo   [!] Se abriran DOS ventanas:
echo   [!] 1. Tomcat (Backend Java)
echo   [!] 2. Angular Dev Server (Frontend)
echo.
echo   [!] NO cierres ninguna ventana
echo   [!] Presiona Ctrl+C en cada una para detener
echo.
echo ========================================
echo.
timeout /t 3 /nobreak >nul

REM Iniciar Backend en nueva ventana
echo [*] Iniciando Backend (Tomcat)...
start "SWO Backend - Tomcat" /MIN cmd /c "color 0E && title SWO Backend - Tomcat && echo Iniciando Tomcat en puerto 8080... && echo. && mvn tomcat7:run"

REM Esperar a que Tomcat inicie
echo [*] Esperando a que Tomcat este listo...
timeout /t 10 /nobreak >nul

:check_tomcat
netstat -an | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo   [*] Esperando a Tomcat... (reintentando en 5s)
    timeout /t 5 /nobreak >nul
    goto check_tomcat
) else (
    echo   [OK] Backend listo en http://localhost:8080/SWO
)

:iniciar_frontend
REM Iniciar Frontend en nueva ventana
echo.
echo [*] Iniciando Frontend (Angular)...
start "SWO Frontend - Angular" /MIN cmd /c "color 0B && title SWO Frontend - Angular && echo Iniciando Angular Dev Server en puerto 4200... && echo. && npm start"

REM Esperar a que Angular compile
echo [*] Esperando a que Angular compile...
timeout /t 15 /nobreak >nul

:check_angular
netstat -an | findstr ":4200" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo   [*] Esperando a Angular... (reintentando en 5s)
    timeout /t 5 /nobreak >nul
    goto check_angular
) else (
    echo   [OK] Frontend listo en http://localhost:4200
)

:mostrar_info
color 0A
cls
echo.
echo ========================================
echo   SISTEMA SWO - LISTO PARA USAR
echo ========================================
echo.
echo   [OK] MySQL:    Corriendo (puerto 3306)
echo   [OK] Backend:  http://localhost:8080/SWO
echo   [OK] Frontend: http://localhost:4200
echo.
echo ========================================
echo   CREDENCIALES DE PRUEBA
echo ========================================
echo.
echo   Email:    admin@swo.com
echo   Password: 123456
echo   Rol:      ADMINISTRADOR
echo.
echo ========================================
echo   INSTRUCCIONES
echo ========================================
echo.
echo   1. Abriendo navegador en http://localhost:4200
echo   2. Inicia sesion con las credenciales de arriba
echo   3. Explora el sistema
echo.
echo   [*] Para DETENER los servidores:
echo       - Busca las ventanas minimizadas
echo       - Presiona Ctrl+C en cada una
echo.
echo   [*] Para VER los logs:
echo       - Restaura las ventanas minimizadas
echo.
echo ========================================
echo.

REM Abrir navegador
timeout /t 3 /nobreak >nul
start http://localhost:4200

echo.
echo [*] Navegador abierto automaticamente
echo.
echo ========================================

:fin
pause
exit /b 0
