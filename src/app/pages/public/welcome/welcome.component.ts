import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    imports: [MatButtonModule],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  redirect(flag: string) {
    // console.log(`public/${flag}`);
    this.router.navigateByUrl(`public/${flag}`)
  }

}
