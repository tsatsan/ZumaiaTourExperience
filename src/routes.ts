import { Routes } from '@angular/router';
import { ActivityListComponent } from './app/activity-list/activity-list.component';
import { ActivityFormComponent } from './app/activity-form/activity-form.component';
import { MapComponent } from './app/map/map.component';
import { SigninScreenComponent } from './app/auth/signin-screen.component';
import { SignupScreenComponent } from './app/auth/signup-screen.component';

export const appRoutes: Routes = [
  { path: 'activities' , component: ActivityListComponent },
  { path: 'new' , component: ActivityFormComponent },
  { path: 'new/:id' , component: ActivityFormComponent },
  { path: 'signin', component: SigninScreenComponent},
  { path: 'signup', component: SignupScreenComponent},
  { path: 'activities/:id' , component: MapComponent },
  { path: '', redirectTo: '/activities', pathMatch: 'full' }


];

