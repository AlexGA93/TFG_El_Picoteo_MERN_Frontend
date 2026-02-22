import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRecipe } from '../../../../../../types/database.types';

@Component({
  selector: 'dashboard-recetas',
  imports: [CommonModule],
  templateUrl: './dahboard-recetas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecetas {
  // Recibir array de recetas del padre
  recipes = input<DashboardRecipe[]>([]);
}
