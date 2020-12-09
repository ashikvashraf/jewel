import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURLs } from './constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = ' https://telecaller-dev.app.vazhemadomprints.com/api/';
  params: URLSearchParams = new URLSearchParams();

  constructor(private http: HttpClient) {}

  Login(data): Observable<any> {
    const httpOptions1: Object = {
      // headers : this.headers,
      observe: 'response',
    };
    return this.http.post(this.baseURL + `v1/login/`, data, httpOptions1);
  }
  getAreaLists() {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      observe: 'response',
    };
    return this.http.get(this.baseURL + apiURLs.area, httpOptions);
  }
  getAgents() {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      observe: 'response',
    };
    return this.http.get(this.baseURL + apiURLs.agents, httpOptions);
  }
  getCustomers(value) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      observe: 'response',
    };
    console.log(value);
    return this.http.get(
      this.baseURL + apiURLs.customers + `?area=${value}`,
      httpOptions
    );
  }
  getCustomersbyAgent(value) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      observe: 'response',
    };
    console.log(value);
    return this.http.get(
      this.baseURL + apiURLs.getcustomerbyagent + `${value}/`,
      httpOptions
    );
  }
  assignCustomers(payload) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      observe: 'response',
    };
    return this.http.post(
      this.baseURL + apiURLs.assignCustomers,
      payload,
      httpOptions
    );
  }
}
