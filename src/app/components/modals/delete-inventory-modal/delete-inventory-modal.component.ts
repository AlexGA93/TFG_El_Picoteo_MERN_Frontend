import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../../services/util.service';
import { Inventory } from '../../../../types/types';
import { AlmacenService } from '../../../services/almacen.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-delete-inventory-modal',
    imports: [LoaderComponent, CommonModule],
    templateUrl: './delete-inventory-modal.component.html',
    styleUrl: './delete-inventory-modal.component.scss'
})
export class DeleteInventoryModalComponent {

  modalTitle: string = 'Borrar Producto';
  productName: string = '';
  isLoading: boolean = false;
  responseMessage: any;
  sendProccessError: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private utilService: UtilService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    // Aplicar los datos al formulario al cargarlo
    this.utilService.getFormDataContent().subscribe((formData: Inventory) => {
      console.log(formData);
      this.productName = formData.nombre;
    });
  }

  deleteProduct(nombre: string) {
    this.isLoading = true;
    console.log(nombre);
    
    this.almacenService.deleteInventory(nombre).subscribe({
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
              console.error('Error al borrar el product del inventario:', error); // Imprimir el error en la consola
      
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
