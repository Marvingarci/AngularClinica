import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatList: AngularFireList<any>

  constructor(private firebase: AngularFireDatabase) { }

  getChats()
  {

    return this.chatList = this.firebase.list('Chat')

  }

  insertMensaje(chat: Chat)
  {
    this.chatList.push({
      contieneFoto: chat.contieneFoto,
      messageText: chat.messageText,
      messageUser: chat.messageUser,
      urlFoto: chat.urlFoto
    })
  }

  updateMensaje(chat: Chat)
  {
    this.chatList.update(chat.$key,{
      contieneFoto: chat.contieneFoto,
      messageText: chat.messageText,
      messageUser: chat.messageUser,
      urlFoto: chat.urlFoto
    })
  }

  deleteProduct($key: string)
  {
    this.chatList.remove($key)
  }


}
