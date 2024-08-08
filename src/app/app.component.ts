import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { SocketService } from './socket.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : []
})
export class AppComponent implements OnInit{
  title = 'Angular18Frontend';
  http = inject(HttpClient);
  userService = inject(UserService);
  socketService = inject(SocketService);
  ngOnInit(): void {
      this.http.get("http://localhost:3000/users/isAuthenticated", {
        withCredentials : true
      }).subscribe({
        next : (val : any) =>{
          console.log(val.User);
          this.userService.setUser(val.User);
        }
      });
      this.socketService.getNewMessage().subscribe({
        next : (val)=>console.log("message got from socket: ", val)
      });
  }
}
