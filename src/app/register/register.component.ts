import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../shared/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);
  errorWhenRegister = signal(false);
  httpCli = inject(HttpClient);
  form = new FormGroup({
    email : new FormControl("", {
      validators : [Validators.required, Validators.email]
    }),
    password: new FormControl("",{
      validators : [Validators.required, Validators.minLength(6)]
    })
  });
  onSubmit(){
    this.httpCli.post("http://localhost:3000/users/signup", {email: this.form.controls.email.value, password : this.form.controls.password.value}).subscribe({
      next : (val : any) => {
        this.router.navigate(['','login']);
      },
      error : (error) => {
        this.errorWhenRegister.set(true)
      }
    });
  }
  onGoogle(){
    window.open("http://localhost:3000/users/google");
  }
}
