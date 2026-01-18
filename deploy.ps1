# Script de Deploy a GitHub Pages
# Ejecutar: .\deploy.ps1

Write-Host "🚀 Iniciando deploy a GitHub Pages..." -ForegroundColor Cyan

# 1. Build de producción
Write-Host "`n📦 Compilando aplicación..." -ForegroundColor Yellow
npm run build:prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en compilación" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Compilación exitosa" -ForegroundColor Green

# 2. Crear carpeta temporal para gh-pages
Write-Host "`n📁 Preparando archivos..." -ForegroundColor Yellow
$distPath = "dist\swo-servicedesk"

if (-not (Test-Path $distPath)) {
    Write-Host "❌ Carpeta dist no encontrada" -ForegroundColor Red
    exit 1
}

# 3. Copiar archivos a temporal
$tempPath = "temp-gh-pages"
if (Test-Path $tempPath) {
    Remove-Item -Recurse -Force $tempPath
}
Copy-Item -Recurse $distPath $tempPath

# 4. Cambiar a rama gh-pages
Write-Host "`n🔀 Cambiando a rama gh-pages..." -ForegroundColor Yellow
git checkout gh-pages

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Creando rama gh-pages..." -ForegroundColor Yellow
    git checkout --orphan gh-pages
    git rm -rf .
}

# 5. Copiar archivos compilados
Write-Host "`n📋 Copiando archivos..." -ForegroundColor Yellow
Get-ChildItem -Exclude .git, $tempPath | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "$tempPath\*" -Destination . -Recurse

# 6. Commit y push
Write-Host "`n💾 Guardando cambios..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin gh-pages --force

# 7. Volver a main
Write-Host "`n🔙 Volviendo a main..." -ForegroundColor Yellow
git checkout main

# 8. Limpiar
Remove-Item -Recurse -Force $tempPath

Write-Host "`n✅ ¡Deploy completado!" -ForegroundColor Green
Write-Host "🌐 Tu app estará disponible en: https://juanpge123.github.io/SWO/" -ForegroundColor Cyan
Write-Host "⏱️  Puede tardar 2-5 minutos en estar disponible" -ForegroundColor Yellow
