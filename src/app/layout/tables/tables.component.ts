import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {first} from 'rxjs/operators';
import {AnalyticService} from '../../shared/services';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public courses: Array<any> = [];
    public selectedCourseCode: any;
    public isCreate: boolean = false;
    public userGroups: Array<any> = [];
    public searchedGroups: Array<any>;
    constructor(public analyticService: AnalyticService) {}
    @Input() group_name: string = '';
    @Output() group_name_change = new EventEmitter<string>();
    @Input() search: string = '';
    @Output() search_change = new EventEmitter<string>();

    updateGroupName(val: string) {
        this.group_name = val;
        this.group_name_change.emit(this.group_name);
    }

    updateSearch(val: string) {
        this.search = val;
        this.search_change.emit(this.search);
    }

    ngOnInit() {
        this.get_courses();
        this.findUserGroups();
    }

    searchGroup() {
        this.analyticService.search_group(this.search)
            .pipe(first())
            .subscribe(
                data => {
                    this.searchedGroups = data;
                },
                error => {
                });
    }

    findUserGroups() {
        this.analyticService.find_user_groups()
            .pipe(first())
            .subscribe(
                data => {
                    this.userGroups = data;
                },
                error => {
                });
    }

    set_course_code(code) {
        this.selectedCourseCode = code;
    }

    toggle() {
        if (this.isCreate) {
            this.isCreate = false;
        } else{
            this.isCreate = true;
        }
    }

    createGroup() {
        const group = {
            title : this.group_name,
            code : this.selectedCourseCode
        };
        this.analyticService.create_group(group)
            .pipe(first())
            .subscribe(
                data => {
                    this.isCreate = false;
                    this.searchGroup();
                },
                error => {
                });
    }

    get_courses() {
        this.analyticService.get_course()
            .pipe(first())
            .subscribe(
                data => {
                    this.courses = data;
                    this.selectedCourseCode = this.courses[0].code;
                },
                error => {
        });
    }
}
