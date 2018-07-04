import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../services/messages.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
 selector: 'app-contact',
 templateUrl: './contact.component.html',
 styleUrls: ['./contact.component.css'],
 providers: [MessageService, AuthService]
})

export class AppContactComponent {
 constructor(public _MessageService: MessageService, private authService: AuthService) { }

 isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  fullName() {
  return this.authService.currentUser.fullName();
  }
  logout() {
  this.authService.logout();
  }

 contactForm(form) {
 this._MessageService.sendMessage(form).subscribe(() => {
    swal('formulario de contato', 'Mensaje enviado Correctamente', 'success');
 });
 }
}
