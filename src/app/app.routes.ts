import { Routes } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chatapp/chat/chat.component';
import { GroupsComponent } from './chatapp/groups/groups.component';

export const routes: Routes = [
  {
    path: 'chatapp',
    component: ChatappComponent,
    children: [
      {
        path : '',
        redirectTo : 'chat',
        pathMatch : 'full'
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
