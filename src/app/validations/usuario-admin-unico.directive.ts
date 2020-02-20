import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { LoginadminService } from '../services/loginadmin.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[usuarioAdminUnico]',
  providers: [{  provide: NG_ASYNC_VALIDATORS, useExisting: UsuarioAdminUnicoDirective, multi: true }]
})
export class UsuarioAdminUnicoDirective implements AsyncValidator {

  constructor(private LoginAdminService: LoginadminService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const usuarioAdmin = control.value;
    return this.LoginAdminService.obtenerColumnaUsuarioAdmin(usuarioAdmin).pipe(
      map((valor:any)=>{
        
        if(valor && valor.usuario == usuarioAdmin){
        
          return {usuarioAdminUnico: true};
        }else
          return null;
      })
    );
  }
  

  

}


@Injectable({providedIn: 'root'})
export class UsuarioAdminUnicoService implements AsyncValidator  {
 constructor(private LoginAdminService: LoginadminService) { }

 validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors>
 {
   const usuarioAdminUnicoDirective = new UsuarioAdminUnicoDirective(this.LoginAdminService);
    return usuarioAdminUnicoDirective.validate(control);
 }
}
