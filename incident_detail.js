// incident_detail.js
// Carga un incidente por id desde localStorage (o sampleIncidents en memoria)
// Permite editar campos principales y agregar comentarios.

/*
  readStorage()
  Lee el array de incidentes desde localStorage (clave: incidents_v1).
  Devuelve null si no existe o si hay un error en parsing.
*/
function readStorage(){
  try{ const raw = localStorage.getItem('incidents_v1'); return raw? JSON.parse(raw): null }catch(e){ return null }
}

/*
  writeStorage(data)
  Persiste el array de incidentes en localStorage.
*/
function writeStorage(data){ localStorage.setItem('incidents_v1', JSON.stringify(data)); }

/*
  getQueryParam(name)
  Obtiene un parámetro de la query string de la URL.
*/
function getQueryParam(name){ const url = new URL(window.location.href); return url.searchParams.get(name); }

/*
  renderComments(list)
  Renderiza la lista de comentarios en la sección de comentarios del detalle.
*/
function renderComments(list){
  const el = document.getElementById('commentsList'); el.innerHTML = '';
  if(!list || list.length===0){ el.innerHTML = '<div class="muted">Sin comentarios</div>'; return; }
  list.forEach(c=>{
    const d = document.createElement('div'); d.className='comment'; d.innerHTML = `<strong>${c.author||'Usuario'}</strong> <small class="muted">${c.date}</small><div>${c.text}</div>`;
    el.appendChild(d);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const id = getQueryParam('id');
  let incidents = readStorage();
  if(!incidents) incidents = window._sampleIncidents || [];

  const inc = incidents.find(x=> x.id === id) || null;
  if(!inc){ document.getElementById('detailTitle').textContent = 'Incidente no encontrado'; return; }

  // poblar selects de proyecto
  const projects = window._sampleProjects || ['Ecommerce','Portal','Infra','MobileApp','Integraciones'];
  const psel = document.getElementById('fieldProject'); psel.innerHTML = projects.map(p=>`<option${p===inc.project? ' selected':''}>${p}</option>`).join('');

  document.getElementById('fieldId').value = inc.id;
  document.getElementById('fieldTitle').value = inc.title || '';
  document.getElementById('fieldUser').value = inc.user || '';
  document.getElementById('fieldEmail').value = inc.userEmail || '';
  document.getElementById('fieldPhones').value = (inc.userPhones||[]).join(', ');
  document.getElementById('fieldApp').value = inc.app || '';
  document.getElementById('fieldReason').value = inc.reason || '';
  document.getElementById('fieldActivity').value = inc.activity || '';
  document.getElementById('fieldPriority').value = inc.priority || 'Media';
  document.getElementById('fieldState').value = inc.state || 'open';

  // comentarios
  renderComments(inc.comments||[]);

  document.getElementById('addComment').addEventListener('click', ()=>{
    const txt = document.getElementById('newComment').value.trim(); if(!txt) return alert('Ingrese un comentario');
    const c = { author: 'Juan Pablo', date: new Date().toLocaleString(), text: txt };
    inc.comments = inc.comments || []; inc.comments.push(c);
    renderComments(inc.comments);
    document.getElementById('newComment').value='';
  });

  document.getElementById('saveDetail').addEventListener('click', ()=>{
    inc.title = document.getElementById('fieldTitle').value;
    inc.user = document.getElementById('fieldUser').value;
    inc.userEmail = document.getElementById('fieldEmail').value;
    inc.userPhones = document.getElementById('fieldPhones').value.split(',').map(s=>s.trim()).filter(Boolean);
    inc.project = document.getElementById('fieldProject').value;
    inc.app = document.getElementById('fieldApp').value;
    inc.reason = document.getElementById('fieldReason').value;
    inc.activity = document.getElementById('fieldActivity').value;
    inc.priority = document.getElementById('fieldPriority').value;
    inc.state = document.getElementById('fieldState').value;

    // persistir
    const storage = readStorage() || [];
    const idx = storage.findIndex(x=> x.id === inc.id);
    if(idx>=0){ storage[idx] = inc; } else { storage.push(inc); }
    writeStorage(storage);
    alert('Cambios guardados');
    window.location.href = 'incidents.html';
  });

});