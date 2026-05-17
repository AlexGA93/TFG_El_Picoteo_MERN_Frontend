import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../env/environment";
import { getFromLocalStorage } from "@utils/local-storage";
import { ApiResponse, Purchase, Sale, SaleTransactionPayload } from "../../types/finance.types";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  getSales(): Observable<ApiResponse<Sale[]>> {
    return this.http.get<ApiResponse<Sale[]>>(`${this.baseUrl}/public/sales`);
  }

  getSaleById(id: number): Observable<ApiResponse<Sale>> {
    return this.http.get<ApiResponse<Sale>>(`${this.baseUrl}/public/sales/${id}`);
  }

  createSale(payload: Omit<Sale, "id">): Observable<ApiResponse<Sale>> {
    return this.http.post<ApiResponse<Sale>>(`${this.baseUrl}/public/sales`, payload);
  }

  createSaleTransaction(payload: SaleTransactionPayload): Observable<ApiResponse<Sale>> {
    return this.http.post<ApiResponse<Sale>>(`${this.baseUrl}/public/sales`, payload);
  }

  updateSale(id: number, payload: Omit<Sale, "id">): Observable<ApiResponse<Sale>> {
    return this.http.put<ApiResponse<Sale>>(`${this.baseUrl}/public/sales/${id}`, payload);
  }

  deleteSale(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/public/sales/${id}`);
  }

  getPurchases(): Observable<ApiResponse<Purchase[]>> {
    const headers = new HttpHeaders().set("x-auth-token", getFromLocalStorage("user"));
    return this.http.get<ApiResponse<Purchase[]>>(`${this.baseUrl}/databases/purchases`, { headers });
  }

  getPurchaseById(id: number): Observable<ApiResponse<Purchase>> {
    const headers = new HttpHeaders().set("x-auth-token", getFromLocalStorage("user"));
    return this.http.get<ApiResponse<Purchase>>(`${this.baseUrl}/databases/purchases/${id}`, { headers });
  }

  createPurchase(payload: Omit<Purchase, "id">): Observable<ApiResponse<Purchase>> {
    const headers = new HttpHeaders().set("x-auth-token", getFromLocalStorage("user"));
    return this.http.post<ApiResponse<Purchase>>(`${this.baseUrl}/databases/purchases`, payload, { headers });
  }

  updatePurchase(id: number, payload: Omit<Purchase, "id">): Observable<ApiResponse<Purchase>> {
    const headers = new HttpHeaders().set("x-auth-token", getFromLocalStorage("user"));
    return this.http.put<ApiResponse<Purchase>>(`${this.baseUrl}/databases/purchases/${id}`, payload, { headers });
  }

  deletePurchase(id: number): Observable<ApiResponse<null>> {
    const headers = new HttpHeaders().set("x-auth-token", getFromLocalStorage("user"));
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/databases/purchases/${id}`, { headers });
  }
}
