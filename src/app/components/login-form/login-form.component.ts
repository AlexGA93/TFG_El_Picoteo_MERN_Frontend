import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button'; 
import { AuthenticationService } from '../../services/authentication.service';
import { LoginResponseType } from '../../../types/types';
import { saveToLocalStorage } from '../../../utils/local-storage';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    email: ['johnDoe@elpicoteo.com', [Validators.required, Validators.email]],
    password: ['92johnDOE4ever', [Validators.required, Validators.minLength(8)]]
  });

  isLoading: boolean = false;

  ngOnInit(): void {}

  submitForm() {
    // update loader
    this.isLoading = true;
    // service injection - http request
    this.authenticationService
    .login(this.myForm.value)
    .subscribe((response: LoginResponseType) => {
      // store in local storage
      saveToLocalStorage("user", response.token);
      // redirect to dashboard
      this.router.navigateByUrl("/private");
    })
  }
    
}
