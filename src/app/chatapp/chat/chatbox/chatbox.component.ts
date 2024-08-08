import { afterRender, Component, computed, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { GoogleIconComponent } from "../../../shared/google-icon/google-icon.component";
import { User, UserService } from '../../../user.service';
import { HttpClient } from '@angular/common/http';
import { Conversation, Message } from '../../conversations.service';
import { MessageComponent } from './message/message.component';
import { Observable } from 'rxjs';
import { SocketService } from '../../../socket.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [GoogleIconComponent, MessageComponent],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent implements OnInit{
  conversation = input.required<Conversation|undefined>();
  convWith = computed(()=>this.conversation()!.users[0]);
  isSelected = input.required<boolean>();
  http = inject(HttpClient);
  userService = inject(UserService);
  // socketService = inject(SocketService);
  text = viewChild<ElementRef<HTMLTextAreaElement>>("text");

  messages = signal<Message[]>([]);
  messagesReverse = computed(()=>{
    return this.messages().reverse();
  });
  socket = io('http://localhost:3000',{});
  constructor(){
    afterRender(()=>{
      console.log("after render!")
    })
  }
  ngOnInit(): void {
      this.http.post("http://localhost:3000/users/messages", {conversationId : this.conversation()?.id }, {withCredentials : true}).subscribe({
        next : (val: any)=>{this.messages.set(val.messages);
        }
      });
      this.socket.on("connect", ()=>{
        console.log(this.socket.id);
        this.socket.emit("join", this.conversation()?.id);
      })
      this.socket.on("message",(message)=>{
        console.log(message);
        this.messages.update((val)=>{
          val.reverse();
          val.push(message);
          val.reverse();
          return val;
        })
      })
  }
  onSendMessage(){
    // let message = this.text()?.nativeElement.value;
    // this.http.post("http://localhost:3000/users/message", {message, conversationId : this.conversation()?.id }, {withCredentials : true}).subscribe({
    //   next : (val :any)=>{
    //     this.messages.update((value)=>{
    //       value.reverse();
    //       value.push(val);
    //       value.reverse();
    //       return value;
    //     })
    //   }
    // })
    this.socket.emit("message", this.text()?.nativeElement.value, this.conversation()?.id, this.userService.userData()?.id);
    this.text()!.nativeElement.value = "";
  }
}
