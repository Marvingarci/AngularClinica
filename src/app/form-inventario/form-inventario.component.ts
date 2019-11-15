import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Inventario } from '../interfaces/inventario';
import { InventariosService } from '../services/inventarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

export interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.css']
})
export class FormInventarioComponent implements OnInit {
  hide = true;
  //input
  
  formInventario = new FormGroup({
    unidad: new FormControl('',[Validators.required,  Validators.minLength(1),Validators.maxLength(4)]),
    nombre: new FormControl('',[Validators.required,  Validators.minLength(4),Validators.maxLength(30)]),
    descripcion: new FormControl('',[Validators.required,  Validators.minLength(10),Validators.maxLength(30)]),
    observacion: new FormControl('',[Validators.required,  Validators.minLength(10),Validators.maxLength(30)]),
    presentacion: new FormControl('',[Validators.required]),
    //fecha_vencimiento: new FormControl('', Validators.required),
    
    
  });
  
  getErrorMessage() {
    return this.formInventario.get('nombre').hasError('required') ? 'You must enter a value' :
    this.formInventario.get('nombre').hasError('nombre') ? 'Not a valid usuario' :     '';
  }

  inventario: Inventario={
    presentacion: null,
    observacion: null,
    unidad: null,
    nombre: null,
    descripcion: null,
    //fecha_vencimiento: null,
    
  };

  presentaciones: select[] = [
    {value: 1, viewValue: 'Tabletas'},
    {value: 2, viewValue: 'Cápsulas'},
    {value: 3, viewValue: 'Comprimidos'},
    {value: 4, viewValue: 'Sobres'},
    {value: 5, viewValue: 'Jarabe'},
    {value: 6, viewValue: 'Crema'},
    {value: 7, viewValue: 'Supositorio'},
    {value: 8, viewValue: 'Óvulo'},
    {value: 9, viewValue: 'Suspencion'},
    {value: 10, viewValue: 'Solución'},
    {value: 11, viewValue: 'Inyectable'},
   
  ];

  // lista:string[]=[
   //"Tabletas",
   // "Capsulas",
   // "Comprimidos",
   // "Sobres",
   // "Jarabe",
   // "Crema",
   // "Supositorio",
   // "Ovulo",
   // "Suspencion",
   // "Solucion",
    //"Inyectable"];



  inventarios: Inventario[];
  id: any;
  editando: boolean= false;

  constructor(private router: Router, activar: AppComponent, private inventariosService:InventariosService, private activatedRoute: ActivatedRoute,) {
    activar.esconder();

    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.editando = true;
      console.log(this.editando);
      this.inventariosService.getInventario().subscribe((data: Inventario[]) =>{
        this.inventarios = data;
        this.inventario = this.inventarios.find((m)=>{return m.id_inventario == this.id});

        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.unidad.setValue(this.inventario.unidad);
        this.nombre.setValue(this.inventario.nombre);
        this.descripcion.setValue(this.inventario.descripcion);
        this.observacion.setValue(this.inventario.observacion);
        this.presentacion.setValue(this.inventario.presentacion);
        //this.fecha_vencimiento.setValue(this.inventario.fecha_vencimiento);
        
      },(error)=>{
        console.log(error);
      });

    }
    
   }

  ngOnInit() {
  }

  comprobarDatos(){

    if(this.formInventario.valid){


      this.inventario.unidad = this.unidad.value;
      this.inventario.nombre = this.nombre.value;
      this.inventario.descripcion = this.descripcion.value;
      this.inventario.observacion = this.observacion.value;
      this.inventario.presentacion = this.presentacion.value;
      //this.inventario.fecha_vencimiento = this.fecha_vencimiento.value;
      
      if(this.editando == true){
        this.inventariosService.actualizarInventario(this.inventario).subscribe((data)=>{
          console.log(data);
          alert('Actualizada');
          this.router.navigate(['/principal/inventario']);
        });
        
      }else{
        this.inventariosService.save(this.inventario).subscribe((data) =>{
          console.log(data);   
          alert('todo perron');  
          this.router.navigate(['/principal/inventario']);
        }, (error) => {
          console.log(error);
          alert('se chorrio');
        });
      }
      
    }
    
  }

  get unidad(){return this.formInventario.get('unidad')};
  get nombre(){return this.formInventario.get('nombre')};
  get descripcion(){return this.formInventario.get('descripcion')};
  get observacion(){return this.formInventario.get('observacion')};
  get presentacion(){return this.formInventario.get('presentacion')};
  //get fecha_vencimiento(){return this.formInventario.get('fecha_vencimiento')};
  
  
  

}
