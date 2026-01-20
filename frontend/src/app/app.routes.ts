import { Routes } from '@angular/router';
import { Agency_detailsComponent } from './features/agencies/components/details/agency_details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/agencies', pathMatch: 'full' },
  { path: 'agencies', component: Agency_detailsComponent },
  { path: '**', redirectTo: '/agencies' }
];
