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
    return this.http.post<any>(`${environment.apiUrl}v1/login/`, data).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user.status === 200) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('user_id', user.data.user.id);
          localStorage.setItem('user_name', user.data.user.username);
          localStorage.setItem('name', user.data.user.name);
          localStorage.setItem('email', user.data.user.email);
          localStorage.setItem('phone_number', user.data.user.phone_number);
          localStorage.setItem('key', user.data.user.key);
          localStorage.setItem('user_type', user.data.user.user_type);
          localStorage.setItem('user_type_name', user.data.user.user_type_name);
          localStorage.setItem('is_admin', user.data.user.is_admin);
          localStorage.setItem('branch', user.data.user.branch);
          localStorage.setItem('branch_name', user.data.user.branch_name);
          localStorage.setItem('company', user.data.user.company);
          localStorage.setItem('company_name', user.data.user.company_name);
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
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
