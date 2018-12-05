import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Login} from '../../shared/models/login';
import {AuthenticationService, AnalyticService, UserService} from '../../shared/services';
import {first} from 'rxjs/operators';
import {ModalComponent, TimelineComponent} from './components';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public loggedIn: Login = JSON.parse(localStorage.getItem('currentUser'));
    public courses: any;
    public subTopics: any;
    public selectedCourseCode: any;
    public selectedSubtopic: any;
    public post: any;
    public isCreateNote: boolean;
    public userStickyNote: any;
    public colors: Array<any> = [];
    public isNewNote: boolean = false;
    public allLeftPost: Array<any> = [];
    public allRightPost: Array<any> = [];
    public selectedTags: Array<any> = [];
    @Input() new_note: string = '';
    @Input() title: string = '';
    @Input() content: string = '';
    @Input() search: string = '';
    @Output() titleChange = new EventEmitter<string>();
    @Output() contentChange = new EventEmitter<string>();
    @Output() newNoteChange = new EventEmitter<string>();
    @Output() searchChange = new EventEmitter<string>();
    @ViewChild(TimelineComponent) timeline: TimelineComponent;
    @ViewChild(ModalComponent) modal: ModalComponent;

    public groupSelected: string;
    public userflag: number;

    updateTitle(val: string) {
        this.title = val;
        this.titleChange.emit(this.title);
    }

    updateContent(val: string) {
        this.content = val;
        this.contentChange.emit(this.content);
    }

    updateNewNote(val: string) {
        this.new_note = val;
        this.newNoteChange.emit(this.new_note);
    }

    updateSearch(val: string) {
        this.search = val;
        this.searchChange.emit(this.search);
    }

    constructor(public analyticService: AnalyticService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Web Programming',
                text:
                    ' Recent notes added, check out'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Machine Learning',
                text:
                    'Recent trending courses of all'
            },
            {
                imagePath: 'assets/images/slider1.png',
                label: 'Data Structures',
                text: 'Check the cheat sheets'
            }
        );

        this.colors.push(
            'success',
            'warning',
            'primary',
            'default',
            'white'
        );
        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: ``
            },
            {
                id: 2,
                type: 'warning',
                message: ``
            }
        );
    }

    ngOnInit() {
        this.groupSelected = '';
        this.userflag = 0;
        this.isCreateNote = false;
        this.get_courses();
        this.get_sticky_note();
    }

    toggleAddNote() {
        if (this.isNewNote === false) {
            this.isNewNote = true;
        } else {
            this.isNewNote = false;
        }
    }

    searchNotes() {

    }

    createStickyNote() {
        this.isNewNote = false;
        const note = { 'content' : this.new_note };
        this.analyticService.create_sticky_note(note)
            .pipe(first())
            .subscribe(
                data => {
                    this.get_sticky_note();
                    this.new_note = '';
                },
                error => {
                });
    }

    invalidateStickyNote(id) {
        console.log(id);
        this.analyticService.invalidate_sticky_note(id)
            .pipe(first())
            .subscribe(
                data => {
                    this.get_sticky_note();
                },
                error => {
                });
    }

    get_my_notes() {
        this.userflag = 1;
        this.get_post();
    }

    get_trending() {
        this.userflag = 0;
        this.get_post();
    }

    get_recommended() {
        this.userflag = 0;
        this.get_post();
    }

    get_sticky_note() {
        this.analyticService.get_sticky_note()
            .pipe(first())
            .subscribe(
                data => {
                    this.alerts = [];
                    this.userStickyNote = data;
                    let i = 0;
                    for (const c of data) {
                        this.alerts.push({
                            id: c._id.$oid,
                            type: this.colors[i],
                            message : c.content
                        });
                        i = i + 1;
                        if (i === 5) {
                            i = 0;
                        }
                    }
                },
                error => {
             });
    }

    get_post() {
        this.timeline.get_post(this.groupSelected, this.userflag);
    }

    get_create_note() {
        if (this.isCreateNote) {
            this.isCreateNote = false;
        } else {
            this.isCreateNote = true;
        }
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

    select_sub_topic(topic) {
        this.selectedSubtopic = topic;
        const data: any = this.subTopics;
        this.selectedTags = [];
        for (const c of data) {
            if (c.name === topic) {
                for (const tag in c.tags) {
                    this.selectedTags.push({
                        name: c.tags[tag],
                        isSelected: false
                    });
                }
                break;
            }
        }
    }

    markTagSelected(each) {
        if (each.isSelected) {
            each.isSelected = false;
        } else{
            each.isSelected = true;
        }
    }

    get_sub_topic(code) {
        this.analyticService.get_sub_topic(code)
            .pipe(first())
            .subscribe(
                data => {
                    this.subTopics = data;
                    this.selectedCourseCode = code;
                    this.selectedSubtopic = this.subTopics[0];
                    console.log(this.subTopics);
                },
                error => {
                });
    }

    create_post() {
        const tags: Array<any> = [];
        const temp: any = this.selectedTags;
        for(const c of temp) {
            if (c.isSelected) {
                tags.push(c.name);
            }
        }
        const post = { 'title' : this.title, 'tags' : tags, 'content': this.content, 'code' : this.selectedCourseCode, 'subTopic': this.selectedSubtopic };
        this.analyticService.create_post(post)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(this.subTopics);
                    this.reset();
                    this.isCreateNote = false;
                },
                error => {
                });
    }

    reset() {
        this.title = '';
        this.content = '';
        this.selectedCourseCode = '';
        this.selectedSubtopic = {};
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        const sticky_note: any  = this.alerts[index];
        console.log(sticky_note);
        this.invalidateStickyNote(sticky_note.id);
        this.alerts.splice(index, 1);
    }

    getDashboardApi(): DashboardComponentApi {
        return {
            callOpenModel: (post) => {
                this.modal.open(post);
            }
        };
    }
}

export interface DashboardComponentApi {
    callOpenModel: (string) => void;
}
