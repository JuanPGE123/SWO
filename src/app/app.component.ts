/**
 * app.component.ts
 * 
 * Componente raíz de la aplicación Angular.
 * - Proporciona el router-outlet para la navegación
 * - Es el contenedor principal de toda la aplicación
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * El componente AppComponent es el punto de entrada de toda la app.
   * El router-outlet renderizará los componentes correspondientes según la ruta activa.
   */
}
