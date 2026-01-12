import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'inventory-card',
  imports: [],
  templateUrl: './inventory-card.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCard { }
