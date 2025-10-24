// chatbot.js - Lógica simulada para el ChatBot de analistas

const analysts = [
  "Lucía (1er nivel)",
  "Carlos (1er nivel)",
  "María (2do nivel)",
  "Roberto (2do nivel)",
];
const chatLogKey = "chatbot_log_v1";

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.right = "18px";
  t.style.bottom = "18px";
  t.style.background = "rgba(0,0,0,0.75)";
  t.style.color = "white";
  t.style.padding = "8px 12px";
  t.style.borderRadius = "8px";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function addLog(text) {
  const el = document.getElementById("logArea");
  if (el.innerText === "Sin acciones recientes") el.innerText = "";
  const row = document.createElement("div");
  row.textContent = `${new Date().toLocaleString()} — ${text}`;
  el.prepend(row);
  if (document.getElementById("saveHistory").checked) {
    const raw = JSON.parse(localStorage.getItem(chatLogKey) || "[]");
    raw.unshift({ date: new Date().toISOString(), text });
    localStorage.setItem(chatLogKey, JSON.stringify(raw));
  }
}

function loadAnalysts() {
  const ul = document.getElementById("analystList");
  ul.innerHTML = "";
  analysts.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a;
    ul.appendChild(li);
  });
}

function addMessage(text, who = "user") {
  const m = document.createElement("div");
  m.className = "message " + (who === "user" ? "user" : "bot");
  m.innerText = text;
  document.getElementById("messages").appendChild(m);
  document.getElementById("messages").scrollTop = 99999;
}

function processCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  addLog(`Comando: ${raw}`);
  // comandos rápidos simulados
  if (cmd.startsWith("restaurar usuario")) {
    const parts = cmd.split(" ");
    const user = parts.slice(2).join(" ");
    addMessage(`Solicitando restauración del usuario ${user}...`, "bot");
    addLog(`Restauración solicitada para ${user}`);
    toast(`Restauración simulada solicitada para ${user}`);
    return;
  }
  if (cmd.startsWith("escalar")) {
    const who = cmd.split(" ").slice(1).join(" ") || "analista";
    addMessage(`Escalando a segundo nivel: ${who}`, "bot");
    addLog(`Escalamiento pedido: ${who}`);
    return;
  }
  if (cmd.startsWith("buscar incidente")) {
    const q = cmd.split(" ").slice(2).join(" ");
    addMessage(`Buscando incidentes que contengan: ${q} (simulado)`, "bot");
    addLog(`Búsqueda de incidente: ${q}`);
    return;
  }
  if (cmd === "validar conocimiento" || cmd === "faq") {
    addMessage(
      'Preguntas frecuentes:\n1) ¿Cómo restauro usuario? -> Usa "restaurar usuario <usuario>"\n2) ¿Cómo escalar? -> Usa "escalar <motivo>"\n3) ¿Dónde ver incidentes? -> En Incidencias',
      "bot"
    );
    return;
  }
  if (cmd === "generar plantilla" || cmd === "ticket template") {
    addMessage(
      "Plantilla generada:\n- Título:\n- Descripción:\n- Pasos para reproducir:\n- Prioridad:\n- Asignado:",
      "bot"
    );
    addLog("Plantilla generada");
    return;
  }
  // fallback: respuesta generica
  addMessage(
    'No encontré una acción directa. Puedes: "restaurar usuario <usuario>", "escalar <motivo>", "buscar incidente <texto>", "validar conocimiento"',
    "bot"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  loadAnalysts();
  // cargar historial de chat
  const hist = JSON.parse(localStorage.getItem(chatLogKey) || "[]");
  if (hist && hist.length) {
    hist.slice(0, 30).forEach((h) => addLog(h.text));
  }
  document.getElementById("sendBtn").addEventListener("click", () => {
    const txt = document.getElementById("chatInput").value.trim();
    if (!txt) return;
    addMessage(txt, "user");
    processCommand(txt);
    document.getElementById("chatInput").value = "";
  });
  document.getElementById("chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("sendBtn").click();
    }
  });
  document.querySelectorAll(".quick-list .pill").forEach((b) =>
    b.addEventListener("click", (e) => {
      const a = e.target.dataset.action;
      if (a === "faq") processCommand("validar conocimiento");
      if (a === "restore") processCommand("restaurar usuario gomez");
      if (a === "escalate") processCommand("escalar falta de respuesta");
      if (a === "search_inc") processCommand("buscar incidente latencia");
      if (a === "ticket_template") processCommand("generar plantilla");
    })
  );
  document.querySelectorAll(".sugg").forEach((s) =>
    s.addEventListener("click", (e) => {
      document.getElementById("chatInput").value = e.target.innerText;
      document.getElementById("sendBtn").click();
    })
  );
  document.getElementById("clearChat").addEventListener("click", () => {
    document.getElementById("messages").innerHTML = "";
    toast("Chat limpiado");
  });
  document.getElementById("exportChat").addEventListener("click", () => {
    const raw = localStorage.getItem(chatLogKey) || "[]";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chatlog.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Exportado");
  });
});
