import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { JWTValidationResponseType, LoginFormType, LoginResponseType } from 'src/types/types';
import { LoginForm, exampleToken, validationRes } from 'src/utils/constants';
import { validTokenGuard } from '../guards/valid-token.guard';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid login token, login(formValue: LoginFormType)', () => {
    const mockFormValue: LoginFormType = {
      email: LoginForm.email,
      password: LoginForm.password,
    };

    // example of random token
    let expectedToken: string = exampleToken;

    service.login(mockFormValue).subscribe((response: LoginResponseType) => {
      expect(response).toBeTruthy();
      expect(typeof response).toBe('string');
    });
    const req = httpMock.expectOne(
      `${service._baseUrl}/auth/login?Content-Type=application/json&Access-Control-Allow-Credentials=true`
    );
    expect(req.request.method).toBe('POST');
    req.flush(expectedToken);

    expect(service.isLoggedInSubject.value).toBe(true);
  });

  it('it should delete token, logout()', () => {
    expect(service.isLoggedInSubject.value).toBe(false);
  })



it('should return a boolean value, verifyToken()', () => {
    // Response mock
    const responseMock: JWTValidationResponseType = validationRes;
  
    // Create headers with the expected token
    const expectedToken: string = exampleToken;
    const headers = new HttpHeaders().set('x-auth-token', expectedToken);
  
    // Make the HTTP request
    service.verifyToken().subscribe((response: boolean) => {
      expect(response).toBe(true); // Example assertion
    });
  
    // Verify the request
    const req = httpMock.expectOne(`${service._baseUrl}/auth/validate`);
    expect(req.request.method).toBe('GET');
    // Simulate server response
    req.flush(responseMock, {headers});
  });

});
