import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css'],
})
// tslint:disable-next-line:component-class-suffix
export class WeatherComponentPage {
  constructor(private authService: AuthService) {}

isLoggedIn() {
   return this.authService.isLoggedIn();
 }
 fullName() {
 return this.authService.currentUser.fullName();
 }
 logout() {
 this.authService.logout();
 }

}

