// usuarios.js
// Gestión de usuarios: datos de ejemplo, búsqueda, filtrado y acciones

// ========== DATOS DE EJEMPLO ==========
const usuarios = [
  {
    id: "USR-001",
    nombre: "Juan Pablo",
    apellido: "Ramírez",
    correo: "juan.ramirez@swo.com",
    celular: "+57 310 123 4567",
    area: "TI",
    jefeDirecto: "María García",
    correoJefe: "maria.garcia@swo.com"
  },
  {
    id: "USR-002",
    nombre: "Ana María",
    apellido: "López",
    correo: "ana.lopez@swo.com",
    celular: "+57 320 234 5678",
    area: "Soporte",
    jefeDirecto: "Carlos Mendoza",
    correoJefe: "carlos.mendoza@swo.com"
  },
  {
    id: "USR-003",
    nombre: "Carlos",
    apellido: "Mendoza",
    correo: "carlos.mendoza@swo.com",
    celular: "+57 315 345 6789",
    area: "Soporte",
    jefeDirecto: "María García",
    correoJefe: "maria.garcia@swo.com"
  },
  {
    id: "USR-004",
    nombre: "María",
    apellido: "García",
    correo: "maria.garcia@swo.com",
    celular: "+57 318 456 7890",
    area: "TI",
    jefeDirecto: "Director General",
    correoJefe: "director@swo.com"
  },
  {
    id: "USR-005",
    nombre: "Luis",
    apellido: "Hernández",
    correo: "luis.hernandez@swo.com",
    celular: "+57 311 567 8901",
    area: "Desarrollo",
    jefeDirecto: "María García",
    correoJefe: "maria.garcia@swo.com"
  },
  {
    id: "USR-006",
    nombre: "Sandra",
    apellido: "Pérez",
    correo: "sandra.perez@swo.com",
    celular: "+57 312 678 9012",
    area: "Desarrollo",
    jefeDirecto: "Luis Hernández",
    correoJefe: "luis.hernandez@swo.com"
  },
  {
    id: "USR-007",
    nombre: "Roberto",
    apellido: "Martínez",
    correo: "roberto.martinez@swo.com",
    celular: "+57 313 789 0123",
    area: "Infraestructura",
    jefeDirecto: "María García",
    correoJefe: "maria.garcia@swo.com"
  },
  {
    id: "USR-008",
    nombre: "Laura",
    apellido: "Gómez",
    correo: "laura.gomez@swo.com",
    celular: "+57 314 890 1234",
    area: "Infraestructura",
    jefeDirecto: "Roberto Martínez",
    correoJefe: "roberto.martinez@swo.com"
  },
  {
    id: "USR-009",
    nombre: "Diego",
    apellido: "Torres",
    correo: "diego.torres@swo.com",
    celular: "+57 316 901 2345",
    area: "Soporte",
    jefeDirecto: "Carlos Mendoza",
    correoJefe: "carlos.mendoza@swo.com"
  },
  {
    id: "USR-010",
    nombre: "Patricia",
    apellido: "Rodríguez",
    correo: "patricia.rodriguez@swo.com",
    celular: "+57 317 012 3456",
    area: "RRHH",
    jefeDirecto: "Director General",
    correoJefe: "director@swo.com"
  },
  {
    id: "USR-011",
    nombre: "Andrés",
    apellido: "Silva",
    correo: "andres.silva@swo.com",
    celular: "+57 319 123 4567",
    area: "Administración",
    jefeDirecto: "Director General",
    correoJefe: "director@swo.com"
  },
  {
    id: "USR-012",
    nombre: "Camila",
    apellido: "Vargas",
    correo: "camila.vargas@swo.com",
    celular: "+57 321 234 5678",
    area: "Desarrollo",
    jefeDirecto: "Luis Hernández",
    correoJefe: "luis.hernandez@swo.com"
  },
  {
    id: "USR-013",
    nombre: "Felipe",
    apellido: "Castro",
    correo: "felipe.castro@swo.com",
    celular: "+57 322 345 6789",
    area: "TI",
    jefeDirecto: "María García",
    correoJefe: "maria.garcia@swo.com"
  },
  {
    id: "USR-014",
    nombre: "Valentina",
    apellido: "Morales",
    correo: "valentina.morales@swo.com",
    celular: "+57 323 456 7890",
    area: "Soporte",
    jefeDirecto: "Carlos Mendoza",
    correoJefe: "carlos.mendoza@swo.com"
  },
  {
    id: "USR-015",
    nombre: "Santiago",
    apellido: "Ruiz",
    correo: "santiago.ruiz@swo.com",
    celular: "+57 324 567 8901",
    area: "Infraestructura",
    jefeDirecto: "Roberto Martínez",
    correoJefe: "roberto.martinez@swo.com"
  }
];

// ========== ESTADO GLOBAL ==========
let usuariosFiltrados = [...usuarios];

