import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  redirect(flag: string) {
    console.log(`/${flag==='login' ? 'login' : 'menu'}`);
    
    this.router.navigateByUrl(`public/${flag}`);
  }
}
