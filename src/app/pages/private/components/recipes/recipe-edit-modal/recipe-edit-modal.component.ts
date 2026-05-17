import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { catchError, map, of, startWith } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";
import { InventoryService } from "../../../../../services/inventario.service";
import { InventoryData, Units } from "../../../../../../types/inventario.types";
import { RecetasService } from "../../../../../services/recetas.service";
import {
  RecipesData,
  RecetasResponse,
  UpdateRecipePayload,
} from "../../../../../../types/recetas.types";
import { environment } from "../../../../../../env/environment";
import { TranslatePipe } from "@ngx-translate/core";

interface IngredientsViewState {
  message: string;
  data: InventoryData[] | null;
  error: string | null;
}

type IngredientForm = FormGroup<{
  id_inventory: FormControl<number>;
  cantidad: FormControl<number>;
  unidad: FormControl<Units>;
}>;

const INITIAL_INGREDIENTS_STATE: IngredientsViewState = {
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "recipe-edit-modal",
  imports: [DialogModule, ReactiveFormsModule, ToastModule, TranslatePipe],
  providers: [MessageService],
  templateUrl: "./recipe-edit-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditModalComponent {
  @ViewChild("fileInput") fileInput?: ElementRef<HTMLInputElement>;
  readonly validUnits: Units[] = ["kg", "litros", "unidad", "metros", "gramos"];
  imagePreviewUrl: string | null = null;
  private objectPreviewUrl: string | null = null;
  private readonly backendRootUrl = environment.baseUrl.replace(
    /\/api\/?$/,
    "",
  );

  private formBuilder = inject(FormBuilder);
  private ingredientsService = inject(InventoryService);
  private recipesService = inject(RecetasService);
  private messageService = inject(MessageService);

  visible = input<boolean>(false);
  recipe = input<RecipesData | null>(null);
  close = output<void>();
  updated = output<void>();

  ingredients = toSignal(
    this.ingredientsService.getInventariokData().pipe(
      map(
        (response): IngredientsViewState => ({
          message: response.message,
          data: response.data,
          error: response.success
            ? null
            : response.message || "No se pudieron cargar los ingredientes.",
        }),
      ),
      catchError((error: HttpErrorResponse) => {
        console.error("Error fetching ingredients:", error);
        return of(INITIAL_INGREDIENTS_STATE);
      }),
      startWith(INITIAL_INGREDIENTS_STATE),
    ),
    { initialValue: INITIAL_INGREDIENTS_STATE },
  );

  recipeForm = this.formBuilder.group({
    nombre: this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    precio: this.formBuilder.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    tiempo_produccion_min: this.formBuilder.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    dificultad: this.formBuilder.control("", [Validators.required]),
    ingredients: this.formBuilder.array<IngredientForm>(
      [],
      [Validators.required, Validators.minLength(1)],
    ),
    url: this.formBuilder.control("", [Validators.required]),
    imagen: this.formBuilder.control<File | null>(null),
  });

  constructor() {
    effect(() => {
      const isVisible = this.visible();
      const currentRecipe = this.recipe();

      if (isVisible && currentRecipe) {
        this.fillForm(currentRecipe);
        return;
      }

      if (!isVisible) {
        this.resetForm();
      }
    });
  }

  get ingredientsArray(): FormArray<IngredientForm> {
    return this.recipeForm.controls.ingredients;
  }

  onDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.onClose();
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.recipeForm.controls.imagen.setValue(file);
    this.recipeForm.controls.url.setValue(
      file?.name ?? this.recipeForm.controls.url.value ?? "",
    );
    this.recipeForm.controls.imagen.markAsTouched();
    this.recipeForm.controls.url.markAsTouched();

    this.resetObjectPreviewUrl();
    if (file) {
      this.objectPreviewUrl = URL.createObjectURL(file);
      this.imagePreviewUrl = this.objectPreviewUrl;
    }
  }

  onSubmit(): void {
    // reaccionamos a formulario invalido
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Revisa los campos del formulario antes de guardar.",
      });
      return;
    }

    // comprobamos el id de la receta a editar y reaccionamos en caso de error
    const recipeId = this.recipe()?.id;

    if (!recipeId) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No se pudo identificar la receta a editar.",
      });
      return;
    }

    // creamos nueva instancia de formData
    const formData = new FormData();

    // extraemos los valores del formulario
    const {
      nombre,
      precio,
      tiempo_produccion_min,
      dificultad,
      ingredients,
      imagen,
      url,
    } = this.recipeForm.getRawValue();

    formData.append("nombre", (nombre ?? "").trim());
    formData.append("precio", String(precio ?? 0));
    formData.append(
      "tiempo_produccion_min",
      String(tiempo_produccion_min ?? 0),
    );
    formData.append("dificultad", dificultad ?? "");

    formData.append(
      "ingredients",
      JSON.stringify(
        (ingredients ?? []).map((ingredient) => ({
          id_inventory: Number(ingredient.id_inventory),
          cantidad: Number(ingredient.cantidad),
          unidad: ingredient.unidad,
        })),
      ),
    );

    // URL siempre tiene valor (nuevo nombre o el anterior)
    formData.append("url", imagen ? imagen.name : url!.trim().split("/").reverse()[0]);

    if (imagen) {
      formData.append("imagen", imagen); // ✔ File
    }
    console.log(formData);

    this.recipesService.updateRecipe(recipeId, formData).subscribe({
      next: (response: RecetasResponse) => {
        if (response.success) {
          this.messageService.add({
            severity: "success",
            summary: "Receta actualizada",
            detail:
              response.message || "Los cambios se guardaron correctamente.",
          });
          this.updated.emit();
          this.onClose();
          return;
        }

        this.messageService.add({
          severity: "error",
          summary: "No se pudo actualizar",
          detail:
            response.message || "Ocurrio un error al actualizar la receta.",
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error de red",
          detail:
            error?.error?.message || "No se pudo conectar con el servidor.",
        });
      },
    });
  }

  toggleIngredient(item: InventoryData, checked: boolean): void {
    const index = this.ingredientsArray.controls.findIndex(
      (ctrl) => ctrl.controls.id_inventory.value === item.id,
    );

    if (checked && index === -1) {
      this.ingredientsArray.push(
        this.createIngredientGroup(item.id, 1, item.unidades),
      );
    }

    if (!checked && index !== -1) {
      this.ingredientsArray.removeAt(index);
    }

    this.ingredientsArray.markAsTouched();
    this.ingredientsArray.updateValueAndValidity();
  }

  isIngredientSelected(id: number): boolean {
    return this.ingredientsArray.controls.some(
      (ctrl) => ctrl.controls.id_inventory.value === id,
    );
  }

  removeIngredientAt(index: number): void {
    this.ingredientsArray.removeAt(index);
    this.ingredientsArray.markAsTouched();
    this.ingredientsArray.updateValueAndValidity();
  }

  getIngredientLabel(id: number): string {
    const item = this.ingredients().data?.find(
      (ingredient) => ingredient.id === id,
    );
    return item?.nombre ?? `Ingrediente #${id}`;
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  private fillForm(recipe: RecipesData): void {
    this.ingredientsArray.clear({ emitEvent: false });

    for (const ingredient of recipe.ingredients ?? []) {
      const ingredientInventoryId = this.getIngredientInventoryId(ingredient);
      if (ingredientInventoryId === null) {
        continue;
      }

      this.ingredientsArray.push(
        this.createIngredientGroup(
          ingredientInventoryId,
          ingredient.cantidad,
          ingredient.unidad,
        ),
        { emitEvent: false },
      );
    }

    this.recipeForm.patchValue(
      {
        nombre: recipe.nombre ?? "",
        precio: recipe.precio ?? 0,
        tiempo_produccion_min: recipe.tiempo_produccion_min ?? 0,
        dificultad: recipe.dificultad ?? "",
        url: (recipe.imagen ?? recipe.url ?? "").trim(),
        imagen: null,
      },
      { emitEvent: false },
    );

    this.resetObjectPreviewUrl();
    this.imagePreviewUrl = this.resolveRecipePreviewImage(recipe);

    this.recipeForm.markAsPristine();
    this.recipeForm.markAsUntouched();
  }

  private resetForm(): void {
    this.resetObjectPreviewUrl();
    this.imagePreviewUrl = null;
    this.ingredientsArray.clear({ emitEvent: false });
    this.recipeForm.reset(
      {
        nombre: "",
        precio: null,
        tiempo_produccion_min: null,
        dificultad: "",
        url: "",
        imagen: null,
      },
      { emitEvent: false },
    );

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = "";
    }
  }

  private resetObjectPreviewUrl(): void {
    if (this.objectPreviewUrl) {
      URL.revokeObjectURL(this.objectPreviewUrl);
      this.objectPreviewUrl = null;
    }
  }

  private resolveRecipePreviewImage(recipe: RecipesData): string | null {
    const rawImage = (recipe.imagen ?? recipe.url ?? "").trim();

    if (!rawImage) {
      return null;
    }

    if (
      /^(https?:)?\/\//i.test(rawImage) ||
      rawImage.startsWith("data:") ||
      rawImage.startsWith("blob:")
    ) {
      return rawImage;
    }

    if (rawImage.startsWith("/")) {
      return `${this.backendRootUrl}${rawImage}`;
    }

    return `${this.backendRootUrl}/uploads/recipes/${rawImage}`;
  }

  private createIngredientGroup(
    id_inventory: number,
    cantidad: number,
    unidad: string,
  ): IngredientForm {
    const normalizedUnit = this.validUnits.includes(unidad as Units)
      ? (unidad as Units)
      : this.validUnits[0];

    return this.formBuilder.group({
      id_inventory: this.formBuilder.control(id_inventory, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cantidad: this.formBuilder.control(cantidad, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      unidad: this.formBuilder.control(normalizedUnit, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  private getIngredientInventoryId(
    ingredient: RecipesData["ingredients"][number],
  ): number | null {
    const rawId = ingredient.id_inventory ?? ingredient.id_inventario;
    const normalizedId = Number(rawId);

    if (!Number.isFinite(normalizedId)) {
      return null;
    }

    return normalizedId;
  }
}
