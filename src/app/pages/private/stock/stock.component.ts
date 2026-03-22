import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, startWith } from "rxjs";
import { Eraser, LucideAngularModule, PencilLine, Plus, ArrowBigLeftDash } from "lucide-angular";
import { StockViewState } from "../../../../types/stock.types";
import { StockService } from "../../../services/stock.service";
import { LoaderComponent } from "../../../shared/loader/loader.component";

const INITIAL_STOCK_STATE: StockViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "app-stock",
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    LucideAngularModule,
    LoaderComponent,
  ],
  templateUrl: "./stock.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockComponent {
  // inyecciones de servicios
  private stockService = inject(StockService);
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly Plus = Plus;
    readonly ArrowBigLeftDash = ArrowBigLeftDash;

  stockState = toSignal(
    this.stockService
      .getStockData()
      // proceso a seguir con la respuesta
      .pipe(
        // proceso intermedio
        map(
          (response): StockViewState => ({
            loading: false,
            message: response.message,
            data: response.data,
            error: response.success
              ? null
              : response.message || "No se pudo cargar las recetas.",
          }),
        ),
        // caso error
        catchError((error: HttpErrorResponse) =>
          of({
            loading: false,
            message: "",
            data: null,
            error: error.error?.message || "Error al cargar las recetas.",
          }),
        ),
        startWith(INITIAL_STOCK_STATE),
      ),
    // establecemos el estado inicial
    { initialValue: INITIAL_STOCK_STATE },
  );

  // signals derivadas de la formada ocn la respuesta
  stockData = computed(() => this.stockState().data);
  stockList = computed(() => this.stockData() ?? []);
  stockMessage = computed(() => this.stockState().message);
  stockError = computed(() => this.stockState().error);
  isLoading = computed(() => this.stockState().loading);
}
