import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { InventoryCreateDTO, InventoryData, InventoryReactiveFormModel, Types, Units } from '../../../../../../types/inventario.types';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { JsonPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'inventory-edit-modal',
  imports: [DialogModule, ReactiveFormsModule, ToastModule, JsonPipe, TranslatePipe],
  templateUrl: "./inventory-edit-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryEditModal {
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

    // inyeccion de servicios
  private formBuilder = inject(FormBuilder);
  private inventoryService = inject(InventoryService);
  private messageService = inject(MessageService);

  // inputs/outputs
  visible = input<boolean>(false);
  inventoryItem = input<InventoryData | null>(null);
  close = output<void>();
  save = output<FormData>();
  
   // lógica para resetear el formulario cada vez que se cierra el modal
  constructor() {
    effect(() => {
      const isVisible = this.visible();
      const currentItem = this.inventoryItem();
      
      if(isVisible && currentItem) {
        this.fillForm(currentItem);
      }

      if (!this.visible()) {
        this.resetForm();
      }
    });
  }

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

  private fillForm(item: InventoryData): void {
    console.log({item});
    
      this.inventoryForm.patchValue(
        {
          nombre: item.nombre ?? "",
          tipo: item.tipo ?? this.InventoryTypes()[0],
          unidades: item.unidades ?? this.validUnits()[0],
          n_unidades: item.n_unidades ?? 0,
          proveedor: item.proveedor ?? "",
          precio_unidad: item.precio_unidad ?? 0,
        },
        { emitEvent: false },
      );
  
  
      this.inventoryForm.markAsPristine();
      this.inventoryForm.markAsUntouched();
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
        "proveedor",
        this.inventoryForm.get("proveedor")?.value ?? "",
      );
      formData.append(
        "precio",
        String(this.inventoryForm.get("precio")?.value ?? 0),
      );
      formData.append(
        "fecha",
        String(this.inventoryForm.get("fecha")?.value ?? ""),
      );
  
      console.log({ formData });
  
      const data: InventoryCreateDTO = this.inventoryForm.getRawValue();
      // llamamos al servicio
      this.inventoryService.updateInventoryItem(1,data).subscribe({
        next: (response) => {
          console.log({ response });
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "Producto editado correctamente.",
          });
  
          this.save.emit(formData);
  
          this.onClose();
        },
        error: (error) => {
          console.error({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Hubo un error al editar el producto. Inténtalo de nuevo.",
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
      this.resetForm();
      this.close.emit();
    }

    
}
