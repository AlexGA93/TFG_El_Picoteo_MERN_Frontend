import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { Observable, shareReplay } from "rxjs";
import { getFromLocalStorage } from "@utils/local-storage";
import { InventoryResponse } from "../../types/inventario.types";

@Injectable({ providedIn: 'root' })
export class InventoryService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;

    // funciones 
    getInventariokData(): Observable<InventoryResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.get<InventoryResponse>(`${this._baseUrl}/databases/inventario`, {headers}).pipe(shareReplay(1));
    }
}