import { CurrencyPipe, NgFor } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { StockService } from "../../../../../services/stock.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, startWith } from "rxjs";
import { StockResponse } from "../../../../../../types/stock.types";
import { MenuService } from "../../../../../services/menu.service";
import { MenuProduct, MenuViewState } from "../../../../../../types/menu.types";
import { LoaderComponent } from "../../../../../shared/loader/loader.component";

const INITIAL_MENU_STATE: MenuViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "app-public-menu-page",
  imports: [RouterLink, CurrencyPipe, ButtonModule, LoaderComponent],
  templateUrl: "./public-menu-page.component.html",
})
export class PublicMenuPageComponent {
  // inyectamos el servicio
  private stockService = inject(MenuService);

  // creamos una señal para almacenar los datos del stock
  stockData = toSignal(
    this.stockService.getMenuData().pipe(
      map((response) => ({
        loading: false,
        message: response.message,
        data: response.data,
        error: response ? null : "No se han encontrado datos del menu.",
      })),
      catchError(() =>
        of({
          loading: false,
          message: "Error al cargar el menu",
          data: null,
          error:
            "No se han podido cargar los datos del menu. Por favor, inténtalo de nuevo más tarde.",
        }),
      ),
      startWith(INITIAL_MENU_STATE),
    ),
    { initialValue: INITIAL_MENU_STATE },
  );

  menuData = computed(() => this.stockData().data);
  menuMessage = computed(() => this.stockData().message);
  menuError = computed(() => this.stockData().error);

  // loader
  isLoading = computed(() => this.stockData().loading);
}
