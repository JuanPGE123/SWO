# 📚 Guía Completa: Git y GitHub para el Proyecto SWO

## 🎯 Para Subir Cambios al Repositorio (Uso Diario)

### **Flujo Básico (3 Pasos)**

```bash
# 1. Ver qué archivos han cambiado
git status

# 2. Agregar TODOS los archivos modificados
git add -A

# O agregar archivos específicos
git add ruta/del/archivo.java

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# 4. Subir al repositorio remoto
git push origin main
```

---

## 📝 Buenas Prácticas para Mensajes de Commit

### **Formato Recomendado**
```
tipo: descripción breve

Ejemplos:
feat: agregar módulo de reportes avanzados
fix: corregir error en validación de usuarios
docs: actualizar documentación de API
style: mejorar diseño del dashboard
refactor: optimizar servicio de chatbot
test: agregar pruebas unitarias para proyectos
```

### **Tipos de Commit**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Cambios de estilo/diseño
- `refactor:` Refactorización de código
- `test:` Pruebas
- `chore:` Tareas de mantenimiento

---

## 🔄 Comandos Útiles Adicionales

### **Ver historial de commits**
```bash
git log
git log --oneline
git log --graph --oneline --all
```

### **Ver diferencias antes de hacer commit**
```bash
git diff
git diff archivo.java
```

### **Descartar cambios locales**
```bash
# Descartar cambios de un archivo específico
git restore archivo.java

# Descartar TODOS los cambios no guardados (¡CUIDADO!)
git restore .
```

### **Traer cambios del repositorio remoto**
```bash
# Si otros desarrolladores subieron cambios
git pull origin main
```

### **Ver estado de forma resumida**
```bash
git status -s
```

---

## 🌿 Trabajar con Ramas (Branches)

### **Crear y cambiar de rama**
```bash
# Crear una nueva rama
git branch nombre-de-la-rama

# Cambiar a esa rama
git checkout nombre-de-la-rama

# Crear y cambiar en un solo comando
git checkout -b nombre-de-la-rama
```

### **Fusionar ramas**
```bash
# Estando en main, fusionar otra rama
git checkout main
git merge nombre-de-la-rama
```

### **Ver todas las ramas**
```bash
git branch -a
```

---

## 🚨 Solución de Problemas Comunes

### **Error: "Updates were rejected"**
```bash
# Primero traer los cambios remotos
git pull origin main
# Luego subir tus cambios
git push origin main
```

### **Olvidaste agregar archivos al último commit**
```bash
git add archivo-olvidado.java
git commit --amend --no-edit
git push origin main -f
```

### **Deshacer el último commit (manteniendo cambios)**
```bash
git reset --soft HEAD~1
```

### **Ver configuración de Git**
```bash
git config --list
git config user.name
git config user.email
```

---

## 🎨 Configuración Inicial (Solo Primera Vez)

### **Configurar tu identidad**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### **Crear un nuevo repositorio desde cero**
```bash
# 1. Inicializar git en el proyecto
git init

# 2. Agregar todos los archivos
git add -A

# 3. Hacer primer commit
git commit -m "Initial commit"

# 4. Conectar con GitHub (crear repo en github.com primero)
git remote add origin https://github.com/tu-usuario/tu-repo.git

# 5. Subir por primera vez
git branch -M main
git push -u origin main
```

---

## 📦 Clonar un Repositorio Existente

```bash
# Clonar tu repositorio en otra computadora
git clone https://github.com/JuanPGE123/SWO.git

# Entrar a la carpeta
cd SWO

# Instalar dependencias del backend
cd backend
mvn clean install

# Instalar dependencias del frontend
cd ..
npm install
```

---

## 🔐 Autenticación con GitHub

### **Usar Token de Acceso Personal (Recomendado)**

1. Ir a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generar nuevo token con permisos de `repo`
3. Copiar el token
4. Al hacer `git push`, usar el token como contraseña

### **Configurar credenciales (Windows)**
```bash
# Git guardará tus credenciales
git config --global credential.helper manager
```

---

## 📊 Flujo de Trabajo en Equipo

```bash
# 1. Antes de empezar a trabajar, traer cambios
git pull origin main

# 2. Hacer tus cambios en el código
# ... editar archivos ...

# 3. Ver qué cambió
git status

# 4. Agregar cambios
git add -A

# 5. Commit
git commit -m "feat: descripción de tu trabajo"

# 6. Subir (si hay conflictos, resolver primero)
git push origin main
```

---

## 🎯 Atajos Útiles

```bash
# Commit rápido (agrega y commitea archivos ya trackeados)
git commit -am "mensaje"

# Ver último commit
git show

# Ver cambios del último commit
git show HEAD

# Ir al commit anterior
git checkout HEAD~1

# Volver al último commit
git checkout main
```

---

## 📁 Archivos Importantes

- **`.gitignore`**: Especifica qué archivos NO subir (node_modules, target, logs, etc.)
- **`.git/`**: Carpeta oculta con el historial de git (NO eliminar)

---

## 🔗 URLs Importantes

- **Repositorio**: https://github.com/JuanPGE123/SWO
- **GitHub Docs**: https://docs.github.com/es
- **Git Docs**: https://git-scm.com/doc

---

## ✅ Checklist Antes de Hacer Push

- [ ] `git status` para ver cambios
- [ ] `git pull origin main` para traer cambios remotos
- [ ] `git add -A` para agregar archivos
- [ ] `git commit -m "mensaje descriptivo"`
- [ ] `git push origin main`
- [ ] Verificar en GitHub que los cambios se subieron

---

## 💡 Tips Finales

1. **Commits frecuentes**: Haz commits pequeños y frecuentes
2. **Mensajes claros**: Escribe mensajes que expliquen QUÉ y POR QUÉ
3. **Pull primero**: Siempre haz `git pull` antes de `git push`
4. **Revisa antes**: Usa `git status` y `git diff` antes de commitear
5. **No subas secretos**: Nunca subas contraseñas, tokens o API keys
6. **Backup**: Git es tu backup, usa commits regularmente

---

**¡Guarda este archivo para consultas futuras!** 📌
