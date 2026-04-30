import { effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService
 {

  // * 1. Establecemos el idioma por defecto (es/ES)
  private _lang = signal<string>('es')

  // * 1.1 readonly para fuera
  lang = this._lang.asReadonly();

  // * 2. Codigo a ejecutarse nada mas cargar, inyectando el servicio
  constructor(private translate: TranslateService) {
    // * 2.1 Rescatamos el valor almacenado en local storage
    const savedLang = localStorage.getItem('lang') || this._lang();

    // * 2.2 asignamos el valor de idioma en funcion del guardado
    this._lang.set(savedLang);

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    // * 2.3 ejecutamos efecto reactivo
    effect(() => {
      const currentLang = this._lang();

      this.translate.use(currentLang);
      localStorage.setItem('lang', currentLang);
    });
  }

  // funciones
  changeLang(lang: string) {
    this._lang.set(lang);
    window.location.reload();
  }

  toggleLang() {
    this._lang.update(l => l === 'es' ? 'en' : 'es');
  }

}
