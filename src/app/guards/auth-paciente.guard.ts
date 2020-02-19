import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPacienteGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}
  canActivate(){

    if(localStorage.getItem('token_paciente')){

      return true;

    }else{

      this.router.navigate(['/']);
      return false;
    }
    
  }
  
}
