import { Injectable } from '@angular/core';
import { JWTValidationResponseType, LoginFormType, LoginResponseType, UserDataType } from 'src/types/types';
import { environment } from 'src/env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { deleteContent, getContent } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: UserDataType;

  // USER VARIABLE TO STORE LOAD DATA
  get user() {
    return {...this._user}
  }
  
  // get http parameters
  get httpParams() {
    return new HttpParams().set('Content-Type', 'application/json').set('Access-Control-Allow-Credentials','true');
  }

  constructor(private httpService: HttpClient) { }

  login(formValue: LoginFormType): Observable<LoginResponseType> {
    return this.httpService.post<LoginResponseType>(`${this._baseUrl}/auth/login`, formValue, { params: this.httpParams });
  }

  logout(): void {
    deleteContent("user");
  }

  verifyToken(): Observable<boolean> {
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-auth-token', getContent('user') || '');

    // response : { status: boolean }
    return this.httpService.get<JWTValidationResponseType>(`${this._baseUrl}/auth/validate`, {headers}).pipe(map(res => {

      const { name, second_name, email } = res.data;
      this._user = { name, second_name, email };

      return res.status;
    }));
  }
}
