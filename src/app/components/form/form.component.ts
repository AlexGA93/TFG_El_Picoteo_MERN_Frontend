import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { saveToLocalStorage } from 'src/utils/localStorage';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    //TODO: delete credentials
    email: ['johnDoe@elpicoteo.com', [Validators.required, Validators.email]],
    password: ['92johnDOE4ever', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }  

  submitForm() {
    this.auth
        .login(this.myForm.value)
        .subscribe((response) => {
          // store in local storage
          saveToLocalStorage("user", response.token);
          // redirect to dashboard
          this.router.navigateByUrl("/private");
        });
  }

}
