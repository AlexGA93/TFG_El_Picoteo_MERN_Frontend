import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { GLobalRecipesResponseType, GLobalTableResponseType, GlobalAlmacenResponseType } from '../../types/types';
import { getFromLocalStorage } from '../../utils/local-storage';

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
    return this.httpService.get<GLobalTableResponseType>(`${this._baseUrl}/databases/inventory`,{headers});
  }

  getGlobalStoreData(): Observable<GLobalTableResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.get<GLobalTableResponseType>(`${this._baseUrl}/databases/store`,{headers});
  }

  getGLobalRecipesData() {}
}
