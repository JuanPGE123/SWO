/**
 * chatbot.component.ts
 * Componente para el asistente ChatBot
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

interface Mensaje {
  texto: string;
  autor: 'usuario' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  mensajes: Mensaje[] = [];
  inputChat: string = '';
  guardarHistorial: boolean = true;
  
  analistas = [
    'Lucía (1er nivel)',
    'Carlos (1er nivel)',
    'María (2do nivel)',
    'Roberto (2do nivel)'
  ];

  accionesRapidas = [
    { label: 'Validar conocimiento', action: 'faq' },
    { label: 'Restaurar usuario', action: 'restore' },
    { label: 'Escalar analista', action: 'escalate' },
    { label: 'Buscar incidente', action: 'search_inc' },
    { label: 'Generar plantilla', action: 'ticket_template' }
  ];

  registroAcciones: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.cargarHistorial();
    this.agregarMensajeBot('¡Hola! Soy el asistente SWO. ¿Cómo puedo ayudarte hoy?');
  }

  enviarMensaje(): void {
    if (!this.inputChat.trim()) return;

    // Agregar mensaje del usuario
    this.agregarMensaje(this.inputChat, 'usuario');
    this.registrarAccion(`Usuario: ${this.inputChat}`);

    const comando = this.inputChat.toLowerCase();

    // Procesar comandos
    if (comando.includes('restaurar')) {
      this.agregarMensajeBot('Entendido. Procesando solicitud de restauración de usuario...');
      this.registrarAccion('Restauración solicitada');
    } else if (comando.includes('escalar')) {
      this.agregarMensajeBot('Escalando al segundo nivel. Un analista te contactará pronto.');
      this.registrarAccion('Escalamiento iniciado');
    } else if (comando.includes('incidente')) {
      this.agregarMensajeBot('Buscando incidentes relacionados...');
      this.registrarAccion('Búsqueda de incidentes');
    } else {
      this.agregarMensajeBot('Entendido. ¿Necesitas más ayuda?');
    }

    this.inputChat = '';
  }

  accionRapida(accion: string): void {
    this.registrarAccion(`Acción rápida: ${accion}`);
    this.agregarMensajeBot(`Procesando: ${accion}`);
  }

  agregarMensaje(texto: string, autor: 'usuario' | 'bot'): void {
    this.mensajes.push({
      texto,
      autor,
      timestamp: new Date()
    });
    this.guardarHistorialLocal();
  }

  agregarMensajeBot(texto: string): void {
    this.agregarMensaje(texto, 'bot');
  }

  registrarAccion(texto: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.registroAcciones.unshift(`[${timestamp}] ${texto}`);
    if (this.registroAcciones.length > 10) {
      this.registroAcciones.pop();
    }
  }

  limpiarChat(): void {
    if (confirm('¿Limpiar el chat?')) {
      this.mensajes = [];
      this.agregarMensajeBot('Chat limpiado.');
      this.guardarHistorialLocal();
    }
  }

  exportarChat(): void {
    const chat = this.mensajes.map(m => `${m.autor}: ${m.texto}`).join('\n');
    const blob = new Blob([chat], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-historial.txt';
    a.click();
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
        this.mensajes = JSON.parse(historial);
      } catch (e) {
        console.error('Error cargando historial', e);
      }
    }
  }
}
