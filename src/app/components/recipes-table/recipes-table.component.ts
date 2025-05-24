import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Store } from '../../../types/types';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Inventory } from '../../../types/types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';

@Component({
    selector: 'app-recipes-table',
    imports: [JsonPipe, CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator, TrimmedPipe],
    templateUrl: './recipes-table.component.html',
    styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent implements OnChanges {

  // local variables
  title!:                               string;
  displayedColumns!:                    string[];
  dataSource!:                          MatTableDataSource<Store>;

  // Inputs from parent component
  @Input() displayedColumnsInput!:      string[];
  @Input() recipes!:                    Store[];
  @Input() titleInput!:                 string;

  // change detectors
  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!:            MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.title = this.titleInput;
    this.displayedColumns = this.displayedColumnsInput!;
    this.dataSource = new MatTableDataSource(this.recipes!);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}
