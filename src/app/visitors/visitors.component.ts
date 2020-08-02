import { Component, OnInit, ViewChild } from '@angular/core';
import { siderList } from '../constants';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Visitor } from '../_models/visitors';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;
  @ViewChild('closebutton') closebutton;
  currentUser;
  currentPage = 0;
  selectedPage: any = {};
  addVisitors: any = {};
  siderItems = siderList;
  visitors: Visitor;
  visitorTypes: any = [];
  loading = true;

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.getVisitors();
  }
  getVisitors() {
    this.loading = true;
    this.dataservice.getVisitors().subscribe((result:any) => {
      this.visitors = result.body.data;
      console.log("getVisitors",this.visitors);
      this.loading = false;
    });
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    console.log('changeData', changeData);
    this.selectedPage = this.siderItems.filter(
      (rooms) => rooms.id == changeData
    );
    console.log('filter', this.selectedPage);
  }
}
