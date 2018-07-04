import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { MapComponent } from './map/map.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherComponentPage } from './weather-page/weather-page.component';
import { NotaLegalComponent } from './nota-legal/nota-legal.component';
// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import 'hammerjs';

import { ActivityService } from './services/activity.service';
import { appRoutes } from '../routes';
import { MapService } from './services/map.service';
import { AuthService } from './auth/auth.service';
import { MessageService } from './services/messages.service';
import { AppContactComponent } from './contact-message/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    MapComponent,
    ActivityFormComponent,
    SigninScreenComponent,
    SignupScreenComponent,
    WeatherComponent,
    AppContactComponent,
    NotaLegalComponent,
    WeatherComponentPage
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ActivityService, MapService, AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
