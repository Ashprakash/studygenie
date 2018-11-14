import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable()
export class AnalyticService {
    constructor(private http: HttpClient, private alertService: AlertService) { }

    get_user_events() {
        return this.http.get<any>(`http://localhost:5000/analytics/user-events`)
            .pipe(map(response => {
                return response;
            }));
    }

    get_user_targets() {
        return this.http.get<any>(`http://localhost:5000/analytics/user-targets`)
            .pipe(map(response => {
                return response;
            }));
    }

    get_user_emotion() {
        return this.http.get<any>(`http://localhost:5000/analytics/user-emotions`)
            .pipe(map(response => {
                return response;
            }));
    }

    search(query, index) {
        console.log(index)
        return this.http.post<any>('http://localhost:5000/search/results', { query: query, index : index })
            .pipe(map(result => {
                return result;
            }));
    }

}
