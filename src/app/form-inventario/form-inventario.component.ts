import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Inventario } from '../interfaces/inventario';
import { InventariosService } from '../services/inventarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

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
  
  disabledinventario: boolean = false;

  formInventario = new FormGroup({
    unidad: new FormControl('',[Validators.required, Validators.pattern(/^\d/) ,Validators.minLength(1),Validators.maxLength(4)]),
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

  constructor(private router: Router, activar: AppComponent, private inventariosService:InventariosService, 
    private activatedRoute: ActivatedRoute, private mensaje: MatSnackBar) {
    activar.esconder();

    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.editando = true;
      console.log(this.editando);
      this.inventariosService.getInventario(this.id).subscribe((data: Inventario) =>{
        this.inventario = data;
       
        //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
        this.unidad.setValue(this.inventario.unidad);
        this.nombre.setValue(this.inventario.nombre);
        this.descripcion.setValue(this.inventario.descripcion);
        this.observacion.setValue(this.inventario.observacion);

        switch(this.inventario.presentacion){
          case "Tabletas":
              this.presentacion.setValue(1);
              break;
          case "Cápsulas":
              this.presentacion.setValue(2);
                break;
          case "Comprimidos":
            this.presentacion.setValue(3);
              break;
          case "Sobres":
            this.presentacion.setValue(4);
              break;
          case "Jarabe":
            this.presentacion.setValue(5);
              break;
          case "Crema":
            this.presentacion.setValue(6);
              break;
          case "Supositorio":
            this.presentacion.setValue(7);
              break;
          case "Óvulo":
            this.presentacion.setValue(8);
              break;
          case "Suspencion":
            this.presentacion.setValue(9);
               break;
          case "Solución":
            this.presentacion.setValue(10);
              break;
                    
          default:
              this.presentacion.setValue(11);
              break;
          
    
        }
        //this.presentacion.setValue(this.inventario.presentacion);
        //this.fecha_vencimiento.setValue(this.inventario.fecha_vencimiento);
        
      },(error)=>{
        console.log(error);
      });

    }
    
   }

   //cambiarInformacionInventario(){
     
     //if(!this.editando){
    //switch(this.presentacion.value){
      //case 1:
         // this.presentacion.setValue("Tabletas");
         // break;
     // case 2:
       //   this.presentacion.setValue("Cápsulas");
         //   break;
     // case 3:
       // this.presentacion.setValue("Comprimidos");
        //  break;
     // case 4:
      //  this.presentacion.setValue("Sobres");
       //   break;
      //case 5:
        //this.presentacion.setValue("Jarabe");
         // break;
      //case 6:
       // this.presentacion.setValue("Crema");
         // break;
      //case 7:
       // this.presentacion.setValue("Supositorio");
        //  break;
     // case 8:
       // this.presentacion.setValue("Óvulo");
        //  break;
     // case 9:
       // this.presentacion.setValue("Suspencion");
         //  break;
     // case 10:
       // this.presentacion.setValue("Solución");
        //  break;
                
     // default:
       //   this.presentacion.setValue("Inyectable");
     //     break;
      

   // }
 // }else{
   // switch(this.presentacion.value){
     // case "Tabletas":
       //   this.presentacion.setValue(1);
         // break;
     // case "Cápsulas":
       //   this.presentacion.setValue(2);
         //   break;
      //case "Comprimidos":
        //this.presentacion.setValue(3);
         // break;
     // case "Sobres":
       // this.presentacion.setValue(4);
         // break;
     // case "Jarabe":
       // this.presentacion.setValue(5);
         // break;
      //case "Crema":
       // this.presentacion.setValue(6);
         // break;
      //case "Supositorio":
       // this.presentacion.setValue(7);
         // break;
     // case "Óvulo":
       // this.presentacion.setValue(8);
         // break;
     // case "Suspencion":
       // this.presentacion.setValue(9);
         //  break;
      //case "Solución":
        //this.presentacion.setValue(10);
          //break;
                
     // default:
       //   this.presentacion.setValue(11);
         // break;
      

    //}
 // }
//}
   

   showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
  ngOnInit() {
  }

  onKeydown(event) {

    if (event.key === "Enter") {
      this.comprobarDatos();
    }

  }

  comprobarDatos(){
 

    if(this.formInventario.valid){

   this.disabledinventario = true;
      this.inventario.unidad = this.unidad.value;
      this.inventario.nombre = this.nombre.value;
      this.inventario.descripcion = this.descripcion.value;
      this.inventario.observacion = this.observacion.value;
      this.inventario.presentacion = this.presentacion.value;
      //this.inventario.fecha_vencimiento = this.fecha_vencimiento.value;
      
      if(this.editando == true){
        this.inventariosService.actualizarInventario(this.inventario).subscribe((data)=>{
          console.log(data);
          this.showError('Medicamento actualizado exitósamente'); 
          this.router.navigate(['/principal/inventario']);
        });
        
      }else{
        this.inventariosService.save(this.inventario).subscribe((data) =>{
          console.log(data);   
          this.showError('Medicamento ingresado exitósamente');  
          this.router.navigate(['/principal/inventario']);
        }, (error) => {
          console.log(error);
          this.showError('Ocurrió un error'); 
        });
      }
      
    }else{
      this.showError('Ingrese los datos correctamente'); 
    }
    
  }

  get unidad(){return this.formInventario.get('unidad')};
  get nombre(){return this.formInventario.get('nombre')};
  get descripcion(){return this.formInventario.get('descripcion')};
  get observacion(){return this.formInventario.get('observacion')};
  get presentacion(){return this.formInventario.get('presentacion')};
  //get fecha_vencimiento(){return this.formInventario.get('fecha_vencimiento')};
  
  
  

}
