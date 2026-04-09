/**
 * chatbot.component.ts
 * 
 * Componente de interfaz del chatbot SWO.
 * Utiliza ChatbotService para toda la lógica de negocio.
 */

import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ChatbotService, Mensaje } from '../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  mensajes: Mensaje[] = [];
  inputChat: string = '';
  escribiendo: boolean = false;
  categorias: string[] = [];
  accionesRapidas: { label: string; query: string }[] = [];

  // Modal para crear incidencia
  mostrarModalIncidencia: boolean = false;
  nuevaIncidencia = {
    titulo: '',
    descripcion: '',
    prioridad: 'Media' as 'Baja' | 'Media' | 'Alta' | 'Crítica'
  };
  creandoIncidencia: boolean = false;

  // Modal para escalar
  mostrarModalEscalar: boolean = false;
  motivoEscalamiento: string = '';
  escalando: boolean = false;

  registroAcciones: string[] = [];

  constructor(
    private chatbotService: ChatbotService,
    private notificationService: NotificationService
  ) {}


  ngOnInit(): void {
    // Suscribirse a los mensajes del servicio
    this.chatbotService.mensajes$.subscribe(mensajes => {
      this.mensajes = mensajes;
    });

    // Suscribirse al estado de escritura
    this.chatbotService.escribiendo$.subscribe(escribiendo => {
      this.escribiendo = escribiendo;
    });

    // Obtener categorías
    this.chatbotService.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });

    // Obtener acciones rápidas
    this.accionesRapidas = this.chatbotService.obtenerAccionesRapidas();

    // Si no hay mensajes, se agregará el de bienvenida automáticamente
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

    // Agregar mensaje del usuario
    this.chatbotService.agregarMensajeUsuario(texto);
    this.registrarAccion(`Consulta: ${texto}`);
    this.inputChat = '';

    // Detectar intenciones especiales
    if (this.esIntencionCrearIncidencia(texto)) {
      this.abrirModalIncidencia(texto);
      return;
    }

    if (this.esIntencionEscalar(texto)) {
      this.abrirModalEscalar(texto);
      return;
    }

    // Enviar consulta normal
    this.chatbotService.enviarConsulta(texto).subscribe({
      next: (mensaje) => {
        if (mensaje.accion === 'crear_incidencia') {
          this.registrarAccion('Bot sugiere crear incidencia');
        } else {
          this.registrarAccion(`Respuesta: ${mensaje.categoria || 'general'}`);
        }
      }
    });
  }

  /**
   * Detecta si el usuario quiere crear una incidencia
   */
  private esIntencionCrearIncidencia(texto: string): boolean {
    const palabrasClave = [
      'crear incidencia',
      'crear ticket',
      'abrir ticket',
      'reportar problema',
      'necesito ayuda técnica'
    ];
    const textoLower = texto.toLowerCase();
    return palabrasClave.some(p => textoLower.includes(p));
  }

  /**
   * Detecta si el usuario quiere escalar
   */
  private esIntencionEscalar(texto: string): boolean {
    const palabrasClave = [
      'escalar',
      'hablar con agente',
      'necesito un técnico',
      'ayuda especializada',
      'nivel superior'
    ];
    const textoLower = texto.toLowerCase();
    return palabrasClave.some(p => textoLower.includes(p));
  }


  accionRapida(query: string): void {
    this.inputChat = query;
    this.enviarMensaje();
  }

  sugerencia(texto: string): void {
    this.inputChat = texto;
    this.enviarMensaje();
  }

  /**
   * Abre modal para crear incidencia
   */
  abrirModalIncidencia(contexto?: string): void {
    this.nuevaIncidencia = {
      titulo: '',
      descripcion: contexto || '',
      prioridad: 'Media'
    };
    this.mostrarModalIncidencia = true;
  }

  /**
   * Cierra modal de incidencia
   */
  cerrarModalIncidencia(): void {
    this.mostrarModalIncidencia = false;
  }

  /**
   * Crea incidencia desde el chatbot
   */
  crearIncidencia(): void {
    if (!this.nuevaIncidencia.titulo.trim()) {
      this.notificationService.toast('El título es obligatorio', 3000, 'error');
      return;
    }

    this.creandoIncidencia = true;
    this.registrarAccion('Creando incidencia desde chatbot');

    const contexto = {
      mensajes: this.mensajes,
      prioridad: this.nuevaIncidencia.prioridad
    };

    this.chatbotService.crearIncidenciaDesdeChat(
      this.nuevaIncidencia.titulo,
      this.nuevaIncidencia.descripcion,
      contexto
    ).subscribe({
      next: () => {
        this.creandoIncidencia = false;
        this.mostrarModalIncidencia = false;
        this.notificationService.toast('Incidencia creada exitosamente', 3000, 'success');
        this.registrarAccion('Incidencia creada con éxito');
      },
      error: () => {
        this.creandoIncidencia = false;
        this.notificationService.toast('Error al crear incidencia', 3000, 'error');
      }
    });
  }

  /**
   * Abre modal para escalar
   */
  abrirModalEscalar(contexto?: string): void {
    this.motivoEscalamiento = contexto || '';
    this.mostrarModalEscalar = true;
  }

  /**
   * Cierra modal de escalamiento
   */
  cerrarModalEscalar(): void {
    this.mostrarModalEscalar = false;
  }

  /**
   * Escala a un agente humano
   */
  escalarAAgente(): void {
    if (!this.motivoEscalamiento.trim()) {
      this.notificationService.toast('Indica el motivo del escalamiento', 3000, 'error');
      return;
    }

    this.escalando = true;
    this.registrarAccion('Escalando a agente especializado');

    const contexto = {
      mensajes: this.mensajes,
      prioridad: 'Alta' as 'Alta'
    };

    this.chatbotService.escalarAAgente(this.motivoEscalamiento, contexto).subscribe({
      next: () => {
        this.escalando = false;
        this.mostrarModalEscalar = false;
        this.notificationService.toast('Escalado exitosamente. Un agente te contactará pronto.', 4000, 'success');
        this.registrarAccion('Escalamiento exitoso');
      },
      error: () => {
        this.escalando = false;
        this.notificationService.toast('Error al escalar', 3000, 'error');
      }
    });
  }


  limpiarChat(): void {
    if (confirm('¿Limpiar el historial del chat?')) {
      this.chatbotService.limpiarHistorial();
      this.registrarAccion('Historial limpiado');
    }
  }

  exportarChat(): void {
    const contenido = this.chatbotService.exportarHistorial();
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-swo-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.notificationService.toast('Chat exportado', 2000, 'success');
    this.registrarAccion('Chat exportado');
  }

  registrarAccion(texto: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.registroAcciones.unshift(`[${timestamp}] ${texto}`);
    if (this.registroAcciones.length > 15) this.registroAcciones.pop();
  }

  nivelLabel(nivel?: number): string {
    return this.chatbotService.obtenerEtiquetaNivel(nivel);
  }
}
