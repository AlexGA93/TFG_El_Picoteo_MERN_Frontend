import { CurrencyPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { LucideAngularModule, Languages } from "lucide-angular";
import { MenuService } from '../../../../../services/menu.service';
import { DinningRoomStateService } from '../../../../../services/dinning-room-state.service';
import { FormsModule } from '@angular/forms';
import { TranslationsService } from '../../../../../services/translations.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { DinningRoomOrderSnapshot } from '../../../../../../types/dinning-room.types';
import { SalesService } from '../../../../../services/sales.service';
import { SaleTransactionPayload } from '../../../../../../types/finance.types';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-public-cart-page',
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe, ButtonModule, SelectModule, CheckboxModule, FormsModule, LucideAngularModule, TranslatePipe, TooltipModule],
  templateUrl: './public-cart-page.component.html',
})

export class PublicCartPageComponent {
  private menuService = inject(MenuService);
  private dinningRoomStateService = inject(DinningRoomStateService);
  private languageService = inject(TranslationsService);
  private salesService = inject(SalesService);

   readonly Languages = Languages;

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
    const payload = {
      cartItems: this.cartItems(),
      selectedTable: this.selectedTable(),
      totalPrice: this.total(),
    };

    console.log(payload);

    const salePayload: SaleTransactionPayload = {
      fecha_venta: new Date().toISOString(),
      metodo_pago: 'efectivo',
      id_usuario: 1,
      total_venta: payload.totalPrice,
      items: payload.cartItems.map((item) => ({
        id_stock: Number(item.id),
        cantidad: item.cantidad ?? 1,
        precio_unitario: item.precio_producto,
        subtotal: (item.cantidad ?? 1) * item.precio_producto,
      })),
      table: payload.selectedTable
        ? {
            id: payload.selectedTable.id,
            name: payload.selectedTable.name,
          }
        : undefined,
    };

    this.salesService.createSaleTransaction(salePayload).subscribe({
      next: (response) => {
        if (!response.success) {
          console.error('No se pudo registrar la venta:', response.message);
          return;
        }

        if (this.checked() && payload.selectedTable) {
          const orderSnapshot: DinningRoomOrderSnapshot = {
            tableId: payload.selectedTable.id,
            tableName: payload.selectedTable.name,
            totalPrice: payload.totalPrice,
            createdAt: new Date().toISOString(),
            items: payload.cartItems.map((item) => ({
              id: item.id,
              nombre_producto: item.nombre_producto,
              precio_producto: item.precio_producto,
              cantidad: item.cantidad ?? 1,
            })),
          };

          this.dinningRoomStateService.assignOrderToTable(
            payload.selectedTable.id,
            orderSnapshot,
          );
        }

        this.menuService.clearCart();
        this.selectedTable.set(null);
        this.checked.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error registrando la venta:', error.error?.message || error.message);
      },
    });
    
  }

   changeLanguage() {
    this.languageService.toggleLang();
    
  }
}
