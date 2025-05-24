import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilService } from '../../../services/util.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from '../../../services/almacen.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-inventory-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
    templateUrl: './add-inventory-modal.component.html',
    styleUrl: './add-inventory-modal.component.scss'
})
export class AddInventoryModalComponent {

  modalTitle: string = 'Incorporar Nuevo Producto';
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
    // Calcular el precio total al cargar el formulario
    this.calcPrecioTotal();
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
    

  addProduct() {
    console.log(this.myForm.value);
    this.isLoading = true;

    // Enviar los datos al servicio
    this.almacenService.addNewInventory(this.myForm.value).subscribe({
      next: (response: any) => {
              this.isLoading = false;
              console.log('Respuesta:', JSON.stringify(response));
              this.isLoading = false;
      
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
