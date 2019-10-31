import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { InventariosService } from '../services/inventarios.service';

export interface Inventario {
  cantidad: number;
  nombre: string;
  descripcion: string;
  fecha_vencimiento: Date;
  ver: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  API_ENDPOINT = "http://127.0.0.1:8000/api/";
  inventario1: Inventario[];
  

  displayedColumns: string[] = ['cantidad', 'nombre', 'descripcion', 'fecha_vencimiento', 'ver'];
  
  dataSource:any;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private inventarioss: InventariosService, private httpClient: HttpClient) { 
    httpClient.get(this.API_ENDPOINT + 'inventarios' ).subscribe((data: Inventario[]) => {
      this.dataSource= new MatTableDataSource(data);
      console.log(this.inventario1);
    });
  }

  ngOnInit() {
  }

}
