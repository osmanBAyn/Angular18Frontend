import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userService = inject(UserService);
  http = inject(HttpClient);
  router = inject(Router);
  onLogout(){
    this.http.get("http://localhost:3000/users/logout", {withCredentials : true}).subscribe({
      next : ()=>{this.userService.setUser(undefined)}
    });

  }
}
