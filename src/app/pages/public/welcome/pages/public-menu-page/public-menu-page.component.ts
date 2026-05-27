import { CurrencyPipe, NgIf } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, startWith } from "rxjs";
import { MenuService } from "../../../../../services/menu.service";
import { MenuProduct, MenuResponse, MenuViewState } from "../../../../../../types/menu.types";
import { LoaderComponent } from "../../../../../shared/loader/loader.component";
import { LucideAngularModule, Plus, Minus, ShoppingCart, Home, Languages, Trash2 } from "lucide-angular";
import { TranslationsService } from "../../../../../services/translations.service";
import { TranslatePipe } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

const INITIAL_MENU_STATE: MenuViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "app-public-menu-page",
  imports: [RouterLink, CurrencyPipe, NgIf, ButtonModule, LoaderComponent, LucideAngularModule, TranslatePipe, TooltipModule],
  templateUrl: "./public-menu-page.component.html",
})
export class PublicMenuPageComponent {
  // inyectamos el servicio
  private stockService = inject(MenuService);
  private languageService = inject(TranslationsService);

  // iconos lucide
  readonly Plus = Plus;
  readonly Minus = Minus;
  readonly ShoppingCart = ShoppingCart;
  readonly Home = Home;
  readonly Languages = Languages;
  readonly Trash2 = Trash2;

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
  cartItems = toSignal(this.stockService.cartItems$, { initialValue: [] });
  hasCartItems = computed(() => this.cartItems().length > 0);
  cartItemsCount = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.cantidad ?? 1), 0),
  );
  cartItemsById = computed(() => {
    const quantities = new Map<number, number>();
    this.cartItems().forEach((item) => {
      if (item.id !== undefined) {
        quantities.set(item.id, item.cantidad ?? 1);
      }
    });
    return quantities;
  });

  // funciones
  addOne(product: MenuProduct) {
    if (product.id === undefined) {
      return;
    }
    this.stockService.addToCart(product);
  }

  removeOne(productId?: number) {
    if (productId !== undefined) {
      this.stockService.removeFromCart(productId);
    }
  }

  clearCart() {
    this.stockService.clearCart();
  }

  getProductQuantity(productId?: number) {
    if (productId === undefined) {
      return 0;
    }
    return this.cartItemsById().get(productId) ?? 0;
  }

  changeLanguage() {
    this.languageService.toggleLang();
    
  }
}
