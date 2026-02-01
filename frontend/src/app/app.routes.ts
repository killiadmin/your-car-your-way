import { Routes } from '@angular/router';
import { Agency_detailsComponent } from './features/agencies/components/details/agency_details.component';
import { ClientChatComponent } from './features/chat/client-chat/components/client-chat.component';
import { EmployeeChatComponent } from './features/chat/employee-chat/components/employee-chat.component';

export const routes: Routes = [
  { path: 'agencies', component: Agency_detailsComponent },
  { path: 'client', component: ClientChatComponent },
  { path: 'employee', component: EmployeeChatComponent },
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: '**', redirectTo: '/client' }
];
