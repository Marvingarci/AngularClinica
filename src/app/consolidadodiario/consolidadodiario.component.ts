import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoriaSubsiguiente } from '../interfaces/historia_subsiguiente';
//importaciones graficas
import { PacienteService } from '../services/paciente.service';


export interface elementos {
  sexo: string;
  masculino: number;
  femenino: number;
}
export interface edades {
  menos19: number;
  primerRango: number;
  segundoRango: number;
  tercerRango: number;
  cuartoRango: number;
  quintoRango: number;
}
export interface carrera {
  nombre: any;
  numeroDeAlumni: any;
}



@Component({
  selector: 'app-consolidadodiario',
  templateUrl: './consolidadodiario.component.html',
  styleUrls: ['./consolidadodiario.component.css']
})
export class ConsolidadodiarioComponent implements OnInit {

  datos: any;
  hombres: number = 0;
  mujeres: number = 0;
  menos19: number = 0;
  veinte: number = 0;
  veintecinco: number = 0;
  treinta: number = 0;
  edad: edades[] = [
    { menos19: 0, primerRango: 0, segundoRango: 0, tercerRango: 0, cuartoRango: 0, quintoRango: 0 }
  ];
  carreras: carrera[];

  //////////////codigos para la grafica

  singleedad: any[];
  singlesexo: any[];
  // options edades
  showXAxisedad = true;
  showYAxisedad = true;
  gradientedad = true;
  showLegendedad = true;
  showXAxisLabeledad = true;
  xAxisLabeledad = '';
  showYAxisLabeledad = true;
  yAxisLabeledad = 'Número de pacientes';
  colorSchemeedad = {
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
  yAxisLabelsexo = 'Número de pacientes';
  colorSchemesexo = {
    domain: ['#ffd900be', 'rgb(245, 240, 175)']
  };




  elemetos: elementos[] = [
    { sexo: '', masculino: 0, femenino: 0 }
  ];





  constructor(private pacienteService: PacienteService) {
    this.pacienteService.obtenerHistoriasSubsiguientes().subscribe((data: HistoriaSubsiguiente[]) => {
      this.datos = data;

      for (let index = 0; index < this.datos.length; index++) {
        if (this.datos[index].sexo == "Hombre") {
          this.hombres += 1;
        } else {
          this.mujeres += 1;
        }


        switch (true) {
          case this.datos[index].edad <= 19:
            this.menos19 += 1;
            break;
          case (this.datos[index].edad > 19 && this.datos[index].edad <= 25):
            this.veinte += 1;
            break;
          case this.datos[index].edad > 25 && this.datos[index].edad <= 30:
            this.veintecinco += 1;
            break;
          case this.datos[index].edad > 30:
            this.treinta += 1;
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
      this.edad[0].cuartoRango = this.menos19 + this.veintecinco + this.veinte + this.treinta;


      this.singleedad = [
        {
          "name": "Menor de 19 Años",
          "value": this.menos19
        },
        {
          "name": "Entre 20-24 años",
          "value": this.veinte
        },
        {
          "name": "Entre 25-29 años",
          "value": this.veintecinco
        },

        {
          "name": "Mayor de 30 años",
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

    }, (error) => {

      console.log(error);
    });
  }//fin constructor


  ngOnInit() { }

}