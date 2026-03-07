import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardFinancePeriodData } from '../../../../../../types/database.types';
import { LucideAngularModule, BanknoteArrowUp } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-ventas',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dashboard-ventas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardVentas {
  ventas = input<DashboardFinancePeriodData[]>([]);

  readonly BanknoteArrowUp = BanknoteArrowUp;
}
