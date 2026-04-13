import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-public-cart-page',
  imports: [NgFor, RouterLink, CurrencyPipe, ButtonModule],
  templateUrl: './public-cart-page.component.html',
})
export class PublicCartPageComponent {
  readonly items = [
    { name: 'Hamburguesa Picoteo', quantity: 2, price: 12.5 },
    { name: 'Patatas Bravas', quantity: 1, price: 6.5 },
    { name: 'Limonada Casera', quantity: 2, price: 3 },
  ];

  get subtotal(): number {
    return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
}
