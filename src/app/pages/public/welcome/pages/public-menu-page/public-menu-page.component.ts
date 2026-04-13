import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-public-menu-page',
  imports: [NgFor, RouterLink, CurrencyPipe, ButtonModule],
  templateUrl: './public-menu-page.component.html',
})
export class PublicMenuPageComponent {
  readonly categories = [
    {
      title: 'Entrantes',
      items: [
        { name: 'Patatas Bravas', description: 'Crujientes, con salsa brava casera y alioli suave.', price: 6.5 },
        { name: 'Croquetas del Chef', description: 'Cremosas y doradas, con sabor tradicional.', price: 8 },
      ],
    },
    {
      title: 'Principales',
      items: [
        { name: 'Hamburguesa Picoteo', description: 'Carne jugosa, queso curado, cebolla caramelizada y salsa de la casa.', price: 12.5 },
        { name: 'Tosta Iberica', description: 'Pan rustico, jamon iberico, tomate y aceite de oliva.', price: 9.5 },
      ],
    },
    {
      title: 'Bebidas',
      items: [
        { name: 'Tinto de Verano', description: 'Refrescante, servido muy frio con rodaja de limon.', price: 3.5 },
        { name: 'Limonada Casera', description: 'Con hierbabuena fresca y un toque de azucar moreno.', price: 3 },
      ],
    },
  ];
}
