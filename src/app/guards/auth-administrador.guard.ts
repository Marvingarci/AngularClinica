import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdministradorGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }


  canActivate(){
    
    if(this.loginService.isAutenticado){

      // if (this.loginService.datosUsuario.rol == 'Administrador'|| this.loginService.datosUsuario.rol == 'Medico') {


        return true;
  
      // } 


    }else {
  
      this.router.navigate(['/']);
      return false;
    }

   

  }



}


