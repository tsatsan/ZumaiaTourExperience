import { Injectable } from '@angular/core';
import * as urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Http, Headers, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: Http, private router: Router) {
        this.usersUrl = urljoin(environment.apiUrl, 'auth');
        if (this.isLoggedIn()) {
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User( email, null, firstName, lastName, userId );
        }
    }
    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
        .map((response: Response) => {
            const json = response.json();
            this.login(json);
            return json;
        })
        .catch((error: Response) => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl, 'signup'), body, { headers })
        .map((response: Response) => {
            const json = response.json();
            this.login(json);
            return json;
        })
        .catch((error: Response) => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }
    login = ({ token, userId, firstName, lastName, email}) => {
        this.currentUser = new User(email, null, firstName, lastName, userId);
        console.log(this.currentUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify( {userId, firstName, lastName, email}));
        this.router.navigateByUrl('/');
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    logout() {
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/');
     }
}
