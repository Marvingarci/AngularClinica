import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadisticas-fisicas-paciente',
  templateUrl: './estadisticas-fisicas-paciente.component.html',
  styleUrls: ['./estadisticas-fisicas-paciente.component.css']
})
export class EstadisticasFisicasPacienteComponent implements OnInit {

  // grafica peso

  datosGraficaPeso: any[];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabelGP = 'Fechas';
  showYAxisLabel = true;
  yAxisLabelGP = 'Peso(kg)';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(event) {
    console.log(event);
  }


  // grafica ritmo cardiaco

  datosGraficaRitmo: any[];

  xAxisLabelGR = 'Fechas';
  yAxisLabelGR = 'Pulsaciones(ppm)';

  // grafica altura

  datosGraficaAltura: any[];

  xAxisLabelGA = 'Fechas';
  yAxisLabelGA = 'Metros(m)';

  //grafica temperatura

  datosGraficaTemperatura: any[];

  xAxisLabelGT = 'Fechas';
  yAxisLabelGT = 'grados(°C)';


  //grafica presion

  // multi: any[];
  datosGraficaPresion: any[];
 
  xAxisLabelGPr: string = 'Fechas';
  yAxisLabelGPr: string = 'Presió arterial(mmHg)';
  legendTitle: string = 'Presiones';


  //selects

  selectPesos: string[] = [];
  selectPulsos: string[] = [];
  selectAlturas: string[] = [];
  selectTemperaturas: string[] = [];
  selectPresiones: string[] = [];


  id: any;

  constructor(private pacienteService: PacienteService, private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.params['id'];


    this.cargarTodasGraficas();
    this.cargarSelectPesos();
    this.cargarSelectPulsos();
    this.cargarSelectAlturas();
    this.cargarSelectTemperaturas();
    this.cargarSelectPresiones();

   }

  ngOnInit() {
  }

  cargarTodasGraficas(){

    this.cargarGraficaPeso();
    this.cargarGraficaRitmo();
    this.cargarGraficaAltura();
    this.cargarGraficaTemperatura();
    this.cargarGraficaPresion();

  }


  cargarGraficaPeso() {

    var arreglo: any[] = [];
    this.pacienteService.obtenerPesosPaciente(this.id).subscribe((data: any) => {

      data.forEach(element => {

        arreglo.push(
          {
            "name": element.fecha,
            "value": element.peso
          }

        );

      });


      this.datosGraficaPeso = arreglo;


    })
  }

  cargarGraficaPesoConParametros(pesos: any[]) {

    var arreglo: any[] = [];

    pesos.forEach(element => {

      arreglo.push(
        {
          "name": element.fecha,
          "value": element.peso
        }

      );

    });


    this.datosGraficaPeso = arreglo;



  }


  cargarSelectPesos() {


    this.pacienteService.obtenerTodosPesosPaciente(this.id).subscribe((data: any) => {

      this.pacienteService.pesosPaciente = data;

      data.forEach(element => {

        this.selectPesos.push(element.fecha);

      });


    }, (error) => {
      console.log(error)
    });

  }


  cambioPeso(valor) {

    console.log(this.pacienteService.pesosPaciente);
    var resultado: any;
    var arreglo: any[] = [];

    if(valor.length != 0){

      valor.forEach(element => {

        resultado = this.pacienteService.pesosPaciente.find( peso => peso.fecha === element );
        arreglo.push(resultado);
  
        
      });
  
      this.cargarGraficaPesoConParametros(arreglo);

    }else{

      this.cargarGraficaPeso();
    }

  

  }


  cargarGraficaRitmo() {

    var arreglo: any[] = [];
    this.pacienteService.obtenerPulsosPaciente(this.id).subscribe((data: any) => {

      data.forEach(element => {

        arreglo.push(
          {
            "name": element.fecha,
            "value": element.pulso
          }

        );

      });


      this.datosGraficaRitmo = arreglo;


    })
  }

  cargarGraficaRitmoConParametros(pulsos: any[]) {

    var arreglo: any[] = [];

    pulsos.forEach(element => {

      arreglo.push(
        {
          "name": element.fecha,
          "value": element.pulso
        }

      );

    });


    this.datosGraficaRitmo = arreglo;

  }

  cargarSelectPulsos() {


    this.pacienteService.obtenerTodosPulsosPaciente(this.id).subscribe((data: any) => {

      this.pacienteService.pulsosPaciente = data;

      data.forEach(element => {

        this.selectPulsos.push(element.fecha);

      });


    }, (error) => {
      console.log(error)
    });

  }


  cambioRitmo(valor) {

    console.log(this.pacienteService.pulsosPaciente);
    var resultado: any;
    var arreglo: any[] = [];

    if(valor.length != 0){

      valor.forEach(element => {

        resultado = this.pacienteService.pulsosPaciente.find( pulso => pulso.fecha === element );
        arreglo.push(resultado);
  
        
      });
  
      this.cargarGraficaRitmoConParametros(arreglo);

    }else{

      this.cargarGraficaRitmo();
    }

  

  }


