import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { AlertConfig } from 'src/types/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userLogged!: boolean;

  constructor(
    private _as: AuthService, 
    private _router: Router,
    private _sweet: SweetAlertService
  ) {
    this._as.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.userLogged = isLoggedIn;
    })
  }

  ngOnInit(): void {
    
  }
  LogOut(): void {
    
    let alertConfig: AlertConfig = {
      title: "SALIR DE SESION",
      html:"Vas a salir de sesion. Estas seguro?",
      showCancelButton: true
    };

    this._sweet.showAlert(alertConfig).then((isConfirmed: boolean) => {
      if(isConfirmed){
        this._as.logout();
        this._router.navigateByUrl(`public/welcome`);
      }
    });
    
  }
  
}
