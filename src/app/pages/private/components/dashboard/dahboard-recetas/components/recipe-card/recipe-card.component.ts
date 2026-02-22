import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recipe-card',
  imports: [],
  templateUrl: "./recipe-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard { }
