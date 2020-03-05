import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[identidadUnica]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: IdentidadUnicaDirective, multi: true }]
})
export class IdentidadUnicaDirective implements AsyncValidator {

  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    
    const identidad = control.value;

    return this.FormularioService.obtenerColumnaIdentidad(identidad).pipe(
      map((valor: any) => {

        if (valor && valor.numero_identidad == identidad) {
          return { identidadUnica: true };

        } else

          return null;
          
      })
    );
  }
  

  

}

@Injectable({ providedIn: 'root' })
export class IdentidadUnicoService implements AsyncValidator {
  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const identidadUnicaDirective = new IdentidadUnicaDirective(this.FormularioService);

    return identidadUnicaDirective.validate(control);
  
  }

}
