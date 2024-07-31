import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, effect, ElementRef, inject, OnInit, signal } from '@angular/core';
import { GoogleIconComponent } from "../shared/google-icon/google-icon.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-chatapp',
  standalone: true,
  imports: [GoogleIconComponent, RouterOutlet],
  templateUrl: './chatapp.component.html',
  styleUrl: './chatapp.component.css',
})
export class ChatappComponent implements OnInit{
  userService = inject(UserService);
  selectedPageName = signal<string>("");
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor(){
    effect(()=>{
      for(let [key, value] of Object.entries(this.themeService.currentTheme())){
        this.elementRef.nativeElement.style.setProperty(key, value);
      }
    });
  }
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
      case "settings":
        activateTab = "settings"
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
      case "settings":
        navigateTo = "settings"
        break;
    }
    this.router.navigate(["chatapp", navigateTo]);
  }
  themeService = inject(ThemeService);
  elementRef = inject(ElementRef);
}
