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

  public _baseUrl: string = environment.baseUrl;
  private _user!: UserDataType;

  // boolean behaviour subject to be subscripted to every change
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // boolean observable to be subscripted
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
    let isAuthenticated: boolean = (getFromLocalStorage("user") !== "");
    this.isLoggedInSubject.next(isAuthenticated);
  }


  login(formValue: LoginFormType): Observable<LoginResponseType> {
    let loginToken = this.httpService.post<LoginResponseType>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams });
    // update observable's state to notify the login process
    this.isLoggedInSubject.next(true);
    return loginToken;
  }

  logout(): void {
    // delete from LS
    deleteFromLocalStorage("user");
    // update observable's state to notify the login process
    this.isLoggedInSubject.next(false);
  }

  verifyToken(): Observable<boolean> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage("user"));

    // response : { status: boolean }
    return this.httpService.get<JWTValidationResponseType>(`${this._baseUrl}/auth/validate`, {headers}).pipe(map(res => {
      const { name, second_name, email } = res.data;
      // update user information from token
      this._user = { name, second_name, email };
      // return boolean value if token has been verified
      return res.status;
    }));
  }

}
