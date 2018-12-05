import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import {Login} from '../models/login';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AnalyticService {

    public loggedIn: Login = JSON.parse(localStorage.getItem('currentUser'));
    public headers: HttpHeaders;
    url: string;
    constructor(private http: HttpClient, private alertService: AlertService) {
        this.url = 'http://localhost:5000';
        this.headers = new HttpHeaders().set('Authorization', this.loggedIn.token);
    }

    get_user_events() {
        return this.http.get<any>(this.url + `/analytics/user-events`)
            .pipe(map(response => {
                return response;
            }));
    }

    get_user_targets() {
        return this.http.get<any>(this.url + `/analytics/user-targets`)
            .pipe(map(response => {
                return response;
            }));
    }

    get_user_emotion() {
        return this.http.get<any>(this.url + `/analytics/user-emotions`)
            .pipe(map(response => {
                return response;
            }));
    }

    search(query, index) {
        return this.http.post<any>(this.url + '/search/results', { query: query, index : index })
            .pipe(map(result => {
                return result;
        }));
    }

    get_course() {
        return this.http.get<any>(this.url + '/courses', { headers: this.headers })
            .pipe(map(result => {
                return result;
        }));
    }

    get_post(groupId, user_flag) {
        return this.http.get<any>(this.url + '/get-posts?groups=' + groupId + '&user_flag=' + user_flag, { headers: this.headers })
            .pipe(map(result => {
                return result;
        }));
    }

    get_sub_topic(code) {
        return this.http.get<any>(this.url + '/sub/topics?code=' + code, { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    create_post(post) {
        return this.http.post<any>(this.url + '/create/post', post,
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    get_sticky_note() {
        return this.http.get<any>(this.url + '/sticky/notes', { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    create_sticky_note(note) {
        return this.http.post<any>(this.url + '/create/sticky/note', note,
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    invalidate_sticky_note(id) {
        return this.http.post<any>(this.url + '/invalidate/sticky/note', { id: id },
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    create_group(group) {
        return this.http.post<any>(this.url + '/create/group', group,
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    add_user(group) {
        return this.http.post<any>(this.url + '/add-user/group', group,
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    find_user_groups() {
        return this.http.get<any>(this.url + '/get/groups/user',
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    search_group(search) {
        return this.http.get<any>(this.url + '/get/groups?search=' + search,
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    upvote(id) {
        return this.http.post<any>(this.url + '/upvote', {'_id' : id},
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    downvote(id) {
        return this.http.post<any>(this.url + '/downvote', {'_id' : id},
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    markRead(id) {
        return this.http.post<any>(this.url + '/pin-post', {'_id' : id},
            { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

}
