import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GoogleIconComponent } from "../shared/google-icon/google-icon.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chatapp',
  standalone: true,
  imports: [GoogleIconComponent, RouterOutlet],
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',

  
})
export class ChatappComponent implements OnInit{

  selectedPageName = signal<string>("");
  router = inject(Router);
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    const initalRoute = (this.router.url.split("/")[2]);
    let activateTab = "";
    switch (initalRoute){
      case "chat":
        activateTab = "chat";
        break;
      case "groups":
        activateTab = "group";
        break;
    }
    this.selectedPageName.set(activateTab);
  }
  onClick(pageName :string){
    let navigateTo = "";
    this.selectedPageName.set(pageName);
    switch (pageName){
      case "chat":
        navigateTo = "chat";
        break;
      case "group":
        navigateTo = "groups";
        break;
    }
    this.router.navigate(["chatapp", navigateTo]);
  }
}