  cargarGraficaTemperatura() {

    var arreglo: any[] = [];
    this.pacienteService.obtenerTemperaturasPaciente(this.id).subscribe((data: any) => {

      data.forEach(element => {

        arreglo.push(
          {
            "name": element.fecha,
            "value": element.temperatura
          }

        );

      });


      this.datosGraficaTemperatura = arreglo;


    })
  }

  cargarGraficaTemperaturaConParametros(temperaturas: any[]) {

    var arreglo: any[] = [];

    temperaturas.forEach(element => {

      arreglo.push(
        {
          "name": element.fecha,
          "value": element.temperatura
        }

      );

    });


    this.datosGraficaTemperatura = arreglo;

  }

  cargarSelectTemperaturas() {


    this.pacienteService.obtenerTodasTemperaturasPaciente(this.id).subscribe((data: any) => {

      this.pacienteService.temperaturasPaciente = data;

      data.forEach(element => {

        this.selectTemperaturas.push(element.fecha);

      });


    }, (error) => {
      console.log(error)
    });

  }


  cambioTemperatura(valor) {

    console.log(this.pacienteService.temperaturasPaciente);
    var resultado: any;
    var arreglo: any[] = [];

    if(valor.length != 0){

      valor.forEach(element => {

        resultado = this.pacienteService.temperaturasPaciente.find( temperatura => temperatura.fecha === element );
        arreglo.push(resultado);
  
        
      });
  
      this.cargarGraficaTemperaturaConParametros(arreglo);

    }else{

      this.cargarGraficaTemperatura();
    }

  

  }

  cargarGraficaAltura() {

    var arreglo: any[] = [];
    this.pacienteService.obtenerAlturasPaciente(this.id).subscribe((data: any) => {

      data.forEach(element => {

        arreglo.push(
          {
            "name": element.fecha,
            "value": element.talla
          }

        );

      });


      this.datosGraficaAltura = arreglo;


    })
  }

  cargarGraficaAlturaConParametros(alturas: any[]) {

    var arreglo: any[] = [];

    alturas.forEach(element => {

      arreglo.push(
        {
          "name": element.fecha,
          "value": element.talla
        }

      );

    });


    this.datosGraficaAltura = arreglo;

  }

  cargarSelectAlturas() {


    this.pacienteService.obtenerTodasAlturasPaciente(this.id).subscribe((data: any) => {

      this.pacienteService.alturasPaciente = data;

      data.forEach(element => {

        this.selectAlturas.push(element.fecha);

      });


    }, (error) => {
      console.log(error)
    });

  }


  cambioAltura(valor) {

    console.log(this.pacienteService.alturasPaciente);
    var resultado: any;
    var arreglo: any[] = [];

    if(valor.length != 0){

      valor.forEach(element => {

        resultado = this.pacienteService.alturasPaciente.find( talla => talla.fecha === element );
        arreglo.push(resultado);
  
        
      });
  
      this.cargarGraficaAlturaConParametros(arreglo);

    }else{

      this.cargarGraficaAltura();
    }

  

  }

  cargarGraficaPresion() {

    var arreglo: any[] = [];
    this.pacienteService.obtenerPresionesPaciente(this.id).subscribe((data: any) => {

      data.forEach(element => {

        arreglo.push(
          {
            "name": element.fecha,
            "series": [
              {
                "name": "Sistólica",
                "value": element.presion_sistolica
              },
              {
                "name": "Diastólica",
                "value": element.presion_diastolica
              }
            ]
          },

        );

      });

      this.datosGraficaPresion = arreglo;


    })
  }

  cargarGraficaPresionConParametros(presiones: any[]) {

    var arreglo: any[] = [];

    presiones.forEach(element => {

      arreglo.push(
        {
          "name": element.fecha,
          "series": [
            {
              "name": "Sistólica",
              "value": element.presion_sistolica
            },
            {
              "name": "Diastólica",
              "value": element.presion_diastolica
            }
          ]
        },

      );

    });


    this.datosGraficaPresion = arreglo;

  }

  cargarSelectPresiones() {


    this.pacienteService.obtenerTodasPresionesPaciente(this.id).subscribe((data: any) => {

      this.pacienteService.presionesPaciente = data;

      data.forEach(element => {

        this.selectPresiones.push(element.fecha);

      });


    }, (error) => {
      console.log(error)
    });

  }


  cambioPresion(valor) {

    console.log(this.pacienteService.presionesPaciente);
    var resultado: any;
    var arreglo: any[] = [];

    if(valor.length != 0){

      valor.forEach(element => {

        resultado = this.pacienteService.presionesPaciente.find( presion => presion.fecha === element );
        arreglo.push(resultado);
  
        
      });
  
      this.cargarGraficaPresionConParametros(arreglo);

    }else{

      this.cargarGraficaPresion();
    }

  

  }

}
