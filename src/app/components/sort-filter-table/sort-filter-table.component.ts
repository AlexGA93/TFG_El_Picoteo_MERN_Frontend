import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Datum } from '../../../types/types';

import { CommonModule } from '@angular/common';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';

@Component({
  selector: 'app-sort-filter-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator, TrimmedPipe],
  templateUrl: './sort-filter-table.component.html',
  styleUrl: './sort-filter-table.component.scss'
})
export class SortFilterTableComponent implements OnChanges{

    // local variables
    title!:                               string;
    displayedColumns!:                    string[];
    dataSource!:                          MatTableDataSource<Datum>;
  
    // Inputs from parent component
    @Input() displayedColumnsInput!:      string[];
    @Input() dataSourceInput!:            Datum[];
    @Input() titleInput!:                 string;
  
    // change detectors
    @ViewChild(MatPaginator) paginator!:  MatPaginator;
    @ViewChild(MatSort) sort!:            MatSort;


    ngOnChanges(): void {
      this.title = this.titleInput;
      this.displayedColumns = this.displayedColumnsInput!;
      this.dataSource = new MatTableDataSource(this.dataSourceInput!);
  
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
