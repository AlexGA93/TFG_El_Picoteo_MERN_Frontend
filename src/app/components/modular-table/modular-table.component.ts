import {
  CommonModule,
  CurrencyPipe,
  JsonPipe,
  UpperCasePipe,
} from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';
import { BaseType, Inventory, Store } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import {
  NgbModal,
  NgbModalModule,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';
import { EditInventoryModalComponent } from '../modals/edit-inventory-modal/edit-inventory-modal.component';
import { AddInventoryModalComponent } from '../modals/add-inventory-modal/add-inventory-modal.component';
import { DeleteInventoryModalComponent } from '../modals/delete-inventory-modal/delete-inventory-modal.component';

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
    MatPaginator,
    NgbModalModule,
  ],
  templateUrl: './modular-table.component.html',
  styleUrl: './modular-table.component.scss',
})
export class ModularTableComponent implements OnChanges {
  // local variables
  title!: string;
  dataSource!: MatTableDataSource<BaseType>;
  displayedColumns!: string[];
  modalRef!: NgbModalRef;

  // Inputs from parent component
  @Input() titleInput!: string;
  @Input() tableColumns: string[] = [];
  @Input() tableData!: BaseType[];

  // change detectors
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private modalService: NgbModal,
    private utilService: UtilService
  ) {}

  ngOnChanges(): void {
    this.title = this.titleInput;
    this.displayedColumns = this.formatColumns(this.tableColumns!);
    this.dataSource = new MatTableDataSource(this.tableData!);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  formatColumns(displayedColumnsInput: string[]) {
    console.log(displayedColumnsInput.push('acciones'));

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

  openModal(flag: string, content?: Inventory) {
    // console.log(flag, content);

    switch (flag) {
      case 'add':
        this.modalRef = this.modalService.open(AddInventoryModalComponent);
        break;
      case 'edit':
        if (content) {
          this.utilService.setFormDataContent(content);
        }
        this.modalRef = this.modalService.open(EditInventoryModalComponent);
        break;
      case 'delete':
        if (content) {
          this.utilService.setFormDataContent(content);
        }
        this.modalRef = this.modalService.open(DeleteInventoryModalComponent);
        break;
    }
    if (this.modalRef) {
      this.modalRef.componentInstance.inputData = flag;

      this.modalRef.result.then(
        (result: any) => {
          console.log('El modal se cerró con el resultado: ', result);
        },
        (reason: any) => {
          console.log('El modal se cerró con la razón: ', reason);
        }
      );
    }
  }
}
