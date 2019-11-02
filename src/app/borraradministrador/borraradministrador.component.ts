import { Component, OnInit } from '@angular/core';
import { LoginadminService } from '../services/loginadmin.service';
import { ActivatedRoute } from '@angular/router';
import { LoginAdmin } from '../interfaces/login_admin';

@Component({
  selector: 'app-borraradministrador',
  templateUrl: './borraradministrador.component.html',
  styleUrls: ['./borraradministrador.component.css']
})

export class BorraradministradorComponent implements OnInit {
  login_admin:LoginAdmin = {   
    usuario_admin:null,
    contrasenia_admin:null,
    nombre_admin:null,
    identidad_admin:null,
    especialidad_admin:null
  };
  pacientes: LoginAdmin[];
  id: any;
  admins: LoginAdmin[];
  constructor(private login_adminservice:LoginadminService,private LoginAdminService: LoginadminService,private activatedRoute: ActivatedRoute) {
    this.getPacientes();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.login_adminservice.getAdmin().subscribe((data: LoginAdmin[]) =>{
      this.admins = data;
      this.login_admin = this.admins.find((m)=>{return m.id == this.id});
      console.log(this.login_admin.usuario_admin);
      this.login_adminservice.idActualizar=this.login_admin.id;  
     console.log(this.login_admin);      
    },(error)=>{
      console.log(error);
    });
   }

   getPacientes(){
    this.LoginAdminService.getAdmin().subscribe((data: LoginAdmin[]) =>{
      this.pacientes=data;
      console.log(this.pacientes);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  ngOnInit() {
    this.getPacientes();
  }

  borrar(){
    this.LoginAdminService.delete(this.id).subscribe((data)=>{
      
     //  alert('eliminado con exito');
      console.log(data);
       this.getPacientes();
     
  },(error)=>{console.log(error);
    });
  }

}
