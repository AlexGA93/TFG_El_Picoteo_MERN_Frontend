import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardFinancePeriodData } from '../../../../../../types/database.types';
import { LucideAngularModule, BanknoteArrowUp } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dashboard-sales',
  imports: [LucideAngularModule, RouterLink, TranslatePipe],
  templateUrl: './dashboard-sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSales {
  ventas = input<DashboardFinancePeriodData[]>([]);

  readonly BanknoteArrowUp = BanknoteArrowUp;
}
