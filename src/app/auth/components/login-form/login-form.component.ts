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

  //signals
  showPassword = signal<boolean>(false);

  // declaramos el formulario reactivo
  public loginForm: FormGroup = this.formBuilder.group({
    // email -> requerido, con una validacion custom
    email: [
      "test1@google.com",
      [Validators.required, Validators.pattern(emailPattern)],
    ],
    // password -> requerida, con una validacion custom
    password: ["Abc123", [Validators.required]],
  });

  // funciones
  showHidePassword(event: any) {
    console.log(this.showPassword());
    this.showPassword.set(!this.showPassword());
    console.log(this.showPassword());
  }
  onSubmit() {
    if (this.loginForm.invalid) return;

    console.log(this.loginForm.value);
  }
}
