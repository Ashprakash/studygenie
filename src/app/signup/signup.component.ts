import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import { AuthenticationService } from '../shared/services';
import { User } from '../shared/models/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    public user: User;
    @Input() username: string = '';
    @Input() password: string = '';
    @Input() rpassword: string = '';
    @Input() firstname: string = '';
    @Input() lastname: string = '';
    @Input() email: string = '';

    @Output() usernameChange = new EventEmitter<string>();
    @Output() passChange = new EventEmitter<string>();
    @Output() firstChange = new EventEmitter<string>();
    @Output() lastChange = new EventEmitter<string>();
    @Output() emailChange = new EventEmitter<string>();
    @Output() rpassChange = new EventEmitter<string>();

    updateUser(val: string) {
        this.username = val;
        this.usernameChange.emit(this.username);
    }
    updatePass(val: string) {
        this.password = val;
        this.passChange.emit(this.password);
    }
    updateEmail(val: string) {
        this.email = val;
        this.emailChange.emit(this.email);
    }
    updateFirst(val: string) {
        this.firstname = val;
        this.firstChange.emit(this.firstname);
    }
    updateLast(val: string) {
        this.lastname = val;
        this.lastChange.emit(this.lastname);
    }
    updateRpass(val: string) {
        this.rpassword = val;
        this.rpassChange.emit(this.rpassword);
    }

    constructor(public router: Router, public authenticationService : AuthenticationService) {}

    ngOnInit() {}

    onRegister() {
        this.user = new User();
        this.user.first_name = this.firstname;
        this.user.last_name = this.lastname;
        this.user.email = this.email;
        this.user.password = this.password;
        this.user.user_name = this.username;
        this.authenticationService.register(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                });
    }
}
