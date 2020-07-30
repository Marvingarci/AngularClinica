import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthAdministradorGuard implements CanActivate {

  puedePasar: boolean

  constructor(private router: Router, private loginService: LoginService) {


  }


  canActivate(): Promise<boolean> {

    return new Promise((resolve: Function, reject: Function) => {

      this.loginService.getCurrentUser({ "token": localStorage.getItem("token") }).subscribe((data: any) => {

        if (data.rol == "Administrador" || data.rol == "Medico") {

          resolve(true);

        } else {

          reject(false);
          this.router.navigate(['/']);


        }

      })

    });



  }




}


