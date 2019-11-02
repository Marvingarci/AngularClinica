import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Inventario } from '../interfaces/inventario';
import { InventariosService } from '../services/inventarios.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.css']
})
export class FormInventarioComponent implements OnInit {
  hide = true;
  //input
  
  formInventario = new FormGroup({
    cantidad: new FormControl('',[Validators.required,  Validators.minLength(1),Validators.maxLength(4)]),
    nombre: new FormControl('',[Validators.required,  Validators.minLength(4),Validators.maxLength(30)]),
    descripcion: new FormControl('',[Validators.required,  Validators.minLength(10),Validators.maxLength(30)]),
    
    
  });
  getErrorMessage() {
    return this.formInventario.get('nombre').hasError('required') ? 'You must enter a value' :
    this.formInventario.get('nombre').hasError('nombre') ? 'Not a valid usuario' :     '';
  }

  inventario_form: Inventario={
    cantidad: null,
    nombre: null,
    descripcion: null,
    fecha_vencimiento: null,
    
  };

  constructor(private router: Router, activar: AppComponent, private invenService:InventariosService) {
    activar.esconder();
    
   }

  ngOnInit() {
  }

  comprobarDatos(){

    if(this.formInventario.valid){


      this.inventario_form.cantidad = this.cantidad.value;
      this.inventario_form.nombre = this.formInventario.get('nombre').value;
      this.inventario_form.descripcion = this.formInventario.get('descripcion').value;
    
      this.invenService.save(this.inventario_form).subscribe( (data) =>{
        console.log(data);   
        alert('todo perron');  
      }, (error) => {
        console.log(error);
        alert('se chorrio');
      });
    }else{
      alert('la esta cagando !!')
    }
    this.router.navigate(['/principal/inventario']);
  }

  get cantidad(){return this.formInventario.get('cantidad')};
  get nombre(){return this.formInventario.get('nombre')};
  get descripcion(){return this.formInventario.get('descripcion')};
  
  
  

}
