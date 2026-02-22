import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddNewInventoryType, Inventory } from '../../types/general.types';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  // Usamos un BehaviorSubject para tener acceso reactivo a los datos del formulario
  private formDataSubject = new BehaviorSubject<AddNewInventoryType>({} as AddNewInventoryType);

  // Metodo para actualizar los datos del formulario
  setFormData(data: AddNewInventoryType): void {
    this.formDataSubject.next(data);
  }

  // Metodo para obtener los datos del formulario
  getFormData(): Observable<AddNewInventoryType> {
    return this.formDataSubject.asObservable();
  }

  private formDataContentSubject = new BehaviorSubject<Inventory>({} as Inventory);

  // Metodo para actualizar los datos del formulario
  setFormDataContent(data: Inventory): void {
    this.formDataContentSubject.next(data);
  }

  // Metodo para obtener los datos del formulario
  getFormDataContent(): Observable<Inventory> {
    return this.formDataContentSubject.asObservable();
  }

}

