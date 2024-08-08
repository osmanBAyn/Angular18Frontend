import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { User, UserService } from '../../user.service';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css'
})
export class AddFriendComponent implements OnInit{
  http = inject(HttpClient);
  userService = inject(UserService);
  friendsService = inject(FriendsService);
  availableUsers = this.friendsService.availableUsers;
  ngOnInit(): void {
      this.friendsService.getAvailableUsers();
  }
  onAddFriend(userId : string){
    this.friendsService.addFriend(userId);
  }
}
