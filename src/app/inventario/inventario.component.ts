import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface Inventario {
  cantidad: number;
  nombre: string;
  descripcion: string;
  fecha_nacimiento: string;
  ver: string;
}

const ELEMENT_DATA: Inventario[] = [
  {cantidad: 2, nombre: 'Panadol', descripcion: 'Para el dolor de cabez', fecha_nacimiento: '1222', ver: ''},
  {cantidad: 3, nombre: 'Panadol', descripcion: 'Para el dolor de cabez', fecha_nacimiento: 'H', ver: ''},
  
];


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  API_ENDPOINT = "http://127.0.0.1:8000/api/";
  inventario: Inventario[];

  displayedColumns: string[] = ['cantidad', 'nombre', 'descripcion', 'fecha_nacimiento', 'ver'];
  
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

}
