import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginAdmin } from '../interfaces/login_admin';

@Injectable({
  providedIn: 'root'
})
export class LoginadminService {
  idActualizar: number;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  
  getAdmin(){
    return this.httpClient.get(this.API_ENDPOINT+'/administradores');
  }
 

  constructor(private httpClient :HttpClient,LoginAdminService: LoginadminService) {}

    saveloginadmin(login_admin:LoginAdmin){
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      return this.httpClient.post(this.API_ENDPOINT+'/administradores',login_admin,{headers:headers});
    }

    put(login_admin:LoginAdmin){
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      return this.httpClient.put(this.API_ENDPOINT+'/administradores/'+login_admin.id,login_admin,{headers:headers});
    }
    delete(id){      
    return this.httpClient.delete(this.API_ENDPOINT+'/administradores/'+id);
    }

   obtenerColumnaUsuario(usuario_admin) {
      return this.httpClient.get(this.API_ENDPOINT + 'obtenerColumnaUsuario/' + usuario_admin);
    }
   
}
