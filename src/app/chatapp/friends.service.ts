import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private availableUsersData = signal<User[]>([]);
  availableUsers = this.availableUsersData.asReadonly();
  private friendsData = signal<User[]>([]);
  friends = this.friendsData.asReadonly();
  addFriend(friendId : string){
    this.http.post("http://localhost:3000/users/addFriend",{friend : friendId},{withCredentials : true}).subscribe();
  }
  getAvailableUsers(){
    this.http.get("http://localhost:3000/users/allUsers", {withCredentials : true}).subscribe({
      next : (val :any) => {this.availableUsersData.set(val.Users.filter((user: any)=>user.id!==this.userService.userData()?.id));
      }
    });
  };
  getFriends(){
    this.http.get("http://localhost:3000/users/friends", {withCredentials: true}).subscribe({
        next : (val : any) =>{ this.friendsData.set(val.friends)
      }
    });
  }
}
