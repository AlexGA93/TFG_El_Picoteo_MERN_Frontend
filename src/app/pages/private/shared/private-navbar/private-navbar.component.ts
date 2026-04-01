import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { navbarStructures } from '@utils/object-structures';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'private-navbar',
  imports: [TitleCasePipe, LucideAngularModule,ButtonModule],
  templateUrl: './private-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbar {
  // injections
  authenticacionService = inject(AuthenticationService);
  router = inject(Router);
  // inputs
  section = input<string>('');
  // signals
  sectionObject = computed(() => navbarStructures[this.section()]);
  // functions
  logOut() {
    // llamamos a la funcion del logout del servicio para eliminar el token y redirigir al login
    this.authenticacionService.logout().subscribe(() => {
      console.log("redirigimos");
      
      // redirigimos a la pagina de login
      this.router.navigate(["/"]);
    });
  }

  navigateToDR() {
    // redirigimos a la pagina de comedor
    this.router.navigate(["/private/dinning-room"]);
  }
}
