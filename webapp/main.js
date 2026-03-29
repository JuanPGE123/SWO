"use strict";
(self["webpackChunkswo_servicedesk"] = self["webpackChunkswo_servicedesk"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



class AppComponent {
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
      styles: ["@charset \"UTF-8\";\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQixnQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIEVzdGlsb3MgZGVsIGNvbXBvbmVudGUgcmHDg8KteiAqL1xyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 289:
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.routes */ 2181);
/**
 * app.config.ts
 *
 * Configuración de la aplicación Angular.
 * Define:
 * - Proveedores de la aplicación
 * - Configuración del enrutador
 * - Importaciones de módulos globales
 */




/**
 * Configuración principal de la aplicación
 */
const appConfig = {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_1__.provideRouter)(_app_routes__WEBPACK_IMPORTED_MODULE_0__.routes), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__.provideAnimations)(), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.withFetch)())]
};

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _features_auth_auth_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./features/auth/auth.component */ 7128);
/* harmony import */ var _features_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features/dashboard/dashboard.component */ 1626);
/* harmony import */ var _features_incidents_incidents_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/incidents/incidents.component */ 9906);
/* harmony import */ var _features_users_users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./features/users/users.component */ 2726);
/* harmony import */ var _features_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./features/reports/reports.component */ 7530);
/* harmony import */ var _features_chatbot_chatbot_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./features/chatbot/chatbot.component */ 1330);
/* harmony import */ var _features_incidents_incident_detail_incident_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./features/incidents/incident-detail/incident-detail.component */ 7322);
/* harmony import */ var _features_projects_projects_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./features/projects/projects.component */ 8556);
/**
 * app.routes.ts
 *
 * Definición de todas las rutas de la aplicación.
 * Estructura:
 * - /login -> Componente de autenticación
 * - /dashboard -> Panel principal (protegido)
 * - /incidents -> Gestión de incidencias (protegido)
 * - /users -> Gestión de usuarios (protegido)
 * - /reports -> Reportes (protegido)
 * - /chatbot -> Asistente (protegido)
 */








/**
 * Rutas principales de la aplicación
 */
const routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: _features_auth_auth_component__WEBPACK_IMPORTED_MODULE_0__.AuthComponent
}, {
  path: 'dashboard',
  component: _features_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.DashboardComponent
  // Guard de autenticación: solo usuarios autenticados pueden acceder
  // canActivate: [authGuard]
}, {
  path: 'incidents',
  component: _features_incidents_incidents_component__WEBPACK_IMPORTED_MODULE_2__.IncidentsComponent
  // canActivate: [authGuard]
}, {
  path: 'incidents/:id',
  component: _features_incidents_incident_detail_incident_detail_component__WEBPACK_IMPORTED_MODULE_6__.IncidentDetailComponent
  // canActivate: [authGuard]
}, {
  path: 'users',
  component: _features_users_users_component__WEBPACK_IMPORTED_MODULE_3__.UsersComponent
  // canActivate: [authGuard]
}, {
  path: 'projects',
  component: _features_projects_projects_component__WEBPACK_IMPORTED_MODULE_7__.ProjectsComponent
  // canActivate: [authGuard]
}, {
  path: 'reports',
  component: _features_reports_reports_component__WEBPACK_IMPORTED_MODULE_4__.ReportsComponent
  // canActivate: [authGuard]
}, {
  path: 'chatbot',
  component: _features_chatbot_chatbot_component__WEBPACK_IMPORTED_MODULE_5__.ChatbotComponent
  // canActivate: [authGuard]
}, {
  path: '**',
  redirectTo: '/login'
}];

/***/ }),

