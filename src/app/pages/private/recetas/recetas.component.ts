import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RecetasService } from '../../../services/recetas.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { RecetasViewState } from '../../../../types/recetas.types';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { Eraser, LucideAngularModule, PencilLine, Plus, ArrowBigLeftDash } from 'lucide-angular';

const INITIAL_RECETAS_STATE: RecetasViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: 'app-recetas',
  imports: [CommonModule, CurrencyPipe, LoaderComponent, LucideAngularModule, RouterLink],
  templateUrl: './recetas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecetasComponent {
  // inyecciones de servicios
  private recetasService = inject(RecetasService);
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly Plus = Plus;
  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  // variable signal derivada de la respuesta del servicio
  recipesState = toSignal(
    this.recetasService.getRecipesData()
    // proceso a seguir con la respuesta
    .pipe(
      // proceso intermedio
      map((response): RecetasViewState =>({
        loading: false,
        message: response.message,
        data: response.data,
        error: response.success
            ? null
            : response.message || "No se pudo cargar las recetas.",
      })),
      // caso error 
      catchError((error: HttpErrorResponse) => of({
        loading: false,
          message: "",
          data: null,
          error: error.error?.message || "Error al cargar las recetas.",
      })),
      startWith(INITIAL_RECETAS_STATE),
    ),
    // establecemos el estado inicial
    { initialValue: INITIAL_RECETAS_STATE }
  );

  // signals derivadas de la formada ocn la respuesta
  recipesData = computed(() => this.recipesState().data);
  recipesList = computed(() => this.recipesData() ?? []);
  recipesMessage = computed(() => this.recipesState().message);
  recipesError = computed(() => this.recipesState().error);
  isLoading = computed(() => this.recipesState().loading);
}
