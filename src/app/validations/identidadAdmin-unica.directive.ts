import { Directive, Injectable, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';
import { InventariosService } from '../services/inventarios.service';
import { PacienteService } from '../services/paciente.service';
import * as moment from 'moment';

@Directive({
  selector: '[identidadAdminUnica]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: IdentidadAdminUnicaDirective, multi: true }]
})
export class IdentidadAdminUnicaDirective implements AsyncValidator {

  constructor(private InventariosService: InventariosService, private servicio:PacienteService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    sihay:Boolean;
    const identidad = control.value;
    

    return this.InventariosService.obtenerColumnaIdentidadAdmin().pipe(
      map((valor: any) => {
          console.log(valor);

          for (let index = 0; index < valor.length; index++) {
            if (valor[index].identidad == identidad) {
                return {identidadAdminUnica:true};

             }
            }
        
            
             
          

       }

      )
    );
  }
  

  

}

@Injectable({ providedIn: 'root' })
export class IdentidadAdminUnicaService implements AsyncValidator {
  constructor(private FormularioService: InventariosService,private servicio:PacienteService ) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const identidadUnicaDirective = new IdentidadAdminUnicaDirective(this.FormularioService, this.servicio);
    
    return identidadUnicaDirective.validate(control);
  
  }

}
