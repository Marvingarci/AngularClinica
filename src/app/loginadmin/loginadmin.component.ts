import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { LoginAdmin } from '../interfaces/login_admin';
import { LoginadminService } from '../services/loginadmin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  hide = true;
  //input
 

  loginadmin_form = new FormGroup({
    usuario: new FormControl('',[Validators.required,  Validators.minLength(6)]),    
    contrasenia: new FormControl('',[Validators.required,  Validators.minLength(8),Validators.maxLength(30)]),
    contraseniaC: new FormControl('',[Validators.required,  Validators.minLength(8),Validators.maxLength(30)]),
    nombre: new FormControl('',[Validators.required,  Validators.minLength(10),Validators.maxLength(30)]),
    identidad: new FormControl('',[Validators.required,  Validators.minLength(13),Validators.maxLength(13)]),
    especialidad: new FormControl('',[Validators.required]),
  });
 
  getErrorMessage() {
    return this.loginadmin_form.get('usuario').hasError('required') ? 'You must enter a value' :
    this.loginadmin_form.get('usuario').hasError('usuario') ? 'Not a valid usuario' :     '';
  }


  
  login_admin:LoginAdmin = {    
    usuario_admin:null,
    contrasenia_admin:null,
    nombre_admin:null,
    identidad_admin:null,
    especialidad_admin:null
  };
  
  lista:string[]=[
  "Salud Pública",
  "Ginecología y Obstetricia",
  "Pediatría",
  "Cirugía General",
  "Medicina Interna",
  "Dermatología",
  "Neurología",
  "Neurocirugía",
  "Cirugía Plástica",
  "Anestesiología, Reanimación y Dolor",
  "Ortopedia",
  "Psiquiatría",
  "Otorrinolaringología",
  "Medicina Física y Rehabilitación"];
 
  id:any;
  editing:boolean = false;
  admins: LoginAdmin[];
  constructor(private activatedRoute:ActivatedRoute,private router: Router, activar: AppComponent, private login_adminservice:LoginadminService) {
    activar.esconder();
    this.getdato();
    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.editing = true;
      this.login_adminservice.getAdmin().subscribe((data: LoginAdmin[]) =>{
        this.admins = data;
        this.login_admin = this.admins.find((m)=>{return m.id == this.id});

        //establesco el valor al los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.login_admin.usuario_admin);
            this.contrasenia.setValue(this.login_admin.contrasenia_admin);
            this.contraseniaC.setValue(this.login_admin.contrasenia_admin);
            this.nombre.setValue(this.login_admin.nombre_admin);
            this.identidad.setValue(this.login_admin.identidad_admin);
           this.especialidad.setValue(this.login_admin.especialidad_admin);

        console.log(this.login_admin.usuario_admin);
        this.login_adminservice.idActualizar=this.login_admin.id;  
       console.log(this.login_admin);      
      },(error)=>{
        console.log(error);
      });

    }else{
      this.editing = false;
    }
    
}//fin del constructor

   getdato(){
    this.login_adminservice.getAdmin().subscribe((data: LoginAdmin[]) =>{
      this.admins = data;
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

ngOnInit() {
  this.getdato();
}

  comprobarDatos(){


    if(this.editing){  
   if(this.loginadmin_form.valid){

      this.login_admin.contrasenia_admin = this.loginadmin_form.get('contraseniaC').value; 
         if(this.login_admin.contrasenia_admin ==this.loginadmin_form.get('contrasenia').value ){
            this.login_admin.usuario_admin = this.usuario.value;
      this.login_admin.contrasenia_admin = this.contraseniaC.value;
      this.login_admin.nombre_admin = this.nombre.value;
      this.login_admin.identidad_admin = this.identidad.value;
      this.login_admin.especialidad_admin = this.especialidad.value;

      this.login_adminservice.put(this.login_admin).subscribe( (data) =>{
        console.log(data);
        this.router.navigate(['/principal/veradministradores']);
        this.getdato();
        //alert('administrador actualizado');  
        
      }, (error) => {
        console.log(error);
        alert('se chorrio');
      });
    }else{
      alert('La contasenia es incorrecta')
    }
        }

     
    

    }else{
      this.login_admin.usuario_admin = this.loginadmin_form.get('usuario').value;
      this.login_admin.contrasenia_admin = this.loginadmin_form.get('contraseniaC').value;
      this.login_admin.nombre_admin = this.loginadmin_form.get('nombre').value;
      this.login_admin.identidad_admin = this.loginadmin_form.get('identidad').value;
      this.login_admin.especialidad_admin = this.loginadmin_form.get('especialidad').value;

      if(this.loginadmin_form.valid){
        this.login_adminservice.saveloginadmin(this.login_admin).subscribe( (data) =>{
            this.getdato();
            console.log(data);         
         // alert('todo perron');  
          
        }, (error) => {
          console.log(error);
          alert('se chorrio');
        });
      }else{
        alert('la esta cagando !!')
      }
      this.router.navigate(['/principal/veradministradores']);
    } 
  }//fin del boton

  get usuario(){return this.loginadmin_form.get('usuario')};
  get contrasenia(){return this.loginadmin_form.get('contrasenia')};
  get contraseniaC(){return this.loginadmin_form.get('contraseniaC')};
  get nombre(){return this.loginadmin_form.get('nombre')};
  get identidad(){return this.loginadmin_form.get('identidad')};
  get especialidad(){return this.loginadmin_form.get('especialidad')};

}