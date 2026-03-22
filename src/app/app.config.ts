import { LOCALE_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ChefHat, PanelRightClose, LucideAngularModule,Package,Eye,BanknoteArrowUp,BanknoteArrowDown } from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    importProvidersFrom(
        LucideAngularModule.pick({ChefHat, PanelRightClose,
          Package,
          Eye,BanknoteArrowUp,BanknoteArrowDown
        })
    )
  ]
};
