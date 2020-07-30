import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { Medicos } from '../interfaces/medicos';
import { MedicosService } from '../services/medicos.service';
import { UsuarioMedicoUnicoService } from '../validations/usuario-medico-unico.directive';
import { DialogoVerificarPermisoComponent } from '../dialogo-verificar-permiso/dialogo-verificar-permiso.component';
import { LoginService } from '../services/login.service';
import { LoginadminService } from '../services/loginadmin.service';
import { ChatService } from '../services/chat.service';

export interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-registromedicos',
  templateUrl: './registromedicos.component.html',
  styleUrls: ['./registromedicos.component.css']
})
export class RegistromedicosComponent implements OnInit {
  hide1 = false;
  hide = true;
  disabledmedicos: boolean = false;

  medicos_form = new FormGroup({

    usuario: new FormControl('', {validators: [Validators.required, Validators.minLength(4),Validators.maxLength(12),Validators.pattern('[0-9a-zA-Z]*'),,this.noWhitespaceValidator],
      // asyncValidators: [this.usuarioMedicoUnicoService.validate.bind(this.usuarioMedicoUnicoService)]
       }),

    contrasenia: new FormControl('', {
      validators:[],
    }),
    contraseniaC: new FormControl('', {
      validators:[],
    }),
    nombre: new FormControl('', {
      validators:[Validators.required, Validators.minLength(10), Validators.maxLength(30),Validators.pattern('[a-z A-Z]*',),this.noWhitespaceValidator],
    }),
    identidad: new FormControl('', {
      validators:[Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*'),this.noWhitespaceValidator],
    }),
    especialidad: new FormControl('',{
      validators:[Validators.required],
   }),
    permisos: new FormControl('', []),

  });

  // metodo para evitar los espacios en blanco
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  getErrorMessage() {
    return this.medicos_form.get('usuario').hasError('required') ? 'You must enter a value' :
      this.medicos_form.get('usuario').hasError('usuario') ? 'Not a valid usuario' : '';
  }

  medico: Medicos = {
    usuario: null,
    password: null,
    nombre: null,
    numero_identidad: null,
    especialidad: null,
    permisos: null,
  };


  // aqui qp2 hay que hacer las tabla catalago
  especialidades: select[] = [
    { value: 1, viewValue: 'Salud Pública' },
    { value: 2, viewValue: 'Ginecología y Obstetricia' },
    { value: 3, viewValue: 'Pediatría' },
    { value: 4, viewValue: 'Cirugía General' },
    { value: 5, viewValue: 'Medicina Interna' },
    { value: 6, viewValue: 'Dermatología' },
    { value: 7, viewValue: 'Neurología' },
    { value: 8, viewValue: 'Neurocirugía' },
    { value: 9, viewValue: 'Cirugía Plástica' },
    { value: 10, viewValue: 'Anestesiología, Reanimación y Dolor' },
    { value: 11, viewValue: 'Ortopedia' },
    { value: 12, viewValue: 'Psiquiatría' },
    { value: 13, viewValue: 'Otorrinolaringología' },
    { value: 14, viewValue: 'Medicina Física y Rehabilitación' },
    { value: 15, viewValue: 'Medicina General' },

  ];

  id: any;
  editando: boolean = false;
  checkSelecionado: boolean;
  meds: Medicos[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, activar: AppComponent,
    private medicoService: MedicosService,
    private chatService: ChatService,
    private mensaje: MatSnackBar,
    private dialogo: MatDialog,
    private usuarioMedicoUnicoService: UsuarioMedicoUnicoService) {

    activar.esconder();
    this.getMedicos();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {

      this.editando = true;    


      this.medicoService.obtenerMedico(this.id).subscribe((data: any) => {

        this.medico = data;
        this.medicoService.datosMedico = this.medico;


        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.medico.usuario);
        this.nombre.setValue(this.medico.nombre);
        this.identidad.setValue(this.medico.numero_identidad);
        this.permisos.setValue(this.medico.permisos);

        switch (this.medico.especialidad) {
          case "Salud Públicabletas":
            this.especialidad.setValue(1);
            break;
          case "Ginecología y Obstetricia":
            this.especialidad.setValue(2);
            break;
          case "Pediatría":
            this.especialidad.setValue(3);
            break;
          case "Cirugía General":
            this.especialidad.setValue(4);
            break;
          case "Medicina Interna":
            this.especialidad.setValue(5);
            break;
          case "Dermatología":
            this.especialidad.setValue(6);
            break;
          case "Neurología":
            this.especialidad.setValue(7);
            break;
          case "Neurocirugía ":
            this.especialidad.setValue(8);
            break;
          case "Cirugía Plástica ":
            this.especialidad.setValue(9);
            break;
          case "Anestesiología, Reanimación y Dolor":
            this.especialidad.setValue(10);
            break;
          case "Ortopedia":
            this.especialidad.setValue(11);
            break;
          case "Psiquiatría":
            this.especialidad.setValue(12);
            break;
          case "Otorrinolaringología":
            this.especialidad.setValue(13);
            break;
          default:
            this.especialidad.setValue(14);
            break;


        }

        this.medicoService.idActualizar = this.medico.id_medico;

      }, (error) => {

        console.log(error);

      });

    } else {

      this.editando = false;

      this.usuario.setAsyncValidators(this.usuarioMedicoUnicoService.validate.bind(this.usuarioMedicoUnicoService));

      this.contrasenia.setValidators([Validators.required, Validators.minLength(6),Validators.maxLength(30),
        Validators.pattern( '[0-9a-zA-Z$@$!%*?&.,^=#]*'),this.noWhitespaceValidator]);
      this.contrasenia.updateValueAndValidity();
      this.contraseniaC.setValidators([Validators.required, Validators.minLength(6),Validators.maxLength(30),
        Validators.pattern( '[0-9a-zA-Z$@$!%*?&.,^=#]*'),this.noWhitespaceValidator]);
      this.contraseniaC.updateValueAndValidity();

    }
  }//fin del constructor


 


