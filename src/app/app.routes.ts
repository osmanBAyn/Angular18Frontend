import { Routes } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chatapp/chat/chat.component';
import { GroupsComponent } from './chatapp/groups/groups.component';
import { SettingsComponent } from './chatapp/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {authGuard} from './auth/auth.guard';
import { AddFriendComponent } from './chatapp/add-friend/add-friend.component';
export const routes: Routes = [
  {
    path: 'chatapp',
    component: ChatappComponent,
    canActivate : [authGuard],
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
      {
        path : 'settings',
        component : SettingsComponent
      },
      {
        path : 'addFriend',
        component : AddFriendComponent
      }
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
