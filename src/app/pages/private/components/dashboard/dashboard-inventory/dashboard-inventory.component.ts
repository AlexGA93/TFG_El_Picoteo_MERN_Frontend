import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, Eye} from 'lucide-angular';
import { InventoryCard } from './components/inventory-card/inventory-card.component';
import { DashboardInventory as DashboardInventoryType } from '../../../../../../types/database.types';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'dashboard-inventory',
  imports: [LucideAngularModule, InventoryCard, RouterLink],
  templateUrl: './dashboard-inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInventory {
  inventory = input<DashboardInventoryType[]>([]);

    // Iconos
  readonly Eye = Eye;
}
