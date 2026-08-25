import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardResponse } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  data: DashboardResponse | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando dashboard:', err);
        this.error = 'No se pudo conectar con el servidor backend (puerto 4000).';
        this.loading = false;
      }
    });
  }
}