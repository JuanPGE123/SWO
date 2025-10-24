// Agregar listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', ()=>{
  // Referencias a los botones principales. Estos IDs están en `reports.html`.
  const exportBtn = document.getElementById('exportBtn');
  const updateBtn = document.getElementById('updateBtn');

  /*
    toast(msg)
    Función helper que muestra una notificación temporal en pantalla.
    - Crea un <div> con estilo inline para evitar depender de CSS extra.
    - Añade el elemento al body y lo elimina después de 3 segundos.
    Uso: simulación rápida de feedback UI para acciones (exportar, actualizar, descargar).
  */
  function toast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    // Estilos básicos para que la notificación sea visible y consistente
    t.style.position = 'fixed';
    t.style.right = '18px';
    t.style.bottom = '18px';
    t.style.background = 'rgba(0,0,0,0.7)';
    t.style.color = 'white';
    t.style.padding = '8px 12px';
    t.style.borderRadius = '8px';
    document.body.appendChild(t);
    // Eliminamos la notificación después de 3 segundos
    setTimeout(()=> t.remove(),3000);
  }

  // Si existe el botón Exportar, añadimos el listener que simula la exportación
  if(exportBtn){
    exportBtn.addEventListener('click', ()=>{
      // Aquí en una app real se llamaría a una API o se construiría un blob para descarga
      toast('Exportando reportes... (simulado)');
    });
  }

  // Si existe el botón Actualizar, añadimos listener para simular la actualización de datos
  if(updateBtn){
    updateBtn.addEventListener('click', ()=>{
      // Normalmente actualizaría los datos mediante fetch/axios y re-render del DOM
      toast('Actualizando datos...');
    });
  }

  // Seleccionamos todos los botones pequeños de la tabla y accesos rápidos
  // Los botones tienen la clase .btn.small y simulan una descarga cuando se clican
  document.querySelectorAll('.btn.small').forEach(b=>{
    b.addEventListener('click', ()=>{
      // En producción este listener iniciaría una descarga real o abriría un modal
      toast('Descarga iniciada (simulado)');
    });
  });
});
