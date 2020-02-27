import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdministradorGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {

    console.log('datos usuario: \n'+this.loginService.datosUsuario.id_administrador);
    
   }


  canActivate(){

    if (this.loginService.datosUsuario.id_administrador || this.loginService.datosUsuario.id_medico) {


      return true;

    } else {

      this.router.navigate(['/']);
      return false;
    }

  }



}


