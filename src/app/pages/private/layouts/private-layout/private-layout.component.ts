import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet],
  templateUrl: './private-layout.component.html',
  styles: ``
})
export class PrivateLayoutComponent {
  private router = inject(Router);

  goToInventory(){
    this.router.navigate(['/admin/inventario']);
  }
}
