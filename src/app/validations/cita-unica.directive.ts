import { Directive, Injectable, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';
import { InventariosService } from '../services/inventarios.service';
import { PacienteService } from '../services/paciente.service';
import * as moment from 'moment';

@Directive({
  selector: '[citaUnica]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: CitaUnicaDirective, multi: true }]
})
export class CitaUnicaDirective implements AsyncValidator {

  constructor(private InventariosService: InventariosService, private servicio:PacienteService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    sihay:Boolean;
    const identidad = moment(control.value).format("YYYY-MM-DD");
    
    var id_paciente = this.servicio.id_historia_subsiguiente;
    //this.InventariosService.fechafutura = identidad;

    return this.InventariosService.obtenerFechasCitas(id_paciente).pipe(
      map((valor: any) => {
        console.log(valor);
        console.log(identidad);
        var cita:Boolean=null;
        this.InventariosService.fechafutura = identidad;

       for (let index = 0; index < valor.length; index++) {
        if (valor[index].fecha == identidad) {
            return {citaUnica:true};
         }
        }     
          

       }

      )
    );
  }
  

  

}

@Injectable({ providedIn: 'root' })
export class CitaUnicaService implements AsyncValidator {
  constructor(private FormularioService: InventariosService,private servicio:PacienteService ) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const identidadUnicaDirective = new CitaUnicaDirective(this.FormularioService, this.servicio);
    
    return identidadUnicaDirective.validate(control);
  
  }

}
