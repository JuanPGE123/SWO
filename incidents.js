// incidents.js
// Panel de incidentes: datos de ejemplo y UI mínima para edición y filtros.
// incidents.js
// Panel de incidentes: datos de ejemplo y UI mínima para edición y filtros.

let sampleIncidents = [
  { id: 'INC-2314', title: 'Fallo en la pasarela de pagos', state: 'open', priority: 'Alta', assignee: 'Lucía', project: 'Ecommerce', date: '2025-08-25', tags:['pagos','producción'], comments: [ { author:'Cliente A', date:'2025-08-25 11:12', text:'La compra muestra error 500 al intentar pagar' }, { author:'Soporte', date:'2025-08-25 11:30', text:'Revisando logs, posible error en certificación del gateway' } ], user:'Cliente A', userEmail:'clientea@ejemplo.com', userPhones:['+34123456789'], app:'Pasarela', reason:'Error 500 al confirmar pago', activity:'Intentaba pagar con tarjeta' },
  { id: 'INC-2298', title: 'Error en el módulo de usuarios', state: 'inprogress', priority: 'Media', assignee: 'Carlos', project: 'Portal', date: '2025-08-24', tags:['usuarios'], comments: [ { author:'Cliente B', date:'2025-08-24 10:05', text:'No puedo actualizar mi perfil' }, { author:'Desarrollo', date:'2025-08-24 10:40', text:'Se detectó excepción al guardar datos; en revisión' } ], user:'Cliente B', userEmail:'clienteb@ejemplo.com', userPhones:['+34987654321'], app:'Portal', reason:'Excepción en updateProfile', activity:'Editando perfil' },
  { id: 'INC-2201', title: 'Servidor con alta latencia', state: 'pending', priority: 'Crítica', assignee: 'María', project: 'Infra', date: '2025-08-20', tags:['infra'], comments: [ { author:'Monitor', date:'2025-08-20 03:22', text:'Alertas de CPU al 95%' } ], user:'Cliente C', userEmail:'clienteC@ejemplo.com', userPhones:['+34111222333'], app:'Infra', reason:'Alto consumo CPU', activity:'Proceso batch nocturno' },
  { id: 'INC-2202', title: 'Nuevo incidente de prueba', state: 'resolved', priority: 'Baja', assignee: 'Roberto', project: 'Integraciones', date: '2025-08-26', tags:['test'], comments: [ { author:'QA', date:'2025-08-26 09:00', text:'Prueba automatizada: OK' } ], user:'Cliente D', userEmail:'cliented@ejemplo.com', userPhones:['+34999888777'], app:'Integraciones', reason:'Prueba', activity:'Test' }
];

const sampleAssignees = ['Sin asignar','Lucía','Carlos','María','Roberto','Sofía'];
const sampleProjects = ['Ecommerce','Portal','Infra','MobileApp','Integraciones'];

// Guardar motivos para pendientes
const pendingReasons = {};

/*
  toast(msg)
  Muestra un pequeño toast de notificación en la esquina inferior derecha.
  - msg: texto a mostrar.
*/
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position='fixed'; t.style.right='18px'; t.style.bottom='18px';
  t.style.background='rgba(0,0,0,0.75)'; t.style.color='white'; t.style.padding='8px 12px'; t.style.borderRadius='8px';
  t.style.zIndex = 9999;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(),3000);
}

/*
  renderCounts(list)
  Actualiza las métricas numéricas en la cabecera (Abiertos, En proceso, Pendientes, Resueltos)
  a partir de la lista de incidentes proporcionada.
*/
function renderCounts(list){
  document.getElementById('countOpen').textContent = list.filter(i=>i.state==='open').length;
  document.getElementById('countInProgress').textContent = list.filter(i=>i.state==='inprogress').length;
  document.getElementById('countPending').textContent = list.filter(i=>i.state==='pending').length;
  const resEl = document.getElementById('countResolved');
  if(resEl) resEl.textContent = list.filter(i=>i.state==='resolved').length;
}

