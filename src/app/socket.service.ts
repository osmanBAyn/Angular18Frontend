import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public message$ : BehaviorSubject<string>= new BehaviorSubject(''); 
  constructor() { }
  socket = io('http://localhost:3000',{});
  public sendMessage(message : any){
    console.log('send message ', message);
    this.socket.emit('message', message, this.socket.id);
  }
  public getNewMessage = ()=>{
    this.socket.on('message',(message)=>{
      this.message$.next(message);  
    });
    return this.message$.asObservable();
  }
}
