import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlmacenType, InventarioType, PagosType } from 'src/types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  // ganancias - Pagos
  // gastos - precio_unidad(Almacen)*unidades(Inventario)
  // Inventario
  // Almacen

  Inventario!: InventarioType[];
  Almacen!: AlmacenType[];
  Pagos!: PagosType[];

  constructor(private as: AuthService, private db: DatabaseService) {
    this.db.getInventario('Inventario').subscribe(res => this.Inventario = res.data);
    this.db.getInventario('Almacen').subscribe(res => this.Almacen = res.data);
    this.db.getInventario('Pagos').subscribe(res => this.Pagos = res.data);
    
  }

  ngOnInit(): void {}

  getGanancias(): number {
    let counter: number = 0;

    for(let i=0;i<this.Pagos.length;i++){
      counter+=this.Pagos[i].precio;
    }
    return counter;
  }

  getGastos() {}

}
