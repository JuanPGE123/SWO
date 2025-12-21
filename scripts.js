/*
  scripts.js
  Contiene la lógica básica del formulario de autenticación y manejo del logo.
  Comentarios en español describen cada función y proceso.
*/

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', ()=>{
  // --- Toggle de visibilidad de contraseña ---
  // Objetivo: permitir al usuario alternar entre ver/ocultar la contraseña.
  // Elementos: botón con id "togglePwd" y campo password con id "password".
  const toggle = document.getElementById('togglePwd');
  const pwd = document.getElementById('password');
  if(toggle && pwd){
    // Al hacer click en el botón, cambiamos el atributo type del input
    toggle.addEventListener('click', ()=>{
      // Si está en 'password' lo ponemos en 'text' y viceversa
      const t = pwd.getAttribute('type') === 'password' ? 'text' : 'password';
      pwd.setAttribute('type', t);
      // Actualizamos el icono/emoji del botón para dar feedback al usuario
      toggle.textContent = t === 'text' ? '🙈' : '👁️';
    });
  }

  // --- Manejo de carga y fallback del logo ---
  // Objetivo: si la imagen del logo no carga, mostrar un fallback de texto.
  // Esto mejora la robustez visual si el fichero de imagen falta o no se carga.
  const logoImg = document.getElementById('logoImg');
  if(logoImg){
    const logoContainer = logoImg.closest('.logo');
    // Si la imagen se carga correctamente, nos aseguramos de ocultar el fallback
    logoImg.addEventListener('load', ()=>{
      if(logoContainer) logoContainer.classList.remove('logo--noimg');
    });
    // Si ocurre un error al cargar la imagen, activamos la clase que muestra el fallback
    logoImg.addEventListener('error', ()=>{
      if(logoContainer) logoContainer.classList.add('logo--noimg');
    });
    // Comprobación rápida en caso de que la imagen ya haya fallado o no esté completa
    if(!logoImg.complete || logoImg.naturalWidth === 0){
      if(logoImg.naturalWidth === 0 && logoImg.src){
        if(logoContainer) logoContainer.classList.add('logo--noimg');
      }
    }
  }

  // --- Manejo del envío del formulario de login ---
  // window.onSubmit es la función invocada en el atributo onsubmit del formulario.
  // Proceso:
  // 1. Evitar el envío por defecto para manejarlo en cliente.
  // 2. Validar que ambos campos no estén vacíos.
  // 3. Verificar credenciales (demo: comprobación simple en frontend).
  // 4. Si son correctas, redirigir a panel.html; si no, mostrar error.
  window.onSubmit = function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = pwd.value;
    const project = document.getElementById('project').value;
    // Validación básica de presencia
    if(!email || !password || !project){
      alert('Por favor rellena todos los campos.');
      return false;
    }
    // NOTA: Esto es solo una comprobación en frontend para demo.
    // Nunca validar credenciales sensibles solo en el cliente en producción.
    if(email === 'administrador@swo.com' && password === '123456' && project === '101'){
      // Credenciales correctas (demo) -> redirigimos al panel
      window.location.href = 'panel.html';
      return true;
    } else {
      // Credenciales incorrectas -> retroalimentación al usuario
      alert('Credenciales incorrectas o proyecto no válido.');
      return false;
    }
  }
});
