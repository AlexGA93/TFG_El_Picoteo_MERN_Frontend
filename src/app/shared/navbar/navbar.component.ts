import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userLogged!: boolean;

  constructor(private as: AuthService, private router: Router) {
    this.as.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      console.log(isLoggedIn);
      this.userLogged = isLoggedIn;
    })
  }

  ngOnInit(): void {
    
  }
  LogOut() {
    this.as.logout();
    this.router.navigateByUrl(`public/welcome`);
  }
  
}
