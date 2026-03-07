import { ChangeDetectionStrategy, Component, computed, Input } from '@angular/core';
import { DashboardInventory } from '../../../../../../../../types/database.types';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Wheat, Fish, Beef, Milk, Salad, Info, Apple, Popcorn, Amphora, GlassWater} from 'lucide-angular';

@Component({
  selector: 'inventory-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./inventory-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryCard {
  @Input() inventoryElement!: DashboardInventory;

  // signals
  typeIcon = computed(() => this.assignIcon(this.inventoryElement.tipo));

  // Iconos
  readonly Wheat = Wheat;
  readonly Beef = Beef;
  readonly Fish = Fish;
  readonly Milk = Milk;
  readonly Salad = Salad;
  readonly Info = Info;
  readonly Apple = Apple;
  readonly Popcorn = Popcorn;
  readonly Amphora= Amphora;
  readonly GlassWater = GlassWater;
  // functions
  assignIcon(invTYpe: string) {
    switch(invTYpe){
      case "Cereales":
        return Wheat;
      case "Carnes":
        return Beef;
      case "Lacteos":
        return Milk;
      case "Pescados":
        return Fish;
      case "Verduras":
        return Salad;
      case "Frutas":
        return Apple;
      case "Especias":
        return Popcorn;
      case "Aceites":
        return Amphora;
      case "Bebidas":
        return GlassWater;
      default:
        return Info;
    }
  }

  assignClass(icon: string) {
 switch(icon){
      case "Cereales":
        return "food-color-cereal";
      case "Carnes":
        return "food-color-beef";
      case "Lacteos":
        return "food-color-milk";
      case "Pescados":
        return "food-color-fish";
      case "Verduras":
        return "food-color-vegetables";
      case "Frutas":
        return "food-color-fruits";
      case "Especias":
        return "food-color-spices";
      case "Aceites":
        return "food-color-oils";
      case "Bebidas":
        return "food-color-drinks";
      default:
        return "food-color-default";
    }
  }
}
