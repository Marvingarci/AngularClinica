import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { PdfMakeWrapper, Txt, Canvas, Line } from 'pdfmake-wrapper';
import { Paciente } from '../interfaces/paciente';
import { MatDialog } from '@angular/material';
import { PacienteService } from '../services/paciente.service';
import { Cita } from '../interfaces/cita';
import { single } from './data';



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
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Número de pacientes';

  colorScheme = {
    domain: ['#ffd900be', 'rgb(255, 238, 0)', '#F6F94D', 'rgb(245, 240, 175)']
  };

  onSelect(event) {
    console.log(event);
  }

  pacientes: Paciente[];
  alumnos: Paciente[];
  empleados: Paciente[];
  visitantes: Paciente[];
  prosene: Paciente[];

  dataSource: any;
  dataSource2: any;
  dataSource3: any;
  dataSource4: any;
  dataSourceCitas: any;

  columnasTablaCitas = ['numero_cita', 'paciente', 'fecha', 'hora'];

  mostrarCitas: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;




  loading: boolean;
  constructor(private formularioService: FormularioService,
    private pacienteService: PacienteService,
    private httpClient: HttpClient,
    private router: Router,
    public dialogo: MatDialog) {

    // Object.assign(this, { single })

    this.cargarGraficas();
    


    this.getPacientes();
    this.loading = false;
    this.formularioService.esAlumno = true;
  }




  getPacientes() {
    this.formularioService.obtenerPacientes().subscribe((data: Paciente[]) => {
      this.pacientes = data;

      console.log(this.pacientes);
      this.alumnos = this.pacientes.filter(paciente => paciente.categoria === 'Estudiante');
      this.empleados = this.pacientes.filter(paciente => paciente.categoria === 'Empleado');
      this.visitantes = this.pacientes.filter(paciente => paciente.categoria === 'Visitante');
      this.prosene = this.pacientes.filter(paciente => paciente.prosene === 'Si');
      console.log(this.pacientes[0].prosene);

      this.dataSource = new MatTableDataSource(this.alumnos);
      this.dataSource2 = new MatTableDataSource(this.empleados);
      this.dataSource3 = new MatTableDataSource(this.visitantes);
      this.dataSource4 = new MatTableDataSource(this.prosene);


    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }




  displayedColumns: string[] = ['id_paciente', 'nombre_completo', 'numero_identidad', 'sexo'];
  displayedColumns2: string[] = ['id_paciente', 'nombre_completo', 'numero_cuenta', 'numero_identidad', 'sexo'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }


  filtroCitas(filterValue: string) {
    this.dataSourceCitas.filter = filterValue.trim().toLowerCase();
    this.dataSourceCitas.paginator = this.paginator;
  }


  ngOnInit() {

  }


  formulario() {

    this.formularioService.esAlumno = false;

    this.router.navigate(['principal/formulario']);
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
      
      // multi = [
      //   {
      //     "name": "Germany",
      //     "series": [
      //       {
      //         "name": "2010",
      //         "value": 7300000
      //       },
      //       {
      //         "name": "2011",
      //         "value": 8940000
      //       }
      //     ]
      //   },
      
      //   {
      //     "name": "USA",
      //     "series": [
      //       {
      //         "name": "2010",
      //         "value": 7870000
      //       },
      //       {
      //         "name": "2011",
      //         "value": 8270000
      //       }
      //     ]
      //   },
      
      //   {
      //     "name": "France",
      //     "series": [
      //       {
      //         "name": "2010",
      //         "value": 5000002
      //       },
      //       {
      //         "name": "2011",
      //         "value": 5800000
      //       }
      //     ]
      //   }
      // ];
    });
  }

  cargarCitas() {

    this.pacienteService.obtenerCitas().subscribe((data: Cita[]) => {
      console.log(data);



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



    // const dialogRef = this.dialogo.open(DialogoVerCitasComponent, {
    //   // disableClose: true,
    //   height: '400px',
    //   width: '600px',


    // });

    // dialogRef.afterClosed().subscribe(confirmacion => {});
  }

}
