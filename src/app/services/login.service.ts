import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  constructor(private httpClient :HttpClient) { }

}
