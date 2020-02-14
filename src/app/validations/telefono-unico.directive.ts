import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[telefonoUnico]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: TelefonoUnicoDirective, multi: true }]
})
export class TelefonoUnicoDirective implements AsyncValidator {

  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const telefono = control.value;

    return this.FormularioService.obtenerColumnaTelefono(telefono).pipe(
      map((valor: any) => {

        if (valor && valor.numero_telefono == telefono) {
          return { telefonoUnico: true };

        } else

          return null;
          
      })
    );
  }

}

@Injectable({ providedIn: 'root' })
export class TelefonoUnicoService implements AsyncValidator {
  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const telefonoUnicoDirective = new TelefonoUnicoDirective(this.FormularioService);

    return telefonoUnicoDirective.validate(control);
  
  }

}
