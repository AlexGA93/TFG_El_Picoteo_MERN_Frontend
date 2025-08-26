import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginResponseType } from '../../../types/types';
import { saveToLocalStorage } from '../../../utils/local-storage';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  standalone: true,
  selector: 'component-login-form',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent{

  public formBuilder = inject(FormBuilder);
  public router      = inject(Router);
  public authService = inject(AuthenticationService);

  myForm: FormGroup = this.formBuilder.group({
    email: ['johnDoe@elpicoteo.com', [Validators.required, Validators.email]],
    password: ['92johnDOE4ever', [Validators.required, Validators.minLength(8)]]
  });

  public isLoading = signal<boolean>(false);
  public passwordVisible = signal<boolean>(false);

  public togglePasswordVisualice(): void {
    this.passwordVisible.set(!this.passwordVisible());      
  }

  submitForm() {
    // update loader
    this.isLoading.set(true);
    // service injection - http request
    this.authService
    .login(this.myForm.value)
    .subscribe({
      next: (response: LoginResponseType) => {
        saveToLocalStorage("user", response.token);
        this.isLoading.set(false);
        this.router.navigateByUrl('/private/dashboard');
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.isLoading.set(false);
      }
    });
  }
    
}
