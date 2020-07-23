import { Component, OnInit, Input, Inject, AfterViewInit, Injectable } from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Login } from '../interfaces/login';
import { HistoriaSubsiguiente } from '../interfaces/historia_subsiguiente';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../services/paciente.service';
import { Cita } from '../interfaces/cita';

//camara imports
import { WebcamInitError } from '../modules/webcam/domain/webcam-init-error';
import { WebcamImage } from '../modules/webcam/domain/webcam-image';
import { Subject, Observable, timer, interval, empty } from 'rxjs';
import { WebcamUtil } from '../modules/webcam/util/webcam.util';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

export interface select {
  value: string;
  viewValue: string;
}

export interface cita1 {
  id_paciente?: string,
  peso?: string,
  talla?: string,
  imc?: string,
  temperatura?: string,
  presion?: string,
  pulso?: string,
  siguiente_cita?: string,
  observaciones?: string,
  impresion?: string,
  indicaciones?: string,
  remitido?: any,
  fechayHora?: any,
  nombre?: any
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
    numero_cuenta: new FormControl('', []),
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    numero_identidad: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\d{4}\d{5}$/)]),
    // "\d" es lo mismo "[0-9]"
    // lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{5,30}$/)]),
    // direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    carrera: new FormControl('', []),
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
    correo_electronico: null,
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
    telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion_sistolica: null,
    presion_diastolica: null,
    pulso: null,
    categoria: null,

  }

  id: any;
  noImg: boolean = true;
  pacientes: Paciente[];
  citas: Cita[];
  historia_subsiguiente: any;
  medicamento: any;


  siHayCitas: boolean = false;
  siHayMedicamentos: boolean = false;
  siHayIndicaciones: boolean = false;
  siHayObservaciones: boolean = false;


  //variable que identifica si un input es editable
  readonly: boolean = true;
  loading1: boolean = false;

  //variable que editifica si el paciente es alumno o no
  esAlumno: boolean;



  constructor(
    public formularioService: FormularioService,
    private activatedRoute: ActivatedRoute,
    principal: AppComponent, public dialog: MatDialog,
    private mensaje: MatSnackBar,
    private pacienteService: PacienteService,
    private loginService: LoginService,
    public cambiarFoto: MatDialog
  ) {



    // this.dialog.closeAll;
    this.id = this.activatedRoute.snapshot.params['id'];



    if (this.id) {

      this.obtenerDatosPaciente();

      this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) => {
        this.paciente = data;

        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.nombre_completo.setValue(this.paciente.nombre_completo);
        this.numero_identidad.setValue(this.paciente.numero_identidad);
        this.numero_cuenta.setValue(this.paciente.numero_cuenta);
        this.carrera.setValue(this.paciente.carrera);
        this.sexo.setValue(this.paciente.sexo);
        this.numero_telefono.setValue(this.paciente.telefono);

        this.formularioService.idPaciente = this.paciente.id_paciente;

        if (this.paciente.categoria == "Estudiante") {


          this.esAlumno = true

          this.numero_cuenta.setValidators([Validators.required, Validators.pattern(/^[2][0-9]{10}$/)])
          this.numero_cuenta.updateValueAndValidity()
          this.carrera.setValidators([Validators.required])
          this.carrera.updateValueAndValidity()


          //recupero el id de la tabla de logins mandandole el numero de cuenta del paciente
          this.loginService.obtenerIdLogin(this.paciente.numero_cuenta).subscribe((data: any) => {

            //guardo el id en una variable global dentro del servio de login
            this.loginService.idActualizar = data.id_login

          })


        } else {


          this.esAlumno = false


          //recupero el id de la tabla de logins mandandole el numero de identidad del paciente
          this.loginService.obtenerIdLogin(this.paciente.numero_identidad).subscribe((data: any) => {

            //guardo el id en una variable global dentro del servio de login
            this.loginService.idActualizar = data.id_login
          })

        }

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


  obtenerCitas() {

    this.pacienteService.obtenerCitasVigetentesPorPaciente(this.id).subscribe((data: any) => {

      this.citas = data;

      if (this.citas.length != 0) {

        this.siHayCitas = true;

      }


    });
  }

  obtenerDatosHistoriaSubsiguiente() {

    this.pacienteService.obtenerHistoriaSubsiguiente(this.id).subscribe((data: any) => {

      this.historia_subsiguiente = data;

      if (this.historia_subsiguiente.medicamento != null) {

        this.siHayMedicamentos = true;

      }
      if (this.historia_subsiguiente.indicaciones != null) {

        this.siHayIndicaciones = true;

      }

      if (this.historia_subsiguiente.observaciones != null) {

        this.siHayObservaciones = true;

      }


    }, (error) => {

      console.log(error);

    });

  }

  obtenerDatosPaciente() {

    this.obtenerCitas();
    this.obtenerDatosHistoriaSubsiguiente();


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


  ngOnInit() { }



  editar() {

    this.readonly = !this.readonly;

  }

  cambiarContra() {

    const dialogRef = this.dialog.open(verificarDialog,
      {
        disableClose: false, closeOnNavigation: true, panelClass: 'cambiarcontrasenia'
      });

  }

  cerrarSesion() {

    const dialogRef = this.dialog.open(DialogCerrarSesion, { disableClose: false, panelClass: 'cerrarsesion' });

  }

  actualizar() {
    if (this.readonly === true) {

      if (this.formulario_datos_generales.valid) {

        if (this.formulario_datos_generales.dirty) {

          this.paciente.nombre_completo = this.nombre_completo.value;
          this.paciente.numero_cuenta = this.numero_cuenta.value;
          this.paciente.numero_identidad = this.numero_identidad.value;
          this.paciente.carrera = this.carrera.value;
          this.paciente.sexo = this.sexo.value;
          this.paciente.telefono = this.numero_telefono.value;

          if (this.esAlumno == false) {

            var login = {

              "id_login": this.loginService.idActualizar,
              "cuenta": this.paciente.numero_identidad

            }



          } else {

            var login = {

              "id_login": this.loginService.idActualizar,
              "cuenta": this.paciente.numero_cuenta

            }

          }

          this.loginService.actualizarCuenta(login).subscribe((result) => {

            console.log("se actualizo perron la cuenta")

          }, (error) => {

            console.log(error)
          })

          this.formularioService.actualizarPaciente(this.paciente).subscribe((data) => {

            this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) => {
              this.paciente = data;

              this.nombre_completo.setValue(this.paciente.nombre_completo);
              this.numero_identidad.setValue(this.paciente.numero_identidad);
              this.numero_cuenta.setValue(this.paciente.numero_cuenta);
              this.carrera.setValue(this.paciente.carrera);
              this.sexo.setValue(this.paciente.sexo);
              this.numero_telefono.setValue(this.paciente.telefono);
            });

            this.showError('Datos actualizados correctamente');

          }, (error) => {

            console.log(error);
            this.showError('Ocurrio un error');

          });

        }


      } else {

        this.showError("Datos inválidos")

      }
    }
  }

  actualizarfoto() {
    const tiempo = timer(4000);

    tiempo.subscribe((n) => {
      this.loading1 = false;
      console.log("foto actualizada");
      this.paciente.imagen = this.pacienteService.imagenactual;
      this.noImg = false;
    });

  }

  cambiarfoto() {
    const dia = this.cambiarFoto.open(CambiarFoto1, {
      panelClass: 'tomarfoto'
    });

    dia.afterClosed().subscribe(result => {

      this.actualizarfoto();
      this.loading1 = true;



    });
    this.pacienteService.id_historia_subsiguiente = this.id;
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
  hide1 = true;
  hide = true;

  resultado: any;

  paciente1: Paciente = {
    id_paciente: null,
    numero_paciente: null,
    nombre_completo: null,
    correo_electronico: null,
    numero_cuenta: null,
    numero_identidad: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion_sistolica: null,
    presion_diastolica: null,
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
  constructor(private formularioService: FormularioService, 
    private dialogRef: MatDialogRef<cambiocontraDialog>, 
    private loginService: LoginService, 
    private router: Router, 
    private mensaje: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) {


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
  guardar() {


    if (this.Nueva.valid) {


      this.login.cuenta = this.data.cuenta;
      this.login.password = this.nuevaContraRep.value;

      if (this.nuevaContra.value == this.nuevaContraRep.value) {

        this.loginService.RegistrarUsuario(this.login).subscribe((data: any) => {


          // si el usuario se registro  desde el login, es porque es un estudiante, por ende se debe de crear un nuevo toquen
          // y asignarle su rol.
          if(this.formularioService.vieneDesdeLogin == true){

            localStorage.setItem("token", data.token)
            localStorage.setItem("rol", "Paciente")

          }
         
          this.dialogRef.close(true);


        }, (error) => {

          console.log(error)

        });



      } else {

        this.showError('La contraseña no coincide');

      }




    }

    //establezco la variable en true por que si no genera problemas al querer ingresar un paciente desde el login
    // this.formularioService.esAlumno == true;

  }

  //EVENTO CUANDO SE DA ENTER
  onKeydown1(event) {

    if (event.key === "Enter") {
      this.hide1 = false;
      this.hide = true;
    }

  }

  onKeydown(event) {

    if (event.key === "Enter") {
      this.hide1 = false;
      this.hide = true;
    }

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
    correo_electronico: null,
    numero_cuenta: null,
    numero_identidad: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion_sistolica: null,
    presion_diastolica: null,
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


  esAlumno: boolean
  constructor(

    private dialogRef: MatDialogRef<verificarDialog>,
    @Inject(MAT_DIALOG_DATA) data,

    private formularioService: FormularioService, private activatedRoute: ActivatedRoute,
    public loginService: LoginService, private router: Router, private mensaje: MatSnackBar, public dialog: MatDialog

  ) {


    this.formularioService.obtenerPaciente(this.formularioService.idPaciente).subscribe((data: any) => {
      this.paciente = data;

      if (this.paciente.categoria == "Estudiante") {

        this.esAlumno = true

      } else {

        this.esAlumno = false

      }


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


    if (this.esAlumno) {

      this.login.cuenta = this.paciente.numero_cuenta;
      this.login.password = this.viejacontra.value;

    } else {

      this.login.cuenta = this.paciente.numero_identidad;
      this.login.password = this.viejacontra.value;

    }


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
    correo_electronico: null,
    numero_cuenta: null,
    numero_identidad: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion_sistolica: null,
    presion_diastolica: null,
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
  historias_subsiguientes: HistoriaSubsiguiente[];
  loading1: boolean = false;

  //variable que denota si el paciente es alumno o no
  esAlumno: boolean

  constructor(
    private dialogRef: MatDialogRef<verificarDialog>,
    private formularioService: FormularioService, private activatedRoute: ActivatedRoute,
    public loginService: LoginService, private router: Router,
    private mensaje: MatSnackBar, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    if(data != null){

      this.formularioService.idPaciente = data.id_paciente

    }

    this.formularioService.obtenerPaciente(this.formularioService.idPaciente).subscribe((data: any) => {

      this.pacienteActualizar = data;

      if (this.pacienteActualizar.categoria == "Estudiante") {

        this.esAlumno = true

      } else {

        this.esAlumno = false

      }




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


  cambiarClave() {

    if (this.CambioContrasenia.valid) {

      //verifico si es alumno para haci asignar los datos al objeto login
      if (this.esAlumno) {

        //si es alumno le asigno como cuenta de login el numero de cuenta
        this.login.cuenta = this.pacienteActualizar.numero_cuenta;
        this.login.password = this.nuevaContraCambio.value;

      } else {

        // si no es alumno le asigno como cuenta de login el numero de identidad
        this.login.cuenta = this.pacienteActualizar.numero_identidad;
        this.login.password = this.nuevaContraCambio.value;
      }


      if (this.nuevaContraCambio.value == this.nuevaContraRepCambio.value) {

        this.loginService.actualizarContrasena(this.login).subscribe((data) => {


          this.showError('Cambio de contraseña exitoso');
          

          setTimeout(() => {
            
            this.dialogRef.close();
            window.close();

          }, 0);
    
          

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

  }
  salir() {
    //borro el token para que el usuario no ya no tenga acceso
    this.dialog.closeAll();
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }
}


export interface imagenNueva {
  id: number,
  imagen: string
}
/////// MATDIALOG cambiar foto
@Component({
  selector: 'CambiarFoto',
  templateUrl: 'CambiarFoto.html',
  styleUrls: ['CambiarFoto.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})


@Injectable()

export class CambiarFoto1 {


  constructor(private dialogo: MatDialogRef<CambiarFoto1>, private pacienteService: PacienteService, private activatedRoute: ActivatedRoute,
    private formulario: FormularioService) {

  }
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode: string = 'environment';
  public errors: WebcamInitError[] = [];
  public mirrorImage: 'never';
  paciente: Paciente;
  NuevaImagen: any = { id_paciente: null, imagen: null };
  // latest snapshot
  public webcamImage: WebcamImage = null;
  opcion: boolean = true;
  id: any;
  imagen: any;
  imagenAlter: boolean = false;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.opcion = false;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public otrafoto() {
    this.opcion = true;

  }
  public guardar() {


    this.id = this.pacienteService.id_historia_subsiguiente;

    if (this.imagenAlter == true) {
      this.imagenAlter = false;

    } else {
      this.imagen = this.webcamImage.imageAsDataUrl;
    }




    this.NuevaImagen.id_paciente = this.id;
    this.NuevaImagen.imagen = this.imagen;
    const intervalo = interval(1000);


    console.log(this.imagen);
    console.log(this.NuevaImagen.imagen);

    this.pacienteService.ActualizarImagen(this.NuevaImagen).subscribe((data) => {
      console.log('imagen guardado con exito');
      this.pacienteService.sihayimagen = true;
      this.pacienteService.imagenactual = this.imagen;
      //this.verPaciente.actualizarfoto();
    }, (error) => {
      console.log(error);
    });
    this.dialogo.close();
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.imagen = "data:image/jpeg;base64," + btoa(binaryString);
    console.log(this.imagen);
    this.imagenAlter = true;
    this.guardar();
    this.dialogo.close;


  }


  seleccionarArchivo(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);


      reader.readAsBinaryString(file);

    }


  }


  ///////////////////////codigo 



  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }
}