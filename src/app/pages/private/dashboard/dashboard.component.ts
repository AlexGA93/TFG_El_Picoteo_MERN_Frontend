import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateNavbar } from '../shared/private-navbar/private-navbar.component';
import { DashboardRecetas } from '../components/dashboard/dahboard-recetas/dahboard-recetas';


@Component({
    selector: 'app-dashboard',
  imports: [
    CommonModule,
    PrivateNavbar,
    DashboardRecetas
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  

  gainsFlag: number = 0;
  lossesFlag: number = 1;

  constructor(
  ) {

  }

  
}
