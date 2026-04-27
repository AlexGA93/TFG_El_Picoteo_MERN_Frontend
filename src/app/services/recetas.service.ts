import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { getFromLocalStorage } from "@utils/local-storage";
import { Observable, shareReplay } from "rxjs";
import { RecetasResponse, UpdateRecipePayload } from "../../types/recetas.types";

@Injectable({ providedIn: 'root' })
export class RecetasService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;
    
    // funciones 
    getRecipesData(): Observable<RecetasResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.get<RecetasResponse>(`${this._baseUrl}/databases/recipes`, {headers}).pipe(shareReplay(1));
    }

    createRecipe(formData: FormData): Observable<RecetasResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.post<RecetasResponse>(`${this._baseUrl}/databases/recipes`, formData, {headers});
    }

    updateRecipe(recipeId: number, payload: FormData): Observable<RecetasResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
        
        return this.http.put<RecetasResponse>(`${this._baseUrl}/databases/recipes/${recipeId}`, payload, {headers});
    }

    deleteRecipe(recipeId: number): Observable<RecetasResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.delete<RecetasResponse>(`${this._baseUrl}/databases/recipes/${recipeId}`, {headers});
    }
}
