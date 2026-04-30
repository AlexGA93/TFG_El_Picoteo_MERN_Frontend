
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, Package } from 'lucide-angular';
import { StockCard } from './components/stock-card/stock-card.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'dashboard-stock',
  imports: [LucideAngularModule, StockCard, RouterLink, TranslatePipe],
  templateUrl: './dashboard-stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStock {
  stock = input<any[]>([]);
     // Iconos
  readonly Package = Package;
}
