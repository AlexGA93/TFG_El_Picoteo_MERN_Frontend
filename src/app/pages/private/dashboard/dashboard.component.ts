import { Component, inject, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { DashboardRecetas } from "../components/dashboard/dahboard-recetas/dahboard-recetas.component";
import { DashboardStock } from "../components/dashboard/dashboard-stock/dashboard-stock.component";
import { DashboardInventory } from "../components/dashboard/dashboard-inventory/dashboard-inventory.component";
import { DashboardVentas } from "../components/dashboard/dashboard-ventas/dashboard-ventas.component";
import { DashboardGastos } from "../components/dashboard/dashboard-gastos/dashboard-gastos.component";
import { DashboardService } from "../../../services/dashboard.service";
import { LucideAngularModule } from "lucide-angular";
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { catchError, map, of, startWith } from "rxjs";
import { DashboardData } from "../../../../types/database.types";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

interface DashboardViewState {
  loading: boolean;
  message: string;
  data: DashboardData | null;
  error: string | null;
}

const INITIAL_DASHBOARD_STATE: DashboardViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};
@Component({
  selector: "app-dashboard",
  imports: [
    CommonModule,
    DashboardRecetas,
    DashboardStock,
    DashboardInventory,
    DashboardVentas,
    DashboardGastos,
    LucideAngularModule,
    LoaderComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  // Inyectar el servicio
  private dashboardService = inject(DashboardService);
  private messageService = inject(MessageService);

  dashboardState = toSignal(
    this.dashboardService.getDashboardData().pipe(
      map(
        (response): DashboardViewState => ({
          loading: false,
          message: response.message,
          data: response.data,
          error: response.success
            ? null
            : response.message || "No se pudo cargar el dashboard.",
        }),
      ),
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          message: "",
          data: null,
          error: error.error?.message || "Error al cargar el dashboard.",
        }),
      ),
      startWith(INITIAL_DASHBOARD_STATE),
    ),
    { initialValue: INITIAL_DASHBOARD_STATE },
  );

  dashboardData = computed(() => this.dashboardState().data);
  dashboardMessage = computed(() => this.dashboardState().message);
  dashboardError = computed(() => this.dashboardState().error);
  private lastShownSuccessToast = signal("");
  private lastShownErrorToast = signal("");

  // 2️⃣ Crear signals derivadas para cada sección
  dashboardRecipesData = computed(() => this.dashboardData()?.recipes ?? []);
  dashboardStockData = computed(() => this.dashboardData()?.stock ?? []);
  dashboardInventoryData = computed(
    () => this.dashboardData()?.inventory ?? [],
  );
  dashboardVentasData = computed(() => this.dashboardData()?.ventas ?? []);
  dashboardGastosData = computed(() => this.dashboardData()?.gastos ?? []);

  // loader
  isLoading = computed(() => this.dashboardState().loading);
  constructor() {
    effect(() => {
      const message = this.dashboardMessage();
      const error = this.dashboardError();
      const lastMessage = this.lastShownSuccessToast();
      const lastError = this.lastShownErrorToast();

      if (message && message !== lastMessage && !error) {
        this.messageService.add({
          severity: "success",
          summary: "Dashboard",
          detail: message,
        });
        this.lastShownSuccessToast.set(message);
      }

      if (error && error !== lastError) {
        this.messageService.add({
          severity: "error",
          summary: "Dashboard",
          detail: error,
        });
        this.lastShownErrorToast.set(error);
      }
    });
  }
}
