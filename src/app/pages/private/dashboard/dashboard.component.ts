import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CommonModule } from '@angular/common';
import { DashboardRecetas } from '../components/dashboard/dahboard-recetas/dahboard-recetas.component';
import { DashboardStock } from '../components/dashboard/dashboard-stock/dashboard-stock.component';
import { DashboardInventory } from '../components/dashboard/dashboard-inventory/dashboard-inventory.component';
import { DashboardVentas } from '../components/dashboard/dashboard-ventas/dashboard-ventas.component';
import { DashboardGastos } from '../components/dashboard/dashboard-gastos/dashboard-gastos.component';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardRecipe } from '../../../../types/database.types';
import { LucideAngularModule } from 'lucide-angular';
@Component({
    selector: 'app-dashboard',
  imports: [
    CommonModule,
    DashboardRecetas,
    DashboardStock,
    DashboardInventory,
    DashboardVentas,
    DashboardGastos,
    LucideAngularModule
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

  // 3️⃣ (Opcional) Signal para loading
  isLoading = signal(false);
  
}
