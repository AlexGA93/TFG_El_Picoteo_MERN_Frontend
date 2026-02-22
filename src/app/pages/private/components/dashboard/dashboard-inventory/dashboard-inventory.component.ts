import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'dashboard-inventory',
  imports: [JsonPipe],
  templateUrl: './dashboard-inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInventory {
  inventory = input<any[]>([]);
}
