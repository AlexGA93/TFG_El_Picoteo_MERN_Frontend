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
import { LoginResult } from "../../../../types/types";
import { first } from "rxjs/operators";
@Component({
  selector: "login-form",
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  // inyectamos el form builder
  private formBuilder = inject(FormBuilder);
  // inyectamos el servicio de autenticacion
  // private authService = inject(AuthService);
  // inyectamos servicio de router
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  //signals
  showPassword = signal<boolean>(false);
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // declaramos el formulario reactivo
  public loginForm: FormGroup = this.formBuilder.group({
    // email -> requerido, con una validacion custom
    email: [
      "johnDoe@elpicoteo.com",
      [Validators.required, Validators.pattern(emailPattern)],
    ],
    // password -> requerida, con una validacion custom
    password: ["92johnDOE4ever", [Validators.required]],
  });

  // funciones
  showHidePassword() {
    console.log(this.showPassword());
    this.showPassword.set(!this.showPassword());
    console.log(this.showPassword());
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      // si el formulari oes invalido, seteamos el flag de error a true para mostrar mensaje de error
      this.hasError.set(true);
      // esperamos dos segundos y hacemos desaparecer el alert
      setTimeout(() => this.hasError.set(false), 2000);
      // y salimos sin hacer nada mas
      return;
    }

    const formValue = this.loginForm.value;

    // loading activo
    this.isLoading.set(true);

    // usar wrapper que persiste token y actualiza estado
    this.authenticationService
      .loginAndPersist(formValue)
      .pipe(first())
      .subscribe({
        next: (result: LoginResult) => {
          // desactivar loading
          this.isLoading.set(false);
          if (result.ok) {
            // success -> redirect to dashboard
            this.router.navigate(["/admin/dashboard"]);
          } else {
            // show error to the user
            this.hasError.set(true);
            // hide after 2s
            setTimeout(() => this.hasError.set(false), 2000);
            console.error("Login failed", result.error);
          }
        },
        error: (err: unknown) => {
          // This block should rarely run because login() catches errors and returns a value,
          // but keep defensive handling.
          this.isLoading.set(false);
          this.hasError.set(true);
          setTimeout(() => this.hasError.set(false), 2000);
          console.error("Unexpected login error", err);
        },
      });
  }
}
