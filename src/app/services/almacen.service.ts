import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { GlobalAlmacenResponseType } from '../../types/types';
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

  getGlobalInventoryData():Observable<GlobalAlmacenResponseType> {
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    return this.httpService.get<GlobalAlmacenResponseType>(`${this._baseUrl}/databases/inventory`,{headers});
  }
}
