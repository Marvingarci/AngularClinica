import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
 
    

/*login:Login  = {
  cuentaUsuario:null,
  contrasenia: null
};*/

//para mostrar los datos de logins
  //title = 'AngularClinica';
  //API_ENDPOINT = 'http://127.0.0.1:8000/api';
  //logins:Login[];
//constructor(private loginService: LoginService,private httpClient: HttpClient){
//httpClient.get(this.API_ENDPOINT +'/user').subscribe(  (data:Login[])=>{
 // this.logins = data;}
//);
//}
//fin de mostrar login
 
constructor(){

}

ngOnInit() {
    
  }
}
