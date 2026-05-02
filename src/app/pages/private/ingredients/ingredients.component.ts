import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, ArrowBigLeftDash, Filter, Search, ListTree, Layers } from 'lucide-angular';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardData, DashboardIngredients } from '../../../../types/database.types';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';
import { TranslatePipe } from '@ngx-translate/core';

interface IngredientsViewState {
  loading: boolean;
  message: string;
  data: DashboardData | null;
  error: string | null;
}

const INITIAL_INGREDIENTS_STATE: IngredientsViewState = {
  loading: true,
  message: '',
  data: null,
  error: null,
};

@Component({
  selector: 'app-ingredients',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideAngularModule,
    LoaderComponent,
    UnitFormatPipe,
    TranslatePipe,
  ],
  templateUrl: './ingredients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsComponent {
  readonly ALL_TYPES = '__all_types__';
  readonly ALL_UNITS = '__all_units__';

  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  readonly Filter = Filter;
  readonly Search = Search;
  readonly ListTree = ListTree;
  readonly Layers = Layers;

  private dashboardService = inject(DashboardService);

  private roundTo = (value: number, decimals = 3): number => {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  };

  ingredientsState = toSignal(
    this.dashboardService.getDashboardData().pipe(
      map(
        (response): IngredientsViewState => ({
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
          error: error.error?.message || 'ingredients.error_loading',
        }),
      ),
      startWith(INITIAL_INGREDIENTS_STATE),
    ),
    { initialValue: INITIAL_INGREDIENTS_STATE },
  );

  searchTerm = signal('');
  selectedType = signal(this.ALL_TYPES);
  selectedUnit = signal(this.ALL_UNITS);
  viewMode = signal<'detalle' | 'resumen'>('resumen');

  ingredientsData = computed(() => this.ingredientsState().data?.ingredients ?? []);
  isLoading = computed(() => this.ingredientsState().loading);
  loadError = computed(() => this.ingredientsState().error);

  ingredientTypes = computed(() => {
    const types = new Set(this.ingredientsData().map((item) => item.tipo));
    return [this.ALL_TYPES, ...[...types].sort((a, b) => a.localeCompare(b))];
  });

  ingredientUnits = computed(() => {
    const units = new Set(this.ingredientsData().map((item) => item.unidad));
    return [this.ALL_UNITS, ...[...units].sort((a, b) => a.localeCompare(b))];
  });

  filteredIngredients = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.selectedType();
    const unit = this.selectedUnit();

    return this.ingredientsData().filter((item) => {
      const matchesTerm =
        !term ||
        item.ingrediente.toLowerCase().includes(term) ||
        item.producto.toLowerCase().includes(term);
      const matchesType = type === this.ALL_TYPES || item.tipo === type;
      const matchesUnit = unit === this.ALL_UNITS || item.unidad === unit;

      return matchesTerm && matchesType && matchesUnit;
    });
  });

  groupedIngredients = computed(() => {
    const grouped = new Map<
      string,
      {
        ingrediente: string;
        tipo: DashboardIngredients['tipo'];
        unidad: DashboardIngredients['unidad'];
        cantidadTotal: number;
        recetas: Set<string>;
      }
    >();

    for (const item of this.filteredIngredients()) {
      const key = `${item.ingrediente}-${item.tipo}-${item.unidad}`;
      const current = grouped.get(key);

      if (current) {
        current.cantidadTotal = this.roundTo(current.cantidadTotal + item.cantidades);
        current.recetas.add(item.producto);
      } else {
        grouped.set(key, {
          ingrediente: item.ingrediente,
          tipo: item.tipo,
          unidad: item.unidad,
          cantidadTotal: this.roundTo(item.cantidades),
          recetas: new Set([item.producto]),
        });
      }
    }

    return [...grouped.values()].sort((a, b) =>
      a.ingrediente.localeCompare(b.ingrediente),
    );
  });

  totalUniqueIngredients = computed(() => this.groupedIngredients().length);
  totalRegisters = computed(() => this.filteredIngredients().length);
  totalCategories = computed(() => new Set(this.filteredIngredients().map((i) => i.tipo)).size);

  setViewMode(mode: 'detalle' | 'resumen'): void {
    this.viewMode.set(mode);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedType.set(this.ALL_TYPES);
    this.selectedUnit.set(this.ALL_UNITS);
  }
}
