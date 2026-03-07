import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardFinancePeriodData } from '../../../../../../types/database.types';
import { LucideAngularModule, BanknoteX } from 'lucide-angular';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'dashboard-gastos',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dashboard-gastos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGastos {
  gastos = input<DashboardFinancePeriodData[]>([]);

  readonly BanknoteX = BanknoteX;
}
