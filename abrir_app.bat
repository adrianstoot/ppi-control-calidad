@echo off
title CIV_L3 - Plan de Puntos de Inspeccion (PPI)
echo ==============================================================
echo   CIV_L3: Plan de Puntos de Inspeccion (PPI) & Control de Obra
echo   E.T.S.I.E. - Construccion VI - Codigo Estructural
echo ==============================================================
echo.
echo Iniciando la aplicacion web interactiva...

:: Comprobar si python existe
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Iniciando servidor Python en http://localhost:8080...
    start /b python -m http.server 8080 >nul 2>nul
    timeout /t 1 /nobreak >nul
    start http://localhost:8080/index.html
    echo Aplicacion abierta en http://localhost:8080/index.html
    exit
)

:: Si no hay python, comprobar si powershell puede servir o abrir directo
echo Abriendo directamente en tu navegador predeterminado...
start "" "%~dp0index.html"
echo Aplicacion iniciada correctamente.
exit
