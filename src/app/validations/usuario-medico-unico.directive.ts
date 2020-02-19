import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { MedicosService } from '../services/medicos.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[usuarioMedicoUnico]',
  providers: [{  provide: NG_ASYNC_VALIDATORS, useExisting: UsuarioMedicoUnicoDirective, multi: true }]
})
export class UsuarioMedicoUnicoDirective implements AsyncValidator{

  constructor( private medicosService: MedicosService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const usuarioMedico = control.value;
    return this.medicosService.obtenerColumnaUsuarioMedicos(usuarioMedico).pipe(
      map((valor:any)=>{
        
        if(valor && valor.usuarioM == usuarioMedico){
          return {usuarioMedicoUnico: true};
        }else
          return null;
      })
    );
  }


  

}


@Injectable({providedIn: 'root'})
export class UsuarioMedicoUnicoService implements AsyncValidator  {
 constructor(private medicosService: MedicosService) { }

 validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors>
 {
   const usuarioMedicoUnicoDirective = new UsuarioMedicoUnicoDirective(this.medicosService);
    return usuarioMedicoUnicoDirective.validate(control);
 }
}
