import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { siderList } from "../constants";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {


  @Output() pageChangeEvent = new EventEmitter();

  constructor(private router: Router) { }
  currentPageIndex = 0;
  selectedPage : any = {};
  sider_items = siderList;
  ngOnInit(): void {
  }

  ChangeSelectedPage(item) {
    this.currentPageIndex = item.id;
    this.pageChangeEvent.emit(item.id);
    this.selectedPage = this.sider_items.filter(rooms => rooms.id == item.id);
    this.router.navigate([item.route]);
  }

}
