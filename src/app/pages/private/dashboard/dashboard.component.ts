import { Component, inject, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { DashboardInventory } from "../components/dashboard/dashboard-inventory/dashboard-inventory.component";
import { DashboardSales } from "../components/dashboard/dashboard-sales/dashboard-sales.component";
import { DashboardExpenses } from "../components/dashboard/dashboard-expenses/dashboard-expenses.component";
import { DashboardService } from "../../../services/dashboard.service";
import { LucideAngularModule } from "lucide-angular";
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { catchError, forkJoin, map, of, startWith } from "rxjs";
import { DashboardData, DashboardFinancePeriodData } from "../../../../types/database.types";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { DashboardRecipes } from "../components/dashboard/dahboard-recipes/dahboard-recipes.component";
import { DashboardIngredients } from "../components/dashboard/dashboard-ingredients/dashboard-ingredients.component";
import { SalesService } from "../../../services/sales.service";
import { Purchase, Sale } from "../../../../types/finance.types";

interface DashboardViewState {
  loading: boolean;
  message: string;
  data: DashboardData | null;
  sales: Sale[];
  purchases: Purchase[];
  error: string | null;
}

const INITIAL_DASHBOARD_STATE: DashboardViewState = {
  loading: true,
  message: "",
  data: null,
  sales: [],
  purchases: [],
  error: null,
};
@Component({
  selector: "app-dashboard",
  imports: [
    CommonModule,
    DashboardIngredients,
    DashboardInventory,
    DashboardSales,
    LucideAngularModule,
    LoaderComponent,
    ToastModule,
    DashboardRecipes,
    DashboardExpenses,
  ],
  providers: [MessageService],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  // Inyectar el servicio
  private dashboardService = inject(DashboardService);
  private salesService = inject(SalesService);
  private messageService = inject(MessageService);

  dashboardState = toSignal(
    forkJoin({
      dashboardResponse: this.dashboardService.getDashboardData(),
      salesResponse: this.salesService.getSales(),
      purchasesResponse: this.salesService.getPurchases(),
    }).pipe(
      map(
        ({ dashboardResponse, salesResponse, purchasesResponse }): DashboardViewState => {
          return {
          loading: false,
          message: dashboardResponse.message || salesResponse.message || purchasesResponse.message,
          data: dashboardResponse.data,
          sales: salesResponse.data ?? [],
          purchases: purchasesResponse.data ?? [],
          error: dashboardResponse.success && salesResponse.success && purchasesResponse.success
            ? null
            : dashboardResponse.message || salesResponse.message || purchasesResponse.message || "No se pudo cargar el dashboard.",
        }
        },
      ),
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          message: "",
          data: null,
          sales: [],
          purchases: [],
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
  dashboardVentasData = computed(() => this.groupSalesByMonth(this.dashboardState().sales));
  dashboardGastosData = computed(() => this.groupPurchasesByMonth(this.dashboardState().purchases));
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

  private groupSalesByMonth(data: Sale[]): DashboardFinancePeriodData[] {
    return this.groupByMonth(data.map((item) => ({ date: item.fecha_venta, amount: item.total_venta })));
  }

  private groupPurchasesByMonth(data: Purchase[]): DashboardFinancePeriodData[] {
    return this.groupByMonth(data.map((item) => ({ date: item.fecha_compra, amount: item.total_compra })));
  }

  private groupByMonth(data: Array<{ date: string; amount: number }>): DashboardFinancePeriodData[] {
    const formatter = new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" });
    const grouped = new Map<string, { total: number; count: number; date: Date }>();

    data.forEach((item) => {
      const parsedDate = new Date(item.date);
      if (Number.isNaN(parsedDate.getTime())) return;

      const label = formatter.format(parsedDate);
      const current = grouped.get(label);
      grouped.set(label, {
        total: (current?.total ?? 0) + Number(item.amount || 0),
        count: (current?.count ?? 0) + 1,
        date: parsedDate,
      });
    });

    return Array.from(grouped.entries())
      .map(([periodo, value]) => ({
        periodo,
        totalDinero: Number(value.total.toFixed(2)),
        numeroOrdenes: value.count,
        date: value.date,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(({ date: _date, ...item }) => item as DashboardFinancePeriodData);
  }
}
