import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortedFilteredTableComponent } from 'src/app/components/sorted-filtered-table/sorted-filtered-table.component';
import { TrimmedPipe } from 'src/app/pipes/trimmed.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    SortedFilteredTableComponent,
    TrimmedPipe
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MaterialModule
  ]
})
export class PrivateModule { }
