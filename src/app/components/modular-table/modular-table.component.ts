import { CommonModule, CurrencyPipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Type, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';
import { BaseType, Inventory, Store } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralModalComponent } from '../general-modal/general-modal.component';


@Component({
  selector: 'app-modular-table',
  standalone: true,
  imports: [
    CommonModule, 
    UpperCasePipe, 
    CurrencyPipe, 
    TrimmedPipe, 
    JsonPipe, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatPaginator
  ],
  templateUrl: './modular-table.component.html',
  styleUrl: './modular-table.component.scss'
})
export class ModularTableComponent implements OnChanges{

  // local variables
  title                 !: string;
  dataSource            !: MatTableDataSource<BaseType>;
  displayedColumns      !: string[];

  // Inputs from parent component
  @Input() titleInput   !: string;
  @Input() tableColumns  : string[] = [];
  @Input() tableData    !: BaseType[];

  // change detectors
  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!:            MatSort;

  constructor(
    private dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  ngOnChanges(): void {
    this.title = this.titleInput;
    this.displayedColumns = this.formatColumns(this.tableColumns!);
    this.dataSource = new MatTableDataSource(this.tableData!);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  formatColumns(displayedColumnsInput: string[]) {
    console.log(displayedColumnsInput.push("acciones"));
    
    return displayedColumnsInput;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // apply to filter the input value trimmed and converted to lowercase
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // check if there is a paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(flag: string) {

    const modalRef = this.modalService.open(GeneralModalComponent);

    // Pasamos el 'inputData' al modal
    modalRef.componentInstance.inputData = flag;
    
    modalRef.result.then((result) => {
      console.log('El modal se cerró con el resultado: ', result);
    }, (reason) => {
      console.log('El modal se cerró con la razón: ', reason);
    });
  }

}
