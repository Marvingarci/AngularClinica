import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(

    private router: Router,
    private loginService: LoginService

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token: string = localStorage.getItem('token');    


    if (token) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    } else {
      
      this.router.navigateByUrl('/');
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/');
        }

        return throwError(err);

      })
    );
  }

}