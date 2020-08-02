import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { siderList } from "../constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentPage = 0;
  selectedPage : any = {};
  constructor(private router: Router) { }
  siderItems = siderList
  ngOnInit(): void {
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    console.log("changeData", changeData);
    this.selectedPage = this.siderItems.filter(rooms => rooms.id == changeData);
    console.log("filter",this.selectedPage);
  }
}
