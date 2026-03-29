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

import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncidentsComponent } from './features/incidents/incidents.component';
import { UsersComponent } from './features/users/users.component';
import { ReportsComponent } from './features/reports/reports.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { IncidentDetailComponent } from './features/incidents/incident-detail/incident-detail.component';
import { ProjectsComponent } from './features/projects/projects.component';

/**
 * Rutas principales de la aplicación
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // Guard de autenticación: solo usuarios autenticados pueden acceder
    // canActivate: [authGuard]
  },
  {
    path: 'incidents',
    component: IncidentsComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'incidents/:id',
    component: IncidentDetailComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'chatbot',
    component: ChatbotComponent,
    // canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
