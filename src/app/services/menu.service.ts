import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { shareReplay } from 'rxjs';
import { MenuProduct, MenuResponse } from '../../types/menu.types';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

   // inyectamos el servicio http
  private http = inject(HttpClient);
  public _baseUrl: string = environment.baseUrl;
  public _isProd: boolean = environment.production;

  // funciones
  getMenuData() {
    return this.http.get<MenuResponse>(`${this._baseUrl}/public/menu`).pipe(shareReplay(1));
  }

}
