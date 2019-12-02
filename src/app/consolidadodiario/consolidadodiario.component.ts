import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InventariosService } from '../services/inventarios.service';
import { Cita } from '../interfaces/Cita';

@Component({
  selector: 'app-consolidadodiario',
  templateUrl: './consolidadodiario.component.html',
  styleUrls: ['./consolidadodiario.component.css']
})
export class ConsolidadodiarioComponent implements OnInit {

  dataSource:any;

  displayedColumns: string[] = ['sexo','m', 'f', 'total'];
  displayedColumns1: string[] = ['sexo','m', 'f', 'total'];


  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  this.dataSource = new MatTableDataSource();
  }

  constructor() { }

  ngOnInit() {
  }

}
