import { CurrencyPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuService } from '../../../../../services/menu.service';
import { DinningRoomStateService } from '../../../../../services/dinning-room-state.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-public-cart-page',
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe, ButtonModule, SelectModule, CheckboxModule, JsonPipe, FormsModule],
  templateUrl: './public-cart-page.component.html',
})

export class PublicCartPageComponent {
  private menuService = inject(MenuService);
  private dinningRoomStateService = inject(DinningRoomStateService);

  cartItems = toSignal(this.menuService.cartItems$, { initialValue: [] });
  subtotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + (item.cantidad ?? 0) * item.precio_producto,
      0,
    ),
  );
  managementFee = computed(() => (this.cartItems().length ? 1.5 : 0));
  total = computed(() => this.subtotal() + this.managementFee());

  // signal con el valor asociado con el valor del objeto de mesas y sillas para mostrar en el select y asociar a la mesa y silla seleccionada para el pedido
  cytoscapeElements = computed<cytoscape.ElementDefinition[]>(() => this.dinningRoomStateService.getGraphElements());
  
  // filtro en signals las mesas y sillas
  cytoscapeTables = computed(() => this.cytoscapeElements().filter(el => el.classes === 'mesa').map(element => ({ name: element.data['label'], id: element.data['id'] })));

  // cytoscapeChairs = computed(() => this.cytoscapeElements().filter(el => el.classes === 'silla').map(element => ({ name: element.data['label'], parentTable: element.data['parent'] })));

  cytoscapeChairs = computed(
    () => this.cytoscapeElements()
    // filtramos las sillas pertenecientes a la mesa seleccionada
    .filter(element => element.classes === 'silla' && element.data['tableId'] === this.selectedTable()?.id)
    .map(element => ({ name: element.data['label'], id: element.data['id'] }))
  );

  selectedTable = signal<{ id: string; name: string } | null>(null);
  
  checked = signal<boolean>(false);

  removeItem(productId: number) {
    this.menuService.removeFromCart(productId);
  }

  continueWithOrder() {
    // aplicamos logica para conformar informacion de pedido y realizamos acciones
    console.log({
      cartItems: this.cartItems(),
      selectedTable: this.selectedTable(),
      totalPrice: this.total(),
    })
    
    // preparamos funcionalidad en servicio que registremos un pedido emulando el pago para confirmar pedido registrando estos datosnot
    
    // cuando se efectue el pedido, se limpia el carrito y se resetean las selecciones de mesa y silla
    this.menuService.clearCart();
    this.selectedTable.set(null);
    
    this.checked.set(false);
    
  }
}
