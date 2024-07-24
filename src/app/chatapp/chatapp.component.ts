import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { GoogleIconComponent } from "../shared/google-icon/google-icon.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chatapp',
  standalone: true,
  imports: [GoogleIconComponent, RouterOutlet],
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',

  
})
export class ChatappComponent {
  selectedPageName = signal<string>("chat");
  router = inject(Router);
  onClick(pageName :string){
    
    this.selectedPageName.set(pageName);
    this.router.navigate(["chatapp",pageName]);
  }
}