  onChangeCheckbox(event) {

    if (event.checked == true) {

      this.checkSelecionado = true;

    } else {
      this.checkSelecionado = false;
    }

  }

  getMedicos() {
    this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) => {
      this.meds = data;
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

  ngOnInit() {
    this.getMedicos();
  }

  onKeydown(event1) {
    if (event1.key === "Enter") {
      this.hide1 = true;
      this.hide = true;

    }
  }

  comprobarDatos() {


    if (this.medicos_form.valid) {

      if (this.medicos_form.dirty) {s

        if (this.contraseniaC.value == this.contrasenia.value) {

          const dialogRef = this.dialogo.open(DialogoVerificarPermisoComponent, {

            disableClose: true,
            panelClass: 'verificar',

          });

          dialogRef.afterClosed().subscribe(confirmacion => {

            if (confirmacion) {

              if (this.editando) {

                this.medico.usuario = this.usuario.value;
                // introduzco el nombre estableciendo cada primer letra en mayuscula.
                this.medico.nombre = this.nombre.value.replace(/\b\w/g, l => l.toUpperCase());
                this.medico.numero_identidad = this.identidad.value;
                this.medico.especialidad = this.especialidad.value;

                if (this.checkSelecionado) {

                  this.medico.permisos = true;

                } else {

                  this.medico.permisos = false;

                }

                this.medicoService.actualizarMedico(this.medico).subscribe((data) => {


                  this.getMedicos();
                  this.router.navigate(['/clínicaunahtec/veradministradores']);

                  this.showError('Médico actualizado correctamente');

                }, (error) => {

                  console.log(error);


                });

              } else {

                this.medico.usuario = this.usuario.value;
                this.medico.password = this.contraseniaC.value;
                // introduzco el nombre estableciendo cada primer letra en mayuscula.
                this.medico.nombre = this.nombre.value.replace(/\b\w/g, l => l.toUpperCase());
                this.medico.numero_identidad = this.identidad.value;
                this.medico.especialidad = this.especialidad.value;

                if (this.checkSelecionado) {

                  this.medico.permisos = true;

                } else {

                  this.medico.permisos = false;
                }

                if (this.medicos_form.valid) {


                  this.medicoService.GuardarMedico(this.medico).subscribe((data) => {

                    this.getMedicos();
                    this.showError('Medico creado con exito');
                    this.router.navigate(['/clínicaunahtec/veradministradores']);

                  }, (error) => {

                    console.log(error);

                  });

                } else {

                  this.showError('Ingrese los datos correctamente');

                }

              }

            }

          });

        } else {

          this.showError('La contraseñas no coincide');

        }

      } else {

        this.router.navigate(['/clínicaunahtec/veradministradores']);


      }

    }


  }//fin del boton


  cambiarContra() {

    const dialogRef = this.dialogo.open(DialogoCambiarContraseniaMed, {
      disableClose: true,
      panelClass: 'cambiar',
      // height: '450px',
      // width: '400px',

    });


  }


  get usuario() { return this.medicos_form.get('usuario') };
  get contrasenia() { return this.medicos_form.get('contrasenia') };
  get contraseniaC() { return this.medicos_form.get('contraseniaC') };
  get nombre() { return this.medicos_form.get('nombre') };
  get identidad() { return this.medicos_form.get('identidad') };
  get especialidad() { return this.medicos_form.get('especialidad') };
  get permisos() { return this.medicos_form.get('permisos') };

}


@Component({
  selector: 'dialogo-cambiar-contrasenia-med',
  templateUrl: 'dialogo-cambiar-contrasenia-med.html',
})

export class DialogoCambiarContraseniaMed {

