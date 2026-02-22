import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PrivateSidebar } from '../../shared/private-sidebar/private-sidebar.component';
import { LucideAngularModule } from 'lucide-angular';
import { PrivateNavbar } from '../../shared/private-navbar/private-navbar.component';


@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, SidebarModule, ButtonModule, PrivateSidebar, LucideAngularModule, PrivateNavbar],
  templateUrl: './private-layout.component.html',
})
export class PrivateLayoutComponent {
  // injections
  private router = inject(Router);
  // signals
  sidebarVisible = signal<boolean>(false);
  // functions
  toggleSideBar(){
    this.sidebarVisible.set(!this.sidebarVisible());
  }
  goToInventory(){
    this.router.navigate(['/admin/inventario']);
  }
}
