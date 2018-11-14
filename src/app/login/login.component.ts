import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthenticationService, AlertService, UserService} from '../shared/services';
import {User} from '../shared/models/user';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loggedInUser: User;
    constructor(public router: Router,
                public authenticationService: AuthenticationService,
                public alertService: AlertService,
                public userService: UserService) {}

    ngOnInit() {
        // this.authenticationService.clear_user();
    }

    @Input() username: string = '';
    @Input() password: string = '';
    @Output() usernameChange = new EventEmitter<string>();
    @Output() passwordChange = new EventEmitter<string>();

    updateUser(val: string) {
        this.username = val;
        this.usernameChange.emit(this.username);
    }
    updatePass(val: string) {
        this.password = val;
        this.passwordChange.emit(this.password);
    }

    onLoggedin() {
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.loggedInUser = data;
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error(error);
                });
    }

}
