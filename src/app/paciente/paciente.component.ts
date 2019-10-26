import { Component, OnInit , ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


export interface Paciente {
  id_paciente?: number;
  numero_paciente?: string;
  contrasenia?: string;
  nombre_completo?: string;
  numero_cuenta?: string;
  numero_identidad?: string;
  lugar_procedencia?: string;
  direccion?: string;
  carrera?: string;
  fecha_nacimiento?: string;
  sexo?: string;
  estado_civil?: string;
  seguro_medico?: string;
  numero_telefono?: string;
  emergencia_telefono?: string;
  peso?: string;
  talla?: string;
  imc?: string;
  temperatura?: string;
  presion?: string;
  pulso?: string;
  estudiante?: boolean;
  empleado?: boolean;
  visitante?: boolean;
  prosene?: boolean;
  created_at?:string;
  updated_at?:string;
  nada:string;
}




@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  
  API_ENDPOINT = 'http://apiclinicaunah.test/api/';
  pacientes: Paciente[];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor( private pacienteService: FormularioService, private httpClient: HttpClient ) { 
    this.getPacientes();


   
  }
  
  getPacientes(){
    this.pacienteService.get().subscribe((data: Paciente[]) =>{
      this.dataSource =  new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      console.log(this.pacientes);

    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  displayedColumns: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'sexo', 'numero_telefono', 'nada'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

  }
  




  ngOnInit() {

  }

}
