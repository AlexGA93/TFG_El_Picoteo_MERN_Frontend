import { ChangeDetectionStrategy, Component, computed, Input, Signal, signal } from '@angular/core';
import { DashboardStock } from '../../../../../../../../types/database.types';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, DollarSign, Star } from 'lucide-angular';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';

@Component({
  selector: 'stock-card',
  imports: [CommonModule, LucideAngularModule, UnitFormatPipe],
  templateUrl: "./stock-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCard {
  @Input() stockElement!: DashboardStock;

  // signals
  qtyLevel: Signal<string> = computed(() => this.getQtyLevel(this.stockElement.cantidad))

  // Iconos
  readonly Clock = Clock;
  readonly DollarSign = DollarSign;
  readonly Star = Star;

  // functions
  getQtyLevel(qty: number) {
    if(qty <= 10) {
      return ("critico");
    }else if(qty <= 50){
      return ("bajo");
    } else {
      return ("Ok");
    }
  }
}
