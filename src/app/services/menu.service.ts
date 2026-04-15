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

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, incrementamos la cantidad.
      currentItems[existingItemIndex].cantidad = (currentItems[existingItemIndex].cantidad || 0) + 1;
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1.
      currentItems.push({ ...product, cantidad: 1 });
    }

    // Actualizamos el estado del carrito con los nuevos productos.
    this.cartItems.next(currentItems);
  } 

  // función para eliminar un producto del carrito.
  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
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
