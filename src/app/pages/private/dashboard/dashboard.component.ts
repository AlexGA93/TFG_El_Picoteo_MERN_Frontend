import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { AlmacenService } from '../../../services/almacen.service';
import { Datum, GlobalAlmacenResponseType } from '../../../../types/types';
import { SortFilterTableComponent } from '../../../components/sort-filter-table/sort-filter-table.component';
import { TrimmedPipe } from '../../../pipes/trimmed.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, SortFilterTableComponent, CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginator, TrimmedPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    // local variables to implement parent component
    title!: string;
    displayedColumns!: string[]; // cstring array with http request keys
    dataSource!: Datum[];// http request's data array

  constructor(
    private authenticationService: AuthenticationService,
    private almacenService: AlmacenService
    ) {
      this.almacenService.getGlobalInventoryData().subscribe((result: GlobalAlmacenResponseType) => {
        console.log(result['data'])
        this.title = "Inventario";
        this.displayedColumns = Object.keys(result['data'][0]);
        this.dataSource = result['data'];
      })
  }

  // get user informacion from service and store in a local getter
  get user(){
    return this.authenticationService.user;
  }

}
