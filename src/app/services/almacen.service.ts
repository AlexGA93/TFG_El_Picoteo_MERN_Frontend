import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { AddNewInventoryResponseType, AddNewInventoryType, GLobalRecipesResponseType, GLobalTableResponseType, GlobalAlmacenResponseType, Inventory } from '../../types/general.types';
import { getFromLocalStorage } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  public _baseUrl: string = environment.baseUrl;

  // get http parameters
  get httpParams() {
    return new HttpParams().set('Content-Type', 'application/json').set('Access-Control-Allow-Credentials','true');
  }

  constructor(private httpService: HttpClient) { }

  getGlobalInventoryData():Observable<GLobalTableResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.get<GLobalTableResponseType>(`${this._baseUrl}/databases/inventario`,{headers});
  }

  // getGlobalStoreData(): Observable<GLobalTableResponseType> {
  //   const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
  //   return this.httpService.get<GLobalTableResponseType>(`${this._baseUrl}/databases/store`,{headers});
  // }

  getGLobalRecipesData() {}
  
  // TODO: implementar esta función en el backend y luego en el servicio
  addNewInventory(data: Inventory): Observable<AddNewInventoryResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.post<AddNewInventoryResponseType>(`${this._baseUrl}/databases/add-product-inventory`, data, {headers});
  }

  editInventory(data: Inventory): Observable<AddNewInventoryResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.put<AddNewInventoryResponseType>(`${this._baseUrl}/databases/edit-product-inventory`, data, {headers});
  }

  deleteInventory(data: string): Observable<AddNewInventoryResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.delete<AddNewInventoryResponseType>(`${this._baseUrl}/databases/delete-product-inventory/${data}`, {headers, body: data});
  }
}
