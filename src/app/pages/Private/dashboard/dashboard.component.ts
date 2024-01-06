import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AlmacenType, InventarioType, PagosType, StockType, ProductosType } from 'src/types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  isLoading: boolean = true;

  Inventario: InventarioType[] = [];
  Almacen: AlmacenType[] = [];
  Pagos: PagosType[] = [];
  Stock: StockType[] = [];
  Productos: ProductosType[] = [];

  constructor(private as: AuthService, private db: DashboardService) {
    this.db.getTableInfo('Inventario').subscribe(res => this.Inventario = res.data);
    this.db.getTableInfo('Almacen').subscribe(res => this.Almacen = res.data);
    this.db.getTableInfo('Pagos').subscribe(res => this.Pagos = res.data);
    this.db.getTableInfo('Stock').subscribe(res => this.Stock = res.data);
    this.db.getTableInfo('Productos').subscribe(res => this.Productos = res.data);    
  }

  ngOnInit(): void {
  }

  getEarnedCapital(): number {
    if(this.Pagos.length !== 0){

      let result: number = 0;

      this.Pagos.forEach((transaction) => {
        result += transaction.precio;
      })

      return result;
    }

    return 0;
  }

  getInvestedCapital(): number {

    if(this.Inventario.length !== 0 && this.Almacen.length !== 0){
      // If we have content for both 'Inventory' and 'Warehouse'
      this.isLoading = !this.isLoading;

      // Init proccess
      let result: number = 0;

      this.Inventario.forEach((product, index) => {
        result += product.unidades * this.Almacen[index].precio_unidad;
      });

      return result;
    }

    return 0;
  }

}
