import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../../../services/almacen.service';
import { GLobalTableResponseType, Inventory } from '../../../../types/types';
import { JsonPipe } from '@angular/common';
import { ModularTableComponent } from "../../../components/modular-table/modular-table.component";

@Component({
    selector: 'app-inventario',
    imports: [JsonPipe, ModularTableComponent],
    templateUrl: './inventario.component.html',
    styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit{

  inventoryTitle!: string;
  inventoryDisplayedColumns!: string[]; // cstring array with http request keys
  inventoryData!: Inventory[];

  constructor(
    private almacenService: AlmacenService
  ) {}

  ngOnInit() {
    this.almacenService.getGlobalInventoryData()
    .subscribe((result: GLobalTableResponseType) => {
      this.inventoryTitle = 'inventario';
      this.inventoryDisplayedColumns = Object.keys(result['data'][0]);
      this.inventoryData = result['data'] as Inventory[];
    });
  }
}
