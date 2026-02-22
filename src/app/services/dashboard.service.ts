import { Injectable } from "@angular/core";
import { delay, Observable, of, shareReplay } from "rxjs";
import { mockDashboardData } from "./mockups/dashboard.mockups";
import { DashboardData } from "../../types/database.types";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    // funcion para obtener datos para dashboard
    getDashboardData(): Observable<DashboardData> {
        return of(mockDashboardData).pipe(
            delay(1000),shareReplay(1));
    }
}