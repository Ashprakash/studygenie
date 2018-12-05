import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AnalyticService, AlertService, UserService} from '../../shared/services';
import {first} from 'rxjs/operators';
import {Login} from '../../shared/models/login';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {

    public eventData: any[];
    public targetData: any[];
    public emotionData: any[];
    public allUsers: any[];
    public currentUser: Login = JSON.parse(localStorage.getItem('currentUser'));
    public currentTargetData: any;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;


    public eventBarChartLabels: string[] = ['enqueue', 'dequeue', 'algorithms', 'ml', 'memory', 'LIFO', 'FIFO'];
    public eventBarHeader: string = '';
    public eventBarChartData: any[] = [{ data: [5, 3, 2, 6, 2, 2, 7], label: 'Tags chart'}];

    public emotionBarChartLabels: string[] = ['Data Structures', 'Web Programming', 'Algorithms', 'Machine Learning', 'Latex'];
    public emotionBarHeader: string = '';
    public emotionBarChartData: any[] = [{ data: [5, 3, 7, 5, 6], label: 'Posts chart' }];

    public targetBarChartLabels: string[] = [];
    public targetBarHeader: string = '';
    public targetBarChartData: any[] = [{ data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' }];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    get_user_events() {
        this.analyticService.get_user_events().pipe(first())
            .subscribe(
                data => {
                    this.eventData = data;
                    console.log(this.eventData);
                    this.set_event_data(this.currentUser.user_name);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    get_user_targets() {
        this.analyticService.get_user_targets().pipe(first())
            .subscribe(
                data => {
                    this.targetData = data;
                    console.log(this.targetData);
                    this.set_target_data(this.currentUser.user_name);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    get_user_emotions() {
        this.analyticService.get_user_emotion().pipe(first())
            .subscribe(
                data => {
                    this.emotionData = data;
                    console.log(this.emotionData);
                    this.set_emotion_data(this.currentUser.user_name);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    set_event_data(username) {
        this.eventData.forEach( user => {
            if (user.user_name === username) {
                this.eventBarChartData[0].data = user.count;
                this.eventBarChartData[0].label = 'Event';
                this.eventBarChartLabels = user.event;
                this.eventBarHeader = user.user_name;
            }
        });
    }

    set_emotion_data(username) {
        this.emotionData.forEach( user => {
            if (user.user_name === username) {
                this.emotionBarChartData[0].data = user.count;
                this.emotionBarChartData[0].label = 'Emotions';
                this.emotionBarChartLabels = user.actions;
                this.emotionBarHeader = user.user_name;
            }
        });
    }

    set_target_data(username) {
        this.targetData.forEach( user => {
            if (user.user_name === username) {
                this.currentTargetData =  user.target;
                this.targetBarHeader = user.user_name;
            }
        });
    }


    constructor(public analyticService: AnalyticService,
                public alertService: AlertService,
                public userService: UserService
                ) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(
                data => {
                    this.allUsers = data;
                    this.get_user_events();
                    this.get_user_targets();
                    this.get_user_emotions();
                },
                error => {
                    this.alertService.error(error);
                });
    }

    onClickUser(username) {
        this.set_event_data(username);
        this.set_target_data(username);
    }

}
