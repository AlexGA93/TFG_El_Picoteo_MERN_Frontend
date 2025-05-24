import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LoaderComponent } from "../../../shared/loader/loader.component";
@Component({
   standalone: true,
   selector: "app-login",
   imports: [ReactiveFormsModule, RouterLink, LoaderComponent],
   templateUrl: "./login.component.html",
})
export class LoginComponent {
  public formBuilder = inject(FormBuilder);
  
  myForm: FormGroup = this.formBuilder.group({
    email: ['johnDoe@elpicoteo.com', [Validators.required, Validators.email]],
    password: ['92johnDOE4ever', [Validators.required, Validators.minLength(8)]]
  });

  public isLoading = signal<boolean>(false);
  public passwordVisible = signal<boolean>(false);

  public submitForm(): void {
    if (this.myForm.valid) {
      this.isLoading.set(true);
      console.log("Form submitted successfully", this.myForm.value);
    } else {
      console.error("Form is invalid", this.myForm.errors);
    }
    // this.isLoading.set(false);
  }

  public togglePasswordVisualice(): void {
    this.passwordVisible.set(!this.passwordVisible());      
  }
}
