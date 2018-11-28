import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AnalyticService} from '../../../../shared/services';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    public allLeftPost: Array<any> = [];
    public allRightPost: Array<any> = [];
    constructor(public analyticService: AnalyticService) { }

    ngOnInit() {
        this.get_post();
    }

    get_post() {
      this.allLeftPost = [];
      this.allRightPost = [];
      this.analyticService.get_post()
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
    }
}
