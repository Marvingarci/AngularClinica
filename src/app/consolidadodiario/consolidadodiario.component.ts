import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { InventariosService } from '../services/inventarios.service';
import { Cita } from '../interfaces/Cita';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  elemetos: elementos[]=[
    {sexo: '', masculino: 0, femenino: 0}
  ];


  
  constructor(private inventario: InventariosService) {
    this.inventario.obtenerTodasCita().subscribe((data: Cita[])=>{
   
    this.datos=data;

    for (let index = 0; index < this.datos.length; index++) {
      console.log(this.datos[index].edad);
      if (this.datos[index].sexo == "Hombre") {
        this.hombres += 1;
      }else{
        this.mujeres+=1;
      }
      switch (true) {
        case this.datos[index].edad < 19:
          this.menos19+=1;
          break;
        case this.datos[index].edad >20 || this.datos[index].edad <25:
          this.veinte+=1;
          console.log('se agrego');
          break;
        case this.datos[index].edad >25 || this.datos[index].edad <30:
          this.veintecinco+=1;
          break;
          case this.datos[index].edad >=30:
            this.treinta+=1;
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

      this.dataSource1 = new MatTableDataSource(this.edad);
      this.dataSource = new MatTableDataSource(this.elemetos);

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
  }

}
