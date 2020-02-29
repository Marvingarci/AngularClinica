import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute, Route } from '@angular/router';
import { AppComponent } from "../app.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { LoginComponent } from '../login/login.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PacienteComponent } from '../paciente/paciente.component';
import { DialogContentExampleDialog1 } from '../principal/principal.component';
import { Login } from '../interfaces/login';

export interface select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dato-paciente',
  templateUrl: './dato-paciente.component.html',
  styleUrls: ['./dato-paciente.component.css']
})
export class DatoPacienteComponent implements OnInit {



  formulario_datos_generales = new FormGroup({


    nombre_completo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{0,100}$/)]),
    // segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    numero_cuenta: new FormControl('', [Validators.required, Validators.pattern(/^[2][0-9]{10}$/)]),
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    numero_identidad: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\d{4}\d{5}$/)]),
    // "\d" es lo mismo "[0-9]"
    // lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{5,30}$/)]),
    // direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    carrera: new FormControl('', [Validators.required]),
    // fecha_nacimiento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    // categoria: new FormControl('',[]),
    // estado_civil: new FormControl('', Validators.required),
    // seguro_medico: new FormControl('', Validators.required),
    numero_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    // emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])


  });

  paciente: Paciente = {
    id_paciente: null,
    numero_paciente: null,
    nombre_completo: null,
    numero_cuenta: null,
    numero_identidad: null,
    imagen: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    numero_telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria: null,

  }





  id: any;
  noImg: boolean = true;
  pacientes: Paciente[];


  //variable que identifica si un input es editable
  readonly: boolean = true;


  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, private router: Router,
    principal: AppComponent, public dialog: MatDialog, login: LoginService, private formBuilder: FormBuilder, private mensaje: MatSnackBar) {
    this.dialog.closeAll;
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {

      this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) => {
        this.paciente = data;
        console.log(this.paciente);

        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.nombre_completo.setValue(this.paciente.nombre_completo);
        this.numero_identidad.setValue(this.paciente.numero_identidad);
        this.numero_cuenta.setValue(this.paciente.numero_cuenta);
        this.carrera.setValue(this.paciente.carrera);
        this.sexo.setValue(this.paciente.sexo);
        this.numero_telefono.setValue(this.paciente.numero_telefono);

        this.formularioService.idActualizar = this.paciente.id_paciente;



        // valido si el paciente tiene imagen, la variable noImg por defecto esta en true
        //si el paciente tiene imagen entonces esta variable cambiara a false
        if (this.paciente.imagen != null) {
          this.noImg = false;
        }


      }, (error) => {
        console.log(error)
      });
    }

    principal.esconder();





  }



  getdato() {
    this.formularioService.obtenerPacientes().subscribe((data: Paciente[]) => {
      this.pacientes = data;
    }, (error) => {
      console.log(error);
      this.mensaje.open('Ocurrio un error', '', { duration: 2000 });
    });

  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }


  ngOnInit() {
  }

  editar() {
    this.readonly = !this.readonly;

    // this.nombre_completo.setValue('hola');
  }

  cerrarsesion() {
    const dialogRef = this.dialog.open(verificarDialog, { disableClose: false, closeOnNavigation: true, panelClass: 'cambiarcontrasenia' });
    console.log(this.paciente);


  }

  cambiarcontra() {
    const dialogRef = this.dialog.open(DialogCerrarSesion, { disableClose: false, panelClass: 'cerrarsesion' });

  }

  actualizar() {
    if (this.readonly === true) {

      if (this.formulario_datos_generales.valid) {

        this.paciente.nombre_completo = this.nombre_completo.value;
        this.paciente.numero_cuenta = this.numero_cuenta.value;
        this.paciente.numero_identidad = this.numero_identidad.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.sexo = this.sexo.value;
        this.paciente.numero_telefono = this.numero_telefono.value;

        this.formularioService.actualizarPaciente(this.paciente).subscribe((data) => {
          console.log(data);

          this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) => {
            this.paciente = data;

            this.nombre_completo.setValue(this.paciente.nombre_completo);
            this.numero_identidad.setValue(this.paciente.numero_identidad);
            this.numero_cuenta.setValue(this.paciente.numero_cuenta);
            this.carrera.setValue(this.paciente.carrera);
            this.sexo.setValue(this.paciente.sexo);
            this.numero_telefono.setValue(this.paciente.numero_telefono);
          });

          this.showError('Todo correcto');
        }, (error) => {
          console.log(error);
          this.showError('Ocurrio un error');
        });
      }
    } else {
    }
  }

  //obtener los campos del formGroup: formulario_datos_generales
  get nombre_completo() { return this.formulario_datos_generales.get('nombre_completo') };
  get segundo_apellido() { return this.formulario_datos_generales.get('segundo_apellido') };
  get primer_nombre() { return this.formulario_datos_generales.get('primer_nombre') };
  get segundo_nombre() { return this.formulario_datos_generales.get('segundo_nombre') };
  get numero_cuenta() { return this.formulario_datos_generales.get('numero_cuenta') };
  get numero_identidad() { return this.formulario_datos_generales.get('numero_identidad') };
  get lugar_procedencia() { return this.formulario_datos_generales.get('lugar_procedencia') };
  get direccion() { return this.formulario_datos_generales.get('direccion') };
  get carrera() { return this.formulario_datos_generales.get('carrera') };
  get fecha_nacimiento() { return this.formulario_datos_generales.get('fecha_nacimiento') };
  get sexo() { return this.formulario_datos_generales.get('sexo') };
  get estado_civil() { return this.formulario_datos_generales.get('estado_civil') };
  get seguro_medico() { return this.formulario_datos_generales.get('seguro_medico') };
  get numero_telefono() { return this.formulario_datos_generales.get('numero_telefono') };
  get emergencia_telefono() { return this.formulario_datos_generales.get('emergencia_telefono') };
  get categoria() { return this.formulario_datos_generales.get('categoria') };

}

