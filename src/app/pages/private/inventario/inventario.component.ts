import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { Eraser, LucideAngularModule, PencilLine, Plus, ArrowBigLeftDash } from "lucide-angular";
import { InventoryViewState } from '../../../../types/inventario.types';
import { InventoryService } from '../../../services/inventario.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { InventoryCreateModal } from '../components/inventory/inventory-create-modal/inventory-create-modal.component';

const INITIAL_INVENTORY_STATE: InventoryViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: 'app-inventario',
  imports: [CommonModule, CurrencyPipe, RouterLink, LucideAngularModule, LoaderComponent, UnitFormatPipe, DateFormatPipe, InventoryCreateModal],
  templateUrl: './inventario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventarioComponent {
  // inyecciones de servicios
  private inventoryService = inject(InventoryService);
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly Plus = Plus;
   readonly ArrowBigLeftDash = ArrowBigLeftDash;

  inventoryState = toSignal(
    this.inventoryService.getInventariokData()
    // proceso a seguir con la respuesta
      .pipe(
        // proceso intermedio
        map(
          (response): InventoryViewState => ({
            loading: false,
            message: response.message,
            data: response.data,
            error: response.success
              ? null
              : response.message || "No se pudo cargar el inventario.",
          }),
        ),
        // caso error
        catchError((error: HttpErrorResponse) =>
          of({
            loading: false,
            message: "",
            data: null,
            error: error.error?.message || "Error al cargar las recetas.",
          }),
        ),
        startWith(INITIAL_INVENTORY_STATE),
      ),
    // establecemos el estado inicial
    { initialValue: INITIAL_INVENTORY_STATE },
  );
  // signals derivadas de la formada ocn la respuesta
  inventoryData = computed(() => this.inventoryState().data);
  inventoryList = computed(() => this.inventoryData() ?? []);
  inventoryMessage = computed(() => this.inventoryState().message);
  inventoryError = computed(() => this.inventoryState().error);
  isLoading = computed(() => this.inventoryState().loading);

  isCreateInventoryDialogVisible = signal(false);

   /**
   * @description Función para crear una nueva receta
   * @params none
   * @returns void
   */
  createRecipe() {
    this.isCreateInventoryDialogVisible.set(true);
  }

  closeCreateRecipeDialog(): void {
    this.isCreateInventoryDialogVisible.set(false);
  }

    onInventoryCreated(formData: FormData): void {
      console.log("datos del modal ", {formData});
      
      // const nombre = String(formData.get("nombre") ?? "");
      // const precio = Number(formData.get("precio") ?? 0);
      // const tiempoProduccion = Number(formData.get("tiempo_produccion_min") ?? 0);
      // const dificultad = String(formData.get("dificultad") ?? "");
  
      // const recipeToInsert: RecipesData = {
      //   id: Date.now(),
      //   nombre,
      //   precio,
      //   tiempo_produccion_min: tiempoProduccion,
      //   dificultad,
      //   ingredients: [],
      // };
  
      // this.recipesState.update((state) => ({
      //   ...state,
      //   data: [recipeToInsert, ...(state.data ?? [])],
      // }));
  
      // this.closeCreateRecipeDialog();
  
      // Cuando tengas el endpoint de creacion, aqui puedes hacer el POST
      // y despues volver a ejecutar this.loadRecipes() para sincronizar con backend.
    }

    
}
