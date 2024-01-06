import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class BootstrapModule { }
