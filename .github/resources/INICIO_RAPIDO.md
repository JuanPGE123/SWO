# 🚀 PASOS RÁPIDOS PARA DEPLOY

## ✅ Todo está configurado. Solo sigue estos pasos:

### 1️⃣ Agregar Archivos al Repositorio

```powershell
# Ver qué archivos han cambiado
git status

# Agregar TODOS los archivos
git add .

# Hacer commit
git commit -m "Configuración completa deploy GitHub Pages + mejoras sidebar"

# Subir a GitHub
git push origin main
```

### 2️⃣ Configurar GitHub Pages (Una sola vez)

1. Abre: https://github.com/juanpge123/SWO/settings/pages
2. **Source**: Selecciona **"GitHub Actions"** (no Branch)
3. Guarda

### 3️⃣ ¡Listo! 

El deploy es **automático**. Cada vez que hagas `git push origin main`:
- Se ejecutará GitHub Actions
- Compilará tu proyecto
- Lo publicará en: https://juanpge123.github.io/SWO/

---

## 📊 Verificar Deploy

1. Ve a: https://github.com/juanpge123/SWO/actions
2. Verás el workflow ejecutándose
3. Cuando aparezca ✅ verde, abre: https://juanpge123.github.io/SWO/

---

## 🔄 Para Actualizaciones Futuras

```powershell
# 1. Hacer cambios en el código
# 2. Guardar archivos

# 3. Git add, commit, push
git add .
git commit -m "Descripción de tus cambios"
git push origin main

# ¡Automáticamente se desplegará!
```

---

## 🛠️ Si Prefieres Deploy Manual

```powershell
.\deploy.ps1
```

---

## 📁 Archivos Creados para Deploy

✅ `.github/workflows/deploy.yml` - GitHub Action (deploy automático)  
✅ `deploy.ps1` - Script PowerShell (deploy manual)  
✅ `DEPLOY_GITHUB.md` - Documentación completa  
✅ `INICIO_RAPIDO.md` - Este archivo  

---

## 🎯 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Tu App** | https://juanpge123.github.io/SWO/ |
| **Repositorio** | https://github.com/juanpge123/SWO |
| **GitHub Actions** | https://github.com/juanpge123/SWO/actions |
| **Settings Pages** | https://github.com/juanpge123/SWO/settings/pages |

---

**¡Ejecuta los comandos del paso 1 ahora mismo! 🚀**
