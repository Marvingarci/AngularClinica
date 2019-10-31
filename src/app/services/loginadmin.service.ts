import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginAdmin } from '../interfaces/login_admin';

@Injectable({
  providedIn: 'root'
})
export class LoginadminService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  getAdmin(){
    return this.httpClient.get(this.API_ENDPOINT+'/login_admin');
  }
 
  
 

  constructor(private httpClient :HttpClient,LoginAdminService: LoginadminService) {}

    saveloginadmin(login_admin:LoginAdmin){
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      return this.httpClient.post(this.API_ENDPOINT+'/login_admin',login_admin,{headers:headers});
    }
   
}
