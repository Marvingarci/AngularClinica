import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { InventariosService } from '../services/inventarios.service';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from '../interfaces/inventario';
import { FormInventarioComponent } from '../form-inventario/form-inventario.component';

export interface tablaInventario {
  id_inventario?: number;
  unidad: number;
  nombre: string;
  descripcion: string;
  presentacion: string;
  observacion: string;
  //fecha_vencimiento: Date;
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
    id_inventario:null,
    unidad: null,
    nombre: null,
    descripcion: null,
    presentacion: null,
    observacion: null,
    //fecha_vencimiento: null,
    
  };
  

  displayedColumns: string[] = ['id_inventario', 'nombre', 'descripcion', 'presentacion', 'observacion', 'unidad', 'ver'];
  
  dataSource:any;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private inventariosService: InventariosService, 
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute,
    ) { 

      //console.log(this.formularioInventario.cambiarInformacionInventario());

  }

  ngOnInit() {
    this.getDatos();
  }

  getDatos(){
    this.inventariosService.getInventarios().subscribe((data: tablaInventario[])=>{
      this.tablaInventario = data;
      this.dataSource = new MatTableDataSource(this.tablaInventario);
    
    });
  }
  

}
