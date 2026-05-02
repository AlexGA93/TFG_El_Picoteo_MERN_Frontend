import { inject, Injectable } from "@angular/core";
import { delay, Observable, of, shareReplay } from "rxjs";
import { mockDashboardData } from "./mockups/dashboard.mockups";
import { DashboardResponse } from "../../types/database.types";
import { environment } from "../../env/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getFromLocalStorage } from "@utils/local-storage";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    // inyectamos el servicio http
    private http = inject(HttpClient);
    public _baseUrl: string = environment.baseUrl;
    public _isProd: boolean = environment.production;
    

    // funcion para obtener datos para dashboard
    getDashboardData(): Observable<DashboardResponse> {
        if (this._isProd) {
            return of({
                success: true,
                message: "Dashboard mock obtenido correctamente",
                data: mockDashboardData
            }).pipe(delay(1000), shareReplay(1));
        }

        const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));
        const response =  this.http.get<DashboardResponse>(`${this._baseUrl}/databases/dashboard`, { headers });

        response.subscribe(console.log)
        
        

        return response
    }
}
