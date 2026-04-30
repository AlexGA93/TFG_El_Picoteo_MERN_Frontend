import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  Type,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { MessageService } from "primeng/api";
import { JsonPipe } from "@angular/common";
import { InventoryService } from "../../../../../services/inventario.service";
import {
  InventoryCreateDTO,
  InventoryReactiveFormModel,
  Types,
  Units,
} from "../../../../../../types/inventario.types";
import { TranslatePipe } from "@ngx-translate/core";
@Component({
  selector: "inventory-create-modal",
  imports: [DialogModule, ToastModule, ReactiveFormsModule, JsonPipe, TranslatePipe],
  providers: [MessageService],
  templateUrl: "./inventory-create-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCreateModal {
  validUnits = signal<Units[]>(["kg", "litros", "unidad", "metros", "gramos"]);
  InventoryTypes = signal<Types[]>([
    "Carnes",
    "Pescados",
    "Verduras",
    "Frutas",
    "Especias",
    "Lacteos",
    "Cereales",
    "Aceites",
    "Bebidas",
  ]);

  // lógica para resetear el formulario cada vez que se cierra el modal
  constructor() {
    effect(() => {
      if (!this.visible()) {
        this.resetForm();
      }
    });
  }

  // inyeccion de servicios
  private formBuilder = inject(FormBuilder);
  private inventoryService = inject(InventoryService);
  private messageService = inject(MessageService);

  // inputs/outputs
  visible = input<boolean>(false);
  close = output<void>();
  save = output<FormData>();

  // formulario reactivo
  inventoryForm: FormGroup<InventoryReactiveFormModel> = this.formBuilder.group(
    {
      // nombre
      nombre: this.formBuilder.control("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      // tipo
      tipo: this.formBuilder.control<Types>(this.InventoryTypes()[0], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      // unidades
      unidades: this.formBuilder.control<Units>(this.validUnits()[0], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      // n_unidades
      n_unidades: this.formBuilder.control(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      // proveedores
      proveedor: this.formBuilder.control("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      // precio_unidad
      precio_unidad: this.formBuilder.control<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
    },
  );

  private resetForm(): void {
    this.inventoryForm.reset(
      {
        nombre: "",
        tipo: this.InventoryTypes()[0],
        unidades: this.validUnits()[0],
        n_unidades: 0,
        proveedor: "",
        precio_unidad: 0,
      },
      { emitEvent: false },
    );
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Revisa los campos del formulario antes de guardar.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", this.inventoryForm.get("nombre")?.value ?? "");
    formData.append("tipo", this.inventoryForm.get("tipo")?.value ?? "");
    formData.append(
      "unidades",
      String(this.inventoryForm.get("unidades")?.value ?? 0),
    );
    formData.append(
      "n_unidades",
      String(this.inventoryForm.get("n_unidades")?.value ?? 0),
    );
    formData.append(
      "proveedores",
      this.inventoryForm.get("proveedores")?.value ?? "",
    );
    formData.append(
      "precio_unidad",
      String(this.inventoryForm.get("precio_unidad")?.value ?? 0),
    );

    // console.log({ formData });

    const data: InventoryCreateDTO = this.inventoryForm.getRawValue();

    // llamamos al servicio
    this.inventoryService.createNewInventoryItem(data).subscribe({
      next: (response) => {
        console.log({ response });
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Producto creado correctamente.",
        });

        // console.log({formData});
        
        this.save.emit(formData);

        this.onClose();
      },
      error: (error) => {
        console.error({ error });
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Hubo un error al crear el producto. Inténtalo de nuevo.",
        });
      },
    });

    // this.save.emit(formData);
  }

  onDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.onClose();
    }
  }

  onClose(): void {
    // this.resetForm();
    this.close.emit();
  }
}
