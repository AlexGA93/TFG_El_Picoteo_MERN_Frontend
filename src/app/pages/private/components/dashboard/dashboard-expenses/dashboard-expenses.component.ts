import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardFinancePeriodData } from '../../../../../../types/database.types';
import { LucideAngularModule, BanknoteX } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'dashboard-expenses',
  imports: [LucideAngularModule, RouterLink, TranslatePipe],
  templateUrl: './dashboard-expenses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardExpenses {
  gastos = input<DashboardFinancePeriodData[]>([]);

  readonly BanknoteX = BanknoteX;
}
