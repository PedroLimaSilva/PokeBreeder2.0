import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'socket-pc',
  templateUrl: './socket-pc.component.html',
  styleUrls: ['./socket-pc.component.scss']
})
export class SocketPcComponent implements OnInit {

  pokemon_list = [];

  selected: any;

  messages = [];
  connection;
  message;

  constructor(private chatService:ChatService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
