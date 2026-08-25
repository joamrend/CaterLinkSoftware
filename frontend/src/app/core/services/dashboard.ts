import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardResponse {
  metrics: {
    totalUsuarios: number;
    totalOrdenes: number;
    totalPlatos: number;
  };
  ordenesRecientes: Array<{
    id: number;
    fecha: string;
    estado: string;
    usuario: {
      nombre: string;
      email: string;
    };
    detalles: Array<{
      id: number;
      cantidad: number;
      plato: {
        nombre: string;
      };
    }>;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4000/api/dashboard';

  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.apiUrl);
  }
}