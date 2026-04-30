import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRecipe } from '../../../../../../types/database.types';
import { RecipeCard } from './components/recipe-card/recipe-card.component';
import { LucideAngularModule, ChefHat } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'dashboard-recipes',
  imports: [CommonModule, RecipeCard, LucideAngularModule, RouterLink, TranslatePipe],
  templateUrl: './dahboard-recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRecipes {
  // Recibir array de recetas del padre
  recipes = input<DashboardRecipe[]>([]);
   // Iconos
  readonly ChefHat = ChefHat;
}
