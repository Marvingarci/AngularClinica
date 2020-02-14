import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { LoginadminService } from '../services/loginadmin.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[usernameUnico]',
  providers: [{  provide: NG_ASYNC_VALIDATORS, useExisting: UsernameUnicoDirective, multi: true }]
})
export class UsernameUnicoDirective implements AsyncValidator {

  constructor(private LoginAdminService: LoginadminService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const username = control.value;
    return this.LoginAdminService.obtenerColumnaUsuario(username).pipe(
      map((valor:any)=>{

        console.log(valor);
        if(valor && valor.usuario_admin == username){
          console.log('Esto esta bien');
          return {usernameUnico: true};
        }else
          return null;
      })
    );
  }
  

  

}


@Injectable({providedIn: 'root'})
export class UsuarioUnicoService implements AsyncValidator  {
 constructor(private LoginAdminService: LoginadminService) { }

 validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors>
 {
   const usernameUnicoDirective = new UsernameUnicoDirective(this.LoginAdminService);
    return usernameUnicoDirective.validate(control);
 }
}
