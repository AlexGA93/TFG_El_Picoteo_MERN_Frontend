import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { deleteFromLocalStorage } from '../../../utils/local-storage';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, MatDialogModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  userLogged!: boolean;
  navbarOpen: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // subscribe to a service's user information through login process
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.userLogged = isLoggedIn;
    });
  }

  ngOnInit(): void {}

  get user(){
    return this.authenticationService.user;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logOut() {
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   console.log(typeof result);
      
    //   if(result === true){
    //     // delete user token from LS
    //     this.authenticationService.logout();
    //     // redirect to main page
    //     this.router.navigateByUrl(`public/welcome`);
    //   }
    // });
  }
}
