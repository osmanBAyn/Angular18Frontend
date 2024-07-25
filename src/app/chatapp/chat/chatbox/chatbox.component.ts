import { Component } from '@angular/core';
import { GoogleIconComponent } from "../../../shared/google-icon/google-icon.component";

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [GoogleIconComponent],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {

}
