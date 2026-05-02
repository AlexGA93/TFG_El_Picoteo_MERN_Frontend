import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, ArrowBigLeftDash, TrendingUp, ChartColumn, CircleDollarSign } from 'lucide-angular';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardData, DashboardFinancePeriodData } from '../../../../types/database.types';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';
import { mockSalesDashboardData } from '../../../services/mockups/dashboard.mockups';

interface SalesViewState {
  loading: boolean;
  message: string;
  data: DashboardData | null;
  error: string | null;
}

interface SalesPeriodMetrics {
  periodo: DashboardFinancePeriodData['periodo'];
  ingreso: number;
  gasto: number;
  ganancia: number;
  ordenes: number;
  margen: number;
}

const INITIAL_SALES_STATE: SalesViewState = {
  loading: true,
  message: '',
  data: null,
  error: null,
};

const USE_SALES_MOCK = true;

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, RouterLink, LucideAngularModule, LoaderComponent, TranslatePipe],
  templateUrl: './sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
  readonly ALL_PERIODS = '__all_periods__';
  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  readonly TrendingUp = TrendingUp;
  readonly ChartColumn = ChartColumn;
  readonly CircleDollarSign = CircleDollarSign;

  private dashboardService = inject(DashboardService);

  salesState = toSignal(
    (USE_SALES_MOCK
      ? of({
          success: true,
          message: 'Sales mock loaded',
          data: mockSalesDashboardData,
        }).pipe(delay(450))
      : this.dashboardService.getDashboardData()
    ).pipe(
      map(
        (response): SalesViewState => ({
          loading: false,
          message: response.message,
          data: response.data,
          error: response.success ? null : response.message,
        }),
      ),
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          message: '',
          data: null,
          error: error.error?.message || 'sales.error_loading',
        }),
      ),
      startWith(INITIAL_SALES_STATE),
    ),
    { initialValue: INITIAL_SALES_STATE },
  );

  selectedPeriod = signal<string>(this.ALL_PERIODS);

  isLoading = computed(() => this.salesState().loading);
  loadError = computed(() => this.salesState().error);

  ventas = computed(() => this.salesState().data?.ventas ?? []);
  gastos = computed(() => this.salesState().data?.gastos ?? []);

  periods = computed(() => [
    this.ALL_PERIODS,
    ...this.ventas().map((item) => item.periodo),
  ]);

  periodMetrics = computed<SalesPeriodMetrics[]>(() => {
    const expensesMap = new Map(this.gastos().map((item) => [item.periodo, item]));

    return this.ventas().map((saleItem) => {
      const expenseItem = expensesMap.get(saleItem.periodo);
      const ingreso = saleItem.totalDinero;
      const gasto = expenseItem?.totalDinero ?? 0;
      const ganancia = ingreso - gasto;
      const margen = ingreso > 0 ? (ganancia / ingreso) * 100 : 0;

      return {
        periodo: saleItem.periodo,
        ingreso: this.roundTo(ingreso, 2),
        gasto: this.roundTo(gasto, 2),
        ganancia: this.roundTo(ganancia, 2),
        ordenes: saleItem.numeroOrdenes,
        margen: this.roundTo(margen, 2),
      };
    });
  });

  filteredMetrics = computed(() => {
    const period = this.selectedPeriod();
    if (period === this.ALL_PERIODS) return this.periodMetrics();
    return this.periodMetrics().filter((item) => item.periodo === period);
  });

  totalIngresos = computed(() =>
    this.roundTo(this.filteredMetrics().reduce((acc, item) => acc + item.ingreso, 0), 2),
  );
  totalGastos = computed(() =>
    this.roundTo(this.filteredMetrics().reduce((acc, item) => acc + item.gasto, 0), 2),
  );
  totalGanancia = computed(() => this.roundTo(this.totalIngresos() - this.totalGastos(), 2));
  totalOrdenes = computed(() =>
    this.filteredMetrics().reduce((acc, item) => acc + item.ordenes, 0),
  );
  margenGlobal = computed(() => {
    const ingresos = this.totalIngresos();
    if (!ingresos) return 0;
    return this.roundTo((this.totalGanancia() / ingresos) * 100, 2);
  });

  maxScaleValue = computed(() =>
    Math.max(...this.filteredMetrics().map((item) => Math.max(item.ingreso, item.gasto)), 0),
  );

  gainLinePoints = computed(() => {
    const values = this.filteredMetrics().map((item) => item.ganancia);
    return this.buildLinePoints(values, 640, 220, 24);
  });

  donutBackground = computed(() => {
    const margin = Math.max(0, Math.min(100, this.margenGlobal()));
    return `conic-gradient(#10b981 0% ${margin}%, #ef4444 ${margin}% 100%)`;
  });

  setPeriod(period: string): void {
    this.selectedPeriod.set(period);
  }

  barWidth(value: number, maxValue: number): string {
    if (maxValue <= 0) return '0%';
    return `${this.roundTo((value / maxValue) * 100, 2)}%`;
  }

  formatCurrency(value: number): string {
    return `${value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  }

  private roundTo(value: number, decimals = 2): number {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  private buildLinePoints(values: number[], width: number, height: number, padding: number): string {
    if (!values.length) return '';
    if (values.length === 1) {
      const y = height / 2;
      return `${padding},${y} ${width - padding},${y}`;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    return values
      .map((value, index) => {
        const x = padding + (index / (values.length - 1)) * innerW;
        const y = padding + ((max - value) / range) * innerH;
        return `${this.roundTo(x, 2)},${this.roundTo(y, 2)}`;
      })
      .join(' ');
  }
}
