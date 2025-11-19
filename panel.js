/*
  panel.js
  Lógica mínima para el panel principal (interacciones de prueba):
  - Probar alerta: simula la llegada de una notificación en la vista previa.
  - Toggle canales: alterna visualmente el estado On/Off al hacer clic en cada canal.
  - Cerrar sesión: confirma y redirige (simulado) a la página de autenticación.
*/

document.addEventListener('DOMContentLoaded', ()=>{
  // --- Botón 'Probar alerta' ---
  // Busca el botón por id y, al pulsarlo, inserta temporalmente un elemento
  // en la sección de vista previa para simular una notificación entrante.
  const testBtn = document.getElementById('testAlert');
  if(testBtn){
    testBtn.addEventListener('click', ()=>{
      const preview = document.querySelector('.preview');
      if(!preview) return;
      // Creamos un div con la clase adecuada para el estilo
      const el = document.createElement('div');
      el.className = 'preview-item success';
      el.textContent = '✓ Prueba: INC-XXXX creado (simulado)';
      // Insertamos al principio y lo eliminamos luego de 4.5s
      preview.insertBefore(el, preview.firstChild);
      setTimeout(()=>{ el.remove() }, 4500);
    });
  }

  // --- Alternar canales ---
  // Para cada fila de canal, añadimos un listener que cambia el estado visual
  // entre 'On' y 'Off' (clase .on). Esto es solo visual y no persiste.
  document.querySelectorAll('.channels .channel').forEach(ch=>{
    ch.addEventListener('click', ()=>{
      const sw = ch.querySelector('.switch');
      if(sw.classList.contains('on')){
        sw.classList.remove('on'); sw.textContent = 'Off';
      } else { sw.classList.add('on'); sw.textContent = 'On'; }
    });
  });

  // --- Cerrar sesión (simulado) ---
  // Muestra confirmación; si el usuario acepta, redirige a la pantalla de login.
  const logout = document.getElementById('logoutBtn');
  if(logout){
    logout.addEventListener('click', ()=>{
      if(confirm('¿Cerrar sesión?')){
        alert('Sesión cerrada (simulado).');
        // Redirigimos a la página de login local (archivo HTML)
        // En este proyecto la página de autenticación es `index.html`.
        window.location.href = 'index.html';
      }
    });
  }
});
