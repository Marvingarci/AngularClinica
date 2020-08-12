import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { LoginadminService } from '../services/loginadmin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UsuarioAdminUnicoService } from '../validations/usuario-admin-unico.directive';
import { Administrador } from '../interfaces/administrador';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { ThemeService } from 'ng2-charts';
import { DialogoVerificarPermisoComponent } from '../dialogo-verificar-permiso/dialogo-verificar-permiso.component';
import { IdentidadAdminUnicaDirective, IdentidadAdminUnicaService } from '../validations/identidadAdmin-unica.directive';


export interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {



  hide1 = false;
  hide = true;

  loginadmin_form = new FormGroup({

    usuario: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1),Validators.maxLength(12),Validators.pattern('[0-9a-zA-Z]*')],
      // asyncValidators: [this.usuarioAdminUnicoService.validate.bind(this.usuarioAdminUnicoService)]
    }),

    contraseniaNueva: new FormControl('', [Validators.minLength(6), Validators.maxLength(30)]),
    confirmarContrasenia: new FormControl('', [Validators.minLength(6), Validators.maxLength(30)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50),this.noWhitespaceValidator, Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{0,50}$/)]),
    identidad: new FormControl('',{validators: [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*')]
    ,asyncValidators: [this.fechaUnicaService.validate.bind(this.fechaUnicaService)]}
    ),

  });

    // metodo para evitar los espacios en blanco
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}



  getErrorMessage() {
    return this.loginadmin_form.get('usuario').hasError('required') ? 'You must enter a value' :
      this.loginadmin_form.get('usuario').hasError('usuario') ? 'Not a valid usuario' : '';
  }

  administrador: Administrador = {
    usuario: null,
    password: null,
    nombre_completo: null,
    identidad: null
  };

  id: any;
  editando: boolean = false;
  admins: Administrador[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, activar: AppComponent,
    private login_adminservice: LoginadminService, private mensaje: MatSnackBar,
    public dialogo: MatDialog,
    private usuarioAdminUnicoService: UsuarioAdminUnicoService,
    private fechaUnicaService: IdentidadAdminUnicaService) {

    this.id = this.activatedRoute.snapshot.params['id'];

    activar.esconder();
    this.getAdministradores();

    if (this.id) {

      this.editando = true;

      this.login_adminservice.obtenerAdministrador(this.id).subscribe((data: any) => {

        this.administrador = data;
        this.login_adminservice.datosAdministrador = this.administrador;

        //establesco el valor al los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.administrador.usuario);
        // this.contrasenia.setValue(this.administrador.password);
        this.contraseniaNueva.setValue('holahola');
        // this.contraseniaC.setValue(this.administrador.password);
        this.nombre.setValue(this.administrador.nombre_completo);
        this.identidad.setValue(this.administrador.identidad);

        this.login_adminservice.idActualizar = this.administrador.id_administrador;

      }, (error) => {
        console.log(error);
      });

    } else {

      this.editando = false;

      this.usuario.setAsyncValidators(this.usuarioAdminUnicoService.validate.bind(this.usuarioAdminUnicoService));

      this.contraseniaNueva.setValidators([Validators.required, Validators.minLength(6),Validators.maxLength(30),
        Validators.pattern( '[0-9a-zA-Z$@$!%*?&.,^=#]*')]);
       
      this.contraseniaNueva.updateValueAndValidity();
      this.confirmarContrasenia.setValidators([Validators.required, Validators.minLength(6),Validators.maxLength(30),
        Validators.pattern( '[0-9a-zA-Z$@$!%*?&.,^=#]*')]);
      this.confirmarContrasenia.updateValueAndValidity();

    }
  }//fin del constructor

  getAdministradores() {

    this.login_adminservice.obtenerAdministradores().subscribe((data: Administrador[]) => {

      this.admins = data;

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

    this.getAdministradores();

  }

  onKeydown(event1) {
    if (event1.key === "Enter") {
      this.hide1 = true;
      this.hide = true;
    }
  }


  llamarDialogo() {

    if (this.loginadmin_form.valid) {

      //ejecuto la accion solo si el fomulario es modificado
      if (this.loginadmin_form.dirty) {

        const dialogRef = this.dialogo.open(DialogoVerificarPermisoComponent, {
          disableClose: true,
          panelClass: 'verificar',
          data: { id: this.id, editando: this.editando, formulario: this.loginadmin_form }

        });

        dialogRef.afterClosed().subscribe(confirmacion => {

          if (confirmacion) {

            if (this.editando) {

              this.administrador.id_administrador = this.id;
              this.administrador.usuario = this.usuario.value;
              this.administrador.password = this.confirmarContrasenia.value;
              // introduzco el nombre estableciendo cada primer letra en mayuscula.
              this.administrador.nombre_completo = this.nombre.value.replace(/\b\w/g, l => l.toUpperCase());

              this.administrador.identidad = this.identidad.value;

              this.login_adminservice.actualizarAdministrador(this.administrador).subscribe((data) => {

                this.router.navigate(['/clínicaunahtec/veradministradores']);
                this.getAdministradores();
                this.showError('Administrador actualizado correctamente');

              }, (error) => {
                console.log(error);
              });


            } else {

              if (this.confirmarContrasenia.value == this.contraseniaNueva.value) {

                this.administrador.usuario = this.usuario.value;
                this.administrador.password = this.contraseniaNueva.value;
                this.administrador.identidad = this.identidad.value;
                // introduzco el nombre estableciendo cada primer letra en mayuscula.
                this.administrador.nombre_completo = this.nombre.value.replace(/\b\w/g, l => l.toUpperCase());

                if (this.loginadmin_form.valid) {


                  this.login_adminservice.guardarAdministrador(this.administrador).subscribe((data) => {

                    this.getAdministradores();

                    this.router.navigate(['/clínicaunahtec/veradministradores']);

                    this.showError('Administrador creado con exito');

                  }, (error) => {

                    console.log(error);

                  });

                } else {

                  this.showError('Ingrese los datos correctamente');
                }

              } else {

                this.showError('La contraseña no coincide');

              }
            }

          }
        });

      } else {

        this.router.navigate(['/clínicaunahtec/veradministradores']);

      }

    }



  }

  cambiarContra() {

    const dialogRef = this.dialogo.open(DialogoCambiarContraseniaAdmin, {
      disableClose: true, width: '500px'
      // height: '450px',
      // width: '400px',

    });


  }


  comprobarDatos() {

    this.llamarDialogo();

  }//fin del boton

  get usuario() { return this.loginadmin_form.get('usuario') };
  get contraseniaNueva() { return this.loginadmin_form.get('contraseniaNueva') };
  get confirmarContrasenia() { return this.loginadmin_form.get('confirmarContrasenia') };
  get nombre() { return this.loginadmin_form.get('nombre') };
  get identidad() { return this.loginadmin_form.get('identidad') };




}


@Component({
  selector: 'dialogo-cambiar-contrasenia-admin',
  templateUrl: 'dialogo-cambiar-contrasenia-admin.html',
})

export class DialogoCambiarContraseniaAdmin {

  cambiarContraForm = new FormGroup({

    contraseniaActual: new FormControl('', [Validators.minLength(5), Validators.maxLength(30)]),
    contraseniaNueva: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
    confirmarContrasenia: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),

  });


  esconderContraActual: boolean = true;
  esconderContraNueva: boolean = true;
  esconderContraConfirmada: boolean = true;


  constructor(

    private router: Router,
    private loginService: LoginService,
    private loginAdminService: LoginadminService,
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

          'cuenta': this.loginAdminService.datosAdministrador.usuario,
          'password': this.contraseniaActual.value,

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

                this.loginService.actualizarContrasena(datos).subscribe((result: any) => {

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
