import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`http://localhost:5000/user`)
            .pipe(map(data => {
                return data;
            }));
    }

    getById(id: number) {
        return this.http.get(`localhost:5000/users/` + id);
    }
    //
    // register( ) {
    //     return this.http.post(`localhost:5000/users/register`, user);
    // }
    //
    // update() {
    //     return this.http.put(`localhost:5000/users/` + user.id, user);
    // }
    //
    // delete(id: number) {
    //     return this.http.delete(`localhost:5000/users/` + id);
    // }
}
