import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddNewInventoryType } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // Usamos un BehaviorSubject para tener acceso reactivo a los datos del formulario
  private formDataSubject = new BehaviorSubject<any>(null);

  // Metodo para actualizar los datos del formulario
  setFormData(data: any) {
    this.formDataSubject.next(data);
  }

  // Metodo para obtener los datos del formulario
  getFormData(): Observable<AddNewInventoryType> {
    return this.formDataSubject.asObservable();
  }
}
