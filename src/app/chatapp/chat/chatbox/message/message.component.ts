import { Component, computed, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Message } from '../../../conversations.service';
import { UserService } from '../../../../user.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  host : {
  },
  // styles : [
  //   ':host {align-self :  }'
  // ]
})
export class MessageComponent implements OnInit{
  message = input.required<Message>();
  userService = inject(UserService);
  date = computed(()=>new Date(this.message().createdAt));
  align = computed(()=>this.userService.userData()?.id===this.message().senderId?'flex-end':'start')
  constructor(private elRef : ElementRef){}
  ngOnInit(): void {
      this.elRef.nativeElement.style.alignSelf = this.align();
  }

}
