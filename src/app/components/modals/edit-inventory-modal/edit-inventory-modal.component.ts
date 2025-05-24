import { Component } from '@angular/core';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from '../../../../types/types';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilService } from '../../../services/util.service';
import { AlmacenService } from '../../../services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inventory-modal',
  standalone: true,
  imports: [CommonModule, LoaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-inventory-modal.component.html',
  styleUrl: './edit-inventory-modal.component.scss',
})
export class EditInventoryModalComponent {
  modalTitle: string = 'Editar Producto';
  isLoading: boolean = false;
  responseMessage: any;
  sendProccessError: boolean = false;
  myForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]], // Correspondiente a nombre
    precio_unidad: [0, [Validators.required]], // Correspondiente a precio_unidad
    unidades: [0, [Validators.required]], // Correspondiente a unidades
    precio_total: [0, [Validators.required]], // Correspondiente a precio_total
  });
  

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    // Aplicar los datos al formulario al cargarlo
    this.utilService.getFormDataContent().subscribe((formData: Inventory) => {
      // Se usa patchValue para evitar sobrescribir todos los valores y manejar casos donde algunos valores pueden ser nulos
      this.myForm.patchValue(formData);

      // this.myForm.get('precio_total')?.disable();

      // Calcular el precio total al cargar el formulario
      this.calcPrecioTotal();
    });
  }

  calcPrecioTotal() {
    // Calcular el precio total automáticamente y actualizar los valores al servicio
    this.myForm.valueChanges.subscribe((formData) => {
      const precioUnidad = this.myForm.get('precio_unidad')?.value;
      const cantidad = this.myForm.get('unidades')?.value;
      const precioTotal = precioUnidad * cantidad;

      // Actualizar precio_total sin disparar el evento de valueChanges para evitar bucles infinitos
      this.myForm
        .get('precio_total')
        ?.setValue(precioTotal, { emitEvent: false });

      // Enviar los datos del formulario al servicio
      this.utilService.setFormData(formData); // Aquí se envían los datos en tiempo real
    });
  }

  updateProduct() {
    this.isLoading = true;

    this.almacenService.editInventory(this.myForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Respuesta:', JSON.stringify(response));

        Swal.fire({
          title: 'Exito!',
          text:response.mssg,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })


        this.sendProccessError = false;
        this.modal.close('Save');
      },
      error: (error) => {
        // console.log('Error:', error);

        this.isLoading = false; // Detener el loading
        console.error('Error al actualizar el inventario:', error); // Imprimir el error en la consola

        // Aquí puedes mostrar un mensaje al usuario si ocurre un error
        Swal.fire({
          title: 'Error!',
          text: error.error.mssg,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });

        this.responseMessage = error.message; // Almacenar el mensaje de error
        this.sendProccessError = true;
      },
    });
  }
}
