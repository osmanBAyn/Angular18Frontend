import { Routes } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chatapp/chat/chat.component';

export const routes: Routes = [
    {
        path : "chatapp",
        component : ChatappComponent,
        children: [{
            path : "chat",
            component : ChatComponent
        }]
    },{
        path : "",
        component : HomeComponent
    },
    {
        path : "**",
        redirectTo : ""
    }
];
