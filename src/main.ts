/// <reference types="@angular/localize" />
import 'animate.css';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

registerLocaleData(localeEs, 'es-ES');
registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