  cambiarContraForm = new FormGroup({

    contraseniaActual: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    contraseniaNueva: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    confirmarContrasenia: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),

  });


  esconderContraActual: boolean = true;
  esconderContraNueva: boolean = true;
  esconderContraConfirmada: boolean = true;


  constructor(

    private router: Router,
    private loginService: LoginService,
    private medicoService: MedicosService,
    private dialogo: MatDialog,
    private mensaje: MatSnackBar) { }


  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  cambiarContra() {

    if (this.cambiarContraForm.valid) {

      if (this.contraseniaNueva.value == this.confirmarContrasenia.value) {


        var datos = {

          'cuenta': this.medicoService.datosMedico.usuario,
          'password': this.contraseniaActual.value,
          // 'id_rol': this.loginService.datosUsuario.id_rol

        };

        this.loginService.obtenerUsuario(datos).subscribe((result: any) => {

          if (result.codigoError == 1) {

            this.showError('La contraseña actual no es la correcta');

          } else {

            const dialogRef = this.dialogo.open(DialogoVerificarPermisoComponent, {
              disableClose: true,
              panelClass: 'verificar',

            });

            dialogRef.afterClosed().subscribe(confirmacion => {

              if (confirmacion) {


                datos.password = this.contraseniaNueva.value;

                this.loginService.actualizarDatos(datos).subscribe((result: any) => {

                  this.dialogo.closeAll();
                  this.showError('Contraseña actualizada con exito');

                }, (error) => {

                  console.log(error);

                })

              }
            });


          }

        }, (error) => {

          console.log(error);


        });

      } else {

        this.showError('Las contraseñas no coinciden');

      }

    }

  }

  salir() {

    this.dialogo.closeAll();

  }

  get contraseniaActual() { return this.cambiarContraForm.get('contraseniaActual') };
  get contraseniaNueva() { return this.cambiarContraForm.get('contraseniaNueva') };
  get confirmarContrasenia() { return this.cambiarContraForm.get('confirmarContrasenia') };
} 