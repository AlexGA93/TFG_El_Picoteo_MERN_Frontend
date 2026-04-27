import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RecetasService } from '../../../services/recetas.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecetasViewState, RecipesData } from '../../../../types/recetas.types';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { Eraser, LucideAngularModule, PencilLine, Plus, ArrowBigLeftDash } from 'lucide-angular';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';
import { RecipeCreateModalComponent } from '../components/recetas/recipe-create-modal/recipe-create-modal.component';
import { RecipeEditModalComponent } from '../components/recetas/recipe-edit-modal/recipe-edit-modal.component';
import { environment } from '../../../../env/environment';

const INITIAL_RECETAS_STATE: RecetasViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: 'app-recetas',
  imports: [CommonModule, CurrencyPipe, LoaderComponent, LucideAngularModule, RouterLink, UnitFormatPipe, RecipeCreateModalComponent, RecipeEditModalComponent],
  templateUrl: './recetas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecetasComponent {
  // inyecciones de servicios
  private recetasService = inject(RecetasService);
  private destroyRef = inject(DestroyRef);
  private readonly backendRootUrl = environment.baseUrl.replace(/\/api\/?$/, '');
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly Plus = Plus;
  readonly ArrowBigLeftDash = ArrowBigLeftDash;
  isCreateRecipeDialogVisible = signal(false);
  isEditRecipeDialogVisible = signal(false);
  selectedRecipe = signal<RecipesData | null>(null);
  recipesState = signal<RecetasViewState>(INITIAL_RECETAS_STATE);

  // signals derivadas de la formada ocn la respuesta
  recipesData = computed(() => this.recipesState().data);
  recipesList = computed(() => this.recipesData() ?? []);
  recipesMessage = computed(() => this.recipesState().message);
  recipesError = computed(() => this.recipesState().error);
  isLoading = computed(() => this.recipesState().loading);

  constructor() {
    this.loadRecipes();
  }

  // funciones

  private loadRecipes(): void {
    this.recipesState.set({
      ...this.recipesState(),
      loading: true,
      error: null,
    });

    this.recetasService
      .getRecipesData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.recipesState.set({
            loading: false,
            message: response.message,
            data: response.data,
            error: response.success
              ? null
              : response.message || "No se pudo cargar las recetas.",
          });
        },
        error: (error: HttpErrorResponse) => {
          this.recipesState.set({
            loading: false,
            message: "",
            data: null,
            error: error.error?.message || "Error al cargar las recetas.",
          });
        },
      });
  }

  /**
   * @description Función para crear una nueva receta
   * @params none
   * @returns void
   */
  createRecipe() {
    this.isCreateRecipeDialogVisible.set(true);
  }

  closeCreateRecipeDialog(): void {
    this.isCreateRecipeDialogVisible.set(false);
  }

  onRecipeCreated(formData: FormData): void {
    const nombre = String(formData.get("nombre") ?? "");
    const precio = Number(formData.get("precio") ?? 0);
    const tiempoProduccion = Number(formData.get("tiempo_produccion_min") ?? 0);
    const dificultad = String(formData.get("dificultad") ?? "");

    const recipeToInsert: RecipesData = {
      id: Date.now(),
      nombre,
      precio,
      tiempo_produccion_min: tiempoProduccion,
      dificultad,
      ingredients: [],
    };

    this.recipesState.update((state) => ({
      ...state,
      data: [recipeToInsert, ...(state.data ?? [])],
    }));

    this.closeCreateRecipeDialog();

    // Cuando tengas el endpoint de creacion, aqui puedes hacer el POST
    // y despues volver a ejecutar this.loadRecipes() para sincronizar con backend.
  }

  /**
   * @description Función para eliminar una receta por su ID
   * @param recipeId 
   * @return void
   */
  editRecipe(recipe: RecipesData): void {
    this.selectedRecipe.set(recipe);
    this.isEditRecipeDialogVisible.set(true);
  }

  closeEditRecipeDialog(): void {
    this.isEditRecipeDialogVisible.set(false);
    this.selectedRecipe.set(null);
  }

  onRecipeUpdated(): void {
    this.loadRecipes();
    this.closeEditRecipeDialog();
  }

  getRecipeThumbnailUrl(recipe: RecipesData): string {
    const rawUrl = recipe.imagen ?? "";

    if (!rawUrl) {
      return this.getRecipeImageFallback();
    }

    if (/^(https?:)?\/\//i.test(rawUrl) || rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) {
      return rawUrl;
    }

    if (rawUrl.startsWith('/')) {
      return `${this.backendRootUrl}${rawUrl}`;
    }

    return `${this.backendRootUrl}/uploads/recipes/${rawUrl}`;
  }

  onRecipeImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement | null;

    if (!imageElement) {
      return;
    }

    const fallback = this.getRecipeImageFallback();
    if (imageElement.src !== fallback) {
      imageElement.src = fallback;
    }
  }

  private getRecipeImageFallback(): string {
    return 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%2272%22 viewBox=%220 0 120 72%22%3E%3Crect width=%22120%22 height=%2272%22 rx=%2212%22 fill=%22%23E2E8F0%22/%3E%3Ctext x=%2250%25%22 y=%2252%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22Arial%22 font-size=%2212%22 fill=%22%2364748B%22%3ESin imagen%3C/text%3E%3C/svg%3E';
  }

  /**
   * @description Función para eliminar una receta por su ID
   * @param recipeId 
   * @returns void
   */
  deleteRecipe(recipeId: number) {
    this.recetasService.deleteRecipe(Number(recipeId)).subscribe({
      next: (response) => {
        if (response.success) {
          this.recipesState.update((state) => ({
            ...state,
            data: state.data?.filter((receta) => receta.id !== Number(recipeId)) ?? null,
          }));
        } else {
          // Manejar caso de éxito falso, si es necesario
          console.error("Error al eliminar la receta:", response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        // Manejar error de la solicitud, si es necesario
        console.error("Error al eliminar la receta:", error.error?.message || error.message);
      },
    });
  }
}
