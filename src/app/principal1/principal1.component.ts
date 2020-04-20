import { Component, OnInit, NgModule, ViewChild} from '@angular/core';
import { timer, from } from 'rxjs';
import { element } from 'protractor';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MedicosService } from "../services/medicos.service";
import { DatePipe } from '@angular/common';

export var multi = [
  {
    "name": "Visitas",
    "series": [
      {
        "name": "Lunes",
        "value": 62
      },
      {
        "name": "Martes",
        "value": 73
      },
      {
        "name": "Miercoles",
        "value": 10
      },
      {
          "name": "Jueves",
          "value": 120
        },
        {
          "name": "Viernes",
          "value": 46
        }
    ]
  }
];
@Component({
  selector: 'app-principal1',
  templateUrl: './principal1.component.html',
  styleUrls: ['./principal1.component.css'],
  providers: [DatePipe]
})
export class Principal1Component implements OnInit {

  /////variables
  totalPacientes: number = 0;
  totalRemitidos: number=0;
  totalCitasHoy: any={
    id_cita: null,
    paciente: null,
    fecha: null,
    hora: null
  };
  totalHistorias:number=0;
  fechas:any={
    Lunes: 0,
    Martes: 0,
    Miercoles: 0,
    Jueves: 0,
    Viernes: 0
  }

//////
 

  ////////////Primer Grafico puto
  multi: any[];
  view: any[] = [0, 0];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Días';
  yAxisLabel: string = 'Número de Pacientes';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

////traer datos


////////////segungo Grafico puto
multi2: any[];
view2: any[] = [0, 0];

// options
legend2: boolean = true;
showLabels2: boolean = true;
animations2: boolean = true;
xAxis2: boolean = true;
yAxis2: boolean = true;
showYAxisLabel2: boolean = true;
showXAxisLabel2: boolean = true;
xAxisLabel2: string = 'Dias';
yAxisLabel2: string = 'Numero de pacientes';
timeline2: boolean = true;
//////
myDate = new Date();

colorScheme2 = {
  domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
};

////Aqte aqio
dataSource :any;
  

  constructor( public servicio: MedicosService, private datePipe: DatePipe) { 
    Object.assign(this, { multi });
    this.servicio.totalRemitidos().subscribe( (data: number)=>
      {
        this.totalRemitidos= data;
        
        console.log(data);
        console.log(this.totalRemitidos);
      
      },(error) => {
      console.log(error);
    });;
    this.servicio.cantidadPacientesTotal().subscribe( data=>
      {
        this.totalPacientes= data[0].CantidadTotal;
        
        console.log(data);
        console.log(this.totalPacientes);
      
      },(error) => {
      console.log(error);
    });;
    this.servicio.cantidadHistoriasTotal().subscribe( (data: number)=>
      {
        this.totalHistorias= data;
        
        console.log(data);
        console.log(this.totalHistorias);
      
      },(error) => {
      console.log(error);
    });;
    this.servicio.citasHoy().subscribe( data=>
      {
        this.totalCitasHoy= data;
        this.dataSource = new MatTableDataSource(this.totalCitasHoy);

        
        console.log(data);
        console.log(this.totalCitasHoy);
      
      },(error) => {
      console.log(error);
    });
    this.servicio.getpacientesPorDia().subscribe( data=>
      {
        this.fechas= data;
        console.log(this.fechas);
        console.log(data);
         
        this.multi = [
          {
            "name": "Visitas",
            "series": [
              {
                "name": "Lunes",
                "value": this.fechas.Lunes
              },
              {
                "name": "Martes",
                "value": this.fechas.Martes
              },
              {
                "name": "Miércoles",
                "value": this.fechas.Miercoles
              },
              {
                  "name": "Jueves",
                  "value":this.fechas.Jueves},
                  
                {
                  "name": "Viernes",
                 "value": this.fechas.Viernes
                }
            ]
          }
        ];
      
      },(error) => {
      console.log(error);
    });


  


  }
  

  solo:any;
  tiempo = timer(1000);
  tiempo2 = timer(2000);
  

  server = this.tiempo.subscribe(val =>{
    this.solo = document.getElementById('imagen').setAttribute("style","opacity:1");
    this.solo = document.getElementById('imagen').classList.add("mostrar");

    
  });
  server2 = this.tiempo2.subscribe(val=>{
    this.solo = document.getElementById('imagen2').setAttribute("style","opacity:1");
    this.solo = document.getElementById('imagen2').classList.add("mostrar");
  });

  
  ngOnInit() {
   // this.dataSource.paginator = this.paginator;

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //tablas

  displayedColumns: string[] = [ 'paciente', 'fecha', 'hora'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //hasta aqui tablas

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Marvin Alejandro Garcia', weight: '10:00 AM', symbol: ''},
  {position: 2, name: 'Melvin Josue Sevilla', weight: '10:30 AM', symbol: ''},
  {position: 3, name: 'Brasly Macandacara', weight: '12:00 AM', symbol: ''},
  {position: 4, name: 'Alejandro Jacob Medina', weight: '4:00 PM', symbol: ''},
  {position: 5, name: 'Alberto Mbapee Culero', weight: '5:00 PM', symbol: ''}
];
