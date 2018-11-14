import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AlertService, AnalyticService, UserService} from '../../shared/services';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    public searchText: string;
    public result: any;
    public paginationSize: number;
    public index: string;
    public searchQuery: any[] = ['How do you make a deep copy of an object in Java?',
        'What is the main difference between Inheritance and Polymorphism?',
        'How do I compare strings in Java?',
        'Is Java “pass-by-reference” or “pass-by-value”?',
        'What causes a java.lang.ArrayIndexOutOfBoundsException and how do I prevent it?',
        'How to avoid Java code in JSP files?',
        'How to parse JSON in Java',
        'Whats the simplest way to print a Java array?',
        'What is a stack trace, and how can I use it to debug my application errors?',
        'What issues should be considered when overriding equals and hashCode in Java?',
        'How to generate random integers within a specific range in Java?'];

    constructor(public analyticService: AnalyticService,
                public alertService: AlertService,
                public userService: UserService
    ) {}
    ngOnInit() {
        this.paginationSize = 1;
    }

    search_java(query) {
        this.searchText = query;
        this.index = 'java';
        this.analyticService.search(query, this.index).pipe(first())
            .subscribe(
                data => {
                    this.result = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    search_oracle(query) {
        this.searchText = query;
        this.index = 'oracle_java';
        this.analyticService.search(query, this.index).pipe(first())
            .subscribe(
                data => {
                    this.result = data;
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
