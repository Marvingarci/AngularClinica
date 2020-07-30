import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPacienteGuard implements CanActivate {

  rol: any
  constructor(private router: Router, private loginService: LoginService) {}
 

  canActivate(): Promise<boolean> {

    return new Promise((resolve: Function, reject: Function) => {

      this.loginService.getCurrentUser({ "token": localStorage.getItem("token") }).subscribe((data: any) => {

        if (data.rol == "Paciente") {

          resolve(true);

        } else {

          reject(false);
          this.router.navigate(['/']);


        }

      })

    });



  }

  

}