/***/ 8010:
/*!***********************************************!*\
  !*** ./src/app/core/services/auth.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);





class AuthService {
  /**
   * Constructor del servicio
   */
  constructor(http) {
    this.http = http;
    // BehaviorSubject para mantener y emitir el estado del usuario autenticado
    this.usuarioAutenticadoSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
    this.usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();
    // Al inicializar el servicio, intentamos recuperar el usuario de sessionStorage
    this.cargarUsuarioGuardado();
  }
  /**
   * Método login: valida credenciales y autentica al usuario
   *
   * @param credenciales - Objeto con email, password y project
   * @returns Observable<boolean> - true si la autenticación fue exitosa
   *
   * Nota: Esta es una validación DEMO en frontend.
   * En producción, siempre validar en backend con conexión segura HTTPS.
   */
  login(credenciales) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
      const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpParams().set('correo', credenciales.email).set('password', credenciales.password);
      this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/login`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe({
        next: resp => {
          if (resp && resp.success) {
            const usuario = {
              id: String(resp.id),
              nombre: resp.nombre || '',
              apellido: '',
              correo: resp.correo || credenciales.email,
              celular: '',
              area: resp.departamento || 'TI',
              jefeDirecto: '',
              correoJefe: '',
              role: resp.rol || 'Analista',
              idProyecto: resp.idProyecto || undefined,
              proyecto: resp.proyecto || ''
            };
            this.usuarioAutenticadoSubject.next(usuario);
            this.guardarUsuario(usuario);
            observer.next(true);
          } else {
            observer.error({
              deleted: resp?.deleted,
              message: resp?.error
            });
          }
          observer.complete();
        },
        error: httpErr => {
          const body = httpErr?.error;
          if (body?.deleted) {
            observer.error({
              deleted: true,
              message: body.error
            });
          } else if (credenciales.email === 'master@swo.com' && credenciales.password === '123456') {
            const usuario = {
              id: 'USR-001',
              nombre: 'Master',
              apellido: '',
              correo: credenciales.email,
              celular: '',
              area: 'TI',
              jefeDirecto: '',
              correoJefe: '',
              role: 'Administrador'
            };
            this.usuarioAutenticadoSubject.next(usuario);
            this.guardarUsuario(usuario);
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        }
      });
    });
  }
  /**
   * Método logout: cierra la sesión del usuario
   * - Limpia el estado de autenticación
   * - Elimina datos de sessionStorage
   */
  logout() {
    this.usuarioAutenticadoSubject.next(null);
    sessionStorage.removeItem('usuarioAutenticado');
  }
  /**
   * Método isAutenticado: verifica si hay un usuario autenticado
   *
   * @returns boolean - true si hay usuario autenticado
   */
  isAutenticado() {
    return this.usuarioAutenticadoSubject.value !== null;
  }
  /**
   * Método getUsuarioActual: obtiene el usuario autenticado actual
   *
   * @returns UsuarioAutenticado | null - Usuario actual o null si no está autenticado
   */
  getUsuarioActual() {
    return this.usuarioAutenticadoSubject.value;
  }
  /**
   * Método privado guardarUsuario: persiste el usuario en sessionStorage
   *
   * @param usuario - Usuario a guardar
   */
  guardarUsuario(usuario) {
    sessionStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
  }
  /**
   * Método privado cargarUsuarioGuardado: recupera el usuario de sessionStorage
   */
  cargarUsuarioGuardado() {
    const usuarioGuardado = sessionStorage.getItem('usuarioAutenticado');
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuarioAutenticadoSubject.next(usuario);
      } catch (error) {
        console.error('Error al cargar usuario guardado:', error);
        sessionStorage.removeItem('usuarioAutenticado');
      }
    }
  }
  static {
    this.ɵfac = function AuthService_Factory(t) {
      return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 6727:
/*!****************************************************!*\
  !*** ./src/app/core/services/incidents.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncidentsService: () => (/* binding */ IncidentsService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 8010);






class IncidentsService {
  constructor(http, authService) {
    this.http = http;
    this.authService = authService;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    // Cache en memoria para bÃºsquedas por ID y estadÃ­sticas reactivas
    this.incidenciasData = [];
    this.incidenciasSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]);
    this.incidencias$ = this.incidenciasSubject.asObservable();
    this.cargarDesdeBackend();
  }
  /** Carga todas las incidencias desde el backend */
  cargarDesdeBackend() {
    this.http.get(`${this.apiUrl}/incidencias`).subscribe({
      next: datos => {
        this.incidenciasData = datos.map(d => this.mapearDesdeDB(d));
        this.incidenciasSubject.next([...this.incidenciasData]);
      },
      error: () => {
        // Si falla la conexiÃ³n al backend, usar datos locales vacÃ­os
        this.incidenciasSubject.next([]);
      }
    });
  }
  /** Mapea respuesta del backend al modelo Angular */
  mapearDesdeDB(db) {
    return {
      id: 'INC-' + db.id,
      title: db.titulo || '',
      state: this.mapearEstado(db.estado),
      priority: this.mapearImpacto(db.impacto),
      assignee: 'Sin asignar',
      project: db.ubicacion || 'SWO',
      date: db.fechaCreacion || '',
      tags: [],
      comments: [],
      user: 'Usuario ' + (db.idUsuarioReporta || 1),
      userEmail: '',
      userPhones: [],
      app: 'SWO',
      reason: db.descripcion || '',
      activity: ''
    };
  }
  mapearEstado(estado) {
    switch (estado) {
      case 'Abierto':
        return 'open';
      case 'En Progreso':
        return 'inprogress';
      case 'Pendiente':
        return 'pending';
      case 'Cerrado':
        return 'resolved';
      default:
        return 'open';
    }
  }
  mapearImpacto(impacto) {
    switch (impacto) {
      case 'Bajo':
        return 'Baja';
      case 'Alto':
        return 'Alta';
      case 'Critico':
        return 'Crítica';
      case 'Medio':
        return 'Media';
      default:
        return 'Media';
    }
  }
  /** Devuelve el Observable de la lista reactiva */
  obtenerIncidencias() {
    return this.incidencias$;
  }
  /** Busca una incidencia por ID en el cache local */
  obtenerIncidenciaPorId(id) {
    return this.incidenciasData.find(inc => inc.id === id);
  }
  /** Crea una nueva incidencia en el backend; si falla, guarda localmente */
  crearIncidencia(datos) {
    // Usar el ID real del usuario autenticado
    const usuario = this.authService.getUsuarioActual();
    const idUsuario = datos.idUsuarioReporta || parseInt(usuario?.id || '0', 10) || 1;
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpParams().set('titulo', datos.titulo).set('descripcion', datos.descripcion).set('estado', datos.estado).set('impacto', datos.impacto).set('ubicacion', datos.ubicacion).set('idUsuarioReporta', String(idUsuario));
    return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(observer => {
      this.http.post(`${this.apiUrl}/incidencias`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe({
        next: resp => {
          this.cargarDesdeBackend();
          observer.next({
            local: false,
            ...resp
          });
          observer.complete();
        },
        error: () => {
          // Backend no disponible (ej: GitHub Pages) — guardar en memoria
          const tmpId = 'TMP-' + Date.now();
          const nueva = {
            id: tmpId,
            titulo: datos.titulo,
            descripcion: datos.descripcion,
            estado: datos.estado,
            impacto: datos.impacto,
            ubicacion: datos.ubicacion,
            fechaCreacion: new Date().toISOString().split('T')[0],
            idUsuarioReporta: datos.idUsuarioReporta || 1
          };
          const incidencia = this.mapearDesdeDB(nueva);
          this.incidenciasData = [incidencia, ...this.incidenciasData];
          this.incidenciasSubject.next([...this.incidenciasData]);
          observer.next({
            local: true
          });
          observer.complete();
        }
      });
    });
  }
  /** Actualiza incidencia en memoria (cambios de estado/prioridad locales) */
  actualizarIncidencia(incidenciaActualizada) {
    const index = this.incidenciasData.findIndex(inc => inc.id === incidenciaActualizada.id);
    if (index !== -1) {
      this.incidenciasData[index] = incidenciaActualizada;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }
  cambiarEstado(id, nuevoEstado) {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.state = nuevoEstado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }
  cambiarPrioridad(id, nuevaPrioridad) {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.priority = nuevaPrioridad;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }
  asignarIncidencia(id, nuevoAsignado) {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.assignee = nuevoAsignado;
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }
  agregarComentario(id, autor, texto) {
    const incidencia = this.incidenciasData.find(inc => inc.id === id);
    if (incidencia) {
      incidencia.comments.push({
        author: autor,
        date: new Date().toLocaleString(),
        text: texto
      });
      this.incidenciasSubject.next([...this.incidenciasData]);
    }
  }
  obtenerEstadísticas() {
    return {
      abiertos: this.incidenciasData.filter(i => i.state === 'open').length,
      enProgreso: this.incidenciasData.filter(i => i.state === 'inprogress').length,
      pendientes: this.incidenciasData.filter(i => i.state === 'pending').length,
      resueltos: this.incidenciasData.filter(i => i.state === 'resolved').length
    };
  }
  static {
    this.ɵfac = function IncidentsService_Factory(t) {
      return new (t || IncidentsService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: IncidentsService,
      factory: IncidentsService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 5567:
/*!*******************************************************!*\
  !*** ./src/app/core/services/notification.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationService: () => (/* binding */ NotificationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class NotificationService {
  /**
   * Método toast: muestra una notificación temporal
   *
   * @param mensaje - Texto a mostrar
   * @param duracion - Duración en ms (default: 3000)
   * @param tipo - Tipo de notificación: 'info', 'success', 'warning', 'error'
   */
  toast(mensaje, duracion = 3000, tipo = 'info') {
    const elemento = document.createElement('div');
    elemento.textContent = mensaje;
    elemento.style.position = 'fixed';
    elemento.style.right = '18px';
    elemento.style.bottom = '18px';
    elemento.style.padding = '8px 12px';
    elemento.style.borderRadius = '8px';
    elemento.style.zIndex = '9999';
    elemento.style.color = 'white';
    elemento.style.fontSize = '14px';
    elemento.style.fontFamily = 'inherit';
    // Colores según el tipo de notificación
    switch (tipo) {
      case 'success':
        elemento.style.background = 'rgba(25, 211, 143, 0.9)'; // Verde
        break;
      case 'error':
        elemento.style.background = 'rgba(255, 87, 87, 0.9)'; // Rojo
        break;
      case 'warning':
        elemento.style.background = 'rgba(255, 193, 7, 0.9)'; // Amarillo
        break;
      default:
        elemento.style.background = 'rgba(0, 0, 0, 0.75)';
      // Negro (info)
    }
    document.body.appendChild(elemento);
    setTimeout(() => elemento.remove(), duracion);
  }
  static {
    this.ɵfac = function NotificationService_Factory(t) {
      return new (t || NotificationService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: NotificationService,
      factory: NotificationService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7326:
/*!***************************************************!*\
  !*** ./src/app/core/services/projects.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectsService: () => (/* binding */ ProjectsService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);





class ProjectsService {
  constructor(http) {
    this.http = http;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.proyectosData = [];
    this.proyectosSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.proyectos$ = this.proyectosSubject.asObservable();
    this.cargarDesdeBackend();
  }
  cargarDesdeBackend() {
    this.http.get(`${this.apiUrl}/proyectos`).subscribe({
      next: data => {
        this.proyectosData = data.map(p => ({
          id: p.id,
          nombre: p.nombre || '',
          descripcion: p.descripcion || '',
          estado: p.estado || 'Activo',
          fechaCreacion: p.fechaCreacion || ''
        }));
        this.proyectosSubject.next([...this.proyectosData]);
      },
      error: () => this.proyectosSubject.next([])
    });
  }
  obtenerProyectos() {
    return this.proyectos$;
  }
  crearProyecto(nombre, descripcion, estado) {
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams().set('nombre', nombre).set('descripcion', descripcion).set('estado', estado);
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      this.http.post(`${this.apiUrl}/proyectos`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe({
        next: resp => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al crear');
          }
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
  eliminarProyecto(id) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      this.http.delete(`${this.apiUrl}/proyectos/${id}`).subscribe({
        next: resp => {
          if (resp?.success) {
            this.proyectosData = this.proyectosData.filter(p => p.id !== id);
            this.proyectosSubject.next([...this.proyectosData]);
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al eliminar');
          }
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
  asignarUsuario(idUsuario, idProyecto) {
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams().set('idUsuario', String(idUsuario)).set('idProyecto', String(idProyecto));
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      this.http.post(`${this.apiUrl}/proyectos/asignar`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe({
        next: resp => {
          observer.next(resp);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
  static {
    this.ɵfac = function ProjectsService_Factory(t) {
      return new (t || ProjectsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: ProjectsService,
      factory: ProjectsService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9784:
/*!************************************************!*\
  !*** ./src/app/core/services/users.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersService: () => (/* binding */ UsersService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);





class UsersService {
  constructor(http) {
    this.http = http;
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.usuariosData = [];
    this.usuariosSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.usuarios$ = this.usuariosSubject.asObservable();
    this.cargarDesdeBackend();
  }
  /** Carga usuarios desde el backend y actualiza el Subject */
  cargarDesdeBackend() {
    this.http.get(`${this.apiUrl}/usuarios`).subscribe({
      next: data => {
        this.usuariosData = data.map(u => this.mapearUsuario(u));
        this.usuariosSubject.next([...this.usuariosData]);
      },
      error: () => {
        // Backend no disponible: mantener datos vacíos
        this.usuariosSubject.next([]);
      }
    });
  }
  mapearUsuario(u) {
    const nombreCompleto = u.nombre || '';
    const espacio = nombreCompleto.indexOf(' ');
    const nombre = espacio > 0 ? nombreCompleto.substring(0, espacio) : nombreCompleto;
    const apellido = espacio > 0 ? nombreCompleto.substring(espacio + 1) : '';
    return {
      id: String(u.id),
      nombre,
      apellido,
      correo: u.correo || '',
      celular: u.telefono || '',
      area: u.departamento || '',
      jefeDirecto: '',
      correoJefe: ''
    };
  }
  obtenerUsuarios() {
    return this.usuarios$;
  }
  obtenerUsuarioPorId(id) {
    return this.usuariosData.find(usr => usr.id === id);
  }
  obtenerUsuariosPorArea(area) {
    return this.usuariosData.filter(usr => usr.area === area);
  }
  buscarUsuarios(termino) {
    const t = termino.toLowerCase();
    return this.usuariosData.filter(usr => usr.nombre.toLowerCase().includes(t) || usr.apellido.toLowerCase().includes(t) || usr.correo.toLowerCase().includes(t));
  }
  obtenerConteosPorArea() {
    const conteos = {};
    this.usuariosData.forEach(usr => {
      conteos[usr.area] = (conteos[usr.area] || 0) + 1;
    });
    return conteos;
  }
  /** Crea un usuario en el backend. nuevoUsuario incluye campos del backend */
  agregarUsuarioBackend(datos) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams().set('nombre', datos.nombre).set('correo', datos.correo).set('password', datos.password).set('rol', datos.rol).set('telefono', datos.telefono).set('departamento', datos.departamento);
    if (datos.idProyecto) params = params.set('idProyecto', String(datos.idProyecto));
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      this.http.post(`${this.apiUrl}/usuarios`, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).subscribe({
        next: resp => {
          if (resp?.success) {
            this.cargarDesdeBackend();
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al guardar');
          }
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
  /** Elimina usuario por lógica en el backend */
  eliminarUsuarioBackend(id) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(observer => {
      this.http.delete(`${this.apiUrl}/usuarios/${id}`).subscribe({
        next: resp => {
          if (resp?.success) {
            this.usuariosData = this.usuariosData.filter(u => u.id !== id);
            this.usuariosSubject.next([...this.usuariosData]);
            observer.next(resp);
          } else {
            observer.error(resp?.error || 'Error al eliminar');
          }
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
  /** Mantiene compatibilidad con código legacy que llama agregarUsuario/eliminarUsuario */
  agregarUsuario(usuario) {
    this.usuariosData.push(usuario);
    this.usuariosSubject.next([...this.usuariosData]);
  }
  eliminarUsuario(id) {
    this.usuariosData = this.usuariosData.filter(usr => usr.id !== id);
    this.usuariosSubject.next([...this.usuariosData]);
  }
  actualizarUsuario(usuarioActualizado) {
    const index = this.usuariosData.findIndex(usr => usr.id === usuarioActualizado.id);
    if (index !== -1) {
      this.usuariosData[index] = usuarioActualizado;
      this.usuariosSubject.next([...this.usuariosData]);
    }
  }
  static {
    this.ɵfac = function UsersService_Factory(t) {
      return new (t || UsersService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: UsersService,
      factory: UsersService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7128:
/*!*************************************************!*\
  !*** ./src/app/features/auth/auth.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthComponent: () => (/* binding */ AuthComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);








function AuthComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.errorMessage, " ");
  }
}
class AuthComponent {
  /**
   * Constructor inyecta los servicios necesarios
   */
  constructor(authService, notificationService, router) {
    this.authService = authService;
    this.notificationService = notificationService;
    this.router = router;
    // Estado del formulario
    this.email = '';
    this.password = '';
    // Estado de UI
    this.showPassword = false;
    this.isLoading = false;
    this.errorMessage = '';
  }
  /**
   * ngOnInit: se ejecuta al inicializar el componente
   * - Verifica si ya hay una sesión activa
   * - Configura listeners de eventos
   */
  ngOnInit() {
    // Si ya hay un usuario autenticado, redirigimos al dashboard
    if (this.authService.isAutenticado()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    // Configurar listeners para manejo del logo
    this.setupLogoHandling();
  }
  /**
   * Método togglePassword: alterna la visibilidad de la contraseña
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  /**
   * Método onSubmit: maneja el envío del formulario de login
   *
   * @param event - Evento del formulario
   */
  onSubmit(event) {
    event.preventDefault();
    // Validaciones básicas
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor rellena todos los campos.';
      this.notificationService.toast('Por favor rellena todos los campos.', 3000, 'warning');
      return;
    }
    // Establecer estado de carga
    this.isLoading = true;
    this.errorMessage = '';
    // Preparar credenciales
    const credenciales = {
      email: this.email.trim(),
      password: this.password
    };
    // Llamar al servicio de autenticación
    this.authService.login(credenciales).subscribe(success => {
      this.isLoading = false;
      if (success) {
        // Autenticación exitosa
        this.notificationService.toast('¡Autenticación exitosa!', 3000, 'success');
        this.router.navigate(['/dashboard']);
      } else {
        // Autenticación fallida
        this.errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
        this.notificationService.toast(this.errorMessage, 3000, 'error');
      }
    }, error => {
      this.isLoading = false;
      if (error?.deleted) {
        this.errorMessage = 'Este usuario no existe en la plataforma. Valida con tu jefe encargado.';
      } else {
        this.errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      }
      this.notificationService.toast(this.errorMessage, 4000, 'error');
    });
  }
  /**
   * Método privado setupLogoHandling: configura el manejo del logo con fallback
   */
  setupLogoHandling() {
    // Este método se puede expandir si se necesita más lógica de manejo de logo
  }
  static {
    this.ɵfac = function AuthComponent_Factory(t) {
      return new (t || AuthComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_1__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AuthComponent,
      selectors: [["app-auth"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 38,
      vars: 10,
      consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], [1, "logo-wrapper"], ["src", "assets/logoSWO_sinFondo.png", "alt", "Logo SWO", "onerror", "this.classList.add('hidden')", 1, "logo-img"], [1, "logo-fallback"], [1, "header-text"], [1, "title"], [1, "subtitle"], [1, "auth-form", 3, "ngSubmit"], ["class", "error-message", 4, "ngIf"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "name", "email", "placeholder", "correo@ejemplo.com", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "password"], [1, "password-wrapper"], ["id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled"], ["type", "button", "aria-label", "Alternar visibilidad de contrase\u00F1a", 1, "toggle-password", 3, "click", "disabled"], ["type", "submit", 1, "btn-login", 3, "disabled"], [1, "auth-footer"], [1, "small-text"], [1, "error-message"]],
      template: function AuthComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "main", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "SWO");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6)(8, "h1", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Autenticaci\u00F3n Segura");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Accede con tus credenciales protegidas para gestionar incidencias, usuarios y reportes.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function AuthComponent_Template_form_ngSubmit_12_listener($event) {
            return ctx.onSubmit($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, AuthComponent_div_13_Template, 2, 1, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 11)(15, "label", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Correo Electr\u00F3nico");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AuthComponent_Template_input_ngModelChange_17_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.email, $event) || (ctx.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 11)(19, "label", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Contrase\u00F1a");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 15)(22, "input", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AuthComponent_Template_input_ngModelChange_22_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AuthComponent_Template_button_click_23_listener() {
            return ctx.togglePassword();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "button", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 19)(28, "p", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Credenciales de prueba:");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "p", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Email: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "code");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "administrador@swo.com");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "p", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "Password: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "code");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "123456");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.showPassword ? "\uD83D\uDE48" : "\uD83D\uDC41\uFE0F", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.isLoading ? "Iniciando sesi\u00F3n..." : "Iniciar Sesi\u00F3n", " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm],
      styles: ["@charset \"UTF-8\";\n\n\n\n\n\n\n\n\n\n.auth-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 16px;\n  background: radial-gradient(1200px 600px at 10% 10%, rgba(7, 20, 30, 0.6), transparent), linear-gradient(180deg, #0b1116 0%, #071018 100%), #0f1720;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 32px 28px;\n  animation: _ngcontent-%COMP%_slideInUp 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 28px;\n}\n\n.logo-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  margin: 0 auto 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.logo-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  transition: opacity 0.3s ease;\n}\n.logo-img.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.logo-fallback[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(135deg, #05d0e6, #08bfcf);\n  border-radius: 50%;\n  font-weight: bold;\n  color: #04232f;\n  font-size: 24px;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 0 0 8px;\n  color: #e6eef6;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #9aa5b1;\n  margin: 0;\n}\n\n\n\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9aa5b1;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: #0b1116;\n  color: #e6eef6;\n  font-family: inherit;\n  font-size: 14px;\n  transition: all 0.2s ease;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: #9aa5b1;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n  box-shadow: 0 0 0 3px rgba(5, 208, 230, 0.1);\n  background: rgba(5, 208, 230, 0.02);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.password-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 4px;\n  color: #9aa5b1;\n  font-size: 18px;\n  transition: all 0.2s ease;\n}\n.toggle-password[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 255, 255, 0.05);\n  color: #05d0e6;\n}\n.toggle-password[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n}\n\n\n\n.btn-login[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 6px;\n  border: none;\n  background: linear-gradient(135deg, #05d0e6, #08bfcf);\n  color: #04232f;\n  font-weight: 600;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-top: 8px;\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 8px 16px rgba(5, 208, 230, 0.3);\n  transform: translateY(-2px);\n}\n.btn-login[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n\n\n.error-message[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 6px;\n  background: rgba(255, 87, 87, 0.1);\n  border: 1px solid rgba(255, 87, 87, 0.3);\n  color: #ff5757;\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n\n\n\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 20px;\n  border-top: 1px solid rgba(255, 255, 255, 0.03);\n}\n\n.small-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9aa5b1;\n  margin: 4px 0;\n}\n.small-text[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: rgba(5, 208, 230, 0.1);\n  padding: 2px 6px;\n  border-radius: 3px;\n  color: #05d0e6;\n  font-family: \"Courier New\", monospace;\n}\n\n\n\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 24px 12px;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .subtitle[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0aC9hdXRoLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7Ozs7OztFQUFBO0FBU0E7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtSkFBQTtBQUNGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EseUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQURGOztBQUlBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsMkJBQUE7RUFERjtFQUdBO0lBQ0UsVUFBQTtJQUNBLHdCQUFBO0VBREY7QUFDRjtBQUlBLHNCQUFBO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUZGOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FBRkY7QUFJRTtFQUNFLGFBQUE7QUFGSjs7QUFNQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxxREFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUhGOztBQU1BO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBSEY7O0FBTUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7QUFIRjs7QUFNQSxlQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFIRjs7QUFNQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUFIRjtBQUtFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FBSEo7O0FBT0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQUpGO0FBTUU7RUFDRSxjQUFBO0FBSko7QUFPRTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLDRDQUFBO0VBQ0EsbUNBQUE7QUFMSjtBQVFFO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FBTko7O0FBVUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFQRjtBQVNFO0VBQ0UscUNBQUE7RUFDQSxjQUFBO0FBUEo7QUFVRTtFQUNFLG1CQUFBO0FBUko7O0FBWUEsbUJBQUE7QUFDQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EscURBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQVRGO0FBV0U7RUFDRSw2Q0FBQTtFQUNBLDJCQUFBO0FBVEo7QUFZRTtFQUNFLHdCQUFBO0FBVko7QUFhRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQVhKOztBQWVBLHFCQUFBO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSx3Q0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFaRjs7QUFlQSx1QkFBQTtBQUNBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLCtDQUFBO0FBWkY7O0FBZUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUFaRjtBQWNFO0VBQ0Usa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHFDQUFBO0FBWko7O0FBZ0JBLGVBQUE7QUFDQTtFQUNFO0lBQ0Usa0JBQUE7RUFiRjtFQWdCQTtJQUNFLGtCQUFBO0VBZEY7RUFpQkE7SUFDRSxlQUFBO0VBZkY7RUFrQkE7SUFDRSxlQUFBO0VBaEJGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBhdXRoLmNvbXBvbmVudC5zY3NzXHJcbiAqIFxyXG4gKiBFc3RpbG9zIHBhcmEgZWwgY29tcG9uZW50ZSBkZSBhdXRlbnRpY2FjacODwrNuLlxyXG4gKiAtIERpc2XDg8KxbyByZXNwb25zaXZvXHJcbiAqIC0gVGVtYSBvc2N1cm8gY29uc2lzdGVudGVcclxuICogLSBBbmltYWNpb25lcyBzdWF2ZXNcclxuICovXHJcblxyXG4uYXV0aC1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDQ4cHggMTZweDtcclxuICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoMTIwMHB4IDYwMHB4IGF0IDEwJSAxMCUsIHJnYmEoNywgMjAsIDMwLCAwLjYpLCB0cmFuc3BhcmVudCksXHJcbiAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBiMTExNiAwJSwgIzA3MTAxOCAxMDAlKSxcclxuICAgICAgICAgICAgICAjMGYxNzIwO1xyXG59XHJcblxyXG4uYXV0aC1jYXJkIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDQyMHB4O1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMiksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSkpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBwYWRkaW5nOiAzMnB4IDI4cHg7XHJcbiAgYW5pbWF0aW9uOiBzbGlkZUluVXAgMC4zcyBlYXNlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNsaWRlSW5VcCB7XHJcbiAgZnJvbSB7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxufVxyXG5cclxuLyogQ2FiZWNlcmEgY29uIGxvZ28gKi9cclxuLmF1dGgtaGVhZGVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcclxufVxyXG5cclxuLmxvZ28td3JhcHBlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxuICBtYXJnaW46IDAgYXV0byAxNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmxvZ28taW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcclxuXHJcbiAgJi5oaWRkZW4ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuXHJcbi5sb2dvLWZhbGxiYWNrIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNWQwZTYsICMwOGJmY2YpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzA0MjMyZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbjogMCAwIDhweDtcclxuICBjb2xvcjogI2U2ZWVmNjtcclxufVxyXG5cclxuLnN1YnRpdGxlIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICM5YWE1YjE7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4vKiBGb3JtdWxhcmlvICovXHJcbi5hdXRoLWZvcm0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDZweDtcclxuXHJcbiAgbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICBwYWRkaW5nOiAxMHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYmFja2dyb3VuZDogIzBiMTExNjtcclxuICBjb2xvcjogI2U2ZWVmNjtcclxuICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgJjo6cGxhY2Vob2xkZXIge1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgfVxyXG5cclxuICAmOmZvY3VzIHtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItY29sb3I6ICMwNWQwZTY7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg1LCAyMDgsIDIzMCwgMC4xKTtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMDIpO1xyXG4gIH1cclxuXHJcbiAgJjpkaXNhYmxlZCB7XHJcbiAgICBvcGFjaXR5OiAwLjY7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG4gIH1cclxufVxyXG5cclxuLnBhc3N3b3JkLXdyYXBwZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50b2dnbGUtcGFzc3dvcmQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMTBweDtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgY29sb3I6ICM5YWE1YjE7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcclxuICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gIH1cclxuXHJcbiAgJjpkaXNhYmxlZCB7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG4gIH1cclxufVxyXG5cclxuLyogQm90w4PCs24gZGUgbG9naW4gKi9cclxuLmJ0bi1sb2dpbiB7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzA1ZDBlNiwgIzA4YmZjZik7XHJcbiAgY29sb3I6ICMwNDIzMmY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG5cclxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcclxuICAgIGJveC1zaGFkb3c6IDAgOHB4IDE2cHggcmdiYSg1LCAyMDgsIDIzMCwgMC4zKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICB9XHJcblxyXG4gICY6YWN0aXZlOm5vdCg6ZGlzYWJsZWQpIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICB9XHJcblxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC43O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB9XHJcbn1cclxuXHJcbi8qIE1lbnNhamUgZGUgZXJyb3IgKi9cclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gIHBhZGRpbmc6IDEwcHggMTJweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDg3LCA4NywgMC4xKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgODcsIDg3LCAwLjMpO1xyXG4gIGNvbG9yOiAjZmY1NzU3O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi8qIFBpZSBkZWwgZm9ybXVsYXJpbyAqL1xyXG4uYXV0aC1mb290ZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nLXRvcDogMjBweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxufVxyXG5cclxuLnNtYWxsLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogIzlhYTViMTtcclxuICBtYXJnaW46IDRweCAwO1xyXG5cclxuICBjb2RlIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgICBwYWRkaW5nOiAycHggNnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgY29sb3I6ICMwNWQwZTY7XHJcbiAgICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xyXG4gIH1cclxufVxyXG5cclxuLyogUmVzcG9uc2l2byAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuYXV0aC1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMjRweCAxMnB4O1xyXG4gIH1cclxuXHJcbiAgLmF1dGgtY2FyZCB7XHJcbiAgICBwYWRkaW5nOiAyNHB4IDE2cHg7XHJcbiAgfVxyXG5cclxuICAudGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLnN1YnRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1330:
/*!*******************************************************!*\
  !*** ./src/app/features/chatbot/chatbot.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatbotComponent: () => (/* binding */ ChatbotComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);










const _c0 = ["messagesContainer"];
function ChatbotComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_button_16_Template_button_click_0_listener() {
      const accion_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.accionRapida(accion_r3.query));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const accion_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", accion_r3.label, " ");
  }
}
function ChatbotComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](cat_r5);
  }
}
function ChatbotComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Cargando...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function ChatbotComponent_div_25_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const msg_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMapInterpolate1"]("nivel-badge nivel-", msg_r6.nivel, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r3.nivelLabel(msg_r6.nivel), " ");
  }
}
function ChatbotComponent_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ChatbotComponent_div_25_div_1_span_2_Template, 2, 4, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const msg_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", msg_r6.categoria, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", msg_r6.nivel);
  }
}
function ChatbotComponent_div_25_ol_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const paso_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](paso_r7);
  }
}
function ChatbotComponent_div_25_ol_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ol", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ChatbotComponent_div_25_ol_4_li_1_Template, 2, 1, "li", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const msg_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", msg_r6.pasos);
  }
}
function ChatbotComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ChatbotComponent_div_25_div_1_Template, 3, 2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, ChatbotComponent_div_25_ol_4_Template, 2, 1, "ol", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const msg_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("user", msg_r6.autor === "usuario")("bot", msg_r6.autor === "bot");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", msg_r6.autor === "bot" && msg_r6.categoria);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("white-space", "pre-line");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](msg_r6.texto);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", msg_r6.pasos && msg_r6.pasos.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](7, 10, msg_r6.timestamp, "HH:mm"));
  }
}
function ChatbotComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 43)(1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "span")(3, "span")(4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function ChatbotComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const accion_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", accion_r8, " ");
  }
}
function ChatbotComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Sin actividad reciente ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class ChatbotComponent {
  constructor(http, notificationService) {
    this.http = http;
    this.notificationService = notificationService;
    this.mensajes = [];
    this.inputChat = '';
    this.guardarHistorial = true;
    this.escribiendo = false;
    this.categorias = [];
    this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl;
    this.accionesRapidas = [{
      label: '🔑 Contraseñas',
      query: '¿Cómo restablezco una contraseña?'
    }, {
      label: '🌐 Red / Conectividad',
      query: 'No tengo acceso a internet ni a la red'
    }, {
      label: '🖨️ Impresoras',
      query: 'La impresora no imprime o tiene atasco de papel'
    }, {
      label: '🎫 Crear incidencia',
      query: '¿Cómo creo una nueva incidencia?'
    }, {
      label: '🔺 Escalar ticket',
      query: '¿Cómo escalo una incidencia a nivel superior?'
    }, {
      label: '🛡️ Seguridad',
      query: 'Creo que mi equipo tiene un virus o malware'
    }];
    this.registroAcciones = [];
  }
  ngOnInit() {
    this.cargarHistorial();
    if (this.mensajes.length === 0) {
      this.agregarMensajeBot('¡Hola! Soy el asistente SWO 🤖\n\nPuedo ayudarte con problemas de TI como contraseñas, red, hardware, aplicaciones, seguridad y más. Usa los botones de acceso rápido o escribe tu consulta.', []);
    }
    this.cargarCategorias();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }
  enviarMensaje() {
    const texto = this.inputChat.trim();
    if (!texto || this.escribiendo) return;
    this.agregarMensaje(texto, 'usuario');
    this.registrarAccion(`Consulta: ${texto}`);
    this.inputChat = '';
    this.buscarRespuesta(texto);
  }
  accionRapida(query) {
    this.inputChat = query;
    this.enviarMensaje();
  }
  sugerencia(texto) {
    this.inputChat = texto;
    this.enviarMensaje();
  }
  buscarRespuesta(consulta) {
    this.escribiendo = true;
    const url = `${this.apiUrl}/chatbot?q=${encodeURIComponent(consulta)}`;
    this.http.get(url).subscribe({
      next: response => {
        this.escribiendo = false;
        if (response.categorias.length > 0 && this.categorias.length === 0) {
          this.categorias = response.categorias;
        }
        if (!response.resultados || response.resultados.length === 0) {
          this.agregarMensajeBot('No encontré información específica sobre esa consulta en mi base de conocimiento. Te recomiendo:\n\n• Crear una incidencia en el módulo de Incidentes.\n• Contactar al área de TI directamente.\n• Reformular tu pregunta con otras palabras.', []);
          this.registrarAccion('Sin resultados para la consulta');
          return;
        }
        const item = response.resultados[0];
        const pasos = item.pasos ? item.pasos.split('||').map(p => p.trim()).filter(p => p.length > 0) : [];
        this.agregarMensajeBot(item.respuesta, pasos, item.categoria, item.nivel);
        this.registrarAccion(`Respuesta encontrada: ${item.categoria}`);
        if (response.resultados.length > 1) {
          const otros = response.resultados.slice(1, 3).map(r => `• ${r.pregunta}`).join('\n');
          setTimeout(() => {
            this.agregarMensajeBot(`También puede interesarte:\n${otros}`, []);
          }, 600);
        }
      },
      error: () => {
        this.escribiendo = false;
        this.agregarMensajeBot('No pude conectarme a la base de conocimiento en este momento. Por favor intenta de nuevo o contacta soporte.', []);
      }
    });
  }
  cargarCategorias() {
    this.http.get(`${this.apiUrl}/chatbot?q=sistema`).subscribe({
      next: res => {
        if (res.categorias) this.categorias = res.categorias;
      },
      error: () => {}
    });
  }
  agregarMensaje(texto, autor, pasos = [], categoria, nivel) {
    this.mensajes.push({
      texto,
      autor,
      timestamp: new Date(),
      pasos,
      categoria,
      nivel
    });
    this.guardarHistorialLocal();
  }
  agregarMensajeBot(texto, pasos = [], categoria, nivel) {
    this.agregarMensaje(texto, 'bot', pasos, categoria, nivel);
  }
  registrarAccion(texto) {
    const timestamp = new Date().toLocaleTimeString();
    this.registroAcciones.unshift(`[${timestamp}] ${texto}`);
    if (this.registroAcciones.length > 15) this.registroAcciones.pop();
  }
  limpiarChat() {
    if (confirm('¿Limpiar el historial del chat?')) {
      this.mensajes = [];
      localStorage.removeItem('chatbot_historial');
      this.agregarMensajeBot('Chat limpiado. ¿En qué puedo ayudarte?', []);
    }
  }
  exportarChat() {
    const lineas = this.mensajes.map(m => {
      const hora = new Date(m.timestamp).toLocaleTimeString();
      let linea = `[${hora}] ${m.autor.toUpperCase()}: ${m.texto}`;
      if (m.pasos && m.pasos.length > 0) {
        linea += '\nPasos:\n' + m.pasos.map((p, i) => `  ${i + 1}. ${p}`).join('\n');
      }
      return linea;
    });
    const blob = new Blob([lineas.join('\n---\n')], {
      type: 'text/plain;charset=utf-8'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-swo-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.notificationService.toast('Chat exportado', 2000, 'success');
  }
  guardarHistorialLocal() {
    if (this.guardarHistorial) {
      localStorage.setItem('chatbot_historial', JSON.stringify(this.mensajes));
    }
  }
  cargarHistorial() {
    const historial = localStorage.getItem('chatbot_historial');
    if (historial) {
      try {
        const parsed = JSON.parse(historial);
        this.mensajes = parsed.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch {
        this.mensajes = [];
      }
    }
  }
  nivelLabel(nivel) {
    switch (nivel) {
      case 1:
        return '1er nivel';
      case 2:
        return '2do nivel';
      case 3:
        return 'Especialista';
      default:
        return '';
    }
  }
  static {
    this.ɵfac = function ChatbotComponent_Factory(t) {
      return new (t || ChatbotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__.NotificationService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: ChatbotComponent,
      selectors: [["app-chatbot"]],
      viewQuery: function ChatbotComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.messagesContainer = _t.first);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 54,
      vars: 11,
      consts: [["messagesContainer", ""], [1, "chatbot-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-actions"], [1, "btn-action", "secondary", 3, "click"], [1, "btn-action", 3, "click"], [1, "chat-container"], [1, "left-panel"], [1, "quick-actions"], ["class", "action-btn", 3, "click", 4, "ngFor", "ngForOf"], [2, "margin-top", "16px"], [1, "categorias-list"], ["class", "cat-pill", 4, "ngFor", "ngForOf"], ["class", "cat-empty", 4, "ngIf"], [1, "chat-section"], [1, "messages-container"], ["class", "message", 3, "user", "bot", 4, "ngFor", "ngForOf"], ["class", "message bot typing-message", 4, "ngIf"], [1, "composer"], ["type", "text", "placeholder", "Escribe tu problema o consulta de TI...", 1, "chat-input", 3, "ngModelChange", "keyup.enter", "ngModel", "disabled"], [1, "btn-send", 3, "click", "disabled"], [1, "suggestions"], [1, "sugg-label"], [1, "sugg", 3, "click"], [1, "right-panel"], [1, "log-area"], ["class", "log-entry", 4, "ngFor", "ngForOf"], ["class", "empty-log", 4, "ngIf"], [1, "options"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "action-btn", 3, "click"], [1, "cat-pill"], [1, "cat-empty"], [1, "message"], ["class", "msg-category", 4, "ngIf"], [1, "message-content"], ["class", "pasos-list", 4, "ngIf"], [1, "message-time"], [1, "msg-category"], [3, "class", 4, "ngIf"], [1, "pasos-list"], [4, "ngFor", "ngForOf"], [1, "message", "bot", "typing-message"], [1, "typing-indicator"], [1, "log-entry"], [1, "empty-log"]],
      template: function ChatbotComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "main", 2)(3, "header", 3)(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "ChatBot \u2014 Asistente de soporte IT");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4)(7, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.limpiarChat());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\uD83D\uDDD1\uFE0F Limpiar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportarChat());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\uD83D\uDCE5 Exportar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 7)(12, "aside", 8)(13, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Acceso r\u00E1pido");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, ChatbotComponent_button_16_Template, 2, 1, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "h4", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Categor\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, ChatbotComponent_span_20_Template, 2, 1, "span", 13)(21, ChatbotComponent_span_21_Template, 2, 0, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "section", 15)(23, "div", 16, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, ChatbotComponent_div_25_Template, 8, 13, "div", 17)(26, ChatbotComponent_div_26_Template, 5, 0, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 19)(28, "input", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ChatbotComponent_Template_input_ngModelChange_28_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.inputChat, $event) || (ctx.inputChat = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keyup.enter", function ChatbotComponent_Template_input_keyup_enter_28_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.enviarMensaje());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "button", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_29_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.enviarMensaje());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, " Enviar ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 22)(32, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Sugerencias:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_34_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.sugerencia("\u00BFC\u00F3mo restablezco una contrase\u00F1a?"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Restablecer contrase\u00F1a");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_36_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.sugerencia("El VPN no conecta"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "VPN no conecta");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_38_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.sugerencia("\u00BFC\u00F3mo creo una nueva incidencia?"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, "Crear incidencia");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ChatbotComponent_Template_button_click_40_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.sugerencia("\u00BFCu\u00E1les son los niveles de prioridad y los SLA?"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Prioridades y SLA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "aside", 25)(43, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Registro de actividad");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](46, ChatbotComponent_div_46_Template, 2, 1, "div", 27)(47, ChatbotComponent_div_47_Template, 2, 0, "div", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "h4", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49, "Opciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "div", 29)(51, "label")(52, "input", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ChatbotComponent_Template_input_ngModelChange_52_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.guardarHistorial, $event) || (ctx.guardarHistorial = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, " Guardar historial local ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.accionesRapidas);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.categorias);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.categorias.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.mensajes);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.escribiendo);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.inputChat);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.escribiendo);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.escribiendo || !ctx.inputChat.trim());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.registroAcciones);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.registroAcciones.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.guardarHistorial);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n\n\n.chatbot-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n  color: #e6eef6;\n}\n\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  min-width: 200px;\n  font-size: 12px;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n}\n.btn-action.secondary[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n\n\n.typing-message[_ngcontent-%COMP%]   .typing-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  padding: 10px 14px;\n  background: rgba(5, 208, 230, 0.1);\n  border-radius: 4px 8px 8px 8px;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.typing-message[_ngcontent-%COMP%]   .typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  background: #05d0e6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_bounce 1.2s infinite ease-in-out;\n}\n.typing-message[_ngcontent-%COMP%]   .typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0s;\n}\n.typing-message[_ngcontent-%COMP%]   .typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.typing-message[_ngcontent-%COMP%]   .typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n\n@keyframes _ngcontent-%COMP%_bounce {\n  0%, 60%, 100% {\n    transform: translateY(0);\n    opacity: 0.5;\n  }\n  30% {\n    transform: translateY(-6px);\n    opacity: 1;\n  }\n}\n.chat-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n  overflow: hidden;\n}\n\n.left-panel[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 12px;\n  overflow-y: auto;\n  width: 200px;\n}\n.left-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #e6eef6;\n  font-size: 12px;\n}\n\n.left-panel[_ngcontent-%COMP%]   .quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.left-panel[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #05d0e6;\n  cursor: pointer;\n  font-size: 11px;\n  text-align: left;\n  transition: all 0.2s ease;\n}\n.left-panel[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n.left-panel[_ngcontent-%COMP%]   .categorias-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.left-panel[_ngcontent-%COMP%]   .cat-pill[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 3px 7px;\n  background: rgba(5, 208, 230, 0.07);\n  border-radius: 4px;\n  color: #9aa5b1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.left-panel[_ngcontent-%COMP%]   .cat-empty[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #5a6b77;\n  font-style: italic;\n}\n\n.chat-section[_ngcontent-%COMP%] {\n  flex: 1;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.messages-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  max-width: 70%;\n  word-wrap: break-word;\n}\n.message.user[_ngcontent-%COMP%] {\n  align-self: flex-end;\n}\n.message.user[_ngcontent-%COMP%]   .message-content[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, #04232f, #07363a);\n  color: #dff0ff;\n  border-radius: 8px 4px 8px 8px;\n}\n.message.bot[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n.message.bot[_ngcontent-%COMP%]   .message-content[_ngcontent-%COMP%] {\n  background: rgba(5, 208, 230, 0.1);\n  color: #05d0e6;\n  border-radius: 4px 8px 8px 8px;\n}\n.message[_ngcontent-%COMP%]   .message-content[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 12px;\n  line-height: 1.5;\n  white-space: pre-line;\n}\n.message[_ngcontent-%COMP%]   .message-time[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #9aa5b1;\n  padding: 0 4px;\n}\n.message[_ngcontent-%COMP%]   .msg-category[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #19d38f;\n  padding: 2px 8px 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.message[_ngcontent-%COMP%]   .nivel-badge[_ngcontent-%COMP%] {\n  font-size: 9px;\n  padding: 1px 5px;\n  border-radius: 3px;\n  font-weight: 600;\n}\n.message[_ngcontent-%COMP%]   .nivel-badge.nivel-1[_ngcontent-%COMP%] {\n  background: rgba(25, 211, 143, 0.15);\n  color: #19d38f;\n}\n.message[_ngcontent-%COMP%]   .nivel-badge.nivel-2[_ngcontent-%COMP%] {\n  background: rgba(255, 167, 0, 0.15);\n  color: #ffa700;\n}\n.message[_ngcontent-%COMP%]   .nivel-badge.nivel-3[_ngcontent-%COMP%] {\n  background: rgba(255, 80, 80, 0.15);\n  color: #ff5050;\n}\n.message[_ngcontent-%COMP%]   .pasos-list[_ngcontent-%COMP%] {\n  margin: 4px 12px 4px 28px;\n  padding: 0;\n  font-size: 11px;\n  color: #c8dce8;\n  line-height: 1.6;\n}\n.message[_ngcontent-%COMP%]   .pasos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 2px 0;\n}\n\n.composer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.03);\n}\n.composer[_ngcontent-%COMP%]   .chat-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  font-size: 12px;\n}\n.composer[_ngcontent-%COMP%]   .chat-input[_ngcontent-%COMP%]::placeholder {\n  color: #9aa5b1;\n}\n.composer[_ngcontent-%COMP%]   .chat-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n\n.btn-send[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  border: none;\n  background: #05d0e6;\n  color: #04232f;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 600;\n}\n.btn-send[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #08bfcf;\n}\n.btn-send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.suggestions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  padding: 8px;\n  border-top: 1px solid rgba(255, 255, 255, 0.02);\n  flex-wrap: wrap;\n  align-items: center;\n}\n.suggestions[_ngcontent-%COMP%]   .sugg-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #9aa5b1;\n}\n.suggestions[_ngcontent-%COMP%]   .sugg[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  background: transparent;\n  color: #05d0e6;\n  cursor: pointer;\n  font-size: 10px;\n}\n.suggestions[_ngcontent-%COMP%]   .sugg[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n.right-panel[_ngcontent-%COMP%]   .log-area[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.01);\n  border-radius: 6px;\n  padding: 8px;\n  height: 150px;\n  overflow-y: auto;\n  font-size: 10px;\n}\n.right-panel[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%] {\n  padding: 2px 0;\n  color: #9aa5b1;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n}\n.right-panel[_ngcontent-%COMP%]   .empty-log[_ngcontent-%COMP%] {\n  color: #5a6b77;\n  font-style: italic;\n}\n.right-panel[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.right-panel[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: #9aa5b1;\n  cursor: pointer;\n}\n.right-panel[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.right-panel[_ngcontent-%COMP%]   .btn-export[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #05d0e6;\n  cursor: pointer;\n  font-size: 11px;\n}\n.right-panel[_ngcontent-%COMP%]   .btn-export[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 3px;\n}\n\n@media (max-width: 1024px) {\n  .left-panel[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%] {\n    width: 150px;\n  }\n  .message[_ngcontent-%COMP%] {\n    max-width: 80%;\n  }\n}\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .chat-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .left-panel[_ngcontent-%COMP%], .right-panel[_ngcontent-%COMP%] {\n    width: 100%;\n    height: auto;\n  }\n  .message[_ngcontent-%COMP%] {\n    max-width: 85%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2hhdGJvdC9jaGF0Ym90LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUFBO0FBSUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtBQUFGOztBQUdBO0VBQ0UsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsNkRBQUE7RUFDQSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtEQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtBQUFKOztBQUlBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFERjtBQUdFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBREo7QUFHSTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQUROOztBQU1BO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFIRjtBQUtFO0VBQWMsY0FBQTtBQUZoQjtBQUlFO0VBQ0Usa0NBQUE7QUFGSjs7QUFNQSxxQkFBQTtBQUVFO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQUEsa0JBQUE7QUFKSjtBQU1JO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7QUFKTjtBQU1NO0VBQWlCLG1CQUFBO0FBSHZCO0FBSU07RUFBaUIscUJBQUE7QUFEdkI7QUFFTTtFQUFpQixxQkFBQTtBQUN2Qjs7QUFJQTtFQUNFO0lBQWdCLHdCQUFBO0lBQTBCLFlBQUE7RUFDMUM7RUFBQTtJQUFNLDJCQUFBO0lBQTZCLFVBQUE7RUFJbkM7QUFDRjtBQUZBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBSUY7O0FBREE7O0VBRUUseUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUlGO0FBRkU7O0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUtKOztBQUFFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQUdKO0FBQUU7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFFSjtBQUFJO0VBQ0Usa0NBQUE7QUFFTjtBQUVFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQUFKO0FBR0U7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQURKO0FBSUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBRko7O0FBTUE7RUFDRSxPQUFBO0VBQ0EseUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFIRjs7QUFNQTtFQUNFLE9BQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBSEY7O0FBTUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FBSEY7QUFLRTtFQUNFLG9CQUFBO0FBSEo7QUFLSTtFQUNFLG9EQUFBO0VBQ0EsY0FBQTtFQUNBLDhCQUFBO0FBSE47QUFPRTtFQUNFLHNCQUFBO0FBTEo7QUFPSTtFQUNFLGtDQUFBO0VBQ0EsY0FBQTtFQUNBLDhCQUFBO0FBTE47QUFTRTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFQSjtBQVVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0FBUko7QUFXRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBVEo7QUFZRTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFWSjtBQVlJO0VBQVksb0NBQUE7RUFBbUMsY0FBQTtBQVJuRDtBQVNJO0VBQVksbUNBQUE7RUFBa0MsY0FBQTtBQUxsRDtBQU1JO0VBQVksbUNBQUE7RUFBa0MsY0FBQTtBQUZsRDtBQUtFO0VBQ0UseUJBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQUhKO0FBS0k7RUFDRSxjQUFBO0FBSE47O0FBUUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSwrQ0FBQTtBQUxGO0FBT0U7RUFDRSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUxKO0FBT0k7RUFDRSxjQUFBO0FBTE47QUFRSTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQU5OOztBQVdBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBUkY7QUFVRTtFQUNFLG1CQUFBO0FBUko7QUFXRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQVRKOztBQWFBO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsK0NBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFWRjtBQVlFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFWSjtBQWFFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFYSjtBQWFJO0VBQ0Usa0NBQUE7QUFYTjs7QUFpQkU7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFkSjtBQWlCRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0Esa0RBQUE7QUFmSjtBQWtCRTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQWhCSjtBQW1CRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUFqQko7QUFtQkk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBakJOO0FBbUJNO0VBQ0UsZUFBQTtBQWpCUjtBQXNCRTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBcEJKO0FBc0JJO0VBQ0Usa0NBQUE7QUFwQk47O0FBeUJBO0VBQ0UsVUFBQTtBQXRCRjs7QUF5QkE7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0FBdEJGOztBQXlCQTtFQUNFOztJQUVFLFlBQUE7RUF0QkY7RUF5QkE7SUFDRSxjQUFBO0VBdkJGO0FBQ0Y7QUEwQkE7RUFDRTtJQUNFLGNBQUE7RUF4QkY7RUEyQkE7SUFDRSxzQkFBQTtFQXpCRjtFQTRCQTs7SUFFRSxXQUFBO0lBQ0EsWUFBQTtFQTFCRjtFQTZCQTtJQUNFLGNBQUE7RUEzQkY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIGNoYXRib3QuY29tcG9uZW50LnNjc3NcclxuICovXHJcblxyXG4uY2hhdGJvdC1sYXlvdXQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG5cclxuLm1haW4tYXJlYSB7XHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tbGVmdDogMjYwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwYjExMTYgMCUsICMwNzEwMTggMTAwJSk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnRvcGJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAxNnB4IDI0cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gIH1cclxufVxyXG5cclxuLnRvcGJhci1hY3Rpb25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTJweDtcclxuXHJcbiAgLnNlYXJjaC1pbnB1dCB7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xyXG4gICAgY29sb3I6ICNlNmVlZjY7XHJcbiAgICBtaW4td2lkdGg6IDIwMHB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3JkZXItY29sb3I6ICMwNWQwZTY7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWFjdGlvbiB7XHJcbiAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNik7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6ICNlNmVlZjY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuXHJcbiAgJi5zZWNvbmRhcnkgeyBjb2xvcjogIzlhYTViMTsgfVxyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBUeXBpbmcgaW5kaWNhdG9yICovXHJcbi50eXBpbmctbWVzc2FnZSB7XHJcbiAgLnR5cGluZy1pbmRpY2F0b3Ige1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdhcDogNHB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwcHggMTRweDtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggOHB4IDhweCA4cHg7XHJcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcblxyXG4gICAgc3BhbiB7XHJcbiAgICAgIHdpZHRoOiA3cHg7XHJcbiAgICAgIGhlaWdodDogN3B4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMDVkMGU2O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIGFuaW1hdGlvbjogYm91bmNlIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcblxyXG4gICAgICAmOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMHM7IH1cclxuICAgICAgJjpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMnM7IH1cclxuICAgICAgJjpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuNHM7IH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgYm91bmNlIHtcclxuICAwJSwgNjAlLCAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyBvcGFjaXR5OiAwLjU7IH1cclxuICAzMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTZweCk7IG9wYWNpdHk6IDE7IH1cclxufVxyXG5cclxuLmNoYXQtY29udGFpbmVyIHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmxlZnQtcGFuZWwsXHJcbi5yaWdodC1wYW5lbCB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxuICB3aWR0aDogMjAwcHg7XHJcblxyXG4gIGg0IHtcclxuICAgIG1hcmdpbjogMCAwIDEycHg7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi5sZWZ0LXBhbmVsIHtcclxuICAucXVpY2stYWN0aW9ucyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogNnB4O1xyXG4gIH1cclxuXHJcbiAgLmFjdGlvbi1idG4ge1xyXG4gICAgcGFkZGluZzogNnB4IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuY2F0ZWdvcmlhcy1saXN0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgfVxyXG5cclxuICAuY2F0LXBpbGwge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgcGFkZGluZzogM3B4IDdweDtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMDcpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIH1cclxuXHJcbiAgLmNhdC1lbXB0eSB7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBjb2xvcjogIzVhNmI3NztcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICB9XHJcbn1cclxuXHJcbi5jaGF0LXNlY3Rpb24ge1xyXG4gIGZsZXg6IDE7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4ubWVzc2FnZXMtY29udGFpbmVyIHtcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiA4cHg7XHJcbn1cclxuXHJcbi5tZXNzYWdlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAycHg7XHJcbiAgbWF4LXdpZHRoOiA3MCU7XHJcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG5cclxuICAmLnVzZXIge1xyXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XHJcblxyXG4gICAgLm1lc3NhZ2UtY29udGVudCB7XHJcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzA0MjMyZiwgIzA3MzYzYSk7XHJcbiAgICAgIGNvbG9yOiAjZGZmMGZmO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHggNHB4IDhweCA4cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLmJvdCB7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xyXG5cclxuICAgIC5tZXNzYWdlLWNvbnRlbnQge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgICBjb2xvcjogIzA1ZDBlNjtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNHB4IDhweCA4cHggOHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLm1lc3NhZ2UtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XHJcbiAgfVxyXG5cclxuICAubWVzc2FnZS10aW1lIHtcclxuICAgIGZvbnQtc2l6ZTogOXB4O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBwYWRkaW5nOiAwIDRweDtcclxuICB9XHJcblxyXG4gIC5tc2ctY2F0ZWdvcnkge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6ICMxOWQzOGY7XHJcbiAgICBwYWRkaW5nOiAycHggOHB4IDA7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogNnB4O1xyXG4gIH1cclxuXHJcbiAgLm5pdmVsLWJhZGdlIHtcclxuICAgIGZvbnQtc2l6ZTogOXB4O1xyXG4gICAgcGFkZGluZzogMXB4IDVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG4gICAgJi5uaXZlbC0xIHsgYmFja2dyb3VuZDogcmdiYSgyNSwyMTEsMTQzLDAuMTUpOyBjb2xvcjogIzE5ZDM4ZjsgfVxyXG4gICAgJi5uaXZlbC0yIHsgYmFja2dyb3VuZDogcmdiYSgyNTUsMTY3LDAsMC4xNSk7IGNvbG9yOiAjZmZhNzAwOyB9XHJcbiAgICAmLm5pdmVsLTMgeyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSw4MCw4MCwwLjE1KTsgY29sb3I6ICNmZjUwNTA7IH1cclxuICB9XHJcblxyXG4gIC5wYXNvcy1saXN0IHtcclxuICAgIG1hcmdpbjogNHB4IDEycHggNHB4IDI4cHg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgY29sb3I6ICNjOGRjZTg7XHJcbiAgICBsaW5lLWhlaWdodDogMS42O1xyXG5cclxuICAgIGxpIHtcclxuICAgICAgcGFkZGluZzogMnB4IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uY29tcG9zZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiA4cHg7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuXHJcbiAgLmNoYXQtaW5wdXQge1xyXG4gICAgZmxleDogMTtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuXHJcbiAgICAmOjpwbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgfVxyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3JkZXItY29sb3I6ICMwNWQwZTY7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLXNlbmQge1xyXG4gIHBhZGRpbmc6IDhweCAxNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogIzA1ZDBlNjtcclxuICBjb2xvcjogIzA0MjMyZjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xyXG4gICAgYmFja2dyb3VuZDogIzA4YmZjZjtcclxuICB9XHJcblxyXG4gICY6ZGlzYWJsZWQge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB9XHJcbn1cclxuXHJcbi5zdWdnZXN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDZweDtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gIC5zdWdnLWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gIH1cclxuXHJcbiAgLnN1Z2cge1xyXG4gICAgcGFkZGluZzogNHB4IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnJpZ2h0LXBhbmVsIHtcclxuICAubG9nLWFyZWEge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLmxvZy1lbnRyeSB7XHJcbiAgICBwYWRkaW5nOiAycHggMDtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XHJcbiAgfVxyXG5cclxuICAuZW1wdHktbG9nIHtcclxuICAgIGNvbG9yOiAjNWE2Yjc3O1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gIH1cclxuXHJcbiAgLm9wdGlvbnMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDhweDtcclxuXHJcbiAgICBsYWJlbCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGdhcDogNnB4O1xyXG4gICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgICBpbnB1dCB7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYnRuLWV4cG9ydCB7XHJcbiAgICBwYWRkaW5nOiA2cHggOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgY29sb3I6ICMwNWQwZTY7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogNnB4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xyXG4gIC5sZWZ0LXBhbmVsLFxyXG4gIC5yaWdodC1wYW5lbCB7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbiAgfVxyXG5cclxuICAubWVzc2FnZSB7XHJcbiAgICBtYXgtd2lkdGg6IDgwJTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5tYWluLWFyZWEge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgfVxyXG5cclxuICAuY2hhdC1jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC5sZWZ0LXBhbmVsLFxyXG4gIC5yaWdodC1wYW5lbCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxuICB9XHJcblxyXG4gIC5tZXNzYWdlIHtcclxuICAgIG1heC13aWR0aDogODUlO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1626:
/*!***********************************************************!*\
  !*** ./src/app/features/dashboard/dashboard.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/incidents.service */ 6727);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);







const _c0 = () => ["email", "sms", "push"];
function DashboardComponent_li_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", ctx_r0.incidentesRecientes[0].id, " \u2014 Prioridad ", ctx_r0.incidentesRecientes[0].priority, " ");
  }
}
function DashboardComponent_li_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r0.incidentesRecientes[1].id, " \u2014 Requiere atenci\u00F3n ");
  }
}
function DashboardComponent_li_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " No hay incidentes pendientes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function DashboardComponent_li_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Hace poco");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const inc_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", inc_r2.id, " actualizado");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Cambio de prioridad a ", inc_r2.priority, " ");
  }
}
function DashboardComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DashboardComponent_div_53_Template_div_click_0_listener() {
      const canal_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.toggleCanal(canal_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const canal_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 4, canal_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", ctx_r0.canalesActivos[canal_r4]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r0.canalesActivos[canal_r4] ? "On" : "Off", " ");
  }
}
function DashboardComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41)(1, "div", 42)(2, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 44)(5, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.usuarioActual.nombre.charAt(0));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.usuarioActual.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.usuarioActual.role);
  }
}
class DashboardComponent {
  /**
   * Constructor inyecta servicios necesarios
   */
  constructor(incidentsService, authService, notificationService) {
    this.incidentsService = incidentsService;
    this.authService = authService;
    this.notificationService = notificationService;
    // Usuario autenticado
    this.usuarioActual = null;
    // Datos de incidentes
    this.incidentes = [];
    this.incidentesRecientes = [];
    // Estados de canales
    this.canalesActivos = {
      email: true,
      sms: true,
      push: true
    };
  }
  /**
   * ngOnInit: se ejecuta al inicializar el componente
   */
  ngOnInit() {
    // Obtener usuario autenticado
    this.usuarioActual = this.authService.getUsuarioActual();
    // Obtener incidentes
    this.incidentsService.obtenerIncidencias().subscribe(incidentes => {
      this.incidentes = incidentes;
      // Obtener los últimos 2 incidentes
      this.incidentesRecientes = incidentes.slice(0, 2);
    });
  }
  /**
   * Método probarAlerta: simula la llegada de una notificación
   */
  probarAlerta() {
    this.notificationService.toast('✓ Notificación de prueba enviada correctamente', 3000, 'success');
  }
  /**
   * Método toggleCanal: alterna el estado de un canal
   *
   * @param canal - Nombre del canal (email, sms, push)
   */
  toggleCanal(canal) {
    this.canalesActivos[canal] = !this.canalesActivos[canal];
    const estado = this.canalesActivos[canal] ? 'activado' : 'desactivado';
    this.notificationService.toast(`Canal ${canal} ${estado}`, 2000, 'info');
  }
  /**
   * Método logout: cierra la sesión
   */
  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
    }
  }
  /**
   * Método obtenerEstadísticas: calcula estadísticas de incidentes
   *
   * @returns objeto con conteos
   */
  obtenerEstadísticas() {
    return this.incidentsService.obtenerEstadísticas();
  }
  static {
    this.ɵfac = function DashboardComponent_Factory(t) {
      return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__.IncidentsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: DashboardComponent,
      selectors: [["app-dashboard"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 81,
      vars: 8,
      consts: [[1, "dashboard-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-left"], [1, "status-badge"], [1, "status-dot"], [1, "topbar-right"], ["type", "text", "placeholder", "Buscar incidencias o usuarios", 1, "search-input"], ["title", "Probar alerta de notificaci\u00F3n", 1, "btn-action", 3, "click"], [1, "dashboard-content"], [1, "col-main"], [1, "card", "welcome"], [1, "subtitle"], [1, "welcome-grid"], [1, "tile"], [1, "incident-list"], [4, "ngIf"], [1, "muted"], [1, "card", "recent-events"], [1, "card-header"], [1, "events-list"], [4, "ngFor", "ngForOf"], [1, "col-right"], [1, "card", "channels"], [1, "btn-small"], [1, "channel-list"], ["class", "channel-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "card", "rules"], [1, "rule-list"], [1, "rule-item"], [1, "rule-title"], [1, "card", "preview"], [1, "preview-list"], [1, "preview-item", "success"], [1, "preview-item", "warning"], [1, "preview-item", "error"], ["class", "user-card", 4, "ngIf"], [1, "event-detail"], [1, "time"], [1, "channel-item", 3, "click"], [1, "toggle-switch"], [1, "user-card"], [1, "user-card-content"], [1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-role"]],
      template: function DashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "main", 1)(3, "header", 2)(4, "div", 3)(5, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Panel Principal");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Activo ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DashboardComponent_Template_button_click_12_listener() {
            return ctx.probarAlerta();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, " Probar alerta ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 9)(15, "section", 10)(16, "div", 11)(17, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "p", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Resumen r\u00E1pido de tu sesi\u00F3n y tareas importantes.");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 13)(22, "div", 14)(23, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Incidentes mayores pendientes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "ul", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, DashboardComponent_li_26_Template, 2, 2, "li", 16)(27, DashboardComponent_li_27_Template, 2, 1, "li", 16)(28, DashboardComponent_li_28_Template, 2, 0, "li", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "div", 14)(30, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Mensajes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "p", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "No hay mensajes nuevos.");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 14)(35, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, "Resumen de sistema");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "p", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, "\u2713 Estado del sistema: Operativo");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 18)(40, "div", 19)(41, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "Eventos recientes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "ul", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](44, DashboardComponent_li_44_Template, 7, 2, "li", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "aside", 22)(46, "div", 23)(47, "div", 19)(48, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Canales");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](51, "+ Agregar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "div", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](53, DashboardComponent_div_53_Template, 6, 6, "div", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "div", 27)(55, "div", 19)(56, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, "Reglas r\u00E1pidas");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "div", 28)(59, "div", 29)(60, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61, "Alta prioridad");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "Editar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "div", 29)(65, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](66, "Nueva asignaci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "button", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](68, "Editar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](69, "div", 31)(70, "div", 19)(71, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](72, "Vista previa de notificaciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](73, "div", 32)(74, "div", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](75, "\u2713 Incidente resuelto");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](76, "div", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](77, "\uD83D\uDD14 Tiene nueva actividad");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](78, "div", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](79, "\u274C Error en env\u00EDo");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](80, DashboardComponent_div_80_Template, 9, 3, "div", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u00A1Bienvenido, ", ctx.usuarioActual == null ? null : ctx.usuarioActual.nombre, "!");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.incidentesRecientes.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.incidentesRecientes.length > 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.incidentesRecientes.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.incidentesRecientes);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c0));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](27);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.usuarioActual);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.UpperCasePipe, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n\n\n\n\n.dashboard-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n}\n\n\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n  background: linear-gradient(180deg, rgba(15, 23, 32, 0.8), rgba(11, 17, 22, 0.9));\n  gap: 16px;\n}\n\n.topbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.topbar-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0;\n  color: #e6eef6;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #19d38f;\n}\n\n.status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: #19d38f;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.topbar-right[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  min-width: 250px;\n  font-size: 13px;\n}\n.topbar-right[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]::placeholder {\n  color: #9aa5b1;\n}\n.topbar-right[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n  background: rgba(5, 208, 230, 0.05);\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s ease;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n  border-color: rgba(5, 208, 230, 0.3);\n  color: #05d0e6;\n}\n.btn-action.btn-logout[_ngcontent-%COMP%] {\n  color: #ff5757;\n  border-color: rgba(255, 87, 87, 0.2);\n}\n.btn-action.btn-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 87, 87, 0.1);\n  border-color: rgba(255, 87, 87, 0.4);\n}\n\n\n\n.dashboard-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  gap: 16px;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.col-main[_ngcontent-%COMP%] {\n  flex: 2;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n}\n\n.col-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 300px;\n}\n\n\n\n.card[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .card-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #e6eef6;\n  font-size: 14px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n\n\n.welcome[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #e6eef6;\n  margin: 0 0 4px;\n  font-size: 18px;\n}\n.welcome[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 13px;\n  margin: 0 0 16px;\n}\n\n.welcome-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n}\n\n.tile[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.01);\n  border: 1px solid rgba(255, 255, 255, 0.02);\n  border-radius: 8px;\n  padding: 12px;\n}\n.tile[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dff0ff;\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.tile[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], .tile[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: #9aa5b1;\n}\n.tile[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n.tile[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 4px 0;\n}\n\n\n\n.recent-events[_ngcontent-%COMP%]   .events-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.recent-events[_ngcontent-%COMP%]   .events-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px;\n  background: rgba(255, 255, 255, 0.01);\n  border-radius: 6px;\n  font-size: 12px;\n}\n.recent-events[_ngcontent-%COMP%]   .events-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dff0ff;\n  display: block;\n}\n.recent-events[_ngcontent-%COMP%]   .events-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .event-detail[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 11px;\n  margin-top: 4px;\n}\n.recent-events[_ngcontent-%COMP%]   .events-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {\n  color: #5a6b77;\n  font-size: 10px;\n}\n\n\n\n.channel-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.channel-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px;\n  background: rgba(255, 255, 255, 0.01);\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.channel-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.03);\n}\n.channel-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9aa5b1;\n  cursor: pointer;\n}\n\n.toggle-switch[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 20px;\n  background: rgba(255, 87, 87, 0.2);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 2px;\n  font-size: 10px;\n  color: #ff5757;\n  transition: all 0.2s ease;\n}\n.toggle-switch.active[_ngcontent-%COMP%] {\n  background: rgba(25, 211, 143, 0.2);\n  justify-content: flex-end;\n  color: #19d38f;\n}\n\n\n\n.rule-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.rule-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px;\n  background: rgba(255, 255, 255, 0.01);\n  border-radius: 6px;\n}\n.rule-item[_ngcontent-%COMP%]   .rule-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9aa5b1;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #05d0e6;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-small[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n  border-color: rgba(5, 208, 230, 0.3);\n}\n\n\n\n.preview-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.preview-item[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n}\n.preview-item.success[_ngcontent-%COMP%] {\n  background: rgba(25, 211, 143, 0.1);\n  border-color: rgba(25, 211, 143, 0.2);\n  color: #19d38f;\n}\n.preview-item.warning[_ngcontent-%COMP%] {\n  background: rgba(255, 193, 7, 0.1);\n  border-color: rgba(255, 193, 7, 0.2);\n  color: #ffc107;\n}\n.preview-item.error[_ngcontent-%COMP%] {\n  background: rgba(255, 87, 87, 0.1);\n  border-color: rgba(255, 87, 87, 0.2);\n  color: #ff5757;\n}\n\n\n\n.user-card[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  background: linear-gradient(180deg, rgba(15, 23, 32, 0.95), rgba(11, 17, 22, 0.95));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 12px 16px;\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n\n.user-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #05d0e6;\n  color: #04232f;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #e6eef6;\n}\n\n.user-role[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #9aa5b1;\n}\n\n\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n\n\n@media (max-width: 1024px) {\n  .dashboard-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .col-right[_ngcontent-%COMP%] {\n    min-width: auto;\n    flex: none;\n  }\n}\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .topbar-right[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n  }\n  .topbar-right[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n    min-width: auto;\n    flex: 1;\n  }\n  .dashboard-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .welcome-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .user-card[_ngcontent-%COMP%] {\n    bottom: 10px;\n    right: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUFBO0FBTUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtBQUFGOztBQUdBO0VBQ0UsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2REFBQTtBQUFGOztBQUdBLHNCQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0RBQUE7RUFDQSxpRkFBQTtFQUNBLFNBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFBRjtBQUVFO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FBQUo7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFERjs7QUFJQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0FBREY7O0FBSUE7RUFDRTtJQUFXLFVBQUE7RUFBWDtFQUNBO0lBQU0sWUFBQTtFQUVOO0FBQ0Y7QUFBQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFFRjtBQUFFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBRUo7QUFBSTtFQUNFLGNBQUE7QUFFTjtBQUNJO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsbUNBQUE7QUFDTjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFERjtBQUdFO0VBQ0Usa0NBQUE7RUFDQSxvQ0FBQTtFQUNBLGNBQUE7QUFESjtBQUlFO0VBQ0UsY0FBQTtFQUNBLG9DQUFBO0FBRko7QUFJSTtFQUNFLGtDQUFBO0VBQ0Esb0NBQUE7QUFGTjs7QUFPQSx3QkFBQTtBQUNBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBSkY7O0FBT0E7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7QUFKRjs7QUFPQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFPQSxhQUFBO0FBQ0E7RUFDRSx5RkFBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBSkY7O0FBT0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBSkY7QUFNRTtFQUNFLFNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUpKO0FBT0U7RUFDRSxlQUFBO0FBTEo7O0FBU0EsMEJBQUE7QUFFRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQVBKO0FBVUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBUko7O0FBWUE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0FBVEY7O0FBWUE7RUFDRSxxQ0FBQTtFQUNBLDJDQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBVEY7QUFXRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFUSjtBQVlFO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBVko7QUFhRTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtBQVhKO0FBYUk7RUFDRSxjQUFBO0FBWE47O0FBZ0JBLHNCQUFBO0FBRUU7RUFDRSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQWRKO0FBZ0JJO0VBQ0UsWUFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBZE47QUFnQk07RUFDRSxjQUFBO0VBQ0EsY0FBQTtBQWRSO0FBaUJNO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBZlI7QUFrQk07RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQWhCUjs7QUFzQkEsWUFBQTtBQUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQW5CRjs7QUFzQkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBbkJGO0FBcUJFO0VBQ0UscUNBQUE7QUFuQko7QUFzQkU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFwQko7O0FBd0JBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQXJCRjtBQXVCRTtFQUNFLG1DQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0FBckJKOztBQXlCQSxXQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBdEJGOztBQXlCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7QUF0QkY7QUF3QkU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQXRCSjs7QUEwQkE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBdkJGO0FBeUJFO0VBQ0Usa0NBQUE7RUFDQSxvQ0FBQTtBQXZCSjs7QUEyQkEsaUJBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUF4QkY7O0FBMkJBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDJDQUFBO0FBeEJGO0FBMEJFO0VBQ0UsbUNBQUE7RUFDQSxxQ0FBQTtFQUNBLGNBQUE7QUF4Qko7QUEyQkU7RUFDRSxrQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsY0FBQTtBQXpCSjtBQTRCRTtFQUNFLGtDQUFBO0VBQ0Esb0NBQUE7RUFDQSxjQUFBO0FBMUJKOztBQThCQSxnQ0FBQTtBQUNBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EseUNBQUE7RUFDQSxZQUFBO0FBM0JGOztBQThCQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUEzQkY7O0FBOEJBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBM0JGOztBQThCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUEzQkY7O0FBOEJBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQTNCRjs7QUE4QkE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQTNCRjs7QUE4QkEsV0FBQTtBQUNBO0VBQ0UsVUFBQTtBQTNCRjs7QUE4QkE7RUFDRSx1QkFBQTtBQTNCRjs7QUE4QkE7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0FBM0JGO0FBNkJFO0VBQ0Usb0NBQUE7QUEzQko7O0FBK0JBLGVBQUE7QUFDQTtFQUNFO0lBQ0Usc0JBQUE7RUE1QkY7RUErQkE7SUFDRSxlQUFBO0lBQ0EsVUFBQTtFQTdCRjtBQUNGO0FBZ0NBO0VBQ0U7SUFDRSxjQUFBO0VBOUJGO0VBaUNBO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0VBL0JGO0VBa0NBO0lBQ0UsV0FBQTtJQUNBLGVBQUE7RUFoQ0Y7RUFrQ0U7SUFDRSxlQUFBO0lBQ0EsT0FBQTtFQWhDSjtFQW9DQTtJQUNFLGFBQUE7RUFsQ0Y7RUFxQ0E7SUFDRSwwQkFBQTtFQW5DRjtFQXNDQTtJQUNFLFlBQUE7SUFDQSxXQUFBO0VBcENGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBkYXNoYm9hcmQuY29tcG9uZW50LnNjc3NcclxuICogXHJcbiAqIEVzdGlsb3MgcGFyYSBlbCBjb21wb25lbnRlIGRhc2hib2FyZC5cclxuICovXHJcblxyXG4uZGFzaGJvYXJkLWxheW91dCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4ubWFpbi1hcmVhIHtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi1sZWZ0OiAyNjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGIxMTE2IDAlLCAjMDcxMDE4IDEwMCUpO1xyXG59XHJcblxyXG4vKiBDYWJlY2VyYSBzdXBlcmlvciAqL1xyXG4udG9wYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDE2cHggMjRweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDE1LCAyMywgMzIsIDAuOCksIHJnYmEoMTEsIDE3LCAyMiwgMC45KSk7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4udG9wYmFyLWxlZnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEycHg7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1cy1iYWRnZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogNnB4O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogIzE5ZDM4ZjtcclxufVxyXG5cclxuLnN0YXR1cy1kb3Qge1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgYmFja2dyb3VuZDogIzE5ZDM4ZjtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYW5pbWF0aW9uOiBwdWxzZSAycyBpbmZpbml0ZTtcclxufVxyXG5cclxuQGtleWZyYW1lcyBwdWxzZSB7XHJcbiAgMCUsIDEwMCUgeyBvcGFjaXR5OiAxOyB9XHJcbiAgNTAlIHsgb3BhY2l0eTogMC41OyB9XHJcbn1cclxuXHJcbi50b3BiYXItcmlnaHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMnB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gIC5zZWFyY2gtaW5wdXQge1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgbWluLXdpZHRoOiAyNTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuXHJcbiAgICAmOjpwbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgfVxyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3JkZXItY29sb3I6ICMwNWQwZTY7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMDUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmJ0bi1hY3Rpb24ge1xyXG4gIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiAjZTZlZWY2O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjMpO1xyXG4gICAgY29sb3I6ICMwNWQwZTY7XHJcbiAgfVxyXG5cclxuICAmLmJ0bi1sb2dvdXQge1xyXG4gICAgY29sb3I6ICNmZjU3NTc7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCA4NywgODcsIDAuMik7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA4NywgODcsIDAuMSk7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDg3LCA4NywgMC40KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qIENvbnRlbmlkbyBwcmluY2lwYWwgKi9cclxuLmRhc2hib2FyZC1jb250ZW50IHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmNvbC1tYWluIHtcclxuICBmbGV4OiAyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE2cHg7XHJcbiAgbWluLXdpZHRoOiAwO1xyXG59XHJcblxyXG4uY29sLXJpZ2h0IHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE2cHg7XHJcbiAgbWluLXdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLyogVGFyamV0YXMgKi9cclxuLmNhcmQge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMiksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSkpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG59XHJcblxyXG4uY2FyZC1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxuXHJcbiAgaDMsIGg0IHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgaDMge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gIH1cclxufVxyXG5cclxuLyogVGFyamV0YSBkZSBiaWVudmVuaWRhICovXHJcbi53ZWxjb21lIHtcclxuICBoMyB7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIG1hcmdpbjogMCAwIDRweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcblxyXG4gIC5zdWJ0aXRsZSB7XHJcbiAgICBjb2xvcjogIzlhYTViMTtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbjogMCAwIDE2cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ud2VsY29tZS1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xyXG4gIGdhcDogMTJweDtcclxufVxyXG5cclxuLnRpbGUge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMTJweDtcclxuXHJcbiAgaDQge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6ICNkZmYwZmY7XHJcbiAgICBtYXJnaW46IDAgMCA4cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcblxyXG4gIHVsLCBwIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gIH1cclxuXHJcbiAgdWwge1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgbGkge1xyXG4gICAgICBwYWRkaW5nOiA0cHggMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qIEV2ZW50b3MgcmVjaWVudGVzICovXHJcbi5yZWNlbnQtZXZlbnRzIHtcclxuICAuZXZlbnRzLWxpc3Qge1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogOHB4O1xyXG5cclxuICAgIGxpIHtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuXHJcbiAgICAgIHN0cm9uZyB7XHJcbiAgICAgICAgY29sb3I6ICNkZmYwZmY7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5ldmVudC1kZXRhaWwge1xyXG4gICAgICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgICAgICBtYXJnaW4tdG9wOiA0cHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC50aW1lIHtcclxuICAgICAgICBjb2xvcjogIzVhNmI3NztcclxuICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qIENhbmFsZXMgKi9cclxuLmNoYW5uZWwtbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uY2hhbm5lbC1pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIH1cclxuXHJcbiAgbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4udG9nZ2xlLXN3aXRjaCB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA4NywgODcsIDAuMik7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgY29sb3I6ICNmZjU3NTc7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgJi5hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNSwgMjExLCAxNDMsIDAuMik7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgY29sb3I6ICMxOWQzOGY7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBSZWdsYXMgKi9cclxuLnJ1bGUtbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4ucnVsZS1pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuXHJcbiAgLnJ1bGUtdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLXNtYWxsIHtcclxuICBwYWRkaW5nOiA0cHggOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiAjMDVkMGU2O1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjMpO1xyXG4gIH1cclxufVxyXG5cclxuLyogVmlzdGEgcHJldmlhICovXHJcbi5wcmV2aWV3LWxpc3Qge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDhweDtcclxufVxyXG5cclxuLnByZXZpZXctaXRlbSB7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuXHJcbiAgJi5zdWNjZXNzIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjUsIDIxMSwgMTQzLCAwLjEpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1LCAyMTEsIDE0MywgMC4yKTtcclxuICAgIGNvbG9yOiAjMTlkMzhmO1xyXG4gIH1cclxuXHJcbiAgJi53YXJuaW5nIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxOTMsIDcsIDAuMSk7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAxOTMsIDcsIDAuMik7XHJcbiAgICBjb2xvcjogI2ZmYzEwNztcclxuICB9XHJcblxyXG4gICYuZXJyb3Ige1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDg3LCA4NywgMC4xKTtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDg3LCA4NywgMC4yKTtcclxuICAgIGNvbG9yOiAjZmY1NzU3O1xyXG4gIH1cclxufVxyXG5cclxuLyogVGFyamV0YSBkZSB1c3VhcmlvIGZsb3RhbnRlICovXHJcbi51c2VyLWNhcmQge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3R0b206IDIwcHg7XHJcbiAgcmlnaHQ6IDIwcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgxNSwgMjMsIDMyLCAwLjk1KSwgcmdiYSgxMSwgMTcsIDIyLCAwLjk1KSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDEycHggMTZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTJweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIHotaW5kZXg6IDk5OTtcclxufVxyXG5cclxuLnVzZXItY2FyZC1jb250ZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogOHB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi51c2VyLWF2YXRhciB7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiAjMDVkMGU2O1xyXG4gIGNvbG9yOiAjMDQyMzJmO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLnVzZXItZGV0YWlscyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMnB4O1xyXG59XHJcblxyXG4udXNlci1uYW1lIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2U2ZWVmNjtcclxufVxyXG5cclxuLnVzZXItcm9sZSB7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG59XHJcblxyXG4vKiBTY3JvbGwgKi9cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDhweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi8qIFJlc3BvbnNpdmUgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xyXG4gIC5kYXNoYm9hcmQtY29udGVudCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLmNvbC1yaWdodCB7XHJcbiAgICBtaW4td2lkdGg6IGF1dG87XHJcbiAgICBmbGV4OiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLm1haW4tYXJlYSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICB9XHJcblxyXG4gIC50b3BiYXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMTJweDtcclxuICB9XHJcblxyXG4gIC50b3BiYXItcmlnaHQge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcblxyXG4gICAgLnNlYXJjaC1pbnB1dCB7XHJcbiAgICAgIG1pbi13aWR0aDogYXV0bztcclxuICAgICAgZmxleDogMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5kYXNoYm9hcmQtY29udGVudCB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gIH1cclxuXHJcbiAgLndlbGNvbWUtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcblxyXG4gIC51c2VyLWNhcmQge1xyXG4gICAgYm90dG9tOiAxMHB4O1xyXG4gICAgcmlnaHQ6IDEwcHg7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 7322:
/*!*********************************************************************************!*\
  !*** ./src/app/features/incidents/incident-detail/incident-detail.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncidentDetailComponent: () => (/* binding */ IncidentDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/services/incidents.service */ 6727);







function IncidentDetailComponent_h1_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", ctx_r0.incidente.id, " - ", ctx_r0.incidente.title, "");
  }
}
function IncidentDetailComponent_div_8_div_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13)(1, "div", 14)(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const comment_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](comment_r2.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](comment_r2.date);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](comment_r2.text);
  }
}
function IncidentDetailComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6)(1, "section", 7)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Informaci\u00F3n General");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 8)(5, "div", 9)(6, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 9)(11, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Prioridad");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 9)(16, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Asignado a");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 9)(21, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Proyecto");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "section", 7)(26, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Informaci\u00F3n del Reportante");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 8)(29, "div", 9)(30, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Usuario");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 9)(35, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Correo");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 9)(40, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "Aplicaci\u00F3n Afectada");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "div", 9)(45, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Motivo");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "section", 7)(50, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](53, IncidentDetailComponent_div_8_div_53_Template, 8, 3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.state);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.priority);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.assignee);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.project);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.user);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.userEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.app);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.incidente.reason);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Comentarios (", ctx_r0.incidente.comments.length, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.incidente.comments);
  }
}
class IncidentDetailComponent {
  constructor(route, incidentsService) {
    this.route = route;
    this.incidentsService = incidentsService;
    this.incidenteId = '';
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.incidenteId = params['id'];
      this.cargarIncidente();
    });
  }
  cargarIncidente() {
    this.incidente = this.incidentsService.obtenerIncidenciaPorId(this.incidenteId);
  }
  static {
    this.ɵfac = function IncidentDetailComponent_Factory(t) {
      return new (t || IncidentDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__.IncidentsService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: IncidentDetailComponent,
      selectors: [["app-incident-detail"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 9,
      vars: 2,
      consts: [[1, "layout"], [1, "main-area"], [1, "topbar"], ["routerLink", "/incidents", 1, "btn-back"], [4, "ngIf"], ["class", "content", 4, "ngIf"], [1, "content"], [1, "detail-section"], [1, "info-grid"], [1, "info-item"], [1, "value"], [1, "comments-list"], ["class", "comment", 4, "ngFor", "ngForOf"], [1, "comment"], [1, "comment-header"], [1, "comment-date"], [1, "comment-body"]],
      template: function IncidentDetailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "main", 1)(3, "header", 2)(4, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2190 Volver");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, IncidentDetailComponent_h1_6_Template, 2, 2, "h1", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, IncidentDetailComponent_div_8_Template, 54, 10, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.incidente);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.incidente);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
      styles: ["\n\n\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 18px;\n  margin: 0;\n  color: #e6eef6;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #05d0e6;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.detail-section[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: #e6eef6;\n  font-size: 14px;\n}\n\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #9aa5b1;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n}\n.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #dff0ff;\n  font-size: 13px;\n}\n\n.comments-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.comment[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.01);\n  border-radius: 6px;\n  padding: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.02);\n}\n\n.comment-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.comment-header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dff0ff;\n  font-size: 12px;\n}\n\n.comment-date[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 10px;\n}\n\n.comment-body[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 12px;\n  line-height: 1.4;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n}\n\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaW5jaWRlbnRzL2luY2lkZW50LWRldGFpbC9pbmNpZGVudC1kZXRhaWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBQUE7QUFJQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw2REFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxrREFBQTtBQUFGO0FBRUU7RUFDRSxPQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FBQUo7O0FBSUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFERjtBQUdFO0VBQ0Usa0NBQUE7QUFESjs7QUFLQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLHlGQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUZGO0FBSUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBRko7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0FBSEY7O0FBT0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBSko7QUFPRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBTEo7O0FBU0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBTkY7O0FBU0E7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDJDQUFBO0FBTkY7O0FBU0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQU5GO0FBUUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQU5KOztBQVVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFQRjs7QUFVQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFQRjs7QUFVQTtFQUNFLFVBQUE7QUFQRjs7QUFVQTtFQUNFLHFDQUFBO0VBQ0Esa0JBQUE7QUFQRjs7QUFVQTtFQUNFO0lBQ0UsY0FBQTtFQVBGO0VBVUE7SUFDRSwwQkFBQTtFQVJGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBpbmNpZGVudC1kZXRhaWwuY29tcG9uZW50LnNjc3NcclxuICovXHJcblxyXG4ubGF5b3V0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi5tYWluLWFyZWEge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWFyZ2luLWxlZnQ6IDI2MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGIxMTE2IDAlLCAjMDcxMDE4IDEwMCUpO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi50b3BiYXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDE2cHg7XHJcbiAgcGFkZGluZzogMTZweCAyNHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG5cclxuICBoMSB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6ICNlNmVlZjY7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWJhY2sge1xyXG4gIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiAjMDVkMGU2O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBmbGV4OiAxO1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmRldGFpbC1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDAgMCAxNnB4O1xyXG4gICAgY29sb3I6ICNlNmVlZjY7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uaW5mby1ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLmluZm8taXRlbSB7XHJcbiAgbGFiZWwge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBjb2xvcjogIzlhYTViMTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbiAgfVxyXG5cclxuICAudmFsdWUge1xyXG4gICAgY29sb3I6ICNkZmYwZmY7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgfVxyXG59XHJcblxyXG4uY29tbWVudHMtbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTJweDtcclxufVxyXG5cclxuLmNvbW1lbnQge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxufVxyXG5cclxuLmNvbW1lbnQtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcblxyXG4gIHN0cm9uZyB7XHJcbiAgICBjb2xvcjogI2RmZjBmZjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbi5jb21tZW50LWRhdGUge1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLmNvbW1lbnQtYm9keSB7XHJcbiAgY29sb3I6ICM5YWE1YjE7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA4cHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAubWFpbi1hcmVhIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gIH1cclxuXHJcbiAgLmluZm8tZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 9906:
/*!***********************************************************!*\
  !*** ./src/app/features/incidents/incidents.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IncidentsComponent: () => (/* binding */ IncidentsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/incidents.service */ 6727);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);








function IncidentsComponent_tr_70_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " No hay incidentes. \u00A1Crea uno con el bot\u00F3n \"Nueva Incidencia\"! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function IncidentsComponent_tr_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "td")(7, "select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function IncidentsComponent_tr_71_Template_select_change_7_listener($event) {
      const inc_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.cambiarEstado(inc_r2, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Abierto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "En proceso");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Pendiente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Resuelto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "td")(17, "select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function IncidentsComponent_tr_71_Template_select_change_17_listener($event) {
      const inc_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.cambiarPrioridad(inc_r2, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Baja");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Media");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Alta");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Cr\u00EDtica");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "td")(33, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Ver");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const inc_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](inc_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](inc_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", inc_r2.state);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", inc_r2.priority);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](inc_r2.assignee);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](inc_r2.project);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](inc_r2.date);
  }
}
function IncidentsComponent_div_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_div_72_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_div_72_Template_div_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 29)(3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Nueva Incidencia");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_div_72_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 31)(8, "div", 32)(9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "T\u00EDtulo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_div_72_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r2.nuevaIncidencia.titulo, $event) || (ctx_r2.nuevaIncidencia.titulo = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 32)(15, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Descripci\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "textarea", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_div_72_Template_textarea_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r2.nuevaIncidencia.descripcion, $event) || (ctx_r2.nuevaIncidencia.descripcion = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 36)(21, "div", 32)(22, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_div_72_Template_select_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r2.nuevaIncidencia.estado, $event) || (ctx_r2.nuevaIncidencia.estado = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Abierto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "En Progreso");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "Pendiente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Cerrado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 32)(34, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Impacto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "select", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_div_72_Template_select_ngModelChange_36_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r2.nuevaIncidencia.impacto, $event) || (ctx_r2.nuevaIncidencia.impacto = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "option", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "Bajo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "option", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Medio");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "option", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Alto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Cr\u00EDtico");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 32)(46, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Ubicaci\u00F3n / \u00C1rea afectada");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_div_72_Template_input_ngModelChange_48_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx_r2.nuevaIncidencia.ubicacion, $event) || (ctx_r2.nuevaIncidencia.ubicacion = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 47)(50, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_div_72_Template_button_click_50_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_div_72_Template_button_click_52_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.guardarIncidencia());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevaIncidencia.titulo);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevaIncidencia.descripcion);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevaIncidencia.estado);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevaIncidencia.impacto);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevaIncidencia.ubicacion);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r2.guardando);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r2.guardando);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r2.guardando ? "Guardando..." : "\uD83D\uDCBE Guardar Incidencia", " ");
  }
}
class IncidentsComponent {
  constructor(incidentsService, notificationService) {
    this.incidentsService = incidentsService;
    this.notificationService = notificationService;
    this.incidentes = [];
    this.incidentesFiltrados = [];
    this.filtroEstado = 'all';
    this.busqueda = '';
    // Modal nueva incidencia
    this.mostrarModal = false;
    this.guardando = false;
    this.nuevaIncidencia = {
      titulo: '',
      descripcion: '',
      estado: 'Abierto',
      impacto: 'Medio',
      ubicacion: ''
    };
  }
  ngOnInit() {
    this.cargarIncidentes();
  }
  cargarIncidentes() {
    this.incidentsService.obtenerIncidencias().subscribe(incidentes => {
      this.incidentes = incidentes;
      this.aplicarFiltros();
    });
  }
  aplicarFiltros() {
    this.incidentesFiltrados = this.incidentes.filter(inc => {
      const cumpleFiltro = this.filtroEstado === 'all' || inc.state === this.filtroEstado;
      const cumpleBusqueda = this.busqueda === '' || inc.id.toLowerCase().includes(this.busqueda.toLowerCase()) || inc.title.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleFiltro && cumpleBusqueda;
    });
  }
  abrirModal() {
    this.nuevaIncidencia = {
      titulo: '',
      descripcion: '',
      estado: 'Abierto',
      impacto: 'Medio',
      ubicacion: ''
    };
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
  guardarIncidencia() {
    if (!this.nuevaIncidencia.titulo.trim() || !this.nuevaIncidencia.descripcion.trim()) {
      this.notificationService.toast('El título y la descripción son obligatorios', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.incidentsService.crearIncidencia(this.nuevaIncidencia).subscribe({
      next: resp => {
        this.guardando = false;
        this.mostrarModal = false;
        if (resp?.local) {
          this.notificationService.toast('Guardado localmente (sin conexión al servidor)', 4000, 'warning');
        } else {
          this.notificationService.toast('Incidencia creada correctamente', 3000, 'success');
        }
        this.incidentsService.cargarDesdeBackend();
      },
      error: () => {
        this.guardando = false;
        this.notificationService.toast('Error inesperado al guardar', 3000, 'error');
      }
    });
  }
  cambiarEstado(incidente, event) {
    const nuevoEstado = event.target.value;
    this.incidentsService.cambiarEstado(incidente.id, nuevoEstado);
    this.notificationService.toast(`Estado de ${incidente.id} actualizado`, 2000, 'success');
  }
  cambiarPrioridad(incidente, event) {
    const nuevaPrioridad = event.target.value;
    this.incidentsService.cambiarPrioridad(incidente.id, nuevaPrioridad);
    this.notificationService.toast(`Prioridad actualizada`, 2000, 'success');
  }
  asignar(incidente, nuevoAsignado) {
    this.incidentsService.asignarIncidencia(incidente.id, nuevoAsignado);
    this.notificationService.toast(`Asignado a ${nuevoAsignado}`, 2000, 'success');
  }
  obtenerEstadisticas() {
    return this.incidentsService.obtenerEstadísticas();
  }
  onFiltroChange() {
    this.aplicarFiltros();
  }
  onBusquedaChange() {
    this.aplicarFiltros();
  }
  static {
    this.ɵfac = function IncidentsComponent_Factory(t) {
      return new (t || IncidentsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_incidents_service__WEBPACK_IMPORTED_MODULE_1__.IncidentsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__.NotificationService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: IncidentsComponent,
      selectors: [["app-incidents"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 73,
      vars: 9,
      consts: [[1, "incidents-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-actions"], ["type", "text", "placeholder", "Filtrar incidentes", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "btn-action", 3, "click"], [1, "btn-primary", 3, "click"], [1, "content"], [1, "metrics"], [1, "metric-card"], [1, "metric-value"], [1, "incidents-section"], [1, "section-header"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], ["value", "open"], ["value", "inprogress"], ["value", "pending"], ["value", "resolved"], [1, "table-wrapper"], [1, "incidents-table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["colspan", "8", 2, "text-align", "center", "padding", "2rem", "color", "#888"], [1, "select-small", 3, "change", "value"], ["title", "Ver detalle", 1, "btn-small"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "required"], ["type", "text", "placeholder", "Resumen breve del incidente", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Describe el problema en detalle...", "rows", "4", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-row-2"], [1, "form-input", 3, "ngModelChange", "ngModel"], ["value", "Abierto"], ["value", "En Progreso"], ["value", "Pendiente"], ["value", "Cerrado"], ["value", "Bajo"], ["value", "Medio"], ["value", "Alto"], ["value", "Critico"], ["type", "text", "placeholder", "Ej: Oficina principal, Servidor A, M\u00F3dulo de pagos...", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-cancel", 3, "click", "disabled"], [1, "btn-save", 3, "click", "disabled"]],
      template: function IncidentsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "main", 1)(3, "header", 2)(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Panel de Incidentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 3)(7, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.busqueda, $event) || (ctx.busqueda = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function IncidentsComponent_Template_input_input_7_listener() {
            return ctx.onBusquedaChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_Template_button_click_8_listener() {
            return ctx.cargarIncidentes();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " \uD83D\uDD04 Actualizar ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function IncidentsComponent_Template_button_click_10_listener() {
            return ctx.abrirModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " \uFF0B Nueva Incidencia ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7)(13, "section", 8)(14, "div", 9)(15, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Abiertos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 9)(20, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "En proceso");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 9)(25, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Pendientes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 9)(30, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Resueltos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "section", 11)(35, "div", 12)(36, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Incidentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "select", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function IncidentsComponent_Template_select_ngModelChange_38_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.filtroEstado, $event) || (ctx.filtroEstado = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function IncidentsComponent_Template_select_change_38_listener() {
            return ctx.onFiltroChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "option", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Todos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "option", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Abierto");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "option", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "En proceso");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "option", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, "Pendiente");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "option", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "Resuelto");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 19)(50, "table", 20)(51, "thead")(52, "tr")(53, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "ID");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "T\u00EDtulo");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Estado");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Prioridad");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "Asignado");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64, "Proyecto / Ubicaci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Fecha");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, "Acciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](70, IncidentsComponent_tr_70_Template, 3, 0, "tr", 21)(71, IncidentsComponent_tr_71_Template, 35, 7, "tr", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](72, IncidentsComponent_div_72_Template, 54, 8, "div", 23);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.busqueda);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.obtenerEstadisticas().abiertos);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.obtenerEstadisticas().enProgreso);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.obtenerEstadisticas().pendientes);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.obtenerEstadisticas().resueltos);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.filtroEstado);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.incidentesFiltrados.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.incidentesFiltrados);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.mostrarModal);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n\n\n.incidents-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0;\n  color: #e6eef6;\n}\n\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  font-size: 13px;\n  min-width: 250px;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n  text-align: center;\n}\n.metric-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 12px;\n  margin: 0 0 8px;\n  text-transform: uppercase;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: bold;\n  color: #05d0e6;\n}\n\n.incidents-section[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #e6eef6;\n}\n.section-header[_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.incidents-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.incidents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.incidents-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  color: #dff0ff;\n  font-weight: 600;\n}\n.incidents-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  color: #9aa5b1;\n}\n.incidents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.05);\n}\n.incidents-table[_ngcontent-%COMP%]   .select-small[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  font-size: 11px;\n  cursor: pointer;\n}\n.incidents-table[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 12px;\n}\n.incidents-table[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n}\n\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  background: linear-gradient(135deg, #05d0e6, #0077ff);\n  color: #fff;\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: opacity 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.65);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  backdrop-filter: blur(4px);\n}\n\n.modal-card[_ngcontent-%COMP%] {\n  background: #0e1822;\n  border: 1px solid rgba(5, 208, 230, 0.2);\n  border-radius: 12px;\n  width: 520px;\n  max-width: 95vw;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #e6eef6;\n  margin: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #888;\n  font-size: 18px;\n  cursor: pointer;\n  padding: 4px;\n  line-height: 1;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  color: #e6eef6;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #a0b4c8;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #f87171;\n  margin-left: 2px;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.05);\n  color: #e6eef6;\n  font-size: 13px;\n  outline: none;\n  resize: vertical;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  border-color: rgba(5, 208, 230, 0.5);\n  background: rgba(5, 208, 230, 0.04);\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]::placeholder {\n  color: #4a6078;\n}\n\n.form-row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px 20px;\n  border-top: 1px solid rgba(255, 255, 255, 0.07);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: transparent;\n  color: #a0b4c8;\n  font-size: 13px;\n  cursor: pointer;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.05);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: none;\n  background: linear-gradient(135deg, #05d0e6, #0077ff);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaW5jaWRlbnRzL2luY2lkZW50cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFBQTtBQUlBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7QUFBRjs7QUFHQTtFQUNFLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDZEQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrREFBQTtBQUFGO0FBRUU7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUFBSjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFERjtBQUdFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBREo7QUFHSTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtBQUROOztBQU1BO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFIRjtBQUtFO0VBQ0Usa0NBQUE7QUFISjs7QUFPQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFPQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQUpGOztBQU9BO0VBQ0UseUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBSkY7QUFNRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBSko7QUFPRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFMSjs7QUFTQTtFQUNFLHlGQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFORjs7QUFTQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFORjtBQVFFO0VBQ0UsU0FBQTtFQUNBLGNBQUE7QUFOSjtBQVNFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFQSjs7QUFXQTtFQUNFLGdCQUFBO0FBUkY7O0FBV0E7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBUkY7QUFVRTtFQUNFLHFDQUFBO0VBQ0Esa0RBQUE7QUFSSjtBQVdFO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBVEo7QUFZRTtFQUNFLGFBQUE7RUFDQSxrREFBQTtFQUNBLGNBQUE7QUFWSjtBQWFFO0VBQ0UsbUNBQUE7QUFYSjtBQWNFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFaSjtBQWVFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBYko7QUFlSTtFQUNFLGtDQUFBO0FBYk47O0FBa0JBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7QUFmRjs7QUFrQkE7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0FBZkY7O0FBa0JBO0VBQ0U7SUFDRSxjQUFBO0VBZkY7RUFrQkE7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFoQkY7RUFtQkE7SUFDRSxxQ0FBQTtFQWpCRjtBQUNGO0FBcUJBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxxREFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSx3QkFBQTtBQW5CRjtBQXFCRTtFQUFVLGFBQUE7QUFsQlo7O0FBc0JBO0VBQ0UsZUFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLDBCQUFBO0FBbkJGOztBQXNCQTtFQUNFLG1CQUFBO0VBQ0Esd0NBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLDBDQUFBO0FBbkJGOztBQXNCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrREFBQTtBQW5CRjtBQXFCRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBbkJKO0FBc0JFO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFwQko7QUFxQkk7RUFBVSxjQUFBO0FBbEJkOztBQXNCQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQW5CRjs7QUFzQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBbkJGO0FBcUJFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQW5CSjtBQW9CSTtFQUFZLGNBQUE7RUFBZ0IsZ0JBQUE7QUFoQmhDO0FBbUJFO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0FBakJKO0FBbUJJO0VBQ0Usb0NBQUE7RUFDQSxtQ0FBQTtBQWpCTjtBQW9CSTtFQUFpQixjQUFBO0FBakJyQjs7QUFxQkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0FBbEJGOztBQXFCQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLCtDQUFBO0FBbEJGO0FBb0JFO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFsQko7QUFtQkk7RUFBVSxxQ0FBQTtBQWhCZDtBQWlCSTtFQUFhLFlBQUE7RUFBYyxtQkFBQTtBQWIvQjtBQWdCRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EscURBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBZEo7QUFlSTtFQUFVLGFBQUE7QUFaZDtBQWFJO0VBQWEsWUFBQTtFQUFjLG1CQUFBO0FBVC9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogaW5jaWRlbnRzLmNvbXBvbmVudC5zY3NzXHJcbiAqL1xyXG5cclxuLmluY2lkZW50cy1sYXlvdXQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG5cclxuLm1haW4tYXJlYSB7XHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tbGVmdDogMjYwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwYjExMTYgMCUsICMwNzEwMTggMTAwJSk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnRvcGJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAxNnB4IDI0cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gIH1cclxufVxyXG5cclxuLnRvcGJhci1hY3Rpb25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTJweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAuc2VhcmNoLWlucHV0IHtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1pbi13aWR0aDogMjUwcHg7XHJcblxyXG4gICAgJjpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogIzA1ZDBlNjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5idG4tYWN0aW9uIHtcclxuICBwYWRkaW5nOiA4cHggMTJweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICBjb2xvcjogI2U2ZWVmNjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgfVxyXG59XHJcblxyXG4uY29udGVudCB7XHJcbiAgZmxleDogMTtcclxuICBwYWRkaW5nOiAyNHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbi5tZXRyaWNzIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTUwcHgsIDFmcikpO1xyXG4gIGdhcDogMTZweDtcclxuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xyXG59XHJcblxyXG4ubWV0cmljLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMiksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSkpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgaDQge1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBtYXJnaW46IDAgMCA4cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIH1cclxuXHJcbiAgLm1ldHJpYy12YWx1ZSB7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gIH1cclxufVxyXG5cclxuLmluY2lkZW50cy1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuLnNlY3Rpb24taGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcblxyXG4gIGgzIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gIH1cclxuXHJcbiAgLmZpbHRlci1zZWxlY3Qge1xyXG4gICAgcGFkZGluZzogNnB4IDEycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG5cclxuLnRhYmxlLXdyYXBwZXIge1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuXHJcbi5pbmNpZGVudHMtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG5cclxuICB0aGVhZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgfVxyXG5cclxuICB0aCB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGNvbG9yOiAjZGZmMGZmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcblxyXG4gIHRkIHtcclxuICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gIH1cclxuXHJcbiAgdGJvZHkgdHI6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4wNSk7XHJcbiAgfVxyXG5cclxuICAuc2VsZWN0LXNtYWxsIHtcclxuICAgIHBhZGRpbmc6IDRweCA4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmJ0bi1zbWFsbCB7XHJcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLm1haW4tYXJlYSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICB9XHJcblxyXG4gIC50b3BiYXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMTJweDtcclxuICB9XHJcblxyXG4gIC5tZXRyaWNzIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDDosKUwoDDosKUwoAgQm90w4PCs24gTnVldmEgSW5jaWRlbmNpYSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcclxuLmJ0bi1wcmltYXJ5IHtcclxuICBwYWRkaW5nOiA4cHggMTZweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNWQwZTYsICMwMDc3ZmYpO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcclxuXHJcbiAgJjpob3ZlciB7IG9wYWNpdHk6IDAuODU7IH1cclxufVxyXG5cclxuLy8gw6LClMKAw6LClMKAIE1vZGFsIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxyXG4ubW9kYWwtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGluc2V0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42NSk7XHJcbiAgei1pbmRleDogMTAwMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XHJcbn1cclxuXHJcbi5tb2RhbC1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiAjMGUxODIyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNSwgMjA4LCAyMzAsIDAuMik7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICB3aWR0aDogNTIwcHg7XHJcbiAgbWF4LXdpZHRoOiA5NXZ3O1xyXG4gIG1heC1oZWlnaHQ6IDkwdmg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxuICBib3gtc2hhZG93OiAwIDIwcHggNjBweCByZ2JhKDAsIDAsIDAsIDAuNik7XHJcbn1cclxuXHJcbi5tb2RhbC1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMjBweCAyNHB4IDE2cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNyk7XHJcblxyXG4gIGgyIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcblxyXG4gIC5idG4tY2xvc2Uge1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGNvbG9yOiAjODg4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDE7XHJcbiAgICAmOmhvdmVyIHsgY29sb3I6ICNlNmVlZjY7IH1cclxuICB9XHJcbn1cclxuXHJcbi5tb2RhbC1ib2R5IHtcclxuICBwYWRkaW5nOiAyMHB4IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDZweDtcclxuXHJcbiAgbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjYTBiNGM4O1xyXG4gICAgLnJlcXVpcmVkIHsgY29sb3I6ICNmODcxNzE7IG1hcmdpbi1sZWZ0OiAycHg7IH1cclxuICB9XHJcblxyXG4gIC5mb3JtLWlucHV0IHtcclxuICAgIHBhZGRpbmc6IDEwcHggMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICByZXNpemU6IHZlcnRpY2FsO1xyXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnM7XHJcblxyXG4gICAgJjpmb2N1cyB7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSg1LCAyMDgsIDIzMCwgMC41KTtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4wNCk7XHJcbiAgICB9XHJcblxyXG4gICAgJjo6cGxhY2Vob2xkZXIgeyBjb2xvcjogIzRhNjA3ODsgfVxyXG4gIH1cclxufVxyXG5cclxuLmZvcm0tcm93LTIge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLm1vZGFsLWZvb3RlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGdhcDogMTJweDtcclxuICBwYWRkaW5nOiAxNnB4IDI0cHggMjBweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA3KTtcclxuXHJcbiAgLmJ0bi1jYW5jZWwge1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEyKTtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgY29sb3I6ICNhMGI0Yzg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAmOmhvdmVyIHsgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTsgfVxyXG4gICAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNTsgY3Vyc29yOiBub3QtYWxsb3dlZDsgfVxyXG4gIH1cclxuXHJcbiAgLmJ0bi1zYXZlIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNWQwZTYsICMwMDc3ZmYpO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICY6aG92ZXIgeyBvcGFjaXR5OiAwLjg1OyB9XHJcbiAgICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8556:
/*!*********************************************************!*\
  !*** ./src/app/features/projects/projects.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectsComponent: () => (/* binding */ ProjectsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_projects_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/projects.service */ 7326);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6443);










function ProjectsComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Cargando proyectos...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ProjectsComponent_div_28_table_1_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td")(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "td")(9, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "td", 22)(14, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_28_table_1_tr_16_Template_button_click_14_listener() {
      const p_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.abrirAsignar(p_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "\uD83D\uDC64 Asignar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_28_table_1_tr_16_Template_button_click_16_listener() {
      const p_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.eliminarProyecto(p_r2.id, p_r2.nombre));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "\uD83D\uDDD1\uFE0F Eliminar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r2.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r2.descripcion);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", p_r2.estado === "Activo")("archived", p_r2.estado !== "Activo");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r2.estado);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r2.fechaCreacion);
  }
}
function ProjectsComponent_div_28_table_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "table", 19)(1, "thead")(2, "tr")(3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Descripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Fecha Creaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Acciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ProjectsComponent_div_28_table_1_tr_16_Template, 18, 9, "tr", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.proyectos);
  }
}
function ProjectsComponent_div_28_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 25)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "No hay proyectos. Crea el primero con \"+ Nuevo Proyecto\".");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ProjectsComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ProjectsComponent_div_28_table_1_Template, 17, 1, "table", 18)(2, ProjectsComponent_div_28_ng_template_2_Template, 3, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const noProyectos_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](3);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.proyectos.length > 0)("ngIfElse", noProyectos_r4);
  }
}
function ProjectsComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_29_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_29_Template_div_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 28)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Nuevo Proyecto");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_29_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 30)(8, "div", 31)(9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Nombre *");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ProjectsComponent_div_29_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r2.nuevoProyecto.nombre, $event) || (ctx_r2.nuevoProyecto.nombre = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 31)(13, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Descripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "textarea", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ProjectsComponent_div_29_Template_textarea_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r2.nuevoProyecto.descripcion, $event) || (ctx_r2.nuevoProyecto.descripcion = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 31)(17, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ProjectsComponent_div_29_Template_select_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r2.nuevoProyecto.estado, $event) || (ctx_r2.nuevoProyecto.estado = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Activo");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Archivado");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 37)(25, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_29_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_29_Template_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.guardarProyecto());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevoProyecto.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevoProyecto.descripcion);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.nuevoProyecto.estado);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r2.guardando);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r2.guardando ? "Guardando..." : "Guardar Proyecto", " ");
  }
}
function ProjectsComponent_div_30_option_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const u_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", u_r7.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", u_r7.nombre, " ", u_r7.proyecto ? "(Proyecto: " + u_r7.proyecto + ")" : "", " ");
  }
}
function ProjectsComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_30_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarAsignar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_30_Template_div_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 28)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Asignar Usuario al Proyecto");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_30_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarAsignar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 30)(8, "div", 31)(9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Selecciona un usuario");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function ProjectsComponent_div_30_Template_select_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r2.idUsuarioSeleccionado, $event) || (ctx_r2.idUsuarioSeleccionado = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "-- Seleccionar --");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, ProjectsComponent_div_30_option_14_Template, 2, 3, "option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 37)(16, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_30_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.cerrarAsignar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_div_30_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.confirmarAsignacion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.idUsuarioSeleccionado);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.usuarios);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r2.asignando);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r2.asignando ? "Asignando..." : "Confirmar Asignaci\u00F3n", " ");
  }
}
class ProjectsComponent {
  constructor(projectsService, notificationService, http) {
    this.projectsService = projectsService;
    this.notificationService = notificationService;
    this.http = http;
    this.proyectos = [];
    this.cargando = false;
    // Modal nuevo proyecto
    this.mostrarModal = false;
    this.guardando = false;
    this.nuevoProyecto = {
      nombre: '',
      descripcion: '',
      estado: 'Activo'
    };
    // Panel asignación
    this.mostrarAsignar = false;
    this.idProyectoSeleccionado = 0;
    this.usuarios = [];
    this.idUsuarioSeleccionado = 0;
    this.asignando = false;
  }
  ngOnInit() {
    this.cargarProyectos();
  }
  cargarProyectos() {
    this.cargando = true;
    this.projectsService.cargarDesdeBackend();
    this.projectsService.obtenerProyectos().subscribe(data => {
      this.proyectos = data;
      this.cargando = false;
    });
  }
  abrirModal() {
    this.nuevoProyecto = {
      nombre: '',
      descripcion: '',
      estado: 'Activo'
    };
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
  guardarProyecto() {
    if (!this.nuevoProyecto.nombre.trim()) {
      this.notificationService.toast('El nombre es obligatorio', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.projectsService.crearProyecto(this.nuevoProyecto.nombre.trim(), this.nuevoProyecto.descripcion.trim(), this.nuevoProyecto.estado).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast('Proyecto creado', 3000, 'success');
        this.cargarProyectos();
      },
      error: err => {
        this.guardando = false;
        this.notificationService.toast('Error: ' + (err?.message || err), 4000, 'error');
      }
    });
  }
  eliminarProyecto(id, nombre) {
    if (!confirm(`¿Eliminar proyecto "${nombre}"?`)) return;
    this.projectsService.eliminarProyecto(id).subscribe({
      next: () => this.notificationService.toast('Proyecto eliminado', 3000, 'success'),
      error: err => this.notificationService.toast('Error: ' + (err?.message || err), 4000, 'error')
    });
  }
  abrirAsignar(idProyecto) {
    this.idProyectoSeleccionado = idProyecto;
    this.idUsuarioSeleccionado = 0;
    this.mostrarAsignar = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/usuarios`).subscribe({
      next: data => {
        this.usuarios = data.map(u => ({
          id: u.id,
          nombre: u.nombre,
          proyecto: u.proyecto || ''
        }));
      },
      error: () => {
        this.usuarios = [];
      }
    });
  }
  cerrarAsignar() {
    this.mostrarAsignar = false;
  }
  confirmarAsignacion() {
    if (!this.idUsuarioSeleccionado) {
      this.notificationService.toast('Selecciona un usuario', 3000, 'warning');
      return;
    }
    this.asignando = true;
    this.projectsService.asignarUsuario(this.idUsuarioSeleccionado, this.idProyectoSeleccionado).subscribe({
      next: () => {
        this.asignando = false;
        this.mostrarAsignar = false;
        this.notificationService.toast('Usuario asignado al proyecto', 3000, 'success');
        this.cargarProyectos();
      },
      error: err => {
        this.asignando = false;
        this.notificationService.toast('Error al asignar: ' + (err?.message || err), 4000, 'error');
      }
    });
  }
  static {
    this.ɵfac = function ProjectsComponent_Factory(t) {
      return new (t || ProjectsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_projects_service__WEBPACK_IMPORTED_MODULE_2__.ProjectsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: ProjectsComponent,
      selectors: [["app-projects"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 31,
      vars: 7,
      consts: [["noProyectos", ""], [1, "projects-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-actions"], [1, "btn-action", 3, "click"], [1, "btn-action", "primary", 3, "click"], [1, "content"], [1, "metrics"], [1, "metric-card"], [1, "metric-value"], [1, "projects-section"], [1, "section-header"], ["class", "loading-msg", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-msg"], [1, "table-wrapper"], ["class", "projects-table", 4, "ngIf", "ngIfElse"], [1, "projects-table"], [4, "ngFor", "ngForOf"], [1, "badge"], [1, "actions-cell"], [1, "btn-small", "info", 3, "click"], [1, "btn-small", "danger", 3, "click"], [1, "empty-state"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", "placeholder", "Plataforma SWO", 1, "form-input", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Descripci\u00F3n del proyecto", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-input", 3, "ngModelChange", "ngModel"], ["value", "Activo"], ["value", "Archivado"], [1, "modal-footer"], [1, "btn-action", "primary", 3, "click", "disabled"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"]],
      template: function ProjectsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "main", 2)(3, "header", 3)(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Gesti\u00F3n de Proyectos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4)(7, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_Template_button_click_7_listener() {
            return ctx.cargarProyectos();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Actualizar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ProjectsComponent_Template_button_click_9_listener() {
            return ctx.abrirModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "+ Nuevo Proyecto");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 7)(12, "section", 8)(13, "div", 9)(14, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Total Proyectos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 9)(19, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Activos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "section", 11)(24, "div", 12)(25, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, ProjectsComponent_div_27_Template, 2, 0, "div", 13)(28, ProjectsComponent_div_28_Template, 4, 2, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, ProjectsComponent_div_29_Template, 29, 5, "div", 15)(30, ProjectsComponent_div_30_Template, 20, 5, "div", 15);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.proyectos.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.proyectos.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Listado de Proyectos (", ctx.proyectos.length, ")");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.cargando);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.cargando);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.mostrarModal);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.mostrarAsignar);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n.projects-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 18px 28px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #e6eef6;\n  margin: 0;\n}\n\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 10px;\n  padding: 16px 20px;\n}\n.metric-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9aa5b1;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin: 0 0 8px;\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #05d0e6;\n}\n\n.projects-section[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  padding: 14px 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #c9d8e6;\n}\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.projects-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.projects-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  text-align: left;\n  color: #9aa5b1;\n  font-weight: 600;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  background: rgba(255, 255, 255, 0.02);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.projects-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.04);\n  color: #c9d8e6;\n}\n.projects-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.025);\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.badge.active[_ngcontent-%COMP%] {\n  background: rgba(5, 208, 230, 0.15);\n  color: #05d0e6;\n}\n.badge.archived[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.07);\n  color: #9aa5b1;\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.04);\n  color: #c9d8e6;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background: #05d0e6;\n  border-color: #05d0e6;\n  color: #0b1116;\n  font-weight: 600;\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover {\n  background: #04b8cf;\n}\n.btn-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 5px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.04);\n  color: #c9d8e6;\n  font-size: 12px;\n  cursor: pointer;\n}\n.btn-small.danger[_ngcontent-%COMP%] {\n  border-color: rgba(255, 80, 80, 0.3);\n  color: #ff8080;\n}\n.btn-small.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 80, 80, 0.1);\n}\n.btn-small.info[_ngcontent-%COMP%] {\n  border-color: rgba(5, 208, 230, 0.3);\n  color: #05d0e6;\n}\n.btn-small.info[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n.loading-msg[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #9aa5b1;\n}\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n\n.modal-card[_ngcontent-%COMP%] {\n  background: #0f1922;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 14px;\n  width: 460px;\n  max-width: 95vw;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 18px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #e6eef6;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9aa5b1;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(255, 255, 255, 0.04);\n  color: #e6eef6;\n  font-size: 13px;\n  resize: vertical;\n}\n.form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n.form-group[_ngcontent-%COMP%]   textarea.form-input[_ngcontent-%COMP%] {\n  min-height: 70px;\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #9aa5b1;\n  font-size: 18px;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  color: #e6eef6;\n  background: rgba(255, 255, 255, 0.1);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNEJBQUE7QUFFQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw2REFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0RBQUE7QUFBRjtBQUNFO0VBQUssZUFBQTtFQUFpQixjQUFBO0VBQWdCLFNBQUE7QUFJeEM7O0FBREE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQUlGOztBQURBO0VBQ0UsT0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBSUY7O0FBREE7RUFDRSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxTQUFBO0FBSUY7O0FBREE7RUFDRSxxQ0FBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUlGO0FBSEU7RUFBSyxlQUFBO0VBQWlCLGNBQUE7RUFBZ0IseUJBQUE7RUFBMkIscUJBQUE7RUFBdUIsZUFBQTtBQVUxRjs7QUFQQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFVRjs7QUFQQTtFQUNFLHFDQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBVUY7O0FBUEE7RUFDRSxrQkFBQTtFQUNBLGtEQUFBO0FBVUY7QUFURTtFQUFLLFNBQUE7RUFBVyxlQUFBO0VBQWlCLGNBQUE7QUFjbkM7O0FBWEE7RUFBaUIsZ0JBQUE7QUFlakI7O0FBYkE7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBZ0JGO0FBZEU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQ0FBQTtFQUNBLGtEQUFBO0FBZ0JKO0FBYkU7RUFDRSxrQkFBQTtFQUNBLGtEQUFBO0VBQ0EsY0FBQTtBQWVKO0FBWkU7RUFBYyxzQ0FBQTtBQWVoQjs7QUFaQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFlRjtBQWRFO0VBQVcsbUNBQUE7RUFBa0MsY0FBQTtBQWtCL0M7QUFqQkU7RUFBYSxxQ0FBQTtFQUFvQyxjQUFBO0FBcUJuRDs7QUFsQkE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtBQXFCRjs7QUFsQkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxxQ0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBcUJGO0FBcEJFO0VBQVUscUNBQUE7QUF1Qlo7QUF0QkU7RUFBWSxtQkFBQTtFQUFxQixxQkFBQTtFQUF1QixjQUFBO0VBQWdCLGdCQUFBO0FBNEIxRTtBQTNCSTtFQUFVLG1CQUFBO0FBOEJkO0FBN0JFO0VBQWEsWUFBQTtFQUFjLG1CQUFBO0FBaUM3Qjs7QUE5QkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxxQ0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQWlDRjtBQWhDRTtFQUFXLG9DQUFBO0VBQW1DLGNBQUE7QUFvQ2hEO0FBcENnRTtFQUFVLGtDQUFBO0FBdUMxRTtBQXRDRTtFQUFTLG9DQUFBO0VBQW1DLGNBQUE7QUEwQzlDO0FBMUM4RDtFQUFVLGtDQUFBO0FBNkN4RTs7QUExQ0E7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBNkNGOztBQXpDQTtFQUNFLGVBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUE0Q0Y7O0FBekNBO0VBQ0UsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBNENGOztBQXpDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrREFBQTtBQTRDRjtBQTNDRTtFQUFLLFNBQUE7RUFBVyxlQUFBO0VBQWlCLGNBQUE7QUFnRG5DOztBQTdDQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQWdERjs7QUE3Q0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBZ0RGO0FBL0NFO0VBQVEsZUFBQTtFQUFpQixjQUFBO0VBQWdCLHlCQUFBO0VBQTJCLHFCQUFBO0FBcUR0RTtBQXBERTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQXNESjtBQXJESTtFQUFVLGFBQUE7RUFBZSxxQkFBQTtBQXlEN0I7QUF2REU7RUFBc0IsZ0JBQUE7QUEwRHhCOztBQXZEQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtFQUNBLCtDQUFBO0FBMERGOztBQXZEQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUEwREY7QUF6REU7RUFBVSxjQUFBO0VBQWdCLG9DQUFBO0FBNkQ1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHByb2plY3RzLmNvbXBvbmVudC5zY3NzICovXHJcblxyXG4ucHJvamVjdHMtbGF5b3V0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi5tYWluLWFyZWEge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWFyZ2luLWxlZnQ6IDI2MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGIxMTE2IDAlLCAjMDcxMDE4IDEwMCUpO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi50b3BiYXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZzogMThweCAyOHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpO1xyXG4gIGgxIHsgZm9udC1zaXplOiAyMHB4OyBjb2xvcjogI2U2ZWVmNjsgbWFyZ2luOiAwOyB9XHJcbn1cclxuXHJcbi50b3BiYXItYWN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBmbGV4OiAxO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgcGFkZGluZzogMjRweCAyOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5tZXRyaWNzIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4ubWV0cmljLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wMyk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjA3KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHBhZGRpbmc6IDE2cHggMjBweDtcclxuICBoNCB7IGZvbnQtc2l6ZTogMTFweDsgY29sb3I6ICM5YWE1YjE7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjVweDsgbWFyZ2luOiAwIDAgOHB4OyB9XHJcbn1cclxuXHJcbi5tZXRyaWMtdmFsdWUge1xyXG4gIGZvbnQtc2l6ZTogMjhweDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGNvbG9yOiAjMDVkMGU2O1xyXG59XHJcblxyXG4ucHJvamVjdHMtc2VjdGlvbiB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjAyKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMDYpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNlY3Rpb24taGVhZGVyIHtcclxuICBwYWRkaW5nOiAxNHB4IDIwcHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4wNSk7XHJcbiAgaDMgeyBtYXJnaW46IDA7IGZvbnQtc2l6ZTogMTRweDsgY29sb3I6ICNjOWQ4ZTY7IH1cclxufVxyXG5cclxuLnRhYmxlLXdyYXBwZXIgeyBvdmVyZmxvdy14OiBhdXRvOyB9XHJcblxyXG4ucHJvamVjdHMtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG5cclxuICB0aCB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE2cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wMik7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjA1KTtcclxuICB9XHJcblxyXG4gIHRkIHtcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMDQpO1xyXG4gICAgY29sb3I6ICNjOWQ4ZTY7XHJcbiAgfVxyXG5cclxuICB0cjpob3ZlciB0ZCB7IGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpOyB9XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgcGFkZGluZzogM3B4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBmb250LXNpemU6IDExcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAmLmFjdGl2ZSB7IGJhY2tncm91bmQ6IHJnYmEoNSwyMDgsMjMwLDAuMTUpOyBjb2xvcjogIzA1ZDBlNjsgfVxyXG4gICYuYXJjaGl2ZWQgeyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDcpOyBjb2xvcjogIzlhYTViMTsgfVxyXG59XHJcblxyXG4uYWN0aW9ucy1jZWxsIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uYnRuLWFjdGlvbiB7XHJcbiAgcGFkZGluZzogOHB4IDE0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4xKTtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDQpO1xyXG4gIGNvbG9yOiAjYzlkOGU2O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMTVzO1xyXG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpOyB9XHJcbiAgJi5wcmltYXJ5IHsgYmFja2dyb3VuZDogIzA1ZDBlNjsgYm9yZGVyLWNvbG9yOiAjMDVkMGU2OyBjb2xvcjogIzBiMTExNjsgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjMDRiOGNmOyB9IH1cclxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XHJcbn1cclxuXHJcbi5idG4tc21hbGwge1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjA0KTtcclxuICBjb2xvcjogI2M5ZDhlNjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICYuZGFuZ2VyIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSw4MCw4MCwwLjMpOyBjb2xvcjogI2ZmODA4MDsgJjpob3ZlciB7IGJhY2tncm91bmQ6IHJnYmEoMjU1LDgwLDgwLDAuMSk7IH0gfVxyXG4gICYuaW5mbyB7IGJvcmRlci1jb2xvcjogcmdiYSg1LDIwOCwyMzAsMC4zKTsgY29sb3I6ICMwNWQwZTY7ICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDUsMjA4LDIzMCwwLjEpOyB9IH1cclxufVxyXG5cclxuLmxvYWRpbmctbXNnLCAuZW1wdHktc3RhdGUge1xyXG4gIHBhZGRpbmc6IDQwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG59XHJcblxyXG4vLyBNb2RhbFxyXG4ubW9kYWwtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGluc2V0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC43NSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi5tb2RhbC1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiAjMGYxOTIyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4xKTtcclxuICBib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gIHdpZHRoOiA0NjBweDtcclxuICBtYXgtd2lkdGg6IDk1dnc7XHJcbiAgbWF4LWhlaWdodDogOTB2aDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4ubW9kYWwtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHBhZGRpbmc6IDE4cHggMjRweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjA3KTtcclxuICBoMyB7IG1hcmdpbjogMDsgZm9udC1zaXplOiAxNnB4OyBjb2xvcjogI2U2ZWVmNjsgfVxyXG59XHJcblxyXG4ubW9kYWwtYm9keSB7XHJcbiAgcGFkZGluZzogMjBweCAyNHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE0cHg7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiA2cHg7XHJcbiAgbGFiZWwgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOWFhNWIxOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC41cHg7IH1cclxuICAuZm9ybS1pbnB1dCB7XHJcbiAgICBwYWRkaW5nOiA5cHggMTJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4wOCk7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDQpO1xyXG4gICAgY29sb3I6ICNlNmVlZjY7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICByZXNpemU6IHZlcnRpY2FsO1xyXG4gICAgJjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IGJvcmRlci1jb2xvcjogIzA1ZDBlNjsgfVxyXG4gIH1cclxuICB0ZXh0YXJlYS5mb3JtLWlucHV0IHsgbWluLWhlaWdodDogNzBweDsgfVxyXG59XHJcblxyXG4ubW9kYWwtZm9vdGVyIHtcclxuICBwYWRkaW5nOiAxNnB4IDI0cHggMjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpO1xyXG59XHJcblxyXG4uYnRuLWNsb3NlIHtcclxuICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBjb2xvcjogIzlhYTViMTtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBhZGRpbmc6IDRweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICY6aG92ZXIgeyBjb2xvcjogI2U2ZWVmNjsgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjEpOyB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7530:
/*!*******************************************************!*\
  !*** ./src/app/features/reports/reports.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportsComponent: () => (/* binding */ ReportsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);









function ReportsComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Cargando desde BD...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ReportsComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 17)(1, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Abiertas ", ctx_r0.estadisticas.abiertas, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("En progreso ", ctx_r0.estadisticas.enProgreso, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Cerradas ", ctx_r0.estadisticas.cerradas, "");
  }
}
function ReportsComponent_li_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", cat_r2.nombre, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](cat_r2.count);
  }
}
function ReportsComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Cargando historial...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ReportsComponent_table_63_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td")(4, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "td")(7, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "td")(10, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "td")(15, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ReportsComponent_table_63_tr_16_Template_button_click_15_listener() {
      const rep_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.descargar(rep_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Ver");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const rep_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rep_r4.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rep_r4.total);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rep_r4.abiertas);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rep_r4.cerradas);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](rep_r4.fecha);
  }
}
function ReportsComponent_table_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "table", 35)(1, "thead")(2, "tr")(3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Reporte");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Abiertas");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Cerradas");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Fecha");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Acci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ReportsComponent_table_63_tr_16_Template, 17, 5, "tr", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.reportes);
  }
}
function ReportsComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " No hay reportes generados. Usa el bot\u00F3n \"Descargar Excel\" para crear uno. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class ReportsComponent {
  constructor(notificationService, http, authService) {
    this.notificationService = notificationService;
    this.http = http;
    this.authService = authService;
    this.estadisticas = null;
    this.cargandoStats = false;
    this.descargando = false;
    this.reportes = [];
    this.cargandoReportes = false;
    this.topCategorias = [{
      nombre: 'Red y conectividad',
      count: 0
    }, {
      nombre: 'Aplicaciones',
      count: 0
    }, {
      nombre: 'Hardware',
      count: 0
    }, {
      nombre: 'Seguridad',
      count: 0
    }];
  }
  ngOnInit() {
    this.cargarEstadisticas();
    this.cargarReportes();
  }
  cargarEstadisticas() {
    this.cargandoStats = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/estadisticas`).subscribe({
      next: data => {
        this.estadisticas = data;
        this.cargandoStats = false;
      },
      error: () => {
        this.cargandoStats = false;
      }
    });
  }
  cargarReportes() {
    this.cargandoReportes = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/reportes`).subscribe({
      next: data => {
        this.reportes = data;
        this.cargandoReportes = false;
      },
      error: () => {
        this.cargandoReportes = false;
      }
    });
  }
  actualizar() {
    this.notificationService.toast('Actualizando datos...', 2000, 'info');
    this.cargarEstadisticas();
    this.cargarReportes();
  }
  /** Descarga todas las incidencias como CSV compatible con Excel */
  descargarExcel() {
    this.descargando = true;
    this.notificationService.toast('Generando reporte...', 2000, 'info');
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/incidencias`).subscribe({
      next: incidencias => {
        // UTF-8 BOM para que Excel reconozca tildes y especiales
        const bom = '\uFEFF';
        const headers = ['ID', 'Titulo', 'Descripcion', 'Estado', 'Impacto', 'Ubicacion', 'ID_Usuario', 'Fecha'];
        const rows = incidencias.map(inc => [inc.id, `"${(inc.titulo || '').replace(/"/g, '""')}"`, `"${(inc.descripcion || '').replace(/"/g, '""')}"`, inc.estado || '', inc.impacto || '', `"${(inc.ubicacion || '').replace(/"/g, '""')}"`, inc.idUsuarioReporta || '', inc.fechaCreacion || ''].join(';')); // punto y coma para compatibilidad con Excel en español
        const csv = bom + headers.join(';') + '\n' + rows.join('\n');
        const blob = new Blob([csv], {
          type: 'text/csv;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `incidencias_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        // Registrar el reporte en la BD
        const usuario = this.authService.getUsuarioActual();
        const abiertas = incidencias.filter(i => i.estado === 'Abierto').length;
        const enProgreso = incidencias.filter(i => i.estado === 'En Progreso').length;
        const cerradas = incidencias.filter(i => i.estado === 'Cerrado' || i.estado === 'Resuelto').length;
        const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpParams().set('nombre', `Reporte Incidencias ${new Date().toLocaleDateString('es-CO')}`).set('total', String(incidencias.length)).set('abiertas', String(abiertas)).set('enProgreso', String(enProgreso)).set('cerradas', String(cerradas)).set('generadoPor', String(parseInt(usuario?.id || '0', 10) || ''));
        this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/reportes`, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).subscribe({
          next: () => this.cargarReportes()
        });
        this.descargando = false;
        this.notificationService.toast(`Excel generado: ${incidencias.length} incidencias`, 3000, 'success');
      },
      error: () => {
        this.descargando = false;
        this.notificationService.toast('Error al obtener datos. Verifica la conexión al servidor.', 3000, 'error');
      }
    });
  }
  exportar() {
    this.descargarExcel();
  }
  descargar(reporte) {
    this.notificationService.toast(`Reporte del ${reporte.fecha} — ${reporte.total} incidencias`, 3000, 'info');
  }
  static {
    this.ɵfac = function ReportsComponent_Factory(t) {
      return new (t || ReportsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_2__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: ReportsComponent,
      selectors: [["app-reports"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 75,
      vars: 11,
      consts: [[1, "reports-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-actions"], [1, "btn-action", 3, "click"], [1, "btn-action", "primary", 3, "click", "disabled"], [1, "content"], [1, "filters"], [1, "chips"], [1, "chip"], [1, "metrics"], [1, "metric-card", "large"], [1, "metric-value"], ["class", "metric-delta", 4, "ngIf"], ["class", "metric-pills", 4, "ngIf"], [1, "metric-card"], [1, "metric-delta", "small"], [1, "metric-pills"], [1, "pill", "blue"], [1, "metric-delta"], [1, "pill"], [1, "bottom-row"], [1, "card", "left"], [1, "top-list"], [4, "ngFor", "ngForOf"], [1, "card", "center"], [1, "card-header-row"], ["class", "loading-text", 4, "ngIf"], ["class", "reports-table", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "card", "right"], [1, "quick-buttons"], [1, "btn-small"], [1, "count"], [1, "loading-text"], [1, "reports-table"], [1, "badge-num"], [1, "badge-open"], [1, "badge-closed"], [1, "btn-small", 3, "click"], [1, "empty-state"]],
      template: function ReportsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "main", 1)(3, "header", 2)(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Panel de Control de Reportes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 3)(7, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ReportsComponent_Template_button_click_7_listener() {
            return ctx.actualizar();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Actualizar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ReportsComponent_Template_button_click_9_listener() {
            return ctx.descargarExcel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 6)(12, "section", 7)(13, "div", 8)(14, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "\u00DAltimos 30 d\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Todas las categor\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "Todos los estados");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "section", 10)(21, "div", 11)(22, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Incidencias totales");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, ReportsComponent_div_26_Template, 2, 0, "div", 13)(27, ReportsComponent_div_27_Template, 7, 3, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 15)(29, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Tiempo medio de resoluci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "18.4 h");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "-9% mejora");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 17)(36, "span", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Objetivo: 16 h");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "div", 15)(39, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, "SLA cumplimiento");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "92%");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "+3 puntos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "div", 17)(46, "span", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "Cr\u00EDticas 88%");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "span", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Alta 90%");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "section", 21)(51, "aside", 22)(52, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](53, "Top categor\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "ul", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](55, ReportsComponent_li_55_Template, 4, 2, "li", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "section", 25)(57, "div", 26)(58, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, "Reportes generados");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ReportsComponent_Template_button_click_60_listener() {
            return ctx.descargarExcel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](62, ReportsComponent_div_62_Template, 2, 0, "div", 27)(63, ReportsComponent_table_63_Template, 17, 1, "table", 28)(64, ReportsComponent_div_64_Template, 2, 0, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](65, "aside", 30)(66, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](67, "Accesos r\u00E1pidos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](68, "div", 31)(69, "button", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](70, "Nuevo reporte");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](71, "button", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](72, "Configurar filtros");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](73, "button", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](74, "Programar exportaci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.descargando);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.descargando ? "Generando..." : "\u2B07\uFE0F Exportar Excel", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.estadisticas ? ctx.estadisticas.total : "\u2014");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.cargandoStats);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.estadisticas);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](28);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.topCategorias);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.descargando);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.descargando ? "Generando..." : "\u2B07\uFE0F Descargar Excel", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.cargandoReportes);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.reportes.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.cargandoReportes && ctx.reportes.length === 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n\n\n.reports-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0;\n  color: #e6eef6;\n}\n\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background: #05d0e6;\n  color: #04232f;\n  border: none;\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover {\n  background: #08bfcf;\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.filters[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.filters[_ngcontent-%COMP%]   .chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.filters[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(255, 255, 255, 0.02);\n  color: #9aa5b1;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s ease;\n}\n.filters[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n  border-color: rgba(5, 208, 230, 0.3);\n  color: #05d0e6;\n}\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n}\n.metric-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 12px;\n  margin: 0 0 12px;\n  text-transform: uppercase;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: bold;\n  color: #05d0e6;\n  margin-bottom: 4px;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-delta[_ngcontent-%COMP%] {\n  color: #19d38f;\n  font-size: 11px;\n  margin-bottom: 12px;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-delta.small[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.metric-card[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n  font-size: 10px;\n  color: #9aa5b1;\n}\n.metric-card[_ngcontent-%COMP%]   .pill.blue[_ngcontent-%COMP%] {\n  background: rgba(5, 208, 230, 0.1);\n  color: #05d0e6;\n}\n\n.bottom-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 16px;\n}\n\n.card[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n}\n.card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #e6eef6;\n  font-size: 14px;\n}\n\n.left[_ngcontent-%COMP%]   .top-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.left[_ngcontent-%COMP%]   .top-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  font-size: 12px;\n  color: #9aa5b1;\n}\n.left[_ngcontent-%COMP%]   .top-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #05d0e6;\n}\n\n.center[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.center[_ngcontent-%COMP%]   .card-header-row[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.center[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.center[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.center[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 8px;\n  color: #dff0ff;\n  font-weight: 600;\n  font-size: 11px;\n}\n.center[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  color: #9aa5b1;\n}\n.center[_ngcontent-%COMP%]   .reports-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.05);\n}\n\n.right[_ngcontent-%COMP%]   .quick-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  background: transparent;\n  color: #05d0e6;\n  cursor: pointer;\n  font-size: 11px;\n  transition: all 0.2s ease;\n}\n.btn-small[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n\n.badge-num[_ngcontent-%COMP%] {\n  background: rgba(5, 208, 230, 0.12);\n  color: #05d0e6;\n  padding: 2px 7px;\n  border-radius: 10px;\n  font-size: 11px;\n}\n\n.badge-open[_ngcontent-%COMP%] {\n  background: rgba(255, 170, 50, 0.12);\n  color: #ffaa32;\n  padding: 2px 7px;\n  border-radius: 10px;\n  font-size: 11px;\n}\n\n.badge-closed[_ngcontent-%COMP%] {\n  background: rgba(25, 211, 143, 0.12);\n  color: #19d38f;\n  padding: 2px 7px;\n  border-radius: 10px;\n  font-size: 11px;\n}\n\n.loading-text[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 12px;\n  padding: 8px 0;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 12px;\n  padding: 16px 0;\n  text-align: center;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.05);\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background: #05d0e6;\n  color: #04232f;\n  border-color: #05d0e6;\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover {\n  background: #08bfcf;\n}\n.btn-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n}\n\n@media (max-width: 1024px) {\n  .metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .bottom-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcmVwb3J0cy9yZXBvcnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUFBO0FBSUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtBQUFGOztBQUdBO0VBQ0UsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsNkRBQUE7RUFDQSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtEQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtBQUFKOztBQUlBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFERjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBREY7QUFHRTtFQUNFLGtDQUFBO0FBREo7QUFJRTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUFGSjtBQUlJO0VBQ0UsbUJBQUE7QUFGTjs7QUFPQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFPQTtFQUNFLG1CQUFBO0FBSkY7QUFNRTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtBQUpKO0FBT0U7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxxQ0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBTEo7QUFPSTtFQUNFLGtDQUFBO0VBQ0Esb0NBQUE7RUFDQSxjQUFBO0FBTE47O0FBVUE7RUFDRSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFQRjs7QUFVQTtFQUNFLHlGQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFQRjtBQVNFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBUEo7QUFVRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQVJKO0FBV0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBVEo7QUFXSTtFQUNFLGNBQUE7QUFUTjtBQWFFO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBWEo7QUFjRTtFQUNFLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFaSjtBQWNJO0VBQ0Usa0NBQUE7RUFDQSxjQUFBO0FBWk47O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLGtDQUFBO0VBQ0EsU0FBQTtBQWRGOztBQWlCQTtFQUNFLHlGQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFkRjtBQWdCRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFkSjs7QUFtQkU7RUFDRSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBaEJKO0FBa0JJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsY0FBQTtFQUNBLGtEQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFoQk47QUFrQk07RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFoQlI7O0FBdUJFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQXBCSjtBQXNCSTtFQUNFLFNBQUE7QUFwQk47QUF3QkU7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBdEJKO0FBd0JJO0VBQ0Usa0RBQUE7QUF0Qk47QUF5Qkk7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBdkJOO0FBMEJJO0VBQ0UsWUFBQTtFQUNBLGtEQUFBO0VBQ0EsY0FBQTtBQXhCTjtBQTJCSTtFQUNFLG1DQUFBO0FBekJOOztBQStCRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUE1Qko7O0FBZ0NBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQTdCRjtBQStCRTtFQUNFLGtDQUFBO0FBN0JKOztBQWlDQTtFQUNFLG1DQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBOUJGOztBQWlDQTtFQUNFLG9DQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBOUJGOztBQWlDQTtFQUNFLG9DQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBOUJGOztBQWlDQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQTlCRjs7QUFpQ0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQTlCRjs7QUFpQ0E7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0FBOUJGO0FBZ0NFO0VBQVUscUNBQUE7QUE3Qlo7QUE4QkU7RUFBWSxtQkFBQTtFQUFxQixjQUFBO0VBQWdCLHFCQUFBO0FBekJuRDtBQTBCRTtFQUFrQixtQkFBQTtBQXZCcEI7QUF3QkU7RUFBYSxZQUFBO0VBQWMsbUJBQUE7QUFwQjdCOztBQXVCQTtFQUNFLFVBQUE7QUFwQkY7O0FBdUJBO0VBQ0UscUNBQUE7RUFDQSxrQkFBQTtBQXBCRjs7QUF1QkE7RUFDRTtJQUNFLDBCQUFBO0VBcEJGO0VBdUJBO0lBQ0UsMEJBQUE7RUFyQkY7QUFDRjtBQXdCQTtFQUNFO0lBQ0UsY0FBQTtFQXRCRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogcmVwb3J0cy5jb21wb25lbnQuc2Nzc1xyXG4gKi9cclxuXHJcbi5yZXBvcnRzLWxheW91dCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4ubWFpbi1hcmVhIHtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi1sZWZ0OiAyNjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBiMTExNiAwJSwgIzA3MTAxOCAxMDAlKTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4udG9wYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDE2cHggMjRweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuXHJcbiAgaDEge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgY29sb3I6ICNlNmVlZjY7XHJcbiAgfVxyXG59XHJcblxyXG4udG9wYmFyLWFjdGlvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMnB4O1xyXG59XHJcblxyXG4uYnRuLWFjdGlvbiB7XHJcbiAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6ICNlNmVlZjY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gIH1cclxuXHJcbiAgJi5wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQ6ICMwNWQwZTY7XHJcbiAgICBjb2xvcjogIzA0MjMyZjtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZDogIzA4YmZjZjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5jb250ZW50IHtcclxuICBmbGV4OiAxO1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmZpbHRlcnMge1xyXG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XHJcblxyXG4gIC5jaGlwcyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgfVxyXG5cclxuICAuY2hpcCB7XHJcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMyk7XHJcbiAgICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLm1ldHJpY3Mge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyZnIgMWZyIDFmcjtcclxuICBnYXA6IDE2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLm1ldHJpYy1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuXHJcbiAgaDQge1xyXG4gICAgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBtYXJnaW46IDAgMCAxMnB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtdmFsdWUge1xyXG4gICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogIzA1ZDBlNjtcclxuICAgIG1hcmdpbi1ib3R0b206IDRweDtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtZGVsdGEge1xyXG4gICAgY29sb3I6ICMxOWQzOGY7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xyXG5cclxuICAgICYuc21hbGwge1xyXG4gICAgICBjb2xvcjogIzlhYTViMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5tZXRyaWMtcGlsbHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdhcDogNnB4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gIH1cclxuXHJcbiAgLnBpbGwge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogMnB4IDhweDtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBjb2xvcjogIzlhYTViMTtcclxuXHJcbiAgICAmLmJsdWUge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgICBjb2xvcjogIzA1ZDBlNjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5ib3R0b20tcm93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDJmciAxZnI7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcblxyXG4gIGg0IHtcclxuICAgIG1hcmdpbjogMCAwIDEycHg7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbi5sZWZ0IHtcclxuICAudG9wLWxpc3Qge1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDA7XHJcblxyXG4gICAgbGkge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgIHBhZGRpbmc6IDhweCAwO1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICBjb2xvcjogIzlhYTViMTtcclxuXHJcbiAgICAgIC5jb3VudCB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogIzA1ZDBlNjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmNlbnRlciB7XHJcbiAgLmNhcmQtaGVhZGVyLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XHJcblxyXG4gICAgaDQge1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucmVwb3J0cy10YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcblxyXG4gICAgdGhlYWQge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgICAgY29sb3I6ICNkZmYwZmY7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIH1cclxuXHJcbiAgICB0ZCB7XHJcbiAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XHJcbiAgICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgfVxyXG5cclxuICAgIHRib2R5IHRyOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4wNSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4ucmlnaHQge1xyXG4gIC5xdWljay1idXR0b25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLXNtYWxsIHtcclxuICBwYWRkaW5nOiA0cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KTtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICBjb2xvcjogIzA1ZDBlNjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi5iYWRnZS1udW0ge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMTIpO1xyXG4gIGNvbG9yOiAjMDVkMGU2O1xyXG4gIHBhZGRpbmc6IDJweCA3cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBmb250LXNpemU6IDExcHg7XHJcbn1cclxuXHJcbi5iYWRnZS1vcGVuIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTcwLCA1MCwgMC4xMik7XHJcbiAgY29sb3I6ICNmZmFhMzI7XHJcbiAgcGFkZGluZzogMnB4IDdweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxufVxyXG5cclxuLmJhZGdlLWNsb3NlZCB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNSwgMjExLCAxNDMsIDAuMTIpO1xyXG4gIGNvbG9yOiAjMTlkMzhmO1xyXG4gIHBhZGRpbmc6IDJweCA3cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBmb250LXNpemU6IDExcHg7XHJcbn1cclxuXHJcbi5sb2FkaW5nLXRleHQge1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBwYWRkaW5nOiA4cHggMDtcclxufVxyXG5cclxuLmVtcHR5LXN0YXRlIHtcclxuICBjb2xvcjogIzlhYTViMTtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweCAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmJ0bi1hY3Rpb24ge1xyXG4gIHBhZGRpbmc6IDhweCAxNHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDYpO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiAjZTZlZWY2O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcblxyXG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpOyB9XHJcbiAgJi5wcmltYXJ5IHsgYmFja2dyb3VuZDogIzA1ZDBlNjsgY29sb3I6ICMwNDIzMmY7IGJvcmRlci1jb2xvcjogIzA1ZDBlNjsgfVxyXG4gICYucHJpbWFyeTpob3ZlciB7IGJhY2tncm91bmQ6ICMwOGJmY2Y7IH1cclxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA4cHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgLm1ldHJpY3Mge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgfVxyXG5cclxuICAuYm90dG9tLXJvdyB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5tYWluLWFyZWEge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 2726:
/*!***************************************************!*\
  !*** ./src/app/features/users/users.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersComponent: () => (/* binding */ UsersComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/components/sidebar/sidebar.component */ 1417);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/users.service */ 9784);
/* harmony import */ var _core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/notification.service */ 5567);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 6443);










function UsersComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const area_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", area_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](area_r1);
  }
}
function UsersComponent_tr_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "td")(12, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "td")(17, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_tr_65_Template_button_click_17_listener() {
      const usr_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.eliminarUsuario(usr_r3.id, usr_r3.nombre));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "\uD83D\uDDD1\uFE0F Eliminar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const usr_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.apellido);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.correo);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.celular);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.area);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](usr_r3.jefeDirecto);
  }
}
function UsersComponent_div_66_option_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", p_r6.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](p_r6.nombre);
  }
}
function UsersComponent_div_66_span_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Cargando proyectos...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function UsersComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_div_66_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_div_66_Template_div_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 25)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Nuevo Usuario");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_div_66_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 27)(8, "div", 28)(9, "div", 29)(10, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Nombre Completo *");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.nombre, $event) || (ctx_r3.nuevoUsuario.nombre = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 29)(14, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Correo *");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.correo, $event) || (ctx_r3.nuevoUsuario.correo = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 28)(18, "div", 29)(19, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Contrase\u00F1a");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_input_ngModelChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.password, $event) || (ctx_r3.nuevoUsuario.password = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 29)(23, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "select", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_select_ngModelChange_25_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.rol, $event) || (ctx_r3.nuevoUsuario.rol = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Analista");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "Desarrollador");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Mesa de Servicio");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "option", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "Soporte");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Jefe");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Administrador");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "div", 28)(39, "div", 29)(40, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, "Tel\u00E9fono");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_input_ngModelChange_42_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.telefono, $event) || (ctx_r3.nuevoUsuario.telefono = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "div", 29)(44, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](45, "Departamento");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_input_ngModelChange_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.departamento, $event) || (ctx_r3.nuevoUsuario.departamento = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](47, "div", 29)(48, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Proyecto");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "select", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_div_66_Template_select_ngModelChange_50_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r3.nuevoUsuario.idProyecto, $event) || (ctx_r3.nuevoUsuario.idProyecto = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52, "-- Sin proyecto --");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](53, UsersComponent_div_66_option_53_Template, 2, 2, "option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](54, UsersComponent_div_66_span_54_Template, 2, 0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "div", 43)(56, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_div_66_Template_button_click_56_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.cerrarModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_div_66_Template_button_click_58_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r3.guardarUsuario());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.correo);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.rol);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.telefono);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.departamento);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.nuevoUsuario.idProyecto);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r3.proyectos);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r3.cargandoProyectos);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r3.guardando);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r3.guardando ? "Guardando..." : "Guardar Usuario", " ");
  }
}
class UsersComponent {
  constructor(usersService, notificationService, http) {
    this.usersService = usersService;
    this.notificationService = notificationService;
    this.http = http;
    this.usuarios = [];
    this.usuariosFiltrados = [];
    this.busqueda = '';
    this.areaFiltro = 'all';
    this.areas = ['TI', 'Soporte', 'Desarrollo', 'Infraestructura', 'RRHH', 'Administración'];
    // Modal nuevo usuario
    this.mostrarModal = false;
    this.guardando = false;
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      password: '123456',
      rol: 'Analista',
      telefono: '',
      departamento: '',
      idProyecto: 0
    };
    this.proyectos = [];
    this.cargandoProyectos = false;
  }
  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.usersService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.aplicarFiltros();
    });
  }
  aplicarFiltros() {
    this.usuariosFiltrados = this.usuarios.filter(usr => {
      const cumpleArea = this.areaFiltro === 'all' || usr.area === this.areaFiltro;
      const cumpleBusqueda = this.busqueda === '' || usr.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) || usr.apellido.toLowerCase().includes(this.busqueda.toLowerCase()) || usr.correo.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleArea && cumpleBusqueda;
    });
  }
  exportar() {
    const csv = this.generarCSV();
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    a.click();
    this.notificationService.toast('Usuarios exportados', 2000, 'success');
  }
  generarCSV() {
    const headers = ['ID', 'Nombre', 'Apellido', 'Correo', 'Celular', 'Área', 'Jefe Directo'];
    const rows = this.usuariosFiltrados.map(usr => [usr.id, usr.nombre, usr.apellido, usr.correo, usr.celular, usr.area, usr.jefeDirecto].join(','));
    return [headers.join(','), ...rows].join('\n');
  }
  obtenerConteos() {
    const conteos = this.usersService.obtenerConteosPorArea();
    return {
      total: this.usuarios.length,
      ti: conteos['TI'] || 0,
      soporte: conteos['Soporte'] || 0,
      otros: this.usuarios.length - ((conteos['TI'] || 0) + (conteos['Soporte'] || 0))
    };
  }
  onBusquedaChange() {
    this.aplicarFiltros();
  }
  onAreaChange() {
    this.aplicarFiltros();
  }
  abrirModal() {
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      password: '123456',
      rol: 'Usuario',
      telefono: '',
      departamento: '',
      idProyecto: 0
    };
    this.mostrarModal = true;
    // Cargar proyectos disponibles
    this.cargandoProyectos = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/proyectos`).subscribe({
      next: data => {
        this.proyectos = data.map(p => ({
          id: p.id,
          nombre: p.nombre
        }));
        this.cargandoProyectos = false;
      },
      error: () => {
        this.proyectos = [];
        this.cargandoProyectos = false;
      }
    });
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
  guardarUsuario() {
    if (!this.nuevoUsuario.nombre.trim() || !this.nuevoUsuario.correo.trim()) {
      this.notificationService.toast('Nombre y correo son obligatorios', 3000, 'error');
      return;
    }
    this.guardando = true;
    this.usersService.agregarUsuarioBackend({
      nombre: this.nuevoUsuario.nombre.trim(),
      correo: this.nuevoUsuario.correo.trim(),
      password: this.nuevoUsuario.password || '123456',
      rol: this.nuevoUsuario.rol,
      telefono: this.nuevoUsuario.telefono.trim(),
      departamento: this.nuevoUsuario.departamento.trim(),
      idProyecto: this.nuevoUsuario.idProyecto || undefined
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarModal = false;
        this.notificationService.toast(`Usuario ${this.nuevoUsuario.nombre} creado`, 3000, 'success');
      },
      error: err => {
        this.guardando = false;
        this.notificationService.toast('Error al guardar: ' + (err?.message || err), 4000, 'error');
      }
    });
  }
  eliminarUsuario(id, nombre) {
    if (!confirm(`¿Eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) return;
    this.usersService.eliminarUsuarioBackend(id).subscribe({
      next: () => this.notificationService.toast(`Usuario ${nombre} eliminado`, 3000, 'success'),
      error: err => this.notificationService.toast('Error al eliminar: ' + (err?.message || err), 4000, 'error')
    });
  }
  static {
    this.ɵfac = function UsersComponent_Factory(t) {
      return new (t || UsersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_users_service__WEBPACK_IMPORTED_MODULE_2__.UsersService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: UsersComponent,
      selectors: [["app-users"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 67,
      vars: 10,
      consts: [[1, "users-layout"], [1, "main-area"], [1, "topbar"], [1, "topbar-actions"], ["type", "text", "placeholder", "Buscar usuarios", 1, "search-input", 3, "ngModelChange", "change", "ngModel"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn-action", 3, "click"], [1, "btn-action", "primary", 3, "click"], [1, "content"], [1, "metrics"], [1, "metric-card"], [1, "metric-value"], [1, "users-section"], [1, "section-header"], [1, "table-wrapper"], [1, "users-table"], [4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [3, "value"], [1, "area-badge"], ["title", "Eliminar", 1, "btn-small", "danger", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["type", "text", "placeholder", "Juan P\u00E9rez", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "correo@empresa.com", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-input", 3, "ngModelChange", "ngModel"], ["value", "Analista"], ["value", "Desarrollador"], ["value", "Mesa de Servicio"], ["value", "Soporte"], ["value", "Jefe"], ["value", "Administrador"], ["type", "text", "placeholder", "+57 300 000 0000", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "TI, Soporte...", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "hint", 4, "ngIf"], [1, "modal-footer"], [1, "btn-action", "primary", 3, "click", "disabled"], [1, "hint"]],
      template: function UsersComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-sidebar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "main", 1)(3, "header", 2)(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Gesti\u00F3n de Usuarios");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 3)(7, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.busqueda, $event) || (ctx.busqueda = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function UsersComponent_Template_input_change_7_listener() {
            return ctx.onBusquedaChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "select", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function UsersComponent_Template_select_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.areaFiltro, $event) || (ctx.areaFiltro = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function UsersComponent_Template_select_change_8_listener() {
            return ctx.onAreaChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "option", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Todas las \u00E1reas");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, UsersComponent_option_11_Template, 2, 2, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_Template_button_click_12_listener() {
            return ctx.cargarUsuarios();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Actualizar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_Template_button_click_14_listener() {
            return ctx.exportar();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "Exportar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function UsersComponent_Template_button_click_16_listener() {
            return ctx.abrirModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "+ Nuevo Usuario");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 10)(19, "section", 11)(20, "div", 12)(21, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "Total Usuarios");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 12)(26, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "\u00C1rea TI");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "div", 12)(31, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "\u00C1rea Soporte");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 12)(36, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "Otros");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "section", 14)(41, "div", 15)(42, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 16)(45, "table", 17)(46, "thead")(47, "tr")(48, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "ID");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](51, "Nombre");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](53, "Apellido");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](55, "Correo");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57, "Celular");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](59, "\u00C1rea");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61, "Jefe Directo");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "Acciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](65, UsersComponent_tr_65_Template, 19, 7, "tr", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](66, UsersComponent_div_66_Template, 60, 12, "div", 19);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.busqueda);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.areaFiltro);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.areas);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.obtenerConteos().total);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.obtenerConteos().ti);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.obtenerConteos().soporte);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.obtenerConteos().otros);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Listado de Usuarios (", ctx.usuariosFiltrados.length, ")");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.usuariosFiltrados);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.mostrarModal);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _shared_components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent],
      styles: ["\n\n\n\n.users-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n}\n\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(180deg, #0b1116 0%, #071018 100%);\n  overflow: hidden;\n}\n\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n  gap: 16px;\n}\n.topbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin: 0;\n  color: #e6eef6;\n  white-space: nowrap;\n}\n\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%], .topbar-actions[_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: rgba(255, 255, 255, 0.02);\n  color: #e6eef6;\n  font-size: 12px;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus, .topbar-actions[_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n.topbar-actions[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n\n.btn-action[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  background: transparent;\n  color: #e6eef6;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s ease;\n}\n.btn-action[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background: #05d0e6;\n  color: #04232f;\n  border: none;\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover {\n  background: #08bfcf;\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n  text-align: center;\n}\n.metric-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #9aa5b1;\n  font-size: 11px;\n  margin: 0 0 8px;\n  text-transform: uppercase;\n}\n.metric-card[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: bold;\n  color: #05d0e6;\n}\n\n.users-section[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  border-radius: 12px;\n  padding: 16px;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #e6eef6;\n}\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.users-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.users-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.users-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  color: #dff0ff;\n  font-weight: 600;\n}\n.users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  color: #9aa5b1;\n}\n.users-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.05);\n}\n\n.area-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 4px;\n  background: rgba(5, 208, 230, 0.1);\n  color: #05d0e6;\n  font-size: 11px;\n  font-weight: 600;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  margin: 0 2px;\n  font-size: 11px;\n  color: #9aa5b1;\n}\n.btn-small[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.1);\n}\n.btn-small.danger[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.btn-small.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n\n.modal-card[_ngcontent-%COMP%] {\n  background: #0e1923;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  border-radius: 12px;\n  width: 560px;\n  max-width: 95vw;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #e6eef6;\n  font-size: 16px;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #9aa5b1;\n  cursor: pointer;\n  font-size: 16px;\n}\n.modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  color: #e6eef6;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9aa5b1;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(255, 255, 255, 0.04);\n  color: #e6eef6;\n  font-size: 13px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n}\n\n.form-row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n\n.hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9aa5b1;\n  margin-top: 2px;\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #9aa5b1;\n  font-size: 18px;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  color: #e6eef6;\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 4px;\n}\n\n@media (max-width: 768px) {\n  .main-area[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .topbar-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvdXNlcnMvdXNlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBQUE7QUFJQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw2REFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0RBQUE7RUFDQSxTQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBQUo7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQURGO0FBR0U7O0VBRUUsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQURKO0FBR0k7O0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0FBQU47QUFJRTtFQUNFLGdCQUFBO0FBRko7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBSEY7QUFLRTtFQUNFLGtDQUFBO0FBSEo7QUFNRTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUFKSjtBQU1JO0VBQ0UsbUJBQUE7QUFKTjs7QUFTQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFORjs7QUFTQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQU5GOztBQVNBO0VBQ0UseUZBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBTkY7QUFRRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBTko7QUFTRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFQSjs7QUFXQTtFQUNFLHlGQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFSRjs7QUFXQTtFQUNFLG1CQUFBO0FBUkY7QUFVRTtFQUNFLFNBQUE7RUFDQSxjQUFBO0FBUko7O0FBWUE7RUFDRSxnQkFBQTtBQVRGOztBQVlBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQVRGO0FBV0U7RUFDRSxxQ0FBQTtFQUNBLGtEQUFBO0FBVEo7QUFZRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQVZKO0FBYUU7RUFDRSxhQUFBO0VBQ0Esa0RBQUE7RUFDQSxjQUFBO0FBWEo7QUFjRTtFQUNFLG1DQUFBO0FBWko7O0FBZ0JBO0VBQ0UscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFiRjtBQWVFO0VBQ0Usa0NBQUE7QUFiSjtBQWdCRTtFQUNFLGNBQUE7QUFkSjtBQWVJO0VBQVUsa0NBQUE7QUFaZDs7QUFpQkE7RUFDRSxlQUFBO0VBQ0EsUUFBQTtFQUNBLDhCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBZEY7O0FBaUJBO0VBQ0UsbUJBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUNBQUE7QUFkRjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0RBQUE7QUFkRjtBQWdCRTtFQUFLLFNBQUE7RUFBVyxjQUFBO0VBQWdCLGVBQUE7QUFYbEM7QUFhRTtFQUNFLGdCQUFBO0VBQWtCLFlBQUE7RUFBYyxjQUFBO0VBQ2hDLGVBQUE7RUFBaUIsZUFBQTtBQVJyQjtBQVNJO0VBQVUsY0FBQTtBQU5kOztBQVVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBUEY7O0FBVUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBUEY7QUFTRTtFQUFRLGVBQUE7RUFBaUIsY0FBQTtFQUFnQix5QkFBQTtFQUEyQixxQkFBQTtBQUh0RTtBQUtFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUhKO0FBSUk7RUFBVSxhQUFBO0VBQWUscUJBQUE7QUFBN0I7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFERjtBQUVFO0VBQVUsY0FBQTtFQUFnQixvQ0FBQTtBQUU1Qjs7QUFFQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtFQUNBLCtDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGNBQUE7RUFDRjtFQUVBO0lBQ0Usc0JBQUE7SUFDQSx1QkFBQTtFQUFGO0VBR0E7SUFDRSxXQUFBO0VBREY7RUFJQTtJQUNFLHFDQUFBO0VBRkY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHVzZXJzLmNvbXBvbmVudC5zY3NzXHJcbiAqL1xyXG5cclxuLnVzZXJzLWxheW91dCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG59XHJcblxyXG4ubWFpbi1hcmVhIHtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi1sZWZ0OiAyNjBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBiMTExNiAwJSwgIzA3MTAxOCAxMDAlKTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4udG9wYmFyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDE2cHggMjRweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcclxuICBnYXA6IDE2cHg7XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB9XHJcbn1cclxuXHJcbi50b3BiYXItYWN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEycHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcblxyXG4gIC5zZWFyY2gtaW5wdXQsXHJcbiAgLmZpbHRlci1zZWxlY3Qge1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjZTZlZWY2O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG5cclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICBib3JkZXItY29sb3I6ICMwNWQwZTY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuc2VhcmNoLWlucHV0IHtcclxuICAgIG1pbi13aWR0aDogMjAwcHg7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWFjdGlvbiB7XHJcbiAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6ICNlNmVlZjY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAmLnByaW1hcnkge1xyXG4gICAgYmFja2dyb3VuZDogIzA1ZDBlNjtcclxuICAgIGNvbG9yOiAjMDQyMzJmO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMDhiZmNmO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gIGZsZXg6IDE7XHJcbiAgcGFkZGluZzogMjRweDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4ubWV0cmljcyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE0MHB4LCAxZnIpKTtcclxuICBnYXA6IDE2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufVxyXG5cclxuLm1ldHJpYy1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGg0IHtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgbWFyZ2luOiAwIDAgOHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICB9XHJcblxyXG4gIC5tZXRyaWMtdmFsdWUge1xyXG4gICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogIzA1ZDBlNjtcclxuICB9XHJcbn1cclxuXHJcbi51c2Vycy1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuLnNlY3Rpb24taGVhZGVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG5cclxuICBoMyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICB9XHJcbn1cclxuXHJcbi50YWJsZS13cmFwcGVyIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG59XHJcblxyXG4udXNlcnMtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG5cclxuICB0aGVhZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgfVxyXG5cclxuICB0aCB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIGNvbG9yOiAjZGZmMGZmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcblxyXG4gIHRkIHtcclxuICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gIH1cclxuXHJcbiAgdGJvZHkgdHI6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4wNSk7XHJcbiAgfVxyXG59XHJcblxyXG4uYXJlYS1iYWRnZSB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHBhZGRpbmc6IDJweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgY29sb3I6ICMwNWQwZTY7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5idG4tc21hbGwge1xyXG4gIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG1hcmdpbjogMCAycHg7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbiAgfVxyXG5cclxuICAmLmRhbmdlciB7XHJcbiAgICBjb2xvcjogI2VmNDQ0NDtcclxuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjEpOyB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNb2RhbFxyXG4ubW9kYWwtb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGluc2V0OiAwO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgei1pbmRleDogMTAwMDtcclxufVxyXG5cclxuLm1vZGFsLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICMwZTE5MjM7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHdpZHRoOiA1NjBweDtcclxuICBtYXgtd2lkdGg6IDk1dnc7XHJcbiAgbWF4LWhlaWdodDogOTB2aDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjUpO1xyXG59XHJcblxyXG4ubW9kYWwtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDIwcHggMjRweCAxNnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpO1xyXG5cclxuICBoMyB7IG1hcmdpbjogMDsgY29sb3I6ICNlNmVlZjY7IGZvbnQtc2l6ZTogMTZweDsgfVxyXG5cclxuICAuYnRuLWNsb3NlIHtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7IGJvcmRlcjogbm9uZTsgY29sb3I6ICM5YWE1YjE7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTZweDtcclxuICAgICY6aG92ZXIgeyBjb2xvcjogI2U2ZWVmNjsgfVxyXG4gIH1cclxufVxyXG5cclxuLm1vZGFsLWJvZHkge1xyXG4gIHBhZGRpbmc6IDIwcHggMjRweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNHB4O1xyXG59XHJcblxyXG4uZm9ybS1ncm91cCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogNnB4O1xyXG5cclxuICBsYWJlbCB7IGZvbnQtc2l6ZTogMTFweDsgY29sb3I6ICM5YWE1YjE7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjVweDsgfVxyXG5cclxuICBpbnB1dCwgc2VsZWN0IHtcclxuICAgIHBhZGRpbmc6IDlweCAxMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjA4KTtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wNCk7XHJcbiAgICBjb2xvcjogI2U2ZWVmNjtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICY6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyBib3JkZXItY29sb3I6ICMwNWQwZTY7IH1cclxuICB9XHJcbn1cclxuXHJcbi5mb3JtLXJvdy0yIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcclxuICBnYXA6IDE0cHg7XHJcbn1cclxuXHJcbi5mb3JtLXJvdyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgZ2FwOiAxNHB4O1xyXG59XHJcblxyXG4uaGludCB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG4gIG1hcmdpbi10b3A6IDJweDtcclxufVxyXG5cclxuLmJ0bi1jbG9zZSB7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgY29sb3I6ICM5YWE1YjE7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBwYWRkaW5nOiA0cHggOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAmOmhvdmVyIHsgY29sb3I6ICNlNmVlZjY7IGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4xKTsgfVxyXG59XHJcblxyXG5cclxuLm1vZGFsLWZvb3RlciB7XHJcbiAgcGFkZGluZzogMTZweCAyNHB4IDIwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGdhcDogMTBweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjA1KTtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDhweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5tYWluLWFyZWEge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgfVxyXG5cclxuICAudG9wYmFyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICB9XHJcblxyXG4gIC50b3BiYXItYWN0aW9ucyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gIC5tZXRyaWNzIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 1417:
/*!****************************************************************!*\
  !*** ./src/app/shared/components/sidebar/sidebar.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidebarComponent: () => (/* binding */ SidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);






function SidebarComponent_a_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 13)(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.isActive(item_r1.route));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r1.route)("title", item_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r1.label);
  }
}
function SidebarComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16)(1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 18)(4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.usuarioActual.nombre.charAt(0));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.usuarioActual.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.usuarioActual.role);
  }
}
class SidebarComponent {
  /**
   * Constructor inyecta servicios necesarios
   */
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    // Usuario autenticado actual
    this.usuarioActual = null;
  }
  /**
   * ngOnInit: se ejecuta al inicializar el componente
   */
  ngOnInit() {
    // Obtener el usuario autenticado actual
    this.usuarioActual = this.authService.getUsuarioActual();
  }
  /**
   * Método logout: cierra la sesión del usuario
   */
  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
  /**
   * Método getNavItems: retorna los elementos del menú de navegación.
   * Usuarios y Proyectos solo visibles para Administrador.
   */
  getNavItems() {
    const isAdmin = this.usuarioActual?.role === 'Administrador';
    const items = [{
      label: 'Panel',
      route: '/dashboard',
      icon: '📊'
    }, {
      label: 'Incidencias',
      route: '/incidents',
      icon: '🎫'
    }];
    if (isAdmin) {
      items.push({
        label: 'Usuarios',
        route: '/users',
        icon: '👥'
      });
      items.push({
        label: 'Proyectos',
        route: '/projects',
        icon: '🗂️'
      });
    }
    items.push({
      label: 'Reportes',
      route: '/reports',
      icon: '📈'
    });
    items.push({
      label: 'ChatBot',
      route: '/chatbot',
      icon: '🤖'
    });
    return items;
  }
  /**
   * Método isActive: verifica si una ruta está activa
   *
   * @param route - Ruta a verificar
   * @returns boolean
   */
  isActive(route) {
    return this.router.url.includes(route);
  }
  static {
    this.ɵfac = function SidebarComponent_Factory(t) {
      return new (t || SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SidebarComponent,
      selectors: [["app-sidebar"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 16,
      vars: 2,
      consts: [[1, "sidebar"], [1, "sidebar-top"], [1, "logo-wrap"], ["src", "assets/logoSWO_sinFondo.png", "alt", "Logo SWO", 1, "logo-img"], [1, "brand"], [1, "badge"], [1, "search-wrapper"], ["type", "text", "placeholder", "Buscar...", 1, "search"], [1, "nav"], ["class", "nav-item", 3, "routerLink", "active", "title", 4, "ngFor", "ngForOf"], [1, "sidebar-foot"], ["class", "user-mini", 4, "ngIf"], ["title", "Cerrar sesi\u00F3n", 1, "btn-logout", 3, "click"], [1, "nav-item", 3, "routerLink", "title"], [1, "nav-icon"], [1, "nav-label"], [1, "user-mini"], [1, "avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"]],
      template: function SidebarComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "aside", 0)(1, "div", 1)(2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " ServiceDesk ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "SWO");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "nav", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, SidebarComponent_a_11_Template, 5, 6, "a", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, SidebarComponent_div_13_Template, 8, 3, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidebarComponent_Template_button_click_14_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Cerrar sesi\u00F3n ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.getNavItems());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.usuarioActual);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink],
      styles: ["@charset \"UTF-8\";\n\n\n\n\n\n\n.sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  height: 100vh;\n  background: linear-gradient(180deg, rgba(15, 23, 32, 0.95), rgba(11, 17, 22, 0.98));\n  backdrop-filter: blur(10px);\n  border-right: 1px solid rgba(5, 208, 230, 0.1);\n  display: flex;\n  flex-direction: column;\n  padding: 20px 16px;\n  position: fixed;\n  left: 0;\n  top: 0;\n  overflow-y: auto;\n  z-index: 1000;\n  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);\n}\n\n\n\n.sidebar-top[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid rgba(5, 208, 230, 0.1);\n}\n\n.logo-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.logo-img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  filter: drop-shadow(0 2px 8px rgba(5, 208, 230, 0.3));\n  transition: transform 0.3s ease;\n}\n.logo-img[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05) rotate(5deg);\n}\n\n.brand[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #e6eef6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  letter-spacing: 0.5px;\n}\n\n.badge[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #05d0e6, #0a9fb8);\n  color: #04232f;\n  padding: 3px 8px;\n  border-radius: 6px;\n  font-size: 9px;\n  font-weight: 700;\n  text-transform: uppercase;\n  box-shadow: 0 2px 8px rgba(5, 208, 230, 0.3);\n}\n\n\n\n.search-wrapper[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.search[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 8px;\n  border: 1px solid rgba(5, 208, 230, 0.2);\n  background: rgba(5, 208, 230, 0.05);\n  color: #e6eef6;\n  font-size: 13px;\n  transition: all 0.3s ease;\n}\n.search[_ngcontent-%COMP%]::placeholder {\n  color: #9aa5b1;\n}\n.search[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #05d0e6;\n  background: rgba(5, 208, 230, 0.1);\n  box-shadow: 0 0 0 3px rgba(5, 208, 230, 0.1);\n  transform: translateY(-1px);\n}\n\n\n\n.nav[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 16px;\n}\n\n.nav-item[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #9aa5b1;\n  font-size: 13px;\n  font-weight: 500;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  position: relative;\n  overflow: hidden;\n}\n.nav-item[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 3px;\n  background: #05d0e6;\n  transform: scaleY(0);\n  transition: transform 0.3s ease;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(5, 208, 230, 0.15);\n  color: #05d0e6;\n  transform: translateX(4px);\n  box-shadow: 0 4px 12px rgba(5, 208, 230, 0.2);\n}\n.nav-item[_ngcontent-%COMP%]:hover::before {\n  transform: scaleY(1);\n}\n.nav-item[_ngcontent-%COMP%]:hover   .nav-icon[_ngcontent-%COMP%] {\n  transform: scale(1.15) rotate(-5deg);\n  filter: drop-shadow(0 2px 4px rgba(5, 208, 230, 0.5));\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #05d0e6, #0a9fb8);\n  color: #04232f;\n  font-weight: 700;\n  box-shadow: 0 4px 16px rgba(5, 208, 230, 0.4);\n}\n.nav-item.active[_ngcontent-%COMP%]::before {\n  transform: scaleY(1);\n  background: #04232f;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  transform: scale(1.2);\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));\n}\n\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.nav-label[_ngcontent-%COMP%] {\n  flex: 1;\n  letter-spacing: 0.3px;\n}\n\n\n\n.sidebar-foot[_ngcontent-%COMP%] {\n  padding-top: 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.03);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.user-mini[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #05d0e6;\n  color: #04232f;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #e6eef6;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.user-role[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #9aa5b1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.btn-logout[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 87, 87, 0.3);\n  background: transparent;\n  color: #ff5757;\n  font-size: 12px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 87, 87, 0.1);\n  border-color: rgba(255, 87, 87, 0.6);\n}\n\n\n\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 3px;\n}\n.sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n\n\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 240px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjs7OztFQUFBO0FBTUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1GQUFBO0VBQ0EsMkJBQUE7RUFDQSw4Q0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EseUNBQUE7QUFDRjs7QUFFQSxtQkFBQTtBQUNBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsK0NBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxxREFBQTtFQUNBLCtCQUFBO0FBQ0Y7QUFDRTtFQUNFLG1DQUFBO0FBQ0o7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EscUJBQUE7QUFBRjs7QUFHQTtFQUNFLHFEQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLDRDQUFBO0FBQUY7O0FBR0EsYUFBQTtBQUNBO0VBQ0UsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7RUFDQSxtQ0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFBRjtBQUVFO0VBQ0UsY0FBQTtBQUFKO0FBR0U7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxrQ0FBQTtFQUNBLDRDQUFBO0VBQ0EsMkJBQUE7QUFESjs7QUFLQSxlQUFBO0FBQ0E7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaURBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFGRjtBQUlFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSwrQkFBQTtBQUZKO0FBS0U7RUFDRSxtQ0FBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtFQUNBLDZDQUFBO0FBSEo7QUFLSTtFQUNFLG9CQUFBO0FBSE47QUFNSTtFQUNFLG9DQUFBO0VBQ0EscURBQUE7QUFKTjtBQVFFO0VBQ0UscURBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2Q0FBQTtBQU5KO0FBUUk7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0FBTk47QUFTSTtFQUNFLHFCQUFBO0VBQ0EsaURBQUE7QUFQTjs7QUFZQTtFQUNFLGVBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsaURBQUE7QUFURjs7QUFZQTtFQUNFLE9BQUE7RUFDQSxxQkFBQTtBQVRGOztBQVlBLG9CQUFBO0FBQ0E7RUFDRSxpQkFBQTtFQUNBLCtDQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQVRGOztBQVlBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQVRGOztBQVlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBVEY7O0FBWUE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtBQVRGOztBQVlBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQVRGOztBQVlBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFURjs7QUFZQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3Q0FBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFURjtBQVdFO0VBQ0Usa0NBQUE7RUFDQSxvQ0FBQTtBQVRKOztBQWFBLHlCQUFBO0FBQ0E7RUFDRSxVQUFBO0FBVkY7O0FBYUE7RUFDRSx1QkFBQTtBQVZGOztBQWFBO0VBQ0UscUNBQUE7RUFDQSxrQkFBQTtBQVZGO0FBWUU7RUFDRSxvQ0FBQTtBQVZKOztBQWNBLGVBQUE7QUFDQTtFQUNFO0lBQ0UsWUFBQTtFQVhGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBzaWRlYmFyLmNvbXBvbmVudC5zY3NzXHJcbiAqIFxyXG4gKiBFc3RpbG9zIHBhcmEgZWwgY29tcG9uZW50ZSBzaWRlYmFyLlxyXG4gKi9cclxuXHJcbi5zaWRlYmFyIHtcclxuICB3aWR0aDogMjYwcHg7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDE1LCAyMywgMzIsIDAuOTUpLCByZ2JhKDExLCAxNywgMjIsIDAuOTgpKTtcclxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSg1LCAyMDgsIDIzMCwgMC4xKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcGFkZGluZzogMjBweCAxNnB4O1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogMDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbiAgYm94LXNoYWRvdzogNHB4IDAgMjBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbn1cclxuXHJcbi8qIFBhcnRlIHN1cGVyaW9yICovXHJcbi5zaWRlYmFyLXRvcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNSwgMjA4LCAyMzAsIDAuMSk7XHJcbn1cclxuXHJcbi5sb2dvLXdyYXAge1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2dvLWltZyB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDJweCA4cHggcmdiYSg1LCAyMDgsIDIzMCwgMC4zKSk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcclxuICBcclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNSkgcm90YXRlKDVkZWcpO1xyXG4gIH1cclxufVxyXG5cclxuLmJyYW5kIHtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2U2ZWVmNjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiA2cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG59XHJcblxyXG4uYmFkZ2Uge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwNWQwZTYsICMwYTlmYjgpO1xyXG4gIGNvbG9yOiAjMDQyMzJmO1xyXG4gIHBhZGRpbmc6IDNweCA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGZvbnQtc2l6ZTogOXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSg1LCAyMDgsIDIzMCwgMC4zKTtcclxufVxyXG5cclxuLyogQsODwrpzcXVlZGEgKi9cclxuLnNlYXJjaC13cmFwcGVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4uc2VhcmNoIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxMHB4IDE0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNSwgMjA4LCAyMzAsIDAuMik7XHJcbiAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4wNSk7XHJcbiAgY29sb3I6ICNlNmVlZjY7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcblxyXG4gICY6OnBsYWNlaG9sZGVyIHtcclxuICAgIGNvbG9yOiAjOWFhNWIxO1xyXG4gIH1cclxuXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjMDVkMGU2O1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1LCAyMDgsIDIzMCwgMC4xKTtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDUsIDIwOCwgMjMwLCAwLjEpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xyXG4gIH1cclxufVxyXG5cclxuLyogTmF2ZWdhY2nDg8KzbiAqL1xyXG4ubmF2IHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDRweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4ubmF2LWl0ZW0ge1xyXG4gIHBhZGRpbmc6IDEycHggMTRweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiAjOWFhNWIxO1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEycHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgXHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHRvcDogMDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAzcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDVkMGU2O1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMCk7XHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xyXG4gIH1cclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDUsIDIwOCwgMjMwLCAwLjE1KTtcclxuICAgIGNvbG9yOiAjMDVkMGU2O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDRweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoNSwgMjA4LCAyMzAsIDAuMik7XHJcbiAgICBcclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubmF2LWljb24ge1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMTUpIHJvdGF0ZSgtNWRlZyk7XHJcbiAgICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMCAycHggNHB4IHJnYmEoNSwgMjA4LCAyMzAsIDAuNSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJi5hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzA1ZDBlNiwgIzBhOWZiOCk7XHJcbiAgICBjb2xvcjogIzA0MjMyZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoNSwgMjA4LCAyMzAsIDAuNCk7XHJcbiAgICBcclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMDQyMzJmO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubmF2LWljb24ge1xyXG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4ubmF2LWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHdpZHRoOiAyOHB4O1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XHJcbn1cclxuXHJcbi5uYXYtbGFiZWwge1xyXG4gIGZsZXg6IDE7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xyXG59XHJcblxyXG4vKiBQaWUgZGVsIHNpZGViYXIgKi9cclxuLnNpZGViYXItZm9vdCB7XHJcbiAgcGFkZGluZy10b3A6IDE2cHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTJweDtcclxufVxyXG5cclxuLnVzZXItbWluaSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uYXZhdGFyIHtcclxuICB3aWR0aDogMzJweDtcclxuICBoZWlnaHQ6IDMycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQ6ICMwNWQwZTY7XHJcbiAgY29sb3I6ICMwNDIzMmY7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4udXNlci1pbmZvIHtcclxuICBmbGV4OiAxO1xyXG4gIG1pbi13aWR0aDogMDtcclxufVxyXG5cclxuLnVzZXItbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6ICNlNmVlZjY7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4udXNlci1yb2xlIHtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgY29sb3I6ICM5YWE1YjE7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG59XHJcblxyXG4uYnRuLWxvZ291dCB7XHJcbiAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCA4NywgODcsIDAuMyk7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6ICNmZjU3NTc7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA4NywgODcsIDAuMSk7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCA4NywgODcsIDAuNik7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBTY3JvbGwgcGVyc29uYWxpemFkbyAqL1xyXG4uc2lkZWJhcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiA2cHg7XHJcbn1cclxuXHJcbi5zaWRlYmFyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5zaWRlYmFyOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xyXG4gIH1cclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuc2lkZWJhciB7XHJcbiAgICB3aWR0aDogMjQwcHg7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/SWO/api'
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config */ 289);
/**
 * main.ts
 *
 * Punto de entrada de la aplicación Angular.
 * - Importa el módulo raíz (AppModule o bootstrap)
 * - Inicia la compilación Just-in-Time (JIT) o usa la compilación previa (AOT)
 */



(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _app_app_config__WEBPACK_IMPORTED_MODULE_1__.appConfig).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map