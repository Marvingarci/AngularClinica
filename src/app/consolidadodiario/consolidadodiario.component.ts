import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InventariosService } from '../services/inventarios.service';
import { Cita } from '../interfaces/Cita';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//importaciones graficas
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { runInThisContext } from 'vm';


export interface elementos{
  sexo:string;
  masculino: number;
  femenino: number;
}
export interface edades{
  menos19: number;
  primerRango:number;
  segundoRango:number;
  tercerRango: number;
  cuartoRango: number;
  quintoRango: number;
}
export interface carrera{
  nombre: any;
  numeroDeAlumni: any;
}

@Component({
  selector: 'app-consolidadodiario',
  templateUrl: './consolidadodiario.component.html',
  styleUrls: ['./consolidadodiario.component.css']
})
export class ConsolidadodiarioComponent implements OnInit {
  @ViewChild("baseChart", {static: false}) chart: BaseChartDirective;
  @ViewChild("baseChart1", {static: false}) chart2: BaseChartDirective;
  
  datos:any;
  hombres: number =0;
  mujeres: number =0;
  menos19 : number=0;
  veinte:number=0;
  veintecinco: number=0;
  treinta: number=0;
  edad: edades[]=[
    {menos19:0, primerRango:0, segundoRango:0, tercerRango:0, cuartoRango:0, quintoRango:0}
  ];
  carreras: carrera[];

  //Codigo linea///////////////////////////////////////////////////////////////////////////////////////////
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Hombres' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Mujer' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart1: BaseChartDirective;

  /*public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
  */

  //HASta AQUI

  //Graficos Barra perrrones/////////////////////////////////////////////////////////////////////////////////////////////////
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Sexo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [0, 8, 0], label: 'Hombres' },
    { data: [0 , 0, 0], label: 'Mujeres' },
    //{ data: [0],  label: ''}

  ];

  // eventos
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

  public seter(){
    if(this.chart != undefined){
      this.chart1.chart.destroy();
      this.chart2.chart.destroy();
      
    //Asignacion sexo
    this.barChartData[0].data[0] = this.elemetos[0].masculino;
    this.barChartData[0].data[1] = this.elemetos[0].masculino+1;
    this.barChartData[1].data[0] = this.elemetos[0].femenino;
    this.barChartData[1].data[1] = this.elemetos[0].femenino+1;
    //asignacion de edad
    this.barChartData1[0].data[0] = this.edad[0].menos19;
    this.barChartData1[0].data[1] = this.edad[0].menos19+1;
    this.barChartData1[1].data[0] = this.edad[0].primerRango;
    this.barChartData1[1].data[1] = this.edad[0].primerRango+1;
    this.barChartData1[2].data[0] = this.edad[0].segundoRango;
    this.barChartData1[2].data[1] = this.edad[0].segundoRango+1;
    this.barChartData1[3].data[0] = this.edad[0].tercerRango;
    this.barChartData1[3].data[1] = this.edad[0].tercerRango+1;

    this.chart1.ngOnInit();
    this.chart2.ngOnInit();
    
  }
    
  }
  reloadChart() {
    if (this.chart !== undefined) {
       this.chart.chart.destroy();
       //this.chart.chart = '0';

       //this.chart.datasets = this.datasets;
       //this.chart.labels = this.labels;
       this.chart.ngOnInit();
    }
}

  //Segunda grafica edad//////////////////////////////////////////////////////////////
  public barChartOptions1: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels1: Label[] = ['Sexo'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartPlugins1 = [pluginDataLabels];

  public barChartData1: ChartDataSets[] = [
    { data: [0,0,0], label: '<19' },
    { data: [0,0,0], label: '20-24' },
    { data: [0,0,0], label: '25-30' },
    { data: [0,0,0], label: '>30' }
  ];

  
  


//Hasta aqui graficos barra


  elemetos: elementos[]=[
    {sexo: '', masculino: 0, femenino: 0}
  ];


  
  constructor(private inventario: InventariosService) {
    this.inventario.obtenerTodasCita().subscribe((data: Cita[])=>{
      this.seter();

    this.datos=data;

    for (let index = 0; index < this.datos.length; index++) {
      console.log(this.datos[index].edad);
      if (this.datos[index].sexo == "Hombre") {
        this.hombres += 1;
      }else{
        this.mujeres+=1;
      }


      switch (true) {
        case this.datos[index].edad <= 19:
          this.menos19+=1;
          console.log('se agrego a <19');
          break;
        case (this.datos[index].edad >19 && this.datos[index].edad <=25):
          this.veinte+=1;
          console.log('se agrego a 20-25');
          break;
        case this.datos[index].edad >25 && this.datos[index].edad <=30:
          this.veintecinco+=1;
          console.log('se agrego a 25-30');
          break;
          case this.datos[index].edad >30:
            this.treinta+=1;
            console.log('se agrego a >30');
            break;
        default:
          break;
      }

    //  this.carreras[index].nombre == this.datos[index].carrera;
    
     

      
    }
    
    this.elemetos[0].masculino = this.hombres;
    this.elemetos[0].femenino = this.mujeres;

    this.edad[0].menos19 = this.menos19;
    this.edad[0].primerRango = this.veinte;
    this.edad[0].segundoRango = this.veintecinco;
    this.edad[0].tercerRango = this.treinta;
    this.edad[0].cuartoRango = this.menos19 + this.veintecinco +this.veinte + this.treinta;

      console.log(this.datos);
      console.log(this.mujeres);
      console.log(this.hombres);
      console.log(this.edad);
      console.log(this.carreras);
      
      

      this.dataSource1 = new MatTableDataSource(this.edad);
      this.dataSource = new MatTableDataSource(this.elemetos);
      this.seter();


    }, (error)=>{
      
      console.log(error);
    });
   }

  dataSource:any;
  dataSource1: any;
  

  displayedColumns: string[] = ['sexo','m', 'f', 'total'];
  displayedColumns1: string[] = ['sexo','m', 'f', 'total', 'total2'];

  


  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

  ngOnInit() {
    this.seter();
  }


}
