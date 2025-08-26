import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { AlmacenService } from '../../../services/almacen.service';
import { Inventory, Recipe, GLobalTableResponseType, Store } from '../../../../types/types';
// import { InventoryTableComponent } from '../../../components/inventory-table/inventory-table.component';
import { TrimmedPipe } from '../../../pipes/trimmed.pipe';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MoneyPannelComponent } from '../../../components/money-pannel/money-pannel.component';
// import { RecipesTableComponent } from '../../../components/recipes-table/recipes-table.component';
// import { InventoryableComponent } from '../../../components/inventory-table/inventory-table.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        JsonPipe,
        // RecipesTableComponent,
        // MoneyPannelComponent,
        // InventoryTableComponent,
        CommonModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatTableModule,
        // MatPaginator,
        TrimmedPipe,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // local variables to implement parent component

  // INVENTORY DATA
  inventoryTitle: string = "inventario";
  inventoryDisplayedColumns!: string[]; // cstring array with http request keys
  inventoryDataSource!: Inventory[]; // http request's data array

  
  // RECIPES DATA (STORAGE, INVENTORY, PRODUCTS)
  recipesTitle: string = "recetas";
  recipesDisplayedColumns!: string[]; // cstring array with http request keys
  recipesDataSource!: Store[]; // http request's data array
  

  gainsFlag: number = 0;
  lossesFlag: number = 1;

  constructor(
    private authenticationService: AuthenticationService,
    private almacenService: AlmacenService
  ) {
    // * Inventario
    this.almacenService
    .getGlobalInventoryData()
    .subscribe((result: GLobalTableResponseType) => {
      // console.log(result['data']);
      // console.log(Object.keys(result['data'][0]));
      
      this.inventoryDisplayedColumns = Object.keys(result['data'][0]);
      this.inventoryDataSource = result['data'] as Inventory[];
    });

    // * Recipes
    // data composition about recipes, inventory, storage
    this.almacenService.getGlobalStoreData()
    .subscribe((result: GLobalTableResponseType) => {
      this.recipesDisplayedColumns = Object.keys(result['data'][0]);
      this.recipesDataSource = result['data'] as Store[];
    });


  }

  
}