/*
  renderTable(list)
  Rellena la tabla de incidentes con filas generadas dinámicamente
  y asocia los listeners para selects y botones dentro de cada fila.
*/
function renderTable(list){
  const tbody = document.querySelector('#incidentsTable tbody');
  tbody.innerHTML = '';
  list.forEach(inc=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${inc.id}</td>
      <td>${inc.title}</td>
      <td>
        <select class="select-small state-select" data-id="${inc.id}">
          <option value="open">Abierto</option>
          <option value="inprogress">En proceso</option>
          <option value="pending">Pendiente</option>
          <option value="resolved">Resuelto</option>
        </select>
      </td>
      <td>
        <select class="select-small priority-select" data-id="${inc.id}">
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
          <option>Crítica</option>
        </select>
      </td>
      <td><select class="select-small assign-select" data-id="${inc.id}"></select></td>
      <td><select class="select-small project-select" data-id="${inc.id}"></select></td>
      <td>${inc.date}</td>
      <td>
        <button class="action-btn save-btn" data-id="${inc.id}">Guardar</button>
        <button class="action-btn view-btn" data-id="${inc.id}">Ver</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // rellenar selects dinámicos y asignar valores + listeners
  document.querySelectorAll('.assign-select').forEach(s=>{
    const id = s.dataset.id; const inc = sampleIncidents.find(x=>x.id===id);
    s.innerHTML = sampleAssignees.map(a=>`<option${a===inc.assignee? ' selected':''}>${a}</option>`).join('');
  });
  document.querySelectorAll('.project-select').forEach(s=>{
    const id = s.dataset.id; const inc = sampleIncidents.find(x=>x.id===id);
    s.innerHTML = sampleProjects.map(p=>`<option${p===inc.project? ' selected':''}>${p}</option>`).join('');
  });
  document.querySelectorAll('.priority-select').forEach(s=>{
    const id = s.dataset.id; const inc = sampleIncidents.find(x=>x.id===id);
    if(inc){ s.value = inc.priority; }
    s.addEventListener('change',(e)=>{ const incObj = sampleIncidents.find(x=>x.id===e.target.dataset.id); if(incObj){ incObj.priority = e.target.value; toast(`Prioridad de ${incObj.id} actualizada a ${e.target.value}`); } });
  });

  // estados
  document.querySelectorAll('.state-select').forEach(s=>{
    const id = s.dataset.id; const inc = sampleIncidents.find(x=>x.id===id); if(inc) s.value = inc.state;
    s.dataset.prev = s.value;
    s.addEventListener('change', (e)=>{
      const val = e.target.value; const id = e.target.dataset.id; const incObj = sampleIncidents.find(x=>x.id===id);
      if(!incObj) return;
      if(val === 'pending'){
        showPendingEditor(id, incObj); // abre editor; aplicación se realiza al guardar
        e.target.value = e.target.dataset.prev;
        return;
      }
      incObj.state = val; e.target.dataset.prev = val; renderCounts(sampleIncidents); toast(`Estado de ${id} cambiado a ${val}`);
    });
  });

  // asignados y proyectos
  document.querySelectorAll('.assign-select').forEach(sel=>{ sel.addEventListener('change', (e)=>{ const inc = sampleIncidents.find(x=>x.id===e.target.dataset.id); if(inc){ inc.assignee = e.target.value; toast(`Asignado de ${inc.id} actualizado a ${e.target.value}`); } }); });
  document.querySelectorAll('.project-select').forEach(sel=>{ sel.addEventListener('change', (e)=>{ const inc = sampleIncidents.find(x=>x.id===e.target.dataset.id); if(inc){ inc.project = e.target.value; toast(`Proyecto de ${inc.id} actualizado a ${e.target.value}`); } }); });

  // botones
  document.querySelectorAll('.save-btn').forEach(b=> b.addEventListener('click', e=>{ const inc = sampleIncidents.find(x=>x.id===e.target.dataset.id); if(inc) toast(`Incidente ${inc.id} guardado (simulado)`); }));
  document.querySelectorAll('.view-btn').forEach(b=> b.addEventListener('click', e=>{
    const id = e.target.dataset.id; // abrir en nueva pestaña la vista de detalle con query ?id=INC-xxxx
    // Exponer arrays de ejemplo en window para fallback en detalle
    window._sampleIncidents = sampleIncidents;
    window._sampleProjects = sampleProjects;
    window.open(`incident_detail.html?id=${encodeURIComponent(id)}`, '_blank');
  }));
}

// Editor para pendiente
/*
  showPendingEditor(id, inc)
  Inserta una fila editora justo debajo del incidente seleccionado para
  capturar el motivo cuando se marca como 'Pendiente'.
  - id: identificador del incidente
  - inc: objeto incidente (referencia desde sampleIncidents)
*/
function showPendingEditor(id, inc){
  const tbody = document.querySelector('#incidentsTable tbody');
  const row = Array.from(tbody.querySelectorAll('tr')).find(r=> r.querySelector('.state-select')?.dataset.id === id);
  if(!row) return;
  const next = row.nextElementSibling;
  if(next && next.classList.contains('pending-editor')) return;
  const editor = document.createElement('tr');
  editor.className = 'pending-editor';
  editor.innerHTML = `<td colspan="8"><div class="pending-box"><label>Motivo (obligatorio para mantener pendiente)</label><textarea class="pending-reason" data-id="${id}">${pendingReasons[id]||''}</textarea><div class="editor-actions"><button class="btn save-reason">Guardar</button><button class="btn cancel-reason">Cancelar</button></div></div></td>`;
  row.parentNode.insertBefore(editor, row.nextSibling);
  editor.querySelector('.save-reason').addEventListener('click', ()=>{
    const text = editor.querySelector('.pending-reason').value.trim();
    if(!text){ alert('Ingrese un motivo para el estado Pendiente.'); return; }
    pendingReasons[id] = text;
    const incObj = sampleIncidents.find(x=>x.id===id); if(incObj) incObj.state = 'pending';
    const select = document.querySelector(`.state-select[data-id="${id}"]`); if(select){ select.value='pending'; select.dataset.prev='pending'; }
    renderCounts(sampleIncidents);
    toast(`Motivo guardado. ${id} queda en Pendiente.`);
    editor.remove();
  });
  editor.querySelector('.cancel-reason').addEventListener('click', ()=>{ const select = document.querySelector(`.state-select[data-id="${id}"]`); if(select) select.value = select.dataset.prev; editor.remove(); });
}

/*
  Inicialización al cargar la página de Incidentes:
  - Renderiza métricas y tabla inicial
  - Conecta filtros y búsqueda global
*/
document.addEventListener('DOMContentLoaded', ()=>{
  renderCounts(sampleIncidents);
  renderTable(sampleIncidents);
  document.getElementById('filterState').addEventListener('change', (e)=>{ const v = e.target.value; const list = v==='all'? sampleIncidents : sampleIncidents.filter(i=> i.state === v); renderTable(list); renderCounts(list); });
  document.getElementById('globalSearch').addEventListener('input',(e)=>{ const q = e.target.value.toLowerCase(); const list = sampleIncidents.filter(i=> i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q)); renderTable(list); renderCounts(list); });
  document.getElementById('refreshBtn').addEventListener('click', ()=> toast('Datos actualizados (simulado)'));
});
