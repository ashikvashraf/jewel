import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { apiURLs } from './constants';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`,
  }),
  observe: 'response',
};
@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = 'http://homesafe-dev.live.untanglestrategy.com/api/';
  params: URLSearchParams = new URLSearchParams();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`,
  });

  constructor(private http: HttpClient, private apollo: Apollo) {}

  Login(data): Observable<any> {
    const httpOptions1: Object  = {
      // headers : this.headers,
      observe: 'response',
    };
    return this.http.post(this.baseURL + `auth/local`, data, httpOptions1);
  }
  getResidents() {
    return this.http.get(this.baseURL + apiURLs.residents, httpOptions);
  }

  getVisitors() {
    return this.http.get(
      this.baseURL + apiURLs.visitors + `${localStorage.getItem('community')}`,
      httpOptions
    );
  }
  getBills() {
    return this.http.get(
      this.baseURL + apiURLs.billing + `${localStorage.getItem('community')}/`,
      httpOptions
    );
  }
  getBillsbyBuilding(building) {
    return this.http.get(
      this.baseURL + apiURLs.billingbyBuilding + `${building}/`,
      httpOptions
    );
  }
  getBillsbyApartment(apartment) {
    return this.http.get(
      this.baseURL + apiURLs.billingbyApartment + `${apartment}/`,
      httpOptions
    );
  }
  getMaintenanceFeeTypes() {
    return this.http.get(this.baseURL + apiURLs.maintenanceFeeTypes, httpOptions);
  }
  deleteEmployee(id) {
    return this.http.delete(this.baseURL + `users/` + `${id}`, httpOptions);
  }
  getBuildings() {
    return this.http.get(
      this.baseURL +
        apiURLs.buildings +
        `${localStorage.getItem('community')}/`,
      httpOptions
    );
  }
  getApartments() {
    return this.http.get(
      this.baseURL +
        apiURLs.apartments +
        `${localStorage.getItem('community')}/`,
      httpOptions
    );
  }
  getApartmentsbyBuilding(building) {
    return this.http.get(
      this.baseURL +
        apiURLs.apartmentsbyBuilding +
        `${building}/`,
      httpOptions
    );
  }
  getNotices() {
    return this.http.get(this.baseURL + apiURLs.noticeBoard, httpOptions);
  }
  getComplaints() {
    return this.http.get(this.baseURL + apiURLs.complaints, httpOptions);
  }
  getSecurity() {
    return this.http.get(
      this.baseURL + apiURLs.security + `${localStorage.getItem('community')}`,
      httpOptions
    );
  }
  deleteAparments(deleteItems) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      body: {
        delete_ids: [deleteItems],
      },
    };
    return this.http.delete(this.baseURL + apiURLs.addApartments, options);
  }
  deleteBuildings(deleteItems) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      body: {
        delete_ids: [deleteItems],
      },
    };
    return this.http.delete(this.baseURL + apiURLs.addBuildings, options);
  }
  deleteResidents(deleteItems) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      body: {
        delete_ids: [deleteItems],
      },
    };
    return this.http.delete(this.baseURL + apiURLs.addResidents, options);
  }
  deleteNotices(deleteItems) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      body: {
        delete_ids: [deleteItems],
      },
    };
    return this.http.delete(this.baseURL + apiURLs.noticeBoard, options);
  }
  deleteFees(deleteItems) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      }),
      body: {
        delete_ids: [deleteItems],
      },
    };
    return this.http.delete(this.baseURL + apiURLs.maintenanceFeeTypes, options);
  }
  updateComplaintStatus(status, id) {
    const body = {
      status: status,
    };
    return this.http.put(
      this.baseURL + apiURLs.updateComplaitStatus + `${id}/`,
      body,
      httpOptions
    );
  }
  addBuildings(visitor) {
    return this.http.post(
      this.baseURL + apiURLs.addBuildings,
      visitor,
      httpOptions
    );
  }
  editBuildings(visitor,id) {
    return this.http.patch(
      this.baseURL + apiURLs.editBuildings + `${id}/`,
      visitor,
      httpOptions
    );
  }
  addApartments(visitor) {
    return this.http.post(
      this.baseURL + apiURLs.addApartments,
      visitor,
      httpOptions
    );
  }
  editApartments(visitor,id) {
    return this.http.patch(
      this.baseURL + apiURLs.editApartments + `${id}/`,
      visitor,
      httpOptions
    );
  }
  AddResidents(resident) {
    return this.http.post(
      this.baseURL + apiURLs.addResidents,
      resident,
      httpOptions
    );
  }
  searchUser(phone) {
    return this.http.get(
      this.baseURL + apiURLs.searchUser + `${phone}/`,
      httpOptions
    );
  }
  AddNotices(notice) {
    return this.http.post(
      this.baseURL + apiURLs.noticeBoard,
      notice,
      httpOptions
    );
  }
  generateBills(bill) {
    return this.http.post(
      this.baseURL + apiURLs.generateBills,
      bill,
      httpOptions
    );
  }
  AddFees(fees) {
    return this.http.post(
      this.baseURL + apiURLs.maintenanceFeeTypes,
      fees,
      httpOptions
    );
  }
  editFees(fees,id) {
    return this.http.patch(
      this.baseURL + apiURLs.editMaintenanceFeeTypes + `${id}/`,
      fees,
      httpOptions
    );
  }
}
