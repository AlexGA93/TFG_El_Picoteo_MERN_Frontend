import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { getFromLocalStorage } from "@utils/local-storage";
import { Observable, shareReplay } from "rxjs";
import { RecetasResponse, RecipesData } from "../../types/recetas.types";

@Injectable({ providedIn: 'root' })
export class RecetasService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;
    
    // funciones 
    getRecipesData(): Observable<RecetasResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.get<RecetasResponse>(`${this._baseUrl}/databases/recetas`, {headers}).pipe(shareReplay(1));
    }
}