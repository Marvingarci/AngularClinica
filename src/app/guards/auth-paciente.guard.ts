import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPacienteGuard implements CanActivate {

  rol: any
  constructor(private router: Router) {}
 

  canActivate() {


    if(localStorage.getItem("rol") == "Paciente")

        return true

      
    else{

      this.router.navigate(['/']);
      return false

    }
  

  }

  

}
