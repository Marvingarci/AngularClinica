import { Directive, Injectable} from '@angular/core';
import { AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[correoUnico]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: CorreoUnicoDirective, multi: true }]
})
export class CorreoUnicoDirective implements AsyncValidator {
  static validate(control: AbstractControl): import("rxjs").Observable<import("@angular/forms").ValidationErrors> | Promise<import("@angular/forms").ValidationErrors> {
    throw new Error("Method not implemented.");
  }

  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    
    const correo = control.value;

    return this.FormularioService.obtenerColumnaCorreo(correo).pipe(
      map((valor: any) => {

        if (valor && valor.correo_electronico == correo) {
          return { correoUnico: true };

        } else

          return null;
          
      })
    );
  }
  

  

}

@Injectable({ providedIn: 'root' })
export class CorreoUnicoService implements AsyncValidator {
  constructor(private FormularioService: FormularioService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {

    const correoUnicoDirective = new CorreoUnicoDirective(this.FormularioService);

    return CorreoUnicoDirective.validate(control);
  
  }

}

