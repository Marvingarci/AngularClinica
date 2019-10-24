import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})



export class LoginComponent implements OnInit {
 hide = true;
 loading: boolean =false;
  //input
  scrap: Paciente = {
    id_paciente: null,
    numero_paciente: null,
    contrasenia: null,
    nombre_completo: null,
    numero_cuenta: null,
    numero_identidad: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    numero_telefono: null,
    emergencia_telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    estudiante: null,
    empleado: null,
    visitante: null,
    prosene: null,
  }
  

  login_form = new FormGroup({
    cuenta: new FormControl('',[Validators.required,Validators.pattern(/^[2][0-9]{10}$/)]),
    clave: new FormControl('',[Validators.required]),

  });

 

  login: Login = {
    cuenta: null,
    clave: null
  };
  paciente: Paciente;
  pacientes: Paciente[];
  Formulario: FormularioService;
  pase: boolean=true;

  constructor(private loginService: LoginService,private router: Router, private activar: AppComponent,  Formulario: FormularioService){
   activar.esconder();


   Formulario.get().subscribe((data: Paciente[])=>{
    this.pacientes = data;
    console.log(this.pacientes);
  }, (error)=>{
    console.log(error);
  }); 
  }


  
  ngOnInit() {
  
  }

  comprobarDatos(){
    this.loading=true;
    this.login.cuenta = this.login_form.get('cuenta').value;
    this.login.clave = this.login_form.get('clave').value;

    for (let index = 0; index < this.pacientes.length; index++) {
      if (this.pacientes[index].numero_cuenta == this.login.cuenta) {
        this.pase=false;
        this.paciente=this.pacientes[index];
      }
    }
    

    if (this.pase == true) {
      this.loginService.guardarDatos(this.login).subscribe( (data) =>{
        console.log(data);   
        alert('todo perron'); 
         this.router.navigate(['/formulario']);
      }, (error) => {
        this.loading=false;
        console.log(error);
        alert('Usuario incorrecto ');
      });
      
    }else{
      if (this.paciente.contrasenia==this.login.clave) {
        this.router.navigate(['/datoPaciente/'+this.paciente.id_paciente]);  
      }else{
        this.loading=false;
        alert('Contraseña incorrecta')
      }
      
    }

    
 
  }

  get cuenta(){return this.login_form.get('cuenta')};
  get clave(){return this.login_form.get('clave')};
  

}