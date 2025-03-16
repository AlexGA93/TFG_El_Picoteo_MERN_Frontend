import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewInventoryFormComponent } from '../forms/new-inventory-form/new-inventory-form.component';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { AlmacenService } from '../../services/almacen.service';
import { AddNewInventoryType } from '../../../types/types';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-general-modal',
  standalone: true,
  imports: [NgbModule, NewInventoryFormComponent, CommonModule, LoaderComponent],
  templateUrl: './general-modal.component.html',
  styleUrl: './general-modal.component.scss'
})
export class GeneralModalComponent implements OnInit {

  @Output() refreshTable: EventEmitter<void> = new EventEmitter();

  formComponent: any | null = null;
  // Recibimos el 'inputData' desde el componente que abre el modal
  inputData: string = "";
  modalTitle: string = "";
  modalBody: string = "";
  responseMessage: string = "";
  sendProccessError: boolean = false;
  isLoading: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private utilService: UtilService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  public initializeData() {
    this.inputData = this.inputData;
  
    switch(this.inputData){
      case 'nuevo-inventario':
        this.modalTitle = "Nuevo Registro de Producto en Inventario";
        break;
      case 'editar-inventario':
        this.modalTitle = "Editar Producto";

      
      
    }
  }

  // Maneja los datos recibidos del formulario y los envía al componente padre cuando el formulario es válido
  onSave() {
    
    this.isLoading = true;

    // Obtenemos los datos del formulario desde el servicio
    this.utilService.getFormData().subscribe((formData) => {
      if (formData) {
        // pasamos los datos al servicio de almacen para que ingrese los datos
        this.almacenService.addNewInventory(formData).subscribe((response) => {
          console.log(response);
          
          // desactivamos el loader
          this.isLoading = false;

          // si la respuesta es correcta
          if(response.status === 'success'){
            this.sendProccessError = false;
            // Cerramos el modal y enviamos los datos al componente padre
            this.modal.close('Save');
          }else{
            //asignamos el mensaje de respuesta
            this.responseMessage = response.message;
            //mostramos el mensaje de error
            this.sendProccessError = true;
          }
        }
        );
      }
    });
  }

  // Método para pasar la referencia al formulario cuando el componente hijo está disponible
  setFormComponent(formComponent: any) {
    console.log(formComponent);
    
    this.formComponent = formComponent;
  }

}
