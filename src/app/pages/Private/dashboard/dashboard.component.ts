import {Component} from '@angular/core';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Datum, GlobalAlmacenResponseType } from 'src/types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent { 

  // local variables to implement parent component
  title!: string;
  displayedColumns!: string[]; // cstring array with http request keys
  dataSource!: Datum[];// http request's data array


  constructor(private als: AlmacenService) {
    this.als.getGlobalInventoryData().subscribe((result: GlobalAlmacenResponseType) => {
      this.title = "Inventario";
      this.displayedColumns = Object.keys(result['data'][0]);
      this.dataSource = result['data'];
    })
  }
}