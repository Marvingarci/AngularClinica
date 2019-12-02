import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../interfaces/inventario';
import { Cita } from "../interfaces/Cita";

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  idCita: any;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
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

  guardarCita(cita: Cita){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/citas',cita,{headers:headers});
  }
  
  obtenerCita(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'/citas/'+id_paciente);
  }
  // Obtener las citas diarias para consolidado  
  obtenerTodasCita(){
    return this.httpClient.get(this.API_ENDPOINT+'/citas');
  }
  obtenerMedicamento(){
    return this.httpClient.get(this.API_ENDPOINT+'/medicamentos');
  }
  EgresoMedicamentos(medicamento){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/medicamentos/egreso',medicamento,{headers:headers});
  }

}
