import { Component, OnInit , ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';



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
  categoria?: any;
  prosene?:any;
 
}




@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {
  
  API_ENDPOINT = 'http://apiclinicaunah.test/api/';
  pacientes: Paciente[];
  alumnos: Paciente[];
  empleados: Paciente[];
  visitantes: Paciente[];
  prosene: Paciente[];
  
  dataSource: any;
  dataSource2: any;
  dataSource3: any;
  dataSource4: any;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 
 loading:boolean;
  constructor( private pacienteService: FormularioService, private httpClient: HttpClient, private router:Router ) { 
    this.getPacientes();
    this.loading = false;
    this.pacienteService.esAlumno = true;
  }


// esto es para mandar string de un componente a atro
//  loading:boolean;  

//   receiveMessage($event) {
//     this.loading = $event;
//   }
  
  getPacientes(){
    this.pacienteService.obtenerPacientes().subscribe((data: Paciente[]) =>{
      this.pacientes=data;

      console.log(this.pacientes);
      this.alumnos = this.pacientes.filter(paciente => paciente.categoria === 'Estudiante');
      this.empleados = this.pacientes.filter(paciente => paciente.categoria === 'Empleado');
      this.visitantes = this.pacientes.filter(paciente => paciente.categoria === 'Visitante');
      this.prosene = this.pacientes.filter(paciente => paciente.prosene === 'Si');
console.log(this.pacientes[0].prosene);

      this.dataSource =  new MatTableDataSource(this.alumnos);
     this.dataSource2 =  new MatTableDataSource(this.empleados);
     this.dataSource3 =  new MatTableDataSource(this.visitantes);
     this.dataSource4 =  new MatTableDataSource(this.prosene);
 

    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  
 

  displayedColumns: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'sexo', 'numero_telefono'];
  displayedColumns2: string[] = ['id_paciente', 'nombre_completo', 'numero_cuenta', 'sexo', 'numero_telefono'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }
   




  ngOnInit() {

  }

  formulario(){
    this.pacienteService.esAlumno = false;
    this.router.navigate(['principal/formulario']);
  }

}
