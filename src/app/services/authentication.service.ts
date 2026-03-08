import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {
  ErrorBodyType,
  JWTValidationResponseType,
  LocginErrorResponseType,
  LoginFormType,
  LoginResponseType,
  LoginSuccessResponse,
  UserDataType,
} from '../../types/general.types';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from '@utils/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public _baseUrl: string = environment.baseUrl;
  private _user!: UserDataType;

  // boolean behaviour subject to be subscripted to every change
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpClient) {
    // check if user is logged (checking local storage for the JWT)
    const userToken = getFromLocalStorage('user');
    if (userToken) {
      // If there is a token we can load user info
      this.isLoggedInSubject.next(true);
    }
  }

  // USER VARIABLE TO STORE LOAD DATA
  get user(): UserDataType {
    return { ...this._user };
  }

  // get http parameters
  get httpParams() {
    return new HttpParams()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Credentials', 'true');
  }

  login(formValue: LoginFormType): Observable<void | LocginErrorResponseType> {
    // let loginToken = this.httpService.post<LoginResponseType>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams });
    // update observable's state to notify the login process
    // this.isLoggedInSubject.next(true);
    // return loginToken;
    return this.httpService.post<any>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams }).pipe(
      map((res: LoginSuccessResponse) =>  {
        // store token in local storage
        localStorage.setItem('user', res.data.token);
        // update observable's state to notify the login process
        this.isLoggedInSubject.next(true);
        // return true;
      }),
      catchError((errorPayload) => {
        console.log({errorPayload});
        let errorResponse = errorPayload.error as LocginErrorResponseType;
        // Return an observable to satisfy the expected return type
        return of(errorResponse);
      })
    );
  }

  logout(): Observable<boolean> {
    // update observable's state to notify the login process
    this.isLoggedInSubject.next(false);
    // delete from LS
    deleteFromLocalStorage('user');
    return of(true);
  }

  verifyToken(): Observable<boolean> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', getFromLocalStorage('user'));

    // response : { status: boolean }
    return this.httpService
      .get<JWTValidationResponseType>(`${this._baseUrl}/auth/validate`, {headers})
      .pipe(
        map((res: JWTValidationResponseType) => {
          const { name, second_name, email } = res.data;
          // update user information from token
          this._user = { name, second_name, email };
          // return boolean value if token has been verified
          return res.status;
        })
      );
  }

  isAuthenticated(): boolean {
    const token = getFromLocalStorage("user");
    return !!token;
  }
}
