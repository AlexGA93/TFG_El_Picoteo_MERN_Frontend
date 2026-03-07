import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CommonModule } from '@angular/common';
import { DashboardRecetas } from '../components/dashboard/dahboard-recetas/dahboard-recetas.component';
import { DashboardStock } from '../components/dashboard/dashboard-stock/dashboard-stock.component';
import { DashboardInventory } from '../components/dashboard/dashboard-inventory/dashboard-inventory.component';
import { DashboardVentas } from '../components/dashboard/dashboard-ventas/dashboard-ventas.component';
import { DashboardGastos } from '../components/dashboard/dashboard-gastos/dashboard-gastos.component';
import { DashboardService } from '../../../services/dashboard.service';
import { LucideAngularModule } from 'lucide-angular';
import { LoaderComponent } from '../../../shared/loader/loader.component';
@Component({
    selector: 'app-dashboard',
  imports: [
    CommonModule,
    DashboardRecetas,
    DashboardStock,
    DashboardInventory,
    DashboardVentas,
    DashboardGastos,
    LucideAngularModule,
    LoaderComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  
  // Inyectar el servicio
  private dashboardService = inject(DashboardService);

  // 1️⃣ Convertir Observable → Signal (CORREGIDO)
  dashboardData = toSignal(
    this.dashboardService.getDashboardData(),
    { initialValue: null }
  );

  // 2️⃣ Crear signals derivadas para cada sección
  dashboardRecipesData = computed(() => this.dashboardData()?.recipes ?? []);
  
  dashboardStockData = computed(() => this.dashboardData()?.stock ?? []);
  
  dashboardInventoryData= computed(() => this.dashboardData()?.inventory ?? []);

  dashboardVentasData = computed(() => this.dashboardData()?.ventas ?? []);

  dashboardGastosData = computed(() => this.dashboardData()?.gastos ?? []);

  isLoading = computed(() => this.dashboardData() === null);
  
}
