import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { navbarStructures } from '@utils/object-structures';
import { LucideAngularModule, LogOut, UtensilsCrossed, LayoutDashboard } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AuthenticationService } from '../../../../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { start } from '@popperjs/core';


@Component({
  selector: 'private-navbar',
  imports: [TitleCasePipe, LucideAngularModule, ButtonModule, TooltipModule],
  templateUrl: './private-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbar {

  // injections
  authenticacionService = inject(AuthenticationService);
  router = inject(Router);

  // inputs
  section = input<string>('');
  
  // iconos lucide
  readonly LogOut = LogOut;
  readonly UtensilsCrossed = UtensilsCrossed;
  readonly LayoutDashboard = LayoutDashboard;
  
  // signals
  sectionObject = computed(() => navbarStructures[this.section()]);
  
  //convertimos en signal el router para reaccionar a cada cambiode esta
  currentRoute = toSignal(this.router.events.pipe(
    // filtramos el evento
    filter(event => event instanceof NavigationEnd),
    // mapeamos la url
    map(() => this.router.url),
    // emitimos el valor inicial del router al convertirlo en signal para que el navbar se actualice correctamente al cargar la pagina
    startWith(this.router.url)
  ),
  {
    initialValue: this.router.url
  });

  currentSection = computed(() => {
    // sacamos la url actual
    const url = this.currentRoute();

    if(url.includes('dinning-room')) return 'dashboard';
    if(url.includes('dashboard')) return 'dinning-room';
    return "/";
  });

  // functions
  logOut() {
    // llamamos a la funcion del logout del servicio para eliminar el token y redirigir al login
    this.authenticacionService.logout().subscribe(() => {
      console.log("redirigimos");
      
      // redirigimos a la pagina de login
      this.router.navigate(["/public/welcome"]);
    });
  }

  navigateToDR() {
    console.log(`/private/${this.currentSection()}`);
    
    // redirigimos a la pagina de comedor
    this.router.navigate([`/private/${this.currentSection()}`]);
  }

  navigateToMenu() {
    // redirigimos a la pagina de menu publico
    this.router.navigate(["/public/menu"]);
  }
}
