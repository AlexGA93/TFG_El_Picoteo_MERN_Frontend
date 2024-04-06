import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Datum } from 'src/types/types';

@Component({
  selector: 'app-sorted-filtered-table',
  templateUrl: './sorted-filtered-table.component.html',
  styleUrls: ['./sorted-filtered-table.component.scss'],
})
export class SortedFilteredTableComponent implements OnChanges {
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

  constructor() {}

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
