import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log('curentuser', this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  login(data) {
    return this.http.post<any>(`${environment.apiUrl}administration/login/`, data).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.data) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('user_id', user.data.user_data.user);
          // localStorage.setItem('user_name', user.user.name);
          localStorage.setItem('location', user.data.user_data.location);
          localStorage.setItem('location_name', user.data.user_data.location_name);
          localStorage.setItem('community', user.data.user_data.community);
          localStorage.setItem('community_name', user.data.user_data.community_name);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
