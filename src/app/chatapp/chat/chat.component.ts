import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../../user.service';
import { GoogleIconComponent } from "../../shared/google-icon/google-icon.component";
import { FriendsService } from '../friends.service';
import { Conversation, ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatboxComponent, GoogleIconComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  http = inject(HttpClient);
  userServ = inject(UserService);

  friendsService = inject(FriendsService);
  friends = this.friendsService.friends;

  conversationsService = inject(ConversationsService);
  conversations = this.conversationsService.conversations;
  selectedConversation = this.conversationsService.selectedConversation;
  ngOnInit(): void {
      this.friendsService.getFriends();
      this.conversationsService.getConversations();
  }
  onSelectConv(conversation : Conversation | undefined){
    this.selectedConversation.set(undefined);
    this.selectedConversation.set(conversation);
  }
  onAddConv(friend : User){
    this.conversationsService.addConversation(friend);
  }
}
