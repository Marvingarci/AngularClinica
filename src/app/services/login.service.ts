import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { FormularioService } from "../services/formulario.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api/'
  constructor(private httpClient :HttpClient, formularioService: FormularioService) {}

  guardarDatos(login: Login){
    
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
    
    return this.httpClient.post(this.API_ENDPOINT + 'login', login, {headers: headers});
    
  
  }

}
