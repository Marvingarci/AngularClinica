import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../interfaces/inventario';
import { HistoriaSubsiguiente } from "../interfaces/historia_subsiguiente";

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  idCita: any;
  imagenactual: string;
  //API_ENDPOINT = 'http://64.225.37.202:8081/api'
  API_ENDPOINT = 'http://127.0.0.1:8000/api'

  sihayimagen: boolean = false;
  getInventario(id_inventario: any){
    return this.httpClient.get(this.API_ENDPOINT+'/inventarios/'+id_inventario);
  }

  constructor(private httpClient :HttpClient,invenService: InventariosService) { }
  save(inventario_form:Inventario){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/inventarios',inventario_form,{headers:headers});
  }

  getInventarios(){
    return this.httpClient.get(this.API_ENDPOINT+'/inventarios');
  }

  actualizarInventario(inventario){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/inventarios/' + inventario.id_inventario, inventario,{headers:headers});
  }

  
  obtenerMedicamento(){
    return this.httpClient.get(this.API_ENDPOINT+'/medicamentos');
  }

  EgresoMedicamentos(medicamento){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/medicamentos/egreso',medicamento,{headers:headers});
  }
  

}