// ========== INICIALIZACIÓN ==========
document.addEventListener("DOMContentLoaded", () => {
  renderUsuarios(usuarios);
  updateMetrics(usuarios);
  attachEventListeners();
});

// ========== RENDERIZADO ==========
function renderUsuarios(data) {
  const tbody = document.querySelector("#usuariosTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:40px; color:#9aa5b1;">No se encontraron usuarios</td></tr>`;
    return;
  }

  data.forEach(usuario => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="id-col">${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td class="email-col">${usuario.correo}</td>
      <td>${usuario.celular}</td>
      <td><span class="area-col">${usuario.area}</span></td>
      <td class="jefe-col">${usuario.jefeDirecto}</td>
      <td class="email-col">${usuario.correoJefe}</td>
      <td>
        <div class="btn-actions">
          <button class="btn-sm edit" onclick="editUser('${usuario.id}')">Editar</button>
          <button class="btn-sm delete" onclick="deleteUser('${usuario.id}')">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  usuariosFiltrados = data;
}

// ========== MÉTRICAS ==========
function updateMetrics(data) {
  const countTotal = document.getElementById("countTotal");
  const countTI = document.getElementById("countTI");
  const countSoporte = document.getElementById("countSoporte");
  const countOtros = document.getElementById("countOtros");

  if (countTotal) countTotal.textContent = data.length;
  if (countTI) countTI.textContent = data.filter(u => u.area === "TI").length;
  if (countSoporte) countSoporte.textContent = data.filter(u => u.area === "Soporte").length;
  if (countOtros) {
    const otros = data.filter(u => u.area !== "TI" && u.area !== "Soporte").length;
    countOtros.textContent = otros;
  }
}

// ========== FILTRADO Y BÚSQUEDA ==========
function filterUsuarios() {
  const searchValue = document.getElementById("globalSearch").value.toLowerCase();
  const areaValue = document.getElementById("filterArea").value;

  let filtered = usuarios;

  // Filtrar por área
  if (areaValue !== "all") {
    filtered = filtered.filter(u => u.area === areaValue);
  }

  // Filtrar por búsqueda (nombre, apellido, correo, área, jefe)
  if (searchValue) {
    filtered = filtered.filter(u =>
      u.nombre.toLowerCase().includes(searchValue) ||
      u.apellido.toLowerCase().includes(searchValue) ||
      u.correo.toLowerCase().includes(searchValue) ||
      u.area.toLowerCase().includes(searchValue) ||
      u.jefeDirecto.toLowerCase().includes(searchValue) ||
      u.id.toLowerCase().includes(searchValue)
    );
  }

  renderUsuarios(filtered);
  updateMetrics(filtered);
}

// ========== EVENT LISTENERS ==========
function attachEventListeners() {
  // Búsqueda global
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) {
    searchInput.addEventListener("input", filterUsuarios);
  }

  // Filtro por área
  const filterArea = document.getElementById("filterArea");
  if (filterArea) {
    filterArea.addEventListener("change", filterUsuarios);
  }

  // Botón actualizar
  const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      renderUsuarios(usuarios);
      updateMetrics(usuarios);
      searchInput.value = "";
      filterArea.value = "all";
      showNotification("Lista actualizada", "success");
    });
  }

  // Botón agregar usuario
  const addUserBtn = document.getElementById("addUserBtn");
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      showNotification("Funcionalidad en desarrollo", "info");
    });
  }

  // Botón exportar
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportToCSV);
  }
}

// ========== ACCIONES DE USUARIO ==========
function editUser(userId) {
  const usuario = usuarios.find(u => u.id === userId);
  if (usuario) {
    showNotification(`Editando usuario: ${usuario.nombre} ${usuario.apellido}`, "info");
    // Aquí iría la lógica para abrir un modal de edición
  }
}

function deleteUser(userId) {
  const usuario = usuarios.find(u => u.id === userId);
  if (usuario) {
    const confirmed = confirm(`¿Está seguro que desea eliminar a ${usuario.nombre} ${usuario.apellido}?`);
    if (confirmed) {
      const index = usuarios.findIndex(u => u.id === userId);
      if (index !== -1) {
        usuarios.splice(index, 1);
        filterUsuarios();
        showNotification("Usuario eliminado correctamente", "success");
      }
    }
  }
}

// ========== EXPORTAR A CSV ==========
function exportToCSV() {
  const headers = ["ID", "Nombre", "Apellido", "Correo", "Celular", "Área", "Jefe Directo", "Correo Jefe"];
  const csvContent = [
    headers.join(","),
    ...usuariosFiltrados.map(u => [
      u.id,
      u.nombre,
      u.apellido,
      u.correo,
      u.celular,
      u.area,
      u.jefeDirecto,
      u.correoJefe
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `usuarios_${new Date().getTime()}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification("Archivo CSV descargado", "success");
}

// ========== NOTIFICACIONES ==========
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === "success" ? "#19d38f" : type === "error" ? "#ff3b30" : "#05d0e6"};
    color: #0a1927;
    border-radius: 6px;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Agregar estilos de animación
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