/////////de aqui para abajo///////////////////////////////////

@Component({
  selector: 'cambiocontraDialog',
  templateUrl: 'cambiocontraDialog.html',
  styleUrls: ['./dialogo.css']


})
export class cambiocontraDialog {
  hide1 = false;
  hide = true;

  resultado: any;

  paciente1: Paciente = {
    id_paciente: null,
    numero_paciente: null,
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
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria: null
  }

  login: Login = {
    id_login: null,
    cuenta: null,
    password: null,
  }

  id: any;
  Listo: boolean = false;
  constructor(private formularioService: FormularioService, private dialogRef: MatDialogRef<cambiocontraDialog>, private activatedRoute: ActivatedRoute,
    private loginService: LoginService, private router: Router, private mensaje: MatSnackBar) {

    this.paciente1.id_paciente = this.formularioService.idActualizar;
    console.log(this.paciente1.id_paciente);
    ///////
    this.formularioService.getUltimoID().subscribe((data) => {
      this.resultado = data;
      console.log(this.resultado);
      if (this.resultado != null) {
        if (this.resultado[0].ultimoId != null) {
          this.paciente1.id_paciente = this.resultado[0].ultimoId;

        }
      }

    }, (error) => {
      console.log(error);
    });


  }
  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }


  Nueva = new FormGroup({
    nuevaContra: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
    nuevaContraRep: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
  });


  // FUNCION QUE HACE EL MACANEO
  continuar() {
    this.hide = true;
    this.hide1 = false;

    this.formularioService.getUltimoID().subscribe((data) => {
      this.resultado = data;
      console.log(this.resultado);
      if (this.resultado != null) {
        if (this.resultado[0].ultimoId != null) {
          this.paciente1.id_paciente = this.resultado[0].ultimoId;
          console.log(this.paciente1.id_paciente);

        }
      }
    }, (error) => {
      console.log(error);
    });




    if (this.Nueva.valid) {

      // guardar datos del formulario en paciente y enviarlo a la api
      this.loginService.obtenerUltimoId().subscribe((data: any) => {

        this.login.id_login = data[0].ultimoId;
        this.login.password = this.nuevaContra.value;

        if (this.nuevaContra.value == this.nuevaContraRep.value) {

          this.loginService.actualizarDatos(this.login).subscribe((data) => {

            if (this.formularioService.esAlumno == true) {

              this.router.navigate(['datoPaciente/' + this.paciente1.id_paciente]);
              this.showError('Contraseña Guardada');
              this.Listo = true;
      
            } else {
              this.router.navigate(['principal/verPaciente/' + this.paciente1.id_paciente]);
              this.showError('Contraseña Guardada');
              this.dialogRef.close();
      
              this.Listo = true;
            }

          }, (error) => {

            console.log(error);
            
          });

        } else {

          this.showError('La contraseña no coincide');

        }

      }, (error) => {

        console.log(error);

      });


    }

  }

  //EVENTO CUANDO SE DA ENTER
  onKeydown(event) {
    if (event.key === "Enter") {
      this.hide = true;
      this.hide1 = true;
      this.continuar();
    }
  }

  //EVENTO BOTON GUARDAR
  guardar() {
    this.continuar();
  }




  get nuevaContra() { return this.Nueva.get('nuevaContra') };
  get nuevaContraRep() { return this.Nueva.get('nuevaContraRep') };
}



@Component({
  selector: 'verificarDialog',
  templateUrl: 'verificarDialog.html',
})

export class verificarDialog {
  hide1 = false;
  hide = true;

