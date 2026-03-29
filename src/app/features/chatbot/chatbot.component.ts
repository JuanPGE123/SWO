import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Mensaje {
  texto: string;
  autor: 'usuario' | 'bot';
  timestamp: Date;
  pasos?: string[];
  categoria?: string;
  nivel?: number;
}

interface KnowledgeItem {
  id: number;
  categoria: string;
  pregunta: string;
  respuesta: string;
  pasos: string;
  nivel: number;
}

interface ChatbotResponse {
  resultados: KnowledgeItem[];
  categorias: string[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  mensajes: Mensaje[] = [];
  inputChat: string = '';
  guardarHistorial: boolean = true;
  escribiendo: boolean = false;
  categorias: string[] = [];

  private readonly apiUrl = environment.apiUrl;

  accionesRapidas = [
    { label: '🔑 Contraseñas', query: '¿Cómo restablezco una contraseña?' },
    { label: '🌐 Red / Conectividad', query: 'No tengo acceso a internet ni a la red' },
    { label: '🖨️ Impresoras', query: 'La impresora no imprime o tiene atasco de papel' },
    { label: '🎫 Crear incidencia', query: '¿Cómo creo una nueva incidencia?' },
    { label: '🔺 Escalar ticket', query: '¿Cómo escalo una incidencia a nivel superior?' },
    { label: '🛡️ Seguridad', query: 'Creo que mi equipo tiene un virus o malware' }
  ];

  registroAcciones: string[] = [];

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
    if (this.mensajes.length === 0) {
      this.agregarMensajeBot(
        '¡Hola! Soy el asistente SWO 🤖\n\nPuedo ayudarte con problemas de TI como contraseñas, red, hardware, aplicaciones, seguridad y más. Usa los botones de acceso rápido o escribe tu consulta.',
        []
      );
    }
    this.cargarCategorias();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  enviarMensaje(): void {
    const texto = this.inputChat.trim();
    if (!texto || this.escribiendo) return;

    this.agregarMensaje(texto, 'usuario');
    this.registrarAccion(`Consulta: ${texto}`);
    this.inputChat = '';
    this.buscarRespuesta(texto);
  }

  accionRapida(query: string): void {
    this.inputChat = query;
    this.enviarMensaje();
  }

  sugerencia(texto: string): void {
    this.inputChat = texto;
    this.enviarMensaje();
  }

  private buscarRespuesta(consulta: string): void {
    this.escribiendo = true;
    const url = `${this.apiUrl}/chatbot?q=${encodeURIComponent(consulta)}`;

    this.http.get<ChatbotResponse>(url).subscribe({
      next: (response) => {
        this.escribiendo = false;
        if (response.categorias.length > 0 && this.categorias.length === 0) {
          this.categorias = response.categorias;
        }

        if (!response.resultados || response.resultados.length === 0) {
          this.agregarMensajeBot(
            'No encontré información específica sobre esa consulta en mi base de conocimiento. Te recomiendo:\n\n• Crear una incidencia en el módulo de Incidentes.\n• Contactar al área de TI directamente.\n• Reformular tu pregunta con otras palabras.',
            []
          );
          this.registrarAccion('Sin resultados para la consulta');
          return;
        }

        const item = response.resultados[0];
        const pasos = item.pasos
          ? item.pasos.split('||').map(p => p.trim()).filter(p => p.length > 0)
          : [];

        this.agregarMensajeBot(item.respuesta, pasos, item.categoria, item.nivel);
        this.registrarAccion(`Respuesta encontrada: ${item.categoria}`);

        if (response.resultados.length > 1) {
          const otros = response.resultados
            .slice(1, 3)
            .map(r => `• ${r.pregunta}`)
            .join('\n');
          setTimeout(() => {
            this.agregarMensajeBot(`También puede interesarte:\n${otros}`, []);
          }, 600);
        }
      },
      error: () => {
        this.escribiendo = false;
        this.agregarMensajeBot(
          'No pude conectarme a la base de conocimiento en este momento. Por favor intenta de nuevo o contacta soporte.',
          []
        );
      }
    });
  }

  private cargarCategorias(): void {
    this.http.get<ChatbotResponse>(`${this.apiUrl}/chatbot?q=sistema`).subscribe({
      next: (res) => { if (res.categorias) this.categorias = res.categorias; },
      error: () => {}
    });
  }

  agregarMensaje(texto: string, autor: 'usuario' | 'bot', pasos: string[] = [], categoria?: string, nivel?: number): void {
    this.mensajes.push({ texto, autor, timestamp: new Date(), pasos, categoria, nivel });
    this.guardarHistorialLocal();
  }

  agregarMensajeBot(texto: string, pasos: string[] = [], categoria?: string, nivel?: number): void {
    this.agregarMensaje(texto, 'bot', pasos, categoria, nivel);
  }

  registrarAccion(texto: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.registroAcciones.unshift(`[${timestamp}] ${texto}`);
    if (this.registroAcciones.length > 15) this.registroAcciones.pop();
  }

  limpiarChat(): void {
    if (confirm('¿Limpiar el historial del chat?')) {
      this.mensajes = [];
      localStorage.removeItem('chatbot_historial');
      this.agregarMensajeBot('Chat limpiado. ¿En qué puedo ayudarte?', []);
    }
  }

  exportarChat(): void {
    const lineas = this.mensajes.map(m => {
      const hora = new Date(m.timestamp).toLocaleTimeString();
      let linea = `[${hora}] ${m.autor.toUpperCase()}: ${m.texto}`;
      if (m.pasos && m.pasos.length > 0) {
        linea += '\nPasos:\n' + m.pasos.map((p, i) => `  ${i + 1}. ${p}`).join('\n');
      }
      return linea;
    });
    const blob = new Blob([lineas.join('\n---\n')], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-swo-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.notificationService.toast('Chat exportado', 2000, 'success');
  }

  guardarHistorialLocal(): void {
    if (this.guardarHistorial) {
      localStorage.setItem('chatbot_historial', JSON.stringify(this.mensajes));
    }
  }

  cargarHistorial(): void {
    const historial = localStorage.getItem('chatbot_historial');
    if (historial) {
      try {
        const parsed = JSON.parse(historial);
        this.mensajes = parsed.map((m: Mensaje) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch { this.mensajes = []; }
    }
  }

  nivelLabel(nivel?: number): string {
    switch (nivel) {
      case 1: return '1er nivel';
      case 2: return '2do nivel';
      case 3: return 'Especialista';
      default: return '';
    }
  }
}
