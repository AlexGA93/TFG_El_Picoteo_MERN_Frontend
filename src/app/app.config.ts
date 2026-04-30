import { LOCALE_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { ChefHat, PanelRightClose, LucideAngularModule, Package, Eye, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-angular';

import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [

    // 🌍 locale dinámico
    {
      provide: LOCALE_ID,
      useFactory: () => localStorage.getItem('lang') || 'es-ES'
    },

    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),

    // 🌐 ngx-translate correcto
    provideTranslateService({
      loader: {
        provide: TranslateLoader, // ✅ ESTE es el correcto
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),

    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),

    importProvidersFrom(
      LucideAngularModule.pick({
        ChefHat,
        PanelRightClose,
        Package,
        Eye,
        BanknoteArrowUp,
        BanknoteArrowDown
      })
    )
  ]
};