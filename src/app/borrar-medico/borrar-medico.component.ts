import { Component, OnInit } from '@angular/core';
import { Medicos } from '../interfaces/medicos';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MedicosService } from '../services/medicos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrar-medico',
  templateUrl: './borrar-medico.component.html',
  styleUrls: ['./borrar-medico.component.css']
})
export class BorrarMedicoComponent implements OnInit {
  medico:Medicos = {   
    usuarioM:null,
    contraseniaM:null,
    nombreM:null,
    identidadM:null,
    especialidadM:null
  };
  id: any;
  meds: Medicos[];

  constructor(private mensaje: MatSnackBar,
    private medicoService: MedicosService,private activatedRoute: ActivatedRoute) { 
    this.getMedicos();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
      this.meds = data;
      this.medico = this.meds.find((m)=>{return m.id == this.id});
      console.log(this.medico.usuarioM);
      this.medicoService.idActualizar=this.medico.id;  
     console.log(this.medico);      
    },(error)=>{
      console.log(error);
    });
  }

  getMedicos(){
    this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
      this.meds=data;
      console.log(this.meds);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

 ngOnInit() {
    this.getMedicos();
  }

  
  borrar(){
    this.medicoService.delete(this.id).subscribe((data)=>{
    this.getMedicos();
    this.showError('Medico eliminado correctamente'); 
    console.log(data);     
    },(error)=>{console.log(error);
    });
  }
}