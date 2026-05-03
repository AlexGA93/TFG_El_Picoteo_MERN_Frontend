import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, forkJoin, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, ArrowBigLeftDash, TrendingUp, ChartColumn, CircleDollarSign, Plus, PencilLine, Eraser } from 'lucide-angular';
import { DashboardFinancePeriodData } from '../../../../types/database.types';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PaymentMethod, Purchase, Sale } from '../../../../types/finance.types';
import { SalesService } from '../../../services/sales.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface SalesViewState {
  loading: boolean;
  message: string;
  sales: Sale[];
  purchases: Purchase[];
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
  sales: [],
  purchases: [],
  error: null,
};

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, RouterLink, LucideAngularModule, LoaderComponent, TranslatePipe, ReactiveFormsModule, ToastModule, DatePipe],
  providers: [MessageService],
  templateUrl: './sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
  readonly ALL_PERIODS = '__all_periods__';
  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  readonly TrendingUp = TrendingUp;
  readonly ChartColumn = ChartColumn;
  readonly CircleDollarSign = CircleDollarSign;
  readonly Plus = Plus;
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly paymentMethods: PaymentMethod[] = ['efectivo', 'tarjeta', 'bizum'];

  private salesService = inject(SalesService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private reload$ = new Subject<void>();

  salesState = toSignal(
    this.reload$.pipe(
      startWith(void 0),
      switchMap(() =>
        forkJoin({
          salesResponse: this.salesService.getSales(),
          purchasesResponse: this.salesService.getPurchases(),
        }),
      ),
      map(
        ({ salesResponse, purchasesResponse }): SalesViewState => ({
          loading: false,
          message: salesResponse.message || purchasesResponse.message,
          sales: salesResponse.data ?? [],
          purchases: purchasesResponse.data ?? [],
          error: salesResponse.success && purchasesResponse.success ? null : (salesResponse.message || purchasesResponse.message),
        }),
      ),
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          message: '',
          sales: [],
          purchases: [],
          error: error.error?.message || 'sales.error_loading',
        }),
      ),
      startWith(INITIAL_SALES_STATE),
    ),
    { initialValue: INITIAL_SALES_STATE },
  );

  saleForm = this.formBuilder.group({
    fecha_venta: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    metodo_pago: this.formBuilder.control<PaymentMethod>('efectivo', { validators: [Validators.required], nonNullable: true }),
    id_usuario: this.formBuilder.control(1, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    total_venta: this.formBuilder.control(0, { validators: [Validators.required, Validators.min(0.01)], nonNullable: true }),
  });
  isFormOpen = signal(false);
  editingId = signal<number | null>(null);
  selectedPeriod = signal<string>(this.ALL_PERIODS);

  isLoading = computed(() => this.salesState().loading);
  loadError = computed(() => this.salesState().error);
  salesRows = computed(() => this.salesState().sales);

  ventas = computed(() => this.groupSalesByPeriod(this.salesState().sales));
  gastos = computed(() => this.groupPurchasesByPeriod(this.salesState().purchases));

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

  openCreateForm(): void {
    this.editingId.set(null);
    this.saleForm.reset({
      fecha_venta: this.getNowAsLocalDateTime(),
      metodo_pago: 'efectivo',
      id_usuario: 1,
      total_venta: 0,
    });
    this.isFormOpen.set(true);
  }

  openEditForm(item: Sale): void {
    this.editingId.set(item.id);
    this.saleForm.reset({
      fecha_venta: this.toDateTimeLocal(item.fecha_venta),
      metodo_pago: item.metodo_pago,
      id_usuario: item.id_usuario,
      total_venta: item.total_venta,
    });
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingId.set(null);
  }

  saveSale(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
      return;
    }

    const payload = this.saleForm.getRawValue();
    const request$ = this.editingId()
      ? this.salesService.updateSale(this.editingId() as number, payload)
      : this.salesService.createSale(payload);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Ventas',
            detail: response.message || (this.editingId() ? 'Venta actualizada' : 'Venta creada'),
          });
          this.closeForm();
          this.reload$.next();
          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Ventas',
          detail: response.message || 'No se pudo guardar la venta',
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ventas',
          detail: error.error?.message || 'No se pudo guardar la venta',
        });
      },
    });
  }

  deleteSale(id: number): void {
    this.salesService.deleteSale(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Ventas',
            detail: response.message || 'Venta eliminada',
          });
          this.reload$.next();
          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Ventas',
          detail: response.message || 'No se pudo eliminar la venta',
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ventas',
          detail: error.error?.message || 'No se pudo eliminar la venta',
        });
      },
    });
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

  private groupSalesByPeriod(data: Sale[]): DashboardFinancePeriodData[] {
    const grouped = this.groupByMonth(
      data.map((sale) => ({ date: sale.fecha_venta, amount: sale.total_venta })),
    );

    return grouped.map((item) => ({
      periodo: item.periodo,
      totalDinero: item.totalDinero,
      numeroOrdenes: item.numeroOrdenes,
    }));
  }

  private groupPurchasesByPeriod(data: Purchase[]): DashboardFinancePeriodData[] {
    const grouped = this.groupByMonth(
      data.map((purchase) => ({ date: purchase.fecha_compra, amount: purchase.total_compra })),
    );

    return grouped.map((item) => ({
      periodo: item.periodo,
      totalDinero: item.totalDinero,
      numeroOrdenes: item.numeroOrdenes,
    }));
  }

  private groupByMonth(data: { date: string; amount: number }[]): Array<{
    periodo: DashboardFinancePeriodData['periodo'];
    totalDinero: number;
    numeroOrdenes: number;
  }> {
    const formatter = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' });
    const mapData = new Map<string, { totalDinero: number; numeroOrdenes: number; date: Date }>();

    data.forEach((item) => {
      const parsedDate = new Date(item.date);
      if (Number.isNaN(parsedDate.getTime())) return;

      const label = formatter.format(parsedDate);
      const current = mapData.get(label);
      mapData.set(label, {
        totalDinero: this.roundTo((current?.totalDinero ?? 0) + Number(item.amount || 0), 2),
        numeroOrdenes: (current?.numeroOrdenes ?? 0) + 1,
        date: parsedDate,
      });
    });

    return Array.from(mapData.entries())
      .map(([periodo, value]) => ({
        periodo: periodo as DashboardFinancePeriodData['periodo'],
        totalDinero: value.totalDinero,
        numeroOrdenes: value.numeroOrdenes,
        date: value.date,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(({ date: _date, ...item }) => item);
  }

  private toDateTimeLocal(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return this.getNowAsLocalDateTime();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  private getNowAsLocalDateTime(): string {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }
}
