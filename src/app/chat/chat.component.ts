import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interfaces/chat';
import { element } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Item } from 'pdfmake-wrapper';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje_form = new FormGroup({
    mensaje: new FormControl(''),
  });

  chatList: Chat[]
  esadmin:boolean;


  constructor(
    private chatService: ChatService,
    private loginService: LoginService) { }

  

  ngOnInit() {
   
    this.chatService.getChats()
    .snapshotChanges()
    .subscribe(item => {
      this.chatList = []
      item.forEach(element => {

        let x = element.payload.toJSON()
        x['$key'] = element.key
        this.chatList.push(x as Chat)

      })

      this.chatList.forEach(element =>{

        if ( element['messageUser'] =='Alguien') {
          this.esadmin = true;
          console.log("valor booleano admin:   " + this.esadmin);          
          console.log(element['messageUser'] );
            }else {
              this.esadmin = false;
              console.log("valor booleano noadmin:   " + this.esadmin);  
              console.log(element['messageUser'] );
            } 
        console.log(element)
      })
    })
  }


 






















  


  enviarMensaje(){

     var mensaje: Chat = {
      contieneFoto : false,
      messageText: this.mensaje_form.get('mensaje').value,
      messageUser: "Alguien",
      urlFoto: ""
    }


    this.chatService.insertMensaje(mensaje)
    this.mensaje_form.get('mensaje').setValue("")

  }


}
