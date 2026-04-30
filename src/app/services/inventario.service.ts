import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { Observable, shareReplay } from "rxjs";
import { getFromLocalStorage } from "@utils/local-storage";
import { CreateInventoryItemResponse, DeleteInventoryItemResponse, InventoryCreateDTO, InventoryResponse } from "../../types/inventario.types";

@Injectable({ providedIn: 'root' })
export class InventoryService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;

    // funciones 
    getInventariokData(): Observable<InventoryResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.get<InventoryResponse>(`${this._baseUrl}/databases/inventory`, {headers}).pipe(shareReplay(1));
    }

    // this.inventoryForm.value como json
    createNewInventoryItem(formData: InventoryCreateDTO): Observable<CreateInventoryItemResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.post<CreateInventoryItemResponse>(`${this._baseUrl}/databases/inventory`, formData, { headers });
    }

    updateInventoryItem(idItem: number, formData: InventoryCreateDTO): Observable<CreateInventoryItemResponse> {
        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

        return this.http.put<CreateInventoryItemResponse>(`${this._baseUrl}/databases/inventory/${idItem}`, formData, { headers });
    }

    deleteInventoryItem(itemId: number): Observable<DeleteInventoryItemResponse> {
            const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
    
            return this.http.delete<DeleteInventoryItemResponse>(`${this._baseUrl}/databases/inventory/${itemId}`, {headers});
        }
}