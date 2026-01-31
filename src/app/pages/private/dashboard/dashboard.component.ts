import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateNavbar } from '../shared/private-navbar/private-navbar.component';

@Component({
    selector: 'app-dashboard',
  imports: [
    CommonModule,
    PrivateNavbar
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

  gainsFlag: number = 0;
  lossesFlag: number = 1;

  constructor(
  ) {

  }

  
}
