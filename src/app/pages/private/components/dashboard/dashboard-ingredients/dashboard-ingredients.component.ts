import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardIngredients as DashboardIngredientsType } from '../../../../../../types/database.types';
import { LucideAngularModule, Sandwich, Apple, Tag, Scale } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UnitFormatPipe } from '@pipes/unit-format.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dashboard-ingredients',
  imports: [CommonModule, LucideAngularModule, RouterLink, UnitFormatPipe, TranslatePipe],
  templateUrl: './dashboard-ingredients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIngredients {
  ingredients = input<DashboardIngredientsType[]>([]);

  readonly Sandwich = Sandwich;
  readonly Apple = Apple;
  readonly Tag = Tag;
  readonly Scale = Scale;

  private roundTo = (value: number, decimals = 3): number => {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
  };

  ingredientsSummary = computed(() => {
    const grouped = new Map<
      string,
      { ingrediente: string; tipo: DashboardIngredientsType['tipo']; unidad: DashboardIngredientsType['unidad']; total: number; usos: number }
    >();

    for (const item of this.ingredients()) {
      const key = `${item.ingrediente}-${item.tipo}-${item.unidad}`;
      const current = grouped.get(key);

      if (current) {
        current.total = this.roundTo(current.total + item.cantidades);
        current.usos += 1;
      } else {
        grouped.set(key, {
          ingrediente: item.ingrediente,
          tipo: item.tipo,
          unidad: item.unidad,
          total: this.roundTo(item.cantidades),
          usos: 1,
        });
      }
    }

    return [...grouped.values()].sort((a, b) =>
      a.ingrediente.localeCompare(b.ingrediente),
    );
  });
}
