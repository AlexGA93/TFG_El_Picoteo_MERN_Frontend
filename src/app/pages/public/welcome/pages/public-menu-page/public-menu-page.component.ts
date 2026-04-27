import { CurrencyPipe, NgFor } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { StockService } from "../../../../../services/stock.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, startWith } from "rxjs";
import { StockResponse } from "../../../../../../types/stock.types";
import { MenuService } from "../../../../../services/menu.service";
import { MenuProduct, MenuResponse, MenuViewState } from "../../../../../../types/menu.types";
import { LoaderComponent } from "../../../../../shared/loader/loader.component";
import { LucideAngularModule, Plus, Minus, ShoppingCart, Home } from "lucide-angular";

const INITIAL_MENU_STATE: MenuViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "app-public-menu-page",
  imports: [RouterLink, CurrencyPipe, ButtonModule, LoaderComponent, LucideAngularModule],
  templateUrl: "./public-menu-page.component.html",
})
export class PublicMenuPageComponent {
  // inyectamos el servicio
  private stockService = inject(MenuService);

  // iconos lucide
  readonly Plus = Plus;
  readonly Minus = Minus;
  readonly ShoppingCart = ShoppingCart;
  readonly Home = Home;

  // creamos una señal para almacenar los datos del stock
  stockData = toSignal(
    this.stockService.getMenuData().pipe(
      map((response: MenuResponse) => ({
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

  menuData    = computed(() => this.stockData().data);
  menuMessage = computed(() => this.stockData().message);
  menuError   = computed(() => this.stockData().error);
  // loader
  isLoading   = computed(() => this.stockData().loading);

  // funciones
  addOne(productName: string) {
    
    // actualizamos la cifra de la signal de menuData
    const product = this.menuData()?.find(p => p.nombre_producto === productName);
    if (product) {
      if (!product.cantidad) {
        product.cantidad = 1;
      } else {
        product.cantidad++;
      }
    }
    
    // llamamos a la función del servicio para actualizar el carrito
    this.stockService.addToCart(product as MenuProduct);
    
  }

  removeOne(productName: string) {
    const product = this.menuData()?.find(p => p.nombre_producto === productName);
    
    if (product && product.cantidad && product.cantidad > 0) {
      product.cantidad--;
    }

    // llamamos a la función del servicio para actualizar el carrito
    if (product && product.id) {
      this.stockService.removeFromCart(product.id);
    }
  }
}
