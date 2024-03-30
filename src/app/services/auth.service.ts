import { Injectable } from '@angular/core';
import { JWTValidationResponseType, LoginFormType, LoginResponseType, UserDataType } from 'src/types/types';
import { environment } from 'src/env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { deleteFromLocalStorage, getFromLocalStorage } from 'src/utils/localStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: UserDataType;

  // declaramso un behaviour subject de tipo booleano para poder estar suscrito a todos sus cambios
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // declaramos un observable booleano para suscribirnos al subject
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // USER VARIABLE TO STORE LOAD DATA
  get user(): UserDataType {
    return {...this._user}
  }
  
  // get http parameters
  get httpParams() {
    return new HttpParams().set('Content-Type', 'application/json').set('Access-Control-Allow-Credentials','true');
  }

  constructor(private httpService: HttpClient) {
    this.checkAuthentication();
  }
  private checkAuthentication(): void {
    // asignamos un valor booleano a la variable en funcion de la presencia en local storage del token
    let token = getFromLocalStorage("user");
    let isAuthenticated: boolean = (token || token.length !==0) ? true : false;
    this.isLoggedInSubject.next(isAuthenticated);
  }

  login(formValue: LoginFormType): Observable<LoginResponseType> {
    let loginToken =  this.httpService.post<LoginResponseType>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams });
    // actualizamos el estado del observable a true para denotar que se ha iniciado sesion
    this.isLoggedInSubject.next(true);
    return loginToken;
  }

  logout(): void {
    deleteFromLocalStorage("user");
    // actualizamos el estado del observable a true para denotar que se ha cerrado sesion
    this.isLoggedInSubject.next(false);
  }

  verifyToken(): Observable<boolean> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

    // response : { status: boolean }
    return this.httpService.get<JWTValidationResponseType>(`${this._baseUrl}/auth/validate`, {headers}).pipe(map(res => {

      const { name, second_name, email } = res.data;
      this._user = { name, second_name, email };

      return res.status;
    }));
  }

}
