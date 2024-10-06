import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Inventory } from '../../../types/types';

import { CommonModule } from '@angular/common';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'inventory-table',
  standalone: true,
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator, TrimmedPipe],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss'
})
export class InventoryTableComponent implements OnInit{

    // local variables
    title!:                               string;
    displayedColumns!:                    string[];
    dataSource!:                          MatTableDataSource<Inventory>;
  
    // Inputs from parent component
    @Input() displayedColumnsInput!:      string[];
    @Input() dataSourceInput!:            Inventory[];
    @Input() titleInput!:                 string;
  
    // change detectors
    @ViewChild(MatPaginator) paginator!:  MatPaginator;
    @ViewChild(MatSort) sort!:            MatSort;


    ngOnInit(): void {
      console.log("patata");
      
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
