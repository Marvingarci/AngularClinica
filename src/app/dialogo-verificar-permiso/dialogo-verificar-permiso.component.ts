import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../interfaces/login';
import { Administrador } from '../interfaces/administrador';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
// import { DialogoVerificar } from '../loginadmin/loginadmin.component';
import { LoginadminService } from '../services/loginadmin.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogo-verificar-permiso',
  templateUrl: './dialogo-verificar-permiso.component.html',
  styleUrls: ['./dialogo-verificar-permiso.component.css']
})

export class DialogoVerificarPermisoComponent {

  esconderClave: boolean;

  formulario_verificar_clave = new FormGroup({

    clave: new FormControl('', [Validators.required]),

  });

  usuario: Login = {
    cuenta: null,
    password: null,

  }

  administrador: Administrador = {
    id_administrador: null,
    usuario: null,
    password: null,
    nombre_completo: null,
    identidad: null
  };

  administradores: Administrador[];

  constructor(public dialogRef: MatDialogRef<DialogoVerificarPermisoComponent>,
    private loginAdminService: LoginadminService,
    private loginService: LoginService,
    private mensaje: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  //EVENTO CUANDO SE DA ENTER
  onKeydown(event) {

    if (event.key === "Enter") {
      this.esconderClave = true;
      this.verificar();
    }

  }

  salir() {

    this.dialogRef.close(false);
  }


  guardar() {

    this.verificar();

  }

  verificar(){


    if (this.formulario_verificar_clave.valid) {

      this.usuario.cuenta = this.loginService.datosUsuario.usuario;
      this.usuario.password = this.clave.value;

      this.loginService.verificarClave(this.usuario).subscribe((data: any) => {

        if (data.codigoError == 0) {

          this.dialogRef.close(true);

          
        } else {

          this.showError(data.msg);
          return false;

        }

      }, (error) => {

        console.log(error);

      });


    }

  }


  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  get clave() { return this.formulario_verificar_clave.get('clave') };

}
