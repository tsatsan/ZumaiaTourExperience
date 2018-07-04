import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
selector: 'app-legal',
templateUrl: './nota-legal.component.html',
styleUrls: [ './nota-legal.component.css']
})
export class NotaLegalComponent {
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
