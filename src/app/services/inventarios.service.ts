import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  getInventario(){
    return this.httpClient.get(this.API_ENDPOINT+'/inventarios');
  }

  constructor(private httpClient :HttpClient,invenService: InventariosService) { }
  save(inventario_form:Inventario){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/inventarios',inventario_form,{headers:headers});
  }

  actualizarInventario(inventario){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/inventarios/' + inventario.id_inventario, inventario,{headers:headers});
  }
}
