import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  constructor(private httpClient :HttpClient) { }
save(login:Usuario){
const headers = new HttpHeaders({'Content-Type':'application/json'});
return this.httpClient.post(this.API_ENDPOINT + '/usuarios',login,{headers:headers});
}
}
