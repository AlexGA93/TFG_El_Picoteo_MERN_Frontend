import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ArrowBigLeftDash, CircleDollarSign, Eraser, LucideAngularModule, PencilLine, Plus } from 'lucide-angular';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Purchase } from '../../../../types/finance.types';
import { SalesService } from '../../../services/sales.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface ExpensesViewState {
  loading: boolean;
  purchases: Purchase[];
  error: string | null;
}

const INITIAL_EXPENSES_STATE: ExpensesViewState = {
  loading: true,
  purchases: [],
  error: null,
};

@Component({
  selector: 'app-expenses',
  imports: [CommonModule, RouterLink, LucideAngularModule, LoaderComponent, TranslatePipe, ReactiveFormsModule, ToastModule, DatePipe],
  providers: [MessageService],
  templateUrl: './expenses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  readonly CircleDollarSign = CircleDollarSign;
  readonly Plus = Plus;
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;

  private salesService = inject(SalesService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private reload$ = new Subject<void>();

  expensesState = toSignal(
    this.reload$.pipe(
      startWith(void 0),
      switchMap(() => this.salesService.getPurchases()),
      map(
        (response): ExpensesViewState => ({
          loading: false,
          purchases: response.data ?? [],
          error: response.success ? null : response.message,
        }),
      ),
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          purchases: [],
          error: error.error?.message || 'expenses.error_loading',
        }),
      ),
      startWith(INITIAL_EXPENSES_STATE),
    ),
    { initialValue: INITIAL_EXPENSES_STATE },
  );

  purchaseForm = this.formBuilder.group({
    fecha_compra: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    proveedor: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
    id_usuario: this.formBuilder.control(1, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    total_compra: this.formBuilder.control(0, { validators: [Validators.required, Validators.min(0.01)], nonNullable: true }),
  });

  isFormOpen = signal(false);
  editingId = signal<number | null>(null);

  isLoading = computed(() => this.expensesState().loading);
  loadError = computed(() => this.expensesState().error);
  purchases = computed(() => this.expensesState().purchases);
  totalExpenses = computed(() =>
    this.purchases().reduce((acc, item) => acc + Number(item.total_compra || 0), 0),
  );

  formatCurrency(value: number): string {
    return `${value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} €`;
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.purchaseForm.reset({
      fecha_compra: this.getNowAsLocalDateTime(),
      proveedor: '',
      id_usuario: 1,
      total_compra: 0,
    });
    this.isFormOpen.set(true);
  }

  openEditForm(item: Purchase): void {
    this.editingId.set(item.id);
    this.purchaseForm.reset({
      fecha_compra: this.toDateTimeLocal(item.fecha_compra),
      proveedor: item.proveedor,
      id_usuario: item.id_usuario,
      total_compra: item.total_compra,
    });
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingId.set(null);
  }

  savePurchase(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const payload = this.purchaseForm.getRawValue();
    const request$ = this.editingId()
      ? this.salesService.updatePurchase(this.editingId() as number, payload)
      : this.salesService.createPurchase(payload);

    request$.subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Gastos',
            detail: response.message || (this.editingId() ? 'Compra actualizada' : 'Compra creada'),
          });
          this.closeForm();
          this.reload$.next();
          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Gastos',
          detail: response.message || 'No se pudo guardar la compra',
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Gastos',
          detail: error.error?.message || 'No se pudo guardar la compra',
        });
      },
    });
  }

  deletePurchase(id: number): void {
    this.salesService.deletePurchase(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Gastos',
            detail: response.message || 'Compra eliminada',
          });
          this.reload$.next();
          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Gastos',
          detail: response.message || 'No se pudo eliminar la compra',
        });
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Gastos',
          detail: error.error?.message || 'No se pudo eliminar la compra',
        });
      },
    });
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
