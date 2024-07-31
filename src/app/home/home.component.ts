import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../shared/header/header.component";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  userService = inject(UserService);
  
  ngOnInit(): void {
      this.http.get("http://localhost:3000/users/isAuthenticated", {
        withCredentials : true
      }).subscribe({
        next : (val : any) =>{
          this.userService.setUser(val.User);
        }
      })
  }
}
