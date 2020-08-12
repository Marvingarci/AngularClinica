import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[telefonoemergencia]',  
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: TelefonoemergenciaDirective, multi: true }]
})
export class TelefonoemergenciaDirective  implements AsyncValidator {
  

  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const telefono_emergencia = control.value;

    return this.FormularioService.obtenerColumnaTelefonoEmergencia(telefono_emergencia).pipe(

      map((valor: any) => {

        if (valor && valor.emergencia_telefono == telefono_emergencia) {
          return { telefonoemergencia: true };

        } else

          return null;
          
      })
    );
  }

}






@Injectable({ providedIn: 'root' })
export class TelefonoemergenciaService implements AsyncValidator {
  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const telefonoemergenciaDirective = new TelefonoemergenciaDirective(this.FormularioService);

    return telefonoemergenciaDirective.validate(control);
  
  }

}
