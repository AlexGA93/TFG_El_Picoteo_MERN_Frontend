import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardRecipe } from '../../../../../../../../types/database.types';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, DollarSign, Star } from 'lucide-angular';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';

@Component({
  selector: 'recipe-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./recipe-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  @Input() recipe!: DashboardRecipe;

  // Iconos
  readonly Clock = Clock;
  readonly DollarSign = DollarSign;
  readonly Star = Star;
}
