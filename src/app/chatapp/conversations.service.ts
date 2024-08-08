import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserService } from '../user.service';
export type Message = {
  id : string,
  body : string | null,
  image : string | null,
  conversationId : string,
  senderId : string,
  sender : User,
  createdAt : string
}
export type Conversation = {
  id : string;
  users : User[],
  messages : Message[]
}
@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private conversationsData = signal<Conversation[]>([]);
  conversations = this.conversationsData.asReadonly();
  selectedConversation = signal<Conversation | undefined>(undefined)
  constructor() { }
  getConversations(){
    this.http.get("http://localhost:3000/users/directconversation",{withCredentials : true}).subscribe({
      next : (val : any) =>{ 
        let conversations = val.conv as Conversation[];
        let currentUser;
        if(this.userService.userData()!==undefined){
          currentUser = this.userService.userData();
        }
        if(currentUser===undefined){
          currentUser = {
            id : '',
            email : '',
            profilePictureURL : ''
          };
        }
        for(let i =0 ; i<conversations.length; i++){
          const index = conversations[i].users.map((val)=> val.id).indexOf(currentUser.id);
          conversations[i].users.splice(index, 1);
        }
        this.conversationsData.set(conversations);
      }
    });
  }
  addConversation(friend : User){
    let convIsAlreadySet = false;
    const conversations = this.conversations();
    if(conversations!==undefined){
      for(let i=0;i<conversations.length;i++){
        console.log(conversations[i].users[0]);
        console.log(friend);
        if(conversations[i].users[0].id===friend.id){
          this.selectedConversation.set(conversations[i]);
          convIsAlreadySet = true;
          return;
        }
      }
    }
    if(!convIsAlreadySet){ 
      this.http.post("http://localhost:3000/users/directconversation",{friend : friend.id},{withCredentials : true}).subscribe(
        {
          next : (res :any) => this.conversationsData.update(value => {
            let array = value;
            let conversation = res.conv as Conversation;
            let index;
            for(let i =0; i<conversation.users.length;i++){
              if(conversation.users[i].id===this.userService.userData()?.id){
                index = i;
              }
            }
            console.log(index);
            conversation.users.splice(index!==undefined?index:-1,1);
            array?.push(conversation);
            console.log(array);
            return array;
          })
        }
      );}

  }
}
