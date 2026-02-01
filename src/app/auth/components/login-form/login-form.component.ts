import { Component, inject, signal } from "@angular/core";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { PasswordModule } from "primeng/password";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { Router, RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { emailPattern } from "@utils/regular-expressions";
import { AuthenticationService } from "../../../services/authentication.service";
import {
  ErrorBodyType,
  LocginErrorResponseType,
} from "../../../../types/types";
import { LoginAlert } from "../login-alert/login-alert.component";

const mockedErrorLogin = {
  email: "test1@google.com",
  password: "Abc123",
};

const mockedSuccessLogin = {
  email: "johnDoe@elpicoteo.com",
  password: "92johnDOE4ever",
};

@Component({
  selector: "login-form",
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
    LoginAlert,
  ],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  // inyectamos el form builder
  private formBuilder = inject(FormBuilder);
  // inyectamos el servicio de autenticacion
  private authService = inject(AuthenticationService);
  // inyectamos servicio de router
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  //signals
  showPassword = signal<boolean>(false);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);
  loginErrorsMessages = signal<LocginErrorResponseType>({});

  // declaramos el formulario reactivo
  public loginForm: FormGroup = this.formBuilder.group({
    // email -> requerido, con una validacion custom
    email: [
      mockedSuccessLogin.email,
      [Validators.required, Validators.pattern(emailPattern)],
    ],
    // password -> requerida, con una validacion custom
    password: [mockedSuccessLogin.password, [Validators.required]],
  });

  // funciones
  showHidePassword(event: any) {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    // comprobacion de la validez del formulario
    if (this.loginForm.invalid) {
      // si el formulario es invalido, seteamos el flag de error a true para mostrar los mensajes de error
      this.hasError.set(true);
      // esperamos dos segundos y hacemos desaparecer el alert
      this.timeOutErrorModal();
      return;
    }

    // desestructuramos el formulario
    const { email = "", password = "" } = this.loginForm.value;
    this.isPosting.set(true);

    // llamamos al servicio de autenticacion
    this.authService.login({ email, password }).subscribe((response) => {
      if (!response) {
        this.router.navigate(["/private/"]);
      } else {
        let responseSuccess = (response as LocginErrorResponseType).success;
        let responseErrors = (response as LocginErrorResponseType).errors;

        if (responseSuccess && !response) {
          //asignamos los mensajes de error a la senal
          this.loginErrorsMessages.set(response); // Updated to use responseErrors

          this.hasError.set(true);
          this.isPosting.set(false);
          // esperamos dos segundos y hacemos desaparecer el alert
          this.timeOutErrorModal();
          return;
        } else if (response && response.mssg) {
          console.log(response.mssg);
          this.loginErrorsMessages.set(response);
          this.hasError.set(true);
          this.isPosting.set(false);
          // esperamos dos segundos y hacemos desaparecer el alert
          this.timeOutErrorModal();
        }
      }
    });
  }

  private timeOutErrorModal() {
    setTimeout(() => {
      this.hasError.set(false);
    }, 5000);
  }
}
