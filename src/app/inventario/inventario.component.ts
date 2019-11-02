import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { InventariosService } from '../services/inventarios.service';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from '../interfaces/inventario';

export interface tablaInventario {
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
  tablaInventario: tablaInventario[];
  id: any;

  inventario: Inventario={
    cantidad: null,
    nombre: null,
    descripcion: null,
    fecha_vencimiento: null,
    
  };
  

  displayedColumns: string[] = ['cantidad', 'nombre', 'descripcion', 'fecha_vencimiento', 'ver'];
  
  dataSource:any;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private inventariosService: InventariosService, private httpClient: HttpClient,private activatedRoute: ActivatedRoute, ) { 

  }

  ngOnInit() {
    this.getDatos();
  }

  getDatos(){
    this.inventariosService.getInventario().subscribe((data: tablaInventario[])=>{
      this.tablaInventario = data;
      this.dataSource = new MatTableDataSource(this.tablaInventario);
    
    });
  }
  

}
