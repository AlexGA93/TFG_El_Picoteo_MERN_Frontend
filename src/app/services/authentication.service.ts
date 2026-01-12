import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {
  JWTValidationResponseType,
  LoginFormType,
  LoginResponseType,
  UserDataType,
  LoginResult,
} from '../../types/types';
import {BehaviorSubject, map, catchError, of, tap, Observable} from 'rxjs';
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

  login(formValue: LoginFormType): Observable<LoginResult> {
    // Return a discriminated union that callers can pattern-match on
    return this.httpService.post<LoginResponseType>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams })
      .pipe(
        map((res: LoginResponseType) => ({ ok: true as const, data: res })),
        catchError((error: HttpErrorResponse) => {
          const err = {
            ok: false as const,
            error: {
              status: error.status || 0,
              message: (error.error && error.error.message) || error.message || 'Unknown error',
              raw: error,
            },
          };
          return of(err);
        })
      );
  }

  // Convenience wrapper: calls login and persists token on success
  loginAndPersist(formValue: LoginFormType): Observable<LoginResult> {
    return this.login(formValue).pipe(
      tap(result => {
        if (result.ok) {
          // persist token
          saveToLocalStorage('user', result.data.token);
          // update state
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    // update observable's state to notify the login process
    this.isLoggedInSubject.next(false);
    // delete from LS
    deleteFromLocalStorage('user');

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
