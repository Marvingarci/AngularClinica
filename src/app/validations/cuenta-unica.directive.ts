import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';


@Directive({
  selector: '[cuentaUnica]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: CuentaUnicaDirective, multi: true }]
})
export class CuentaUnicaDirective implements AsyncValidator {

  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    
    const cuenta = control.value;

    return this.FormularioService.obtenerColumnaNumeroCuenta(cuenta).pipe(
      map((valor: any) => {

        if (valor && valor.numero_cuenta == cuenta) {
          return { cuentaUnica: true };

        } else

          return null;
          
      })
    );
  }
  

  

}

@Injectable({ providedIn: 'root' })
export class CuentaUnicaService implements AsyncValidator {
  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const cuentaUnicaDirective = new CuentaUnicaDirective(this.FormularioService);

    return cuentaUnicaDirective.validate(control);
  
  }

}

