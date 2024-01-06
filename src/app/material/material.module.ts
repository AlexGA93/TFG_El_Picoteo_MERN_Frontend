import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
