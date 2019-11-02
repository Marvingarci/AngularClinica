import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Inventario } from '../interfaces/inventario';
import { InventariosService } from '../services/inventarios.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  inventario: Inventario={
    cantidad: null,
    nombre: null,
    descripcion: null,
    fecha_vencimiento: null,
    
  };
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
        this.cantidad.setValue(this.inventario.cantidad);
        this.nombre.setValue(this.inventario.nombre);
        this.descripcion.setValue(this.inventario.descripcion);
        
      },(error)=>{
        console.log(error);
      });

    }
    
   }

  ngOnInit() {
  }

  comprobarDatos(){

    if(this.formInventario.valid){


      this.inventario.cantidad = this.cantidad.value;
      this.inventario.nombre = this.nombre.value;
      this.inventario.descripcion = this.descripcion.value;
      
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

  get cantidad(){return this.formInventario.get('cantidad')};
  get nombre(){return this.formInventario.get('nombre')};
  get descripcion(){return this.formInventario.get('descripcion')};
  
  
  

}
