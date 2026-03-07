import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRecipe } from '../../../../../../types/database.types';
import { RecipeCard } from './components/recipe-card/recipe-card.component';
import { LucideAngularModule, ChefHat } from 'lucide-angular';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'dashboard-recetas',
  imports: [CommonModule, RecipeCard, LucideAngularModule, RouterLink],
  templateUrl: './dahboard-recetas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecetas {
  // Recibir array de recetas del padre
  recipes = input<DashboardRecipe[]>([]);
   // Iconos
  readonly ChefHat = ChefHat;
}
