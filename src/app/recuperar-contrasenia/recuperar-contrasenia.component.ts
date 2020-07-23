import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { verificarDialog, actualizarcontraDialog } from '../dato-paciente/dato-paciente.component';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {


  id: any;

  constructor( private activatedRoute: ActivatedRoute, public dialog: MatDialog) {

    this.id = this.activatedRoute.snapshot.params['id'];


    const dialogRef = this.dialog.open(actualizarcontraDialog,
      { disableClose: true, width: "500px",

        data: {
          "id_paciente": this.id,
        } });
    
   }

  ngOnInit() {
  }

}

