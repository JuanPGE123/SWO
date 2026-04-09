/**
 * chatbot.service.ts
 * 
 * Servicio de chatbot: gestiona la interacción con el asistente virtual SWO.
 * Funcionalidades:
 * - Consulta a base de conocimiento
 * - Creación automática de incidencias
 * - Escalamiento a agente humano
 * - Historial de conversaciones
 * - Sugerencias inteligentes
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IncidentsService } from './incidents.service';
import { AuthService } from './auth.service';

/**
 * Interfaz para mensajes del chat
 */
export interface Mensaje {
  texto: string;
  autor: 'usuario' | 'bot';
  timestamp: Date;
  pasos?: string[];
  categoria?: string;
  nivel?: number;
  accion?: 'crear_incidencia' | 'escalar' | 'consulta';
}

/**
 * Interfaz para items de la base de conocimiento
 */
export interface KnowledgeItem {
  id: number;
  categoria: string;
  pregunta: string;
  respuesta: string;
  pasos: string;
  nivel: number;
}

/**
 * Interfaz para respuestas del backend
 */
export interface ChatbotResponse {
  resultados: KnowledgeItem[];
  categorias: string[];
}

/**
 * Interfaz para contexto de escalamiento
 */
export interface EscalamientoContext {
  mensajes: Mensaje[];
  categoria?: string;
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica';
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.apiUrl;

  // Historial de mensajes reactivo
  private mensajesSubject = new BehaviorSubject<Mensaje[]>([]);
  public mensajes$: Observable<Mensaje[]> = this.mensajesSubject.asObservable();

  // Categorías disponibles
  private categoriasSubject = new BehaviorSubject<string[]>([]);
  public categorias$: Observable<string[]> = this.categoriasSubject.asObservable();

