import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Inventory } from '../../../types/types';

import { CommonModule } from '@angular/common';
import { TrimmedPipe } from '../../pipes/trimmed.pipe';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'inventory-table',
  standalone: true,
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator, TrimmedPipe],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss'
})
export class InventoryTableComponent implements OnChanges {

    title!: string;
    displayedColumns!: string[];
    dataSource!: MatTableDataSource<Inventory>;

    // Inputs from parent component
    @Input() displayedColumnsInput: string[] = [];
    @Input() dataSourceInput: Inventory[] = [];
    @Input() titleInput!: string;

    // change detectors
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnChanges(changes: SimpleChanges): void {
        console.log("====================================");
        console.log(this.displayedColumnsInput);
        console.log(this.dataSourceInput);

        // Solo actualiza los datos si los Inputs cambian
        if (changes['displayedColumnsInput'] || changes['dataSourceInput']) {
            this.title = this.titleInput;
            this.displayedColumns = this.displayedColumnsInput;
            this.dataSource = new MatTableDataSource(this.dataSourceInput);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
