import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { getFromLocalStorage } from "@utils/local-storage";
import { Observable, shareReplay } from "rxjs";
import { StockResponse } from "../../types/stock.types";

@Injectable({ providedIn: 'root' })
export class StockService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;
    
    // funciones 
    getStockData(): Observable<StockResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        const result =  this.http.get<StockResponse>(`${this._baseUrl}/databases/stock`, {headers}).pipe(shareReplay(1));

        return result;
    }
}