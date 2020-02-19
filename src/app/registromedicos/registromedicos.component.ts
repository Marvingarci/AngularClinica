import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Medicos } from '../interfaces/medicos';
import { MedicosService } from '../services/medicos.service';
import { UsuarioMedicoUnicoService } from '../validations/usuario-medico-unico.directive';

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

    usuario: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [this.usuarioMedicoUnicoService.validate.bind(this.usuarioMedicoUnicoService)]
    }),

    contrasenia: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    contraseniaC: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*')]),
    especialidad: new FormControl('', [Validators.required]),
  });

  getErrorMessage() {
    return this.medicos_form.get('usuario').hasError('required') ? 'You must enter a value' :
      this.medicos_form.get('usuario').hasError('usuario') ? 'Not a valid usuario' : '';
  }

  medico: Medicos = {
    usuario: null,
    password: null,
    nombre: null,
    numero_identidad: null,
    especialidad: null
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
  editing: boolean = false;
  meds: Medicos[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, activar: AppComponent,
    private medicoService: MedicosService, private mensaje: MatSnackBar,
    private usuarioMedicoUnicoService: UsuarioMedicoUnicoService) {

    activar.esconder();
    this.getdato();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editing = true;
      this.medicoService.obtenerMedico(this.id).subscribe((data: any) => {
        this.medico = data;


        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.medico.usuario);
        this.contrasenia.setValue(this.medico.password);
        this.contraseniaC.setValue(this.medico.password);
        this.nombre.setValue(this.medico.nombre);
        this.identidad.setValue(this.medico.numero_identidad);

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
        //this.especialidad.setValue(this.medico.especialidadM);

        console.log(this.medico.usuario);
        this.medicoService.idActualizar = this.medico.id_medico;
        console.log(this.medico);
      }, (error) => {
        console.log(error);
      });

    } else {

      this.editing = false;

    }
  }//fin del constructor

  getdato() {
    this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) => {
      this.meds = data;
    }, (error) => {
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
    this.getdato();
  }

  onKeydown(event1) {
    if (event1.key === "Enter") {
      this.hide1 = true;
      this.hide = true;

    }
  }

  comprobarDatos() {

    if (this.editing) {
      if (this.medicos_form.valid) {

        this.disabledmedicos = true;
        this.medico.password = this.contraseniaC.value;

        if (this.medico.password == this.contrasenia.value) {

          this.medico.usuario = this.usuario.value;
          this.medico.password = this.contraseniaC.value;
          this.medico.nombre = this.nombre.value;
          this.medico.numero_identidad = this.identidad.value;
          this.medico.especialidad = this.especialidad.value;

          this.medicoService.actualizarMedico(this.medico).subscribe((data) => {
            console.log(data);
            this.router.navigate(['/principal/veradministradores']);
            this.getdato();
            this.showError('Médico actualizado correctamente');

          }, (error) => {
            console.log(error);
            this.showError('Se chorrio');
          });
        } else {
          this.showError('La contraseña no coincide');
        }
      } else {
        this.showError('Ingrese los datos correctamente');
      }

    } else {

      this.medico.password = this.contraseniaC.value;

      if (this.medico.password == this.contrasenia.value) {
        this.medico.usuario = this.usuario.value;
        this.medico.password = this.contraseniaC.value;
        this.medico.nombre = this.nombre.value;
        this.medico.numero_identidad = this.identidad.value;
        this.medico.especialidad = this.especialidad.value;

        if (this.medicos_form.valid) {

          this.disabledmedicos = true;
          this.medicoService.GuardarMedico(this.medico).subscribe((data) => {
            
            this.getdato();
            this.router.navigate(['/principal/veradministradores']);
            this.showError('Medico creado con exito');
          }, (error) => {
            console.log(error);
            alert('se chorrio');
          });
        } else {
          this.showError('Ingrese los datos correctamente');
        }
      }
      else {
        this.showError('La contraseña no coincide');
      }
    }
  }//fin del boton





  get usuario() { return this.medicos_form.get('usuario') };
  get contrasenia() { return this.medicos_form.get('contrasenia') };
  get contraseniaC() { return this.medicos_form.get('contraseniaC') };
  get nombre() { return this.medicos_form.get('nombre') };
  get identidad() { return this.medicos_form.get('identidad') };
  get especialidad() { return this.medicos_form.get('especialidad') };
}