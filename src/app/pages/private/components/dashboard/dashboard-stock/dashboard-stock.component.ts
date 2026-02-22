import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'dashboard-stock',
  imports: [JsonPipe],
  templateUrl: './dashboard-stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStock {
  stock = input<any[]>([]);
}
