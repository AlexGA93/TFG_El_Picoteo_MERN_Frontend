import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SimpleTableComponent } from 'src/app/components/simple-table/simple-table.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    SimpleTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BootstrapModule,
    FormsModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
