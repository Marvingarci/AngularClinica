import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InventariosService } from '../services/inventarios.service';
import { HistoriaSubsiguiente } from '../interfaces/historia_subsiguiente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-at1',
  templateUrl: './at1.component.html',
  styleUrls: ['./at1.component.css']
})

export class At1Component implements OnInit {

  dataSource1:any;

  displayedColumns: string[] = ['numero_cuenta', 'nombre_completo', 'carrera', 'sexo', 
                                'categoria', 'remitidoa'];

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  constructor(private pacienteService: PacienteService) {
    this.pacienteService.obtenerHistoriasSubsiguientes().subscribe((data: HistoriaSubsiguiente[])=>{
      this.dataSource1 = new MatTableDataSource(data);
      console.log(data);
    }, (error)=>{
      
      console.log(error);
    });
   }

  ngOnInit() {
  }

}
