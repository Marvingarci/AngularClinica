import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InventariosService } from '../services/inventarios.service';
import { HistoriaSubsiguiente } from '../interfaces/historia_subsiguiente';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//importaciones graficas
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { runInThisContext } from 'vm';
import { PacienteService } from '../services/paciente.service';


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

//////////////codigos para la grafica

  singleedad: any[];
  singlesexo: any[]; 
  // options edades
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Rango de edades';
  colorScheme = {
    domain: ['#ffd900be', 'rgb(255, 238, 0)', '#F6F94D', 'rgb(245, 240, 175)']
  };

// options sexo
  showXAxissexo = true;
  showYAxissexo = true;
  gradientsexo = true;
  showLegendsexo = true;
  showXAxisLabelsexo = true;
  xAxisLabelsexo = '';
  showYAxisLabelsexo = true;
  yAxisLabelsexo = 'Rango de edades';
  colorSchemesexo = {
    domain: ['#ffd900be', 'rgb(245, 240, 175)']
  };


  

elemetos: elementos[]=[
    {sexo: '', masculino: 0, femenino: 0}
  ];




  
  constructor(private pacienteService: PacienteService) {
    this.pacienteService.obtenerHistoriasSubsiguientes().subscribe((data: HistoriaSubsiguiente[])=>{    
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
   
      this.singleedad = [
        {
          "name": "menos 19",
          "value": this.menos19
        },
        {
          "name": "rango 1",
          "value": this.veinte
        },
        {
          "name": "rango 2",
          "value": this.veintecinco
        },
    
        {
            "name": "rango 3",
            "value": this.treinta
          }
      ]; 
      
      this.singlesexo = [
         {
          "name": "Mujeres",
          "value": this.mujeres
        },
         {
          "name": "Hombres",
          "value": this.hombres
        }      
      ]; 

    }, (error)=>{
      
      console.log(error);
    });
   }//fin constructor

  dataSource:any;
  dataSource1: any;  

  displayedColumns: string[] = ['sexo','m', 'f', 'total'];
  displayedColumns1: string[] = ['sexo','m', 'f', 'total', 'total2'];

  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }

ngOnInit() { }

}