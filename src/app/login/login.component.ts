import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import {MatInputModule} from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleIconComponent } from "../shared/google-icon/google-icon.component";
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(UserService);
  form = new FormGroup({
    email : new FormControl("", {
      validators : [Validators.required, Validators.email]
    }),
    password: new FormControl("",{
      validators : [Validators.required, Validators.minLength(6)]
    })
  });
  onSubmit(){
    this.http.post("http://localhost:3000/users/login", {email : this.form.controls.email.value, password : this.form.controls.password.value},{
      withCredentials : true
    }).subscribe({
      next : (res : any)=>{
        const User = res.User as User;
        this.userService.setUser(User);
        this.router.navigate(['','home']);  
      }
    })
  }
  onGoogle(){
    window.open("http://localhost:3000/users/google");
  }
}
