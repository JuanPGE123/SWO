# 🚀 Deploy a GitHub Pages - SWO ServiceDesk

## URL del Proyecto
**https://juanpge123.github.io/SWO/**

---

## 🎯 Métodos de Deploy

### ⚡ Método 1: GitHub Actions (Automático) - RECOMENDADO

**Ventajas:** Deploy automático en cada push a main

#### Configuración (Una sola vez):
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. Guarda los cambios

#### Uso:
```bash
# Solo haz push a main y el deploy es automático
git add .
git commit -m "Descripción de cambios"
git push origin main

# GitHub Actions compilará y desplegará automáticamente
```

### 🔧 Método 2: Script PowerShell (Manual)

```powershell
# Ejecutar desde PowerShell
.\deploy.ps1
```

Este script hace:
1. ✅ Build de producción
2. ✅ Cambia a rama gh-pages
3. ✅ Copia archivos compilados
4. ✅ Commit y push
5. ✅ Vuelve a main

---

## 📋 Pasos para Primer Deploy

### 1️⃣ Verificar Git

```bash
git status
git remote -v
```

Debe mostrar:
```
origin  https://github.com/juanpge123/SWO.git
```

### 2️⃣ Configurar GitHub Pages

En GitHub (https://github.com/juanpge123/SWO):
1. **Settings** → **Pages**
2. **Source**: Selecciona **GitHub Actions**
3. Guarda

### 3️⃣ Subir Código

```bash
# 1. Agregar archivos nuevos
git add .

# 2. Commit
git commit -m "Configuración deploy GitHub Pages"

# 3. Push (esto activará el deploy automático)
git push origin main
```

### 4️⃣ Verificar Deploy

1. Ve a **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Cuando termine (✅ verde), tu app estará en: https://juanpge123.github.io/SWO/

---

## 📁 Archivos de Configuración Creados

### `.github/workflows/deploy.yml`
GitHub Action que:
- Se ejecuta en cada push a main
- Instala dependencias
- Compila con `--base-href /SWO/`
- Deploy automático a GitHub Pages

### `deploy.ps1`
Script PowerShell para deploy manual

### `package.json`
```json
{
  "scripts": {
    "build:prod": "ng build --configuration production --base-href /SWO/"
  }
}
```

---

## 🔄 Workflow de Desarrollo

### Desarrollo
```bash
npm start           # Servidor local localhost:4200
# Hacer cambios...
git add .
git commit -m "Mensaje"
git push origin main
```

### Deploy a Producción
```bash
npm run deploy      # Build + Deploy a GitHub Pages
```

### Verificación
```bash
# Abrir en navegador
start https://juanpge123.github.io/SWO/
```

---

## 📚 Recursos

- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages)

---

**Última actualización:** 18/01/2026  
**Versión Angular:** 17.0.0  
**Estado:** ✅ Configurado y listo para deploy
