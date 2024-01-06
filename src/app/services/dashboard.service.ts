import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { getContent } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private _baseUrl: string = environment.baseUrl;

  constructor(private httpService: HttpClient) { }


  getTableInfo(tableName: string): Observable<any> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', getContent('user') || '');
    // request body
    return this.httpService.get<any>(`${this._baseUrl}/databases/tables/${tableName}`, { headers });
  }

  getEarnedCapital() {
    // Pagos

  }

  getInvestedCapital() {
    // SUM(Almacen(precio_unidad) + Inventario(unidades))
  }

}
