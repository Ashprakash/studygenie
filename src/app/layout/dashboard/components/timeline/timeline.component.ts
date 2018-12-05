import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {first} from 'rxjs/operators';
import {AnalyticService} from '../../../../shared/services';
import {DashboardComponentApi} from '../../dashboard.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    public allLeftPost: Array<any> = [];
    public allRightPost: Array<any> = [];
    @Input() dashboardApi: DashboardComponentApi;
    constructor(public analyticService: AnalyticService) { }

    ngOnInit() {
        this.get_post('', 0);
    }

    get_post(groupId, user_flag) {
      this.allLeftPost = [];
      this.allRightPost = [];

      this.analyticService.get_post(groupId, user_flag)
            .pipe(first())
            .subscribe(
                data => {
                    let i = 0;
                    for (const c of data) {
                        if (i % 2 === 0) {
                            this.allLeftPost.push(c);
                        } else{
                            this.allRightPost.push(c);
                        }
                        i = i + 1;
                    }
                    console.log(this.allLeftPost);
                    console.log(this.allRightPost);
                },
                error => {
                });
    }

    clickDownVote(post) {
        if (post.isDownVoted) {
            post.isDownVoted = false;
            post.downvotes = post.downvotes - 1;
        } else {
            post.isDownVoted = true;
            post.downvotes = post.downvotes + 1;
        }
        if (post.isDownVoted && post.isUpVoted){
            post.isUpVoted = false;
            post.upvotes = post.upvotes - 1;
        }

        this.analyticService.downvote(post.id)
            .pipe(first())
            .subscribe(
                data => {
                },
                error => {
                });
    }

    clickUpVote(post) {
        if (post.isUpVoted) {
            post.isUpVoted = false;
            post.upvotes = post.upvotes - 1;
        } else {
            post.isUpVoted = true;
            post.upvotes = post.upvotes + 1;
        }
        if (post.isDownVoted && post.isUpVoted){
            post.isDownVoted = false;
            post.downvotes = post.downvotes - 1;
        }

        this.analyticService.upvote(post.id)
            .pipe(first())
            .subscribe(
                data => {
                },
                error => {
        });
    }

    markRead(post) {
        this.analyticService.markRead(post.id)
            .pipe(first())
            .subscribe(
                data => {
                    post.isRead = true;
                },
                error => {
                });
    }


}
