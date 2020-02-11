import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}
  canActivate(){

    if(localStorage.getItem('token')){

      return true;

    }else{

      this.router.navigate(['/']);
      return false;
    }
    
  }
  
}
