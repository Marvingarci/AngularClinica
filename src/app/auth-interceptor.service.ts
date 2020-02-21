import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token: string;

    //verifico cual es el token que se creo y lo guardo en la variable, para enviarlo en el header
    if (localStorage.getItem('token_paciente')) {

      token = localStorage.getItem('token_paciente');

    } else if (localStorage.getItem('token_administrador')) {

      token = localStorage.getItem('token_administrador');

    } else {

      token = localStorage.getItem('token_medico');

    }

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    } else {
      this.router.navigateByUrl('/');
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/');
        }

        return throwError(err);

      })
    );
  }

}