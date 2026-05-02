import { Component, inject, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { DashboardStock } from "../components/dashboard/dashboard-stock/dashboard-stock.component";
import { DashboardInventory } from "../components/dashboard/dashboard-inventory/dashboard-inventory.component";
import { DashboardSales } from "../components/dashboard/dashboard-sales/dashboard-sales.component";
import { DashboardExpenses } from "../components/dashboard/dashboard-expenses/dashboard-expenses.component";
import { DashboardService } from "../../../services/dashboard.service";
import { LucideAngularModule } from "lucide-angular";
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { catchError, map, of, startWith } from "rxjs";
import { DashboardData } from "../../../../types/database.types";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { DashboardRecipes } from "../components/dashboard/dahboard-recipes/dahboard-recipes.component";
import { TranslatePipe } from "@ngx-translate/core";
import { DashboardIngredients } from "../components/dashboard/dashboard-ingredients/dashboard-ingredients.component";

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
    DashboardStock,
    DashboardIngredients,
    DashboardInventory,
    DashboardSales,
    LucideAngularModule,
    LoaderComponent,
    ToastModule,
    DashboardRecipes,
    DashboardExpenses,
    TranslatePipe
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
        (response): DashboardViewState => {
          console.log(response);
          
          return {
          loading: false,
          message: response.message,
          data: response.data,
          error: response.success
            ? null
            : response.message || "No se pudo cargar el dashboard.",
        }
        },
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
  dashboardInventoryData = computed(() => this.dashboardData()?.inventory ?? []);
  dashboardVentasData = computed(() => this.dashboardData()?.ventas ?? []);
  dashboardGastosData = computed(() => this.dashboardData()?.gastos ?? []);
  dashboardIngredients = computed(() => this.dashboardData()?.ingredients ?? []);

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
