import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Login} from '../../../shared/models/login';
import {first} from 'rxjs/operators';
import { AuthenticationService } from '../../../shared/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    public loggedIn: Login = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private translate: TranslateService, public router: Router, public authenticationService: AuthenticationService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authenticationService.logout(this.loggedIn.user_name)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.removeItem('currentUser');
                    this.router.navigate(['/login']);
                },
                error => {
                });
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
