import { Component } from '@angular/core';
import { ChatboxComponent } from "./chatbox/chatbox.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatboxComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
