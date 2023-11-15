import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private _baseUrl: string = environment.baseUrl;
  private _Inventario: any;
  private _Almacen: any;
  private _Pagos: any;

  constructor(private httpService: HttpClient) { }

  // HTTP Requests

  getInventario(tableName: string):Observable<any> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('user') || '');
    
    return this.httpService.get<any>(`${this._baseUrl}/databases/tables/${tableName}`,{headers});
  }

}
