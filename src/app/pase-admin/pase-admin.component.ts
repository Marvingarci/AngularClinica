import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginAdmin } from '../interfaces/login_admin';
import { LoginadminService } from '../services/loginadmin.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pase-admin',
  templateUrl: './pase-admin.component.html',
  styleUrls: ['./pase-admin.component.css']
})

export class PaseAdminComponent implements OnInit {
 hide = true;
 loading: boolean =false;
 
//,Validators.pattern(/^[2][0-9]{10}$/)
  login_form = new FormGroup({
    cuenta: new FormControl('',[Validators.required]),
    clave: new FormControl('',[Validators.required]),
  });
  login: Login = {
    cuenta: null,
    clave: null
  };
  login_admin: LoginAdmin
  login_admins: LoginAdmin[];  

  constructor(private LoginAdminService: LoginadminService,private loginService: LoginService,
    private router: Router, private activar: AppComponent,private mensaje: MatSnackBar){
    activar.esconder();
    this.LoginAdminService.getAdmin().subscribe((data: LoginAdmin[]) =>{
    this.login_admins = data;
    console.log(this.login_admins);
    }, (error: any)=>{
    console.log(error);
    });  
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnInit() { }

  //CLICK ENTER
  onKeydown(event) {
    if (event.key === "Enter") {
      this.hide = false;
      this.loading=true;
      this.login.cuenta = this.login_form.get('cuenta').value;
      this.login.clave = this.login_form.get('clave').value;
  
      for (let indexx = 0; indexx < this.login_admins.length; indexx++) {
        if (this.login_admins[indexx].usuario_admin == this.login.cuenta) {        
            this.login_admin=this.login_admins[indexx];
            
        }else{
          
        }
      } 
  
      if (this.login_admin.contrasenia_admin  == this.login.clave) {
      console.log(this.login_admin.contrasenia_admin);console.log( this.login.cuenta);
        this.router.navigate(['/principal/veradministradores']);
      }else{
        
      console.log(this.login_admin.contrasenia_admin);console.log( this.login.cuenta);
        this.loading=false;
        this.showError('Cuenta incorrecta');
      }
        
    }
  }

//CLICK BOTON
  comprobarDatos(){
    this.loading=true;
    this.login.cuenta = this.login_form.get('cuenta').value;
    this.login.clave = this.login_form.get('clave').value;

    for (let indexx = 0; indexx < this.login_admins.length; indexx++) {
      if (this.login_admins[indexx].usuario_admin == this.login.cuenta) {        
        this.login_admin=this.login_admins[indexx];
      }else{
          
        }
    }
    if (this.login_admin.contrasenia_admin  == this.login.clave) {
    console.log(this.login_admin.contrasenia_admin);console.log( this.login.cuenta);
      this.router.navigate(['/principal/veradministradores']);
    }else{
      
    console.log(this.login_admin.contrasenia_admin);console.log( this.login.cuenta);
      this.loading=false;
      this.showError('Cuenta incorrecta');  
    }

  }

  get cuenta(){return this.login_form.get('cuenta')};
  get clave(){return this.login_form.get('clave')}; 
}