import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { User } from '../models/user';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private alertService: AlertService) { }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:5000/login`, { user_name: username, password: password })
            .pipe(map(response => {
                console.log(response);
                if (response.status && response.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                } else {
                    this.alertService.error('User not authenticated');
                }
                return response.data;
            }));
    }

    register(user: User) {
        return this.http.post<any>(`http://localhost:5000/register`, user)
            .pipe(map(response => {
                console.log(response);
                return response.data;
            }));
    }

    clear_user() {
        localStorage.removeItem('currentUser');
    }

    logout(username: string) {
        return this.http.post<any>(`http://localhost:5000/logout`, { user_name: username })
            .pipe(map(user => {
                return user;
            }));
    }
}
