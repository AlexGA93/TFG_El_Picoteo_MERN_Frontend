import { Component, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "../../../components/login-form/login-form.component";
@Component({
   standalone: true,
   selector: "app-login",
   imports: [ReactiveFormsModule,LoginFormComponent],
   templateUrl: "./login.component.html",
})
export class LoginComponent {

}
