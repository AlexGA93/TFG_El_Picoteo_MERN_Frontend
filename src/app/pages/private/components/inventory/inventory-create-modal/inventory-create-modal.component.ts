import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from "@angular/core";
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { MessageService } from "primeng/api";

@Component({
  selector: "inventory-create-modal",
  imports: [DialogModule, ToastModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: "./inventory-create-modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCreateModal {
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

  // inputs/outputs
  visible = input<boolean>(false);
  close = output<void>();
  save = output<FormData>();

  // formulario reactivo
  inventoryForm = this.formBuilder.group({
    // nombre
     nombre: this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    // tipo
    tipo: this.formBuilder.control("", [
      Validators.required,
    ]),
    // cantidad
    cantidad: this.formBuilder.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
    // unidades
    unidades: this.formBuilder.control(0, [
      Validators.required,
      Validators.min(0),
    ]),
    // proveedor
    proveedor: this.formBuilder.control("", [
      Validators.required,
    ]),
    // precio
    precio: this.formBuilder.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    // fecha
    fecha: this.formBuilder.control<Date>(new Date(), [
      Validators.required,
    ]),
  });

   private resetForm(): void {
    this.inventoryForm.reset(
      {
        nombre: "",
        tipo: "",
        unidades: 0,
        proveedor: "",
        precio: null,
        fecha: null,
      },
      { emitEvent: false },
    );
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formData = new FormData();
      formData.append("nombre", this.inventoryForm.get("nombre")?.value ?? "");
      formData.append("tipo", this.inventoryForm.get("tipo")?.value ?? "");
      formData.append("unidades", String(this.inventoryForm.get("unidades")?.value ?? 0));
      formData.append("proveedor", this.inventoryForm.get("proveedor")?.value ?? "");
      formData.append("precio", String(this.inventoryForm.get("precio")?.value ?? 0));
      formData.append("fecha", String(this.inventoryForm.get("fecha")?.value ?? ""));
  
      this.save.emit(formData);
    } else {
      this.inventoryForm.markAllAsTouched();
    }
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
