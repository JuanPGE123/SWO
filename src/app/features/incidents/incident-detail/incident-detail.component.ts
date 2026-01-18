/**
 * incident-detail.component.ts
 * Componente para visualizar el detalle de una incidencia
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IncidentsService } from '../../../core/services/incidents.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Incidencia } from '../../../core/models/models';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {
  incidente: Incidencia | undefined;
  incidenteId: string = '';

  constructor(
    private route: ActivatedRoute,
    private incidentsService: IncidentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.incidenteId = params['id'];
      this.cargarIncidente();
    });
  }

  cargarIncidente(): void {
    this.incidente = this.incidentsService.obtenerIncidenciaPorId(this.incidenteId);
  }
}
