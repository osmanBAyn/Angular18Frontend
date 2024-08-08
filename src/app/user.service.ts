import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
export type User = {
  id : string
  email : string
  profilePictureURL : string
  
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  private user= signal<User | undefined>(undefined);
  userData = this.user.asReadonly();
  setUser(usern : any){
    this.user.set({
      id : usern.userId,
      email : usern.email,
      profilePictureURL : usern.profilePictureURL
    });
    console.log(this.userData());
  }
  async reload(){
    await this.http.get("http://localhost:3000/users/isAuthenticated", {withCredentials : true}).forEach((val : any)=>{
      this.setUser(val.User);
    })
  }
}
