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
import { JsonPipe } from "@angular/common";
import { RecetasService } from "../../../../../services/recetas.service";
import { RecetasResponse } from "../../../../../../types/recetas.types";
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
  selector: "recipe-create-modal",
  imports: [DialogModule, ReactiveFormsModule, JsonPipe, ToastModule, TranslatePipe],
  providers: [MessageService],
  templateUrl: "./recipe-create-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateModalComponent {
  @ViewChild("fileInput") fileInput?: ElementRef<HTMLInputElement>;
  readonly validUnits: Units[] = ["kg", "litros", "unidad", "metros", "gramos"];

  // inyecciones de servicios
  private formBuilder = inject(FormBuilder);
  private ingredientsService = inject(InventoryService);
  private recipesService = inject(RecetasService);
  private messageService = inject(MessageService);

  // signals
  ingredients = toSignal(
    this.ingredientsService.getInventariokData().pipe(
      map((response): IngredientsViewState => {

        return {
          message: response.message,
          data: response.data,
          error: response.success
            ? null
            : response.message || "No se pudieron cargar los ingredientes.",
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error fetching ingredients:", error);
        return of(INITIAL_INGREDIENTS_STATE);
      }),
      startWith(INITIAL_INGREDIENTS_STATE),
    ),
    { initialValue: INITIAL_INGREDIENTS_STATE },
  );

  // inputs/outputs
  visible = input<boolean>(false);
  close = output<void>();
  save = output<void>();

  // formulario reactivo
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
    imagen: this.formBuilder.control<File | null>(null, [Validators.required]),
  });

  // lógica para resetear el formulario cada vez que se cierra el modal
  constructor() {
    effect(() => {
      if (!this.visible()) {
        this.resetForm();
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.recipeForm.controls.imagen.setValue(file);
    this.recipeForm.controls.url.setValue(file?.name ?? "");
    this.recipeForm.controls.imagen.markAsTouched();
    this.recipeForm.controls.url.markAsTouched();
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Revisa los campos del formulario antes de guardar.",
      });
      return;
    }

    // inicializamos loader

    const { nombre, precio, tiempo_produccion_min, dificultad, ingredients, imagen, url } =
      this.recipeForm.getRawValue();

    const formData = new FormData();
    formData.append("nombre", (nombre ?? "").trim());
    formData.append("precio", String(precio ?? 0));
    formData.append("tiempo_produccion_min", String(tiempo_produccion_min ?? 0));
    formData.append("dificultad", dificultad ?? "");
    formData.append("ingredients", JSON.stringify(ingredients ?? []));
    formData.append("url", url ?? "");
    if (imagen) formData.append("imagen", imagen);

    console.log(formData);
    
    // llamamos a funcion del servicio para crear receta POST /databses/recipes/create
    this.recipesService.createRecipe(formData).subscribe({
      next: (response: RecetasResponse) => {
        // reaccionamos a la respuesta del servicio (success/error)
        if(response.success) {
          this.messageService.add({
            severity: "success",
            summary: "Receta creada",
            detail: response.message || "La receta se ha creado correctamente.",
          });

          // emitimos el evento vacio a modo de senal de creacion exitosa para que el padre reaccione
          this.save.emit();
          
          this.onClose();
        } else {
          // error -> mostramos mensaje de error + desactivamos loader
          this.messageService.add({
            severity: "error",
            summary: "No se pudo crear",
            detail: response.message || "Se produjo un error al crear la receta.",
          });
        }
        // error -> mostramos mensaje de error + desactivamos loader
        // success -> mostramos mensaje de exito, reseteamos formulario, cerramos modal + desactivamos loader
      },
      error: (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error de red",
          detail: error?.error?.message || "No se pudo conectar con el servidor.",
        });
      }
    }); 
  }

  onDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.onClose();
    }
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  private resetForm(): void {
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

  get ingredientsArray(): FormArray<IngredientForm> {
    return this.recipeForm.controls.ingredients;
  }

  private createIngredientGroup(item: InventoryData): IngredientForm {
    return this.formBuilder.group({
      id_inventory: this.formBuilder.control(item.id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cantidad: this.formBuilder.control(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      unidad: this.formBuilder.control(item.unidades, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  toggleIngredient(item: InventoryData, checked: boolean): void {
    const index = this.ingredientsArray.controls.findIndex(
      (ctrl) => ctrl.controls.id_inventory.value === item.id,
    );

    if (checked && index === -1)
      this.ingredientsArray.push(this.createIngredientGroup(item));
    if (!checked && index !== -1) this.ingredientsArray.removeAt(index);

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
    const item = this.ingredients().data?.find((ingredient) => ingredient.id === id);
    return item?.nombre ?? `Ingrediente #${id}`;
  }
}
