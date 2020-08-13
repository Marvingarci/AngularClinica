import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
//import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Paciente } from '../interfaces/paciente';
import { MatDialog } from '@angular/material';
import { PacienteService } from '../services/paciente.service';
import { Cita } from '../interfaces/cita';
import { LoginService } from '../services/login.service';
import { Soloestudiantes } from '../interfaces/soloestudiantes';
import { Soloempleados } from '../interfaces/soloempleados';
import { Soloprosenes } from '../interfaces/soloprosenes';
import { Solovisitantes } from '../interfaces/solovisitantes';



@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})






export class PacienteComponent implements OnInit {
  

  single: any[];
  multi: any[];

  view: any[] = [0, 0];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Pacientes';
  showYAxisLabel = true;
  yAxisLabel = 'Número de pacientes';

  colorScheme = {
    domain: ['#ffd900be', 'rgb(255, 238, 0)', '#F6F94D', 'rgb(245, 240, 175)']
  };

pacientes:Paciente[];
  estudiantes: Soloestudiantes[];
  empleados: Soloempleados[]= [];
  visitantes: Solovisitantes[];
  prosenes: Soloprosenes[];


  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;
  dataSource4: MatTableDataSource<any>;

  dataSourceCitas: any;
  estudiantesM:any;

  columnasTablaCitas = ['numero_cita', 'paciente', 'fecha', 'hora'];

  mostrarCitas: boolean = false;





  loading: boolean;
  constructor(private formularioService: FormularioService,
    private pacienteService: PacienteService,
    private loginService: LoginService,
    private router: Router,
    public dialogo: MatDialog) {

      this.cargarGraficas();

    this.getPacientes();
    this.loading = false;
    this.formularioService.esAlumno = true;
  }




  getPacientes() {

    this.formularioService.obtenersoloestudiantes().subscribe((data: Soloestudiantes[]) => {
      this.estudiantes = data;
      this.dataSource = new MatTableDataSource(this.estudiantes);
    }, (error) => {
      console.log(error);
    });

    this.formularioService.obtenersoloempleados().subscribe((data: Soloempleados[]) => {
      this.empleados = data;
      this.dataSource2 = new MatTableDataSource<Soloempleados>(data);
    }, (error) => {
      console.log(error);
    });

    this.formularioService.obtenersolovisitantes().subscribe((data: Solovisitantes[]) => {
      this.visitantes = data;
      this.dataSource3 = new MatTableDataSource(this.visitantes);
    }, (error) => {
      console.log(error);
    });

    this.formularioService.obtenersoloprosenes().subscribe((data: Soloprosenes[]) => {
      this.prosenes = data;
      this.dataSource4 = new MatTableDataSource(this.prosenes);
    }, (error) => {
      console.log(error);
    });


    // CON ESTE SERVICIOSE OBTENIAN TODOS LOS PACIENTES
    // this.formularioService.obtenerPacientes().subscribe((data: Paciente[]) => {
    //   this.pacientes = data;
    //   console.log(this.pacientes)
    // }, (error) => {
    //   console.log(error);
    // });
  }

  

 




  columnasProsenes: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'correo_electronico'];
  columnasVisitantes: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'correo_electronico'];
  columnasEmpleados: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'correo_electronico'];
  columnasEstudiantes: string[] = ['id_paciente', 'nombre_completo', 'numero_cuenta', 'numero_identidad', 'correo_electronico'];



 
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChildren(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChildren(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // if (this.paginator && this.sort) {
    //   this.applyFilter('');
    // }
  }


  // esto sirve para hacer las busquedas
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
    
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource2.paginator = this.paginator;

    this.dataSource3.filter = filterValue.trim().toLowerCase();
    this.dataSource3.paginator = this.paginator;

    this.dataSource4.filter = filterValue.trim().toLowerCase();
    this.dataSource4.paginator = this.paginator;
  }

 


  filtroCitas(filterValue: string) {
    this.dataSourceCitas.filter = filterValue.trim().toLowerCase();
    this.dataSourceCitas.paginator = this.paginator;
  }


  ngOnInit(): void {

this.dataSource2 = new MatTableDataSource(this.empleados);
this.dataSource2.paginator = this.paginator;
this.dataSource2.sort = this.sort;
this.setDataSourceAttributes(); 

  }

//   ngAfterViewInit() {
//     this.dataSource2.paginator = this.paginator
//     this.dataSource2 = new MatTableDataSource(this.empleados);
// this.dataSource2.sort = this.sort;
// }

  formulario() {

    this.formularioService.esAlumno = false;

    this.router.navigate(['clínicaunahtec/formulario']);
  }


  cargarGraficas(){

    this.pacienteService.obtenerEstadisticasPacientes().subscribe((data:any)=>{

      this.single = [
        {
          "name": "Estudiantes",
          "value": data.estudiantes
        },
        {
          "name": "Empleados",
          "value": data.empleados
        },
        {
          "name": "Prosene",
          "value": data.prosenes
        },
    
        {
            "name": "Visitantes",
            "value": data.visitantes
          }
      ];
      
    });

  }

  cargarCitas() {

    this.pacienteService.obtenerCitas().subscribe((data: Cita[]) => {

      this.dataSourceCitas = new MatTableDataSource(data);

    });
  }

  verCitas() {

    if (!this.mostrarCitas) {

      this.cargarCitas();

      this.mostrarCitas = true;


    } else {
      this.mostrarCitas = false;
    }

  }

  verChat(){

    this.router.navigate(['clínicaunahtec/chat']);
    
  }

}