  paciente2: Paciente = {
    id_paciente: null,
    numero_paciente: null,
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
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria: null
  }

  login: Login = {
    id_login: null,
    cuenta: null,
    password: null,
  }

  id: any;
  resultado: any;
  logins: Login[];

  pacientes: Paciente[];
  paciente: Paciente;
  constructor(

    private dialogRef: MatDialogRef<verificarDialog>,
    @Inject(MAT_DIALOG_DATA) data,

    private formularioService: FormularioService, private activatedRoute: ActivatedRoute,
    public loginService: LoginService, private router: Router, private mensaje: MatSnackBar, public dialog: MatDialog

  ) {


    this.formularioService.obtenerPaciente(this.formularioService.idActualizar).subscribe((data: any) => {
      this.paciente = data;
      console.log(data);
    }, (error) => {

      console.log(error);

    });


  }//fin del constructor


  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  CambioContrasenia = new FormGroup({
    viejacontra: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
  });

  verificar() {

    this.login.cuenta = this.paciente.numero_cuenta;
    this.login.password = this.viejacontra.value;


    this.loginService.verificarClave(this.login).subscribe((data: any) => {

      if (data.codigoError == 0) {

        const dialogRef = this.dialog.open(actualizarcontraDialog,
          { disableClose: false, panelClass: 'cambiarcontrasenia' });
        this.dialogRef.close();

      } else {

        this.showError(data.msg);

      }


    }, (error) => {

      console.log(error);

    });

  }

  //EVENTO CUANDO SE DA ENTER
  onKeydown(event) {
    if (event.key === "Enter") {
      this.hide = true;
      this.hide1 = true;
      this.verificar();
    }
  }

  // EVENTO BOTON GUARDAR
  pasarotrodialogo() {

    this.verificar();

  }


  get viejacontra() { return this.CambioContrasenia.get('viejacontra') };

}

























@Component({
  selector: 'actualizarcontraDialog',
  templateUrl: 'actualizarcontraDialog.html',
})

export class actualizarcontraDialog {
  hide1 = false;
  hide = true;

  pacienteActualizar: Paciente = {
    id_paciente: null,
    numero_paciente: null,
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
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria: null
  }

  login: Login = {
    id_login: null,
    cuenta: null,
    password: null,
  }
  id: any;
  resultado: any;
  pac: Paciente[];

  constructor(

    private dialogRef: MatDialogRef<verificarDialog>,
    private formularioService: FormularioService, private activatedRoute: ActivatedRoute,
    public loginService: LoginService, private router: Router, private mensaje: MatSnackBar, public dialog: MatDialog) {


    this.formularioService.obtenerPaciente(this.formularioService.idActualizar).subscribe((data: any) => {

      this.pacienteActualizar = data;

    }, (error) => {

      console.log(error);

    });



  }//fin del constructor


  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnInit() {


  }

  CambioContrasenia = new FormGroup({
    nuevaContraCambio: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
    nuevaContraRepCambio: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
  });


  cambiarClave(){

    if (this.CambioContrasenia.valid) {

      // guardar datos del formulario en paciente y enviarlo a la api
      this.login.cuenta = this.pacienteActualizar.numero_cuenta;
      this.login.password = this.nuevaContraCambio.value;

      if (this.nuevaContraCambio.value == this.nuevaContraRepCambio.value) {

        this.loginService.actualizarDatos(this.login).subscribe((data) => {

          this.router.navigate(['datoPaciente/2']);
          this.showError('Cambio de contraseña exitoso');
          this.dialogRef.close();

        }, (error) => {
          console.log(error);
          this.showError('Existe un error');
          this.router.navigate(['datoPaciente/' + this.pacienteActualizar.id_paciente]);
        });

      } else {

        this.showError('La contraseña no coincide');

      }
    }

  }

  //EVENTO CUANDO SE DA ENTER
  onKeydown(event) {
    if (event.key === "Enter") {
      this.hide = true;
      this.hide1 = true;
      this.cambiarClave();
    }
  }

  //EVENTO BOTON GUARDAR
  guardarCambio() {
    this.hide = true;
    this.hide1 = true;
    this.cambiarClave();
    
  }

  get nuevaContraCambio() { return this.CambioContrasenia.get('nuevaContraCambio') };
  get nuevaContraRepCambio() { return this.CambioContrasenia.get('nuevaContraRepCambio') };
}











@Component({
  selector: 'dialog-cerrar-sesion',
  templateUrl: 'dialog-cerrar-sesion.html',
})

export class DialogCerrarSesion {
  constructor(public dialog: MatDialog, private router: Router) {

    this.dialog.closeAll;
  }
  salir() {
    //borro el token para que el usuario no ya no tenga acceso
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }
} 