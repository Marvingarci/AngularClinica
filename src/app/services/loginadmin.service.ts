import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Administrador } from '../interfaces/administrador';

@Injectable({
  providedIn: 'root'
})
export class LoginadminService {
  idActualizar: number;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'


  obtenerAdministradores() {

    return this.httpClient.get(this.API_ENDPOINT + '/administradores');

  }


  constructor(private httpClient: HttpClient, LoginAdminService: LoginadminService) { }

  guardarAdministrador(administrador: Administrador) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + '/administradores', administrador, { headers: headers });
  }

  put(administrador: Administrador) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + '/administradores/' + administrador.id_administrador, administrador, { headers: headers });
  }
  delete(id) {
    return this.httpClient.delete(this.API_ENDPOINT + '/administradores/' + id);
  }

  obtenerColumnaUsuarioAdmin(usuario) {
    return this.httpClient.get(this.API_ENDPOINT + '/obtenerColumnaUsuarioAdmin/' + usuario);
  }

  obtenerAdministrador(id){

    return this.httpClient.get(this.API_ENDPOINT + '/obtenerAdministrador/' + id);
    
  }

}
