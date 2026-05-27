import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { MenuProduct, MenuResponse } from '../../types/menu.types';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

   // inyectamos el servicio http
  private http = inject(HttpClient);
  public _baseUrl: string = environment.baseUrl;
  public _isProd: boolean = environment.production;

  // declaramos un behaviour subject para guardar el estado del carrito actualizado.
  private cartItems = new BehaviorSubject<MenuProduct[]>([]);
  // creamos un observable para que los componentes puedan suscribirse a los cambios del carrito.
  cartItems$ = this.cartItems.asObservable();

  // función para agregar un producto al carrito.
  addToCart(product: MenuProduct) {
    // obtenemos el estado actual del carrito;
    const currentItems = this.cartItems.getValue();
    // sacamos el indice del producto que queremos agregar al carrito.
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    let updatedItems: MenuProduct[];

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, incrementamos la cantidad sin mutar el array original.
      updatedItems = currentItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, cantidad: (item.cantidad || 0) + 1 }
          : item
      );
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1 creando un nuevo array.
      updatedItems = [...currentItems, { ...product, cantidad: 1 }];
    }

    // Actualizamos el estado del carrito con los nuevos productos.
    this.cartItems.next(updatedItems);
  } 

  // función para eliminar un producto del carrito.
  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems
      .map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const nextCantidad = (item.cantidad || 0) - 1;
        return { ...item, cantidad: nextCantidad };
      })
      .filter((item) => (item.cantidad || 0) > 0);
    this.cartItems.next(updatedItems);
  } 

  // funciones
  getMenuData() {
    return this.http.get<MenuResponse>(`${this._baseUrl}/public/menu`).pipe(shareReplay(1));
  }

  clearCart() {
    this.cartItems.next([]);
  }

}
