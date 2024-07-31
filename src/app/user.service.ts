import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
export type User = {
  userId : string
  email : string
  profilePictureURL : string
  
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user= signal<User | undefined>(undefined);
  userData = this.user.asReadonly();
  setUser(user : User | undefined){
    this.user.set(user);
    console.log(this.userData());
  }
}
