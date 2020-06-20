import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interfaces/chat';
import { element } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

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