  // Estado del chatbot
  private escribiendoSubject = new BehaviorSubject<boolean>(false);
  public escribiendo$: Observable<boolean> = this.escribiendoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private incidentsService: IncidentsService,
    private authService: AuthService
  ) {
    this.cargarHistorial();
    this.cargarCategorias();
  }

  /**
   * Envía una consulta al chatbot y obtiene respuesta
   */
  enviarConsulta(consulta: string): Observable<Mensaje> {
    this.escribiendoSubject.next(true);
    
    return new Observable(observer => {
      const url = `${this.apiUrl}/chatbot?q=${encodeURIComponent(consulta)}`;

      this.http.get<ChatbotResponse>(url).subscribe({
        next: (response) => {
          this.escribiendoSubject.next(false);

          // Actualizar categorías si están disponibles
          if (response.categorias && response.categorias.length > 0) {
            this.categoriasSubject.next(response.categorias);
          }

          let mensajeBot: Mensaje;

          // Si no hay resultados
          if (!response.resultados || response.resultados.length === 0) {
            mensajeBot = {
              texto: 'No encontré información específica sobre esa consulta en mi base de conocimiento.\n\n' +
                     '¿Qué te gustaría hacer?\n\n' +
                     '• Crear una incidencia para que un técnico te ayude\n' +
                     '• Reformular tu pregunta con otras palabras\n' +
                     '• Contactar directamente con el área de TI',
              autor: 'bot',
              timestamp: new Date(),
              accion: 'crear_incidencia'
            };
          } else {
            // Respuesta encontrada
            const item = response.resultados[0];
            const pasos = item.pasos
              ? item.pasos.split('||').map(p => p.trim()).filter(p => p.length > 0)
              : [];

            mensajeBot = {
              texto: item.respuesta,
              autor: 'bot',
              timestamp: new Date(),
              pasos,
              categoria: item.categoria,
              nivel: item.nivel,
              accion: 'consulta'
            };

            // Si hay más resultados relevantes, agregar sugerencias
            if (response.resultados.length > 1) {
              const sugerencias = response.resultados
                .slice(1, 3)
                .map(r => `• ${r.pregunta}`)
                .join('\n');
              
              setTimeout(() => {
                this.agregarMensaje({
                  texto: `También puede interesarte:\n${sugerencias}`,
                  autor: 'bot',
                  timestamp: new Date()
                });
              }, 600);
            }
          }

          this.agregarMensaje(mensajeBot);
          observer.next(mensajeBot);
          observer.complete();
        },
        error: (err) => {
          this.escribiendoSubject.next(false);
          
          const mensajeError: Mensaje = {
            texto: 'No pude conectarme a la base de conocimiento en este momento. ' +
                   'Por favor intenta de nuevo o crea una incidencia para recibir ayuda.',
            autor: 'bot',
            timestamp: new Date(),
            accion: 'crear_incidencia'
          };

          this.agregarMensaje(mensajeError);
          observer.next(mensajeError);
          observer.complete();
        }
      });
    });
  }

  /**
   * Crea una incidencia automáticamente desde el chatbot
   */
  crearIncidenciaDesdeChat(
    titulo: string,
    descripcion: string,
    contexto?: EscalamientoContext
  ): Observable<any> {
    const usuario = this.authService.getUsuarioActual();
    
    // Agregar contexto del chat si está disponible
    let descripcionCompleta = descripcion;
    if (contexto && contexto.mensajes.length > 0) {
      descripcionCompleta += '\n\n--- Contexto del chat ---\n';
      contexto.mensajes
        .filter(m => m.autor === 'usuario')
        .slice(-3) // Últimas 3 consultas del usuario
        .forEach(m => {
          descripcionCompleta += `Usuario: ${m.texto}\n`;
        });
    }

    const datos = {
      titulo: titulo || 'Incidencia creada desde Chatbot',
      descripcion: descripcionCompleta,
      estado: 'Abierto',
      impacto: contexto?.prioridad || 'Media',
      ubicacion: usuario?.area || 'TI',
      idUsuarioReporta: parseInt(usuario?.id || '1', 10)
    };

    return new Observable(observer => {
      this.incidentsService.crearIncidencia(datos).subscribe({
        next: (resp) => {
          const mensajeConfirmacion: Mensaje = {
            texto: `✅ Incidencia creada exitosamente.\n\n` +
                   `📋 Título: ${datos.titulo}\n` +
                   `🎯 Prioridad: ${datos.impacto}\n` +
                   `📍 Ubicación: ${datos.ubicacion}\n\n` +
                   `Un técnico revisará tu caso y te contactará pronto.`,
            autor: 'bot',
            timestamp: new Date(),
            accion: 'crear_incidencia'
          };
          
          this.agregarMensaje(mensajeConfirmacion);
          observer.next(resp);
          observer.complete();
        },
        error: (err) => {
          const mensajeError: Mensaje = {
            texto: '❌ Hubo un problema al crear la incidencia. ' +
                   'Por favor intenta nuevamente o contacta al área de TI.',
            autor: 'bot',
            timestamp: new Date()
          };
          
          this.agregarMensaje(mensajeError);
          observer.error(err);
        }
      });
    });
  }

  /**
   * Escala una consulta a un agente humano (nivel superior)
   */
  escalarAAgente(
    motivo: string,
    contexto: EscalamientoContext
  ): Observable<any> {
    // Determinar prioridad basada en el contexto
    const prioridad = this.determinarPrioridadEscalamiento(contexto);
    
    const titulo = `[ESCALADO] ${motivo}`;
    const descripcion = `El usuario requiere asistencia de nivel superior.\n\n` +
                       `Motivo: ${motivo}\n\n` +
                       `--- Historial de consultas ---\n` +
                       contexto.mensajes
                         .map(m => `[${m.autor.toUpperCase()}] ${m.texto}`)
                         .join('\n');

    return this.crearIncidenciaDesdeChat(titulo, descripcion, {
      ...contexto,
      prioridad
    });
  }

  /**
   * Determina la prioridad de escalamiento basada en el contexto
   */
  private determinarPrioridadEscalamiento(
    contexto: EscalamientoContext
  ): 'Baja' | 'Media' | 'Alta' | 'Crítica' {
    // Si ya se especificó, usar esa
    if (contexto.prioridad) return contexto.prioridad;

    // Palabras clave que indican alta prioridad
    const palabrasCriticas = ['urgente', 'crítico', 'bloqueado', 'no puedo trabajar', 'virus', 'hackeo'];
    const palabrasAltas = ['importante', 'necesito ya', 'inmediato', 'producción'];

    const textoCompleto = contexto.mensajes
      .filter(m => m.autor === 'usuario')
      .map(m => m.texto.toLowerCase())
      .join(' ');

    if (palabrasCriticas.some(p => textoCompleto.includes(p))) {
      return 'Crítica';
    }

    if (palabrasAltas.some(p => textoCompleto.includes(p))) {
      return 'Alta';
    }

    // Más de 5 mensajes sin resolver = prioridad media-alta
    if (contexto.mensajes.length > 5) {
      return 'Alta';
    }

    return 'Media';
  }

  /**
   * Agrega un mensaje al historial
   */
  agregarMensaje(mensaje: Mensaje): void {
    const mensajes = this.mensajesSubject.value;
    mensajes.push(mensaje);
    this.mensajesSubject.next([...mensajes]);
    this.guardarHistorial();
  }

  /**
   * Agrega un mensaje del usuario
   */
  agregarMensajeUsuario(texto: string): void {
    this.agregarMensaje({
      texto,
      autor: 'usuario',
      timestamp: new Date()
    });
  }

  /**
   * Obtiene todos los mensajes
   */
  obtenerMensajes(): Mensaje[] {
    return this.mensajesSubject.value;
  }

  /**
   * Limpia el historial de mensajes
   */
  limpiarHistorial(): void {
    this.mensajesSubject.next([]);
    localStorage.removeItem('chatbot_historial');
    
    // Mensaje de bienvenida
    this.agregarMensaje({
      texto: '¡Hola! Soy el asistente SWO 🤖\n\n' +
             'Puedo ayudarte con problemas de TI como contraseñas, red, ' +
             'hardware, aplicaciones, seguridad y más.\n\n' +
             '¿En qué puedo ayudarte hoy?',
      autor: 'bot',
      timestamp: new Date()
    });
  }

  /**
   * Exporta el historial del chat
   */
  exportarHistorial(): string {
    const mensajes = this.mensajesSubject.value;
    const lineas = mensajes.map(m => {
      const hora = new Date(m.timestamp).toLocaleTimeString();
      let linea = `[${hora}] ${m.autor.toUpperCase()}: ${m.texto}`;
      
      if (m.pasos && m.pasos.length > 0) {
        linea += '\nPasos:\n' + m.pasos.map((p, i) => `  ${i + 1}. ${p}`).join('\n');
      }
      
      return linea;
    });

    return lineas.join('\n---\n');
  }

  /**
   * Carga categorías desde el backend
   */
  private cargarCategorias(): void {
    this.http.get<ChatbotResponse>(`${this.apiUrl}/chatbot?q=sistema`).subscribe({
      next: (res) => {
        if (res.categorias) {
          this.categoriasSubject.next(res.categorias);
        }
      },
      error: () => {
        // Categorías por defecto si falla el backend
        this.categoriasSubject.next([
          'Contraseñas y Accesos',
          'Red y Conectividad',
          'Hardware',
          'Software y Aplicaciones',
          'Seguridad',
          'Impresoras',
          'Correo Electrónico'
        ]);
      }
    });
  }

  /**
   * Guarda el historial en localStorage
   */
  private guardarHistorial(): void {
    const mensajes = this.mensajesSubject.value;
    localStorage.setItem('chatbot_historial', JSON.stringify(mensajes));
  }

  /**
   * Carga el historial desde localStorage
   */
  private cargarHistorial(): void {
    const historial = localStorage.getItem('chatbot_historial');
    
    if (historial) {
      try {
        const parsed = JSON.parse(historial);
        const mensajes = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        this.mensajesSubject.next(mensajes);
      } catch (error) {
        this.limpiarHistorial();
      }
    } else {
      // Mensaje de bienvenida inicial
      this.limpiarHistorial();
    }
  }

  /**
   * Obtiene acciones rápidas sugeridas
   */
  obtenerAccionesRapidas(): { label: string; query: string }[] {
    return [
      { label: '🔑 Contraseñas', query: '¿Cómo restablezco una contraseña?' },
      { label: '🌐 Red / Conectividad', query: 'No tengo acceso a internet ni a la red' },
      { label: '🖨️ Impresoras', query: 'La impresora no imprime o tiene atasco de papel' },
      { label: '🎫 Crear incidencia', query: '¿Cómo creo una nueva incidencia?' },
      { label: '🔺 Escalar ticket', query: 'Necesito ayuda de un agente especializado' },
      { label: '🛡️ Seguridad', query: 'Creo que mi equipo tiene un virus o malware' }
    ];
  }

  /**
   * Convierte nivel numérico a etiqueta legible
   */
  obtenerEtiquetaNivel(nivel?: number): string {
    switch (nivel) {
      case 1: return '1er nivel';
      case 2: return '2do nivel';
      case 3: return 'Especialista';
      default: return '';
    }
  }
}
