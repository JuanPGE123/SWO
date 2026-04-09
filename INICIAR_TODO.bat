@echo off
REM ====================================
REM Script TODO-EN-UNO - Sistema SWO
REM Inicia todo automaticamente
REM ====================================

title Sistema SWO - Inicio Completo

color 0A
echo.
echo ========================================
echo   SISTEMA SWO - INICIO COMPLETO
echo ========================================
echo.

REM Verificar MySQL
echo [1/3] Verificando MySQL...
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
    pause
    exit /b 1
) else (
    echo   [OK] MySQL corriendo en puerto 3306
)

REM Verificar compilacion
echo.
echo [2/3] Verificando compilacion...
if exist "target\classes\com\swo" (
    echo   [OK] Proyecto ya compilado
) else (
    echo   [*] Compilando proyecto...
    call mvn clean compile -q
    if errorlevel 1 (
        color 0C
        echo   [X] Error en compilacion
        pause
        exit /b 1
    )
    echo   [OK] Compilacion exitosa
)

REM Verificar Tomcat
echo.
echo [3/3] Verificando Tomcat...
netstat -an | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo   [*] Tomcat no esta corriendo
    echo   [*] Iniciando Tomcat...
    echo.
    goto iniciar_tomcat
) else (
    echo   [OK] Tomcat ya esta corriendo
    echo.
    goto mostrar_info
)

:iniciar_tomcat
color 0E
echo ========================================
echo   INICIANDO BACKEND TOMCAT
echo ========================================
echo.
echo   Puerto:    8080
echo   Contexto:  /SWO
echo   URL API:   http://localhost:8080/SWO
echo.
echo   [!] NO CIERRES ESTA VENTANA
echo   [!] Presiona Ctrl+C para detener
echo.
echo ========================================
echo.

REM Iniciar Tomcat
call mvn tomcat7:run

goto fin

:mostrar_info
color 0A
echo ========================================
echo   SISTEMA LISTO
echo ========================================
echo.
echo   Backend:  http://localhost:8080/SWO
echo   MySQL:    http://localhost/phpmyadmin
echo.
echo ----------------------------------------
echo   PARA INICIAR FRONTEND (Angular):
echo ----------------------------------------
echo   1. Abre NUEVA terminal (PowerShell)
echo   2. Ejecuta: npm start
echo   3. Accede: http://localhost:4200
echo.
echo ========================================
echo.

:fin
pause
exit /b 0
