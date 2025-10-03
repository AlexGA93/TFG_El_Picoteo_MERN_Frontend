/**
 * Para hacer tests unitarios llamamos a la funcion describe
 * para describer a gran nivel lo que vamos a testear
 */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { AuthenticationService } from "./authentication.service";
import { TestBed } from "@angular/core/testing";

describe("AuthenticationService", () => {
  // Definimos las variables que vamos a usar en los tests
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  // Antes de cada test, configuramos el entorno de pruebas
  beforeEach(() => {
    // Configuramos el TestBed con los módulos y servicios necesarios
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Después de cada test, verificamos que no haya solicitudes pendientes y limpiamos el localStorage
  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // Test para verificar que el servicio se crea correctamente
  it("debería hacer login y guardar el token", () => {
    const mockResponse = { token: "fake-jwt-token" };
    const mockPayload = { email: "test@mail.com", password: "paSsSword123@" };

    // llamamos a la funcion login del servicio
    service.login(mockPayload).subscribe((response) => {
      // Verificamos que la respuesta sea correcta y que el token se haya guardado en localStorage
      expect(response.token).toBe("fake-jwt-token");
      expect(localStorage.getItem("token")).toBe("fake-jwt-token");
    });

    // Simulamos la respuesta del backend
    const req = httpMock.expectOne("URL_DEL_ENDPOINT_LOGIN");
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  // Test para verificar que el servicio se crea correctamente
  it("debería indicar autenticado si hay token", () => {
    localStorage.setItem("token", "fake-jwt-token");
    expect(service.isAuthenticated()).toBeTrue();
  });

  // Test para verificar que el servicio se crea correctamente
  it("debería indicar no autenticado si no hay token", () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  // Test para verificar que el servicio se crea correctamente
  it("debería eliminar el token al hacer logout", () => {
    localStorage.setItem("token", "fake-jwt-token");
    service.logout();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
