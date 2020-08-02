import { Component, OnInit, ViewChild } from '@angular/core';
import { siderList } from '../constants';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.scss'],
})
export class NoticeboardComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;
  @ViewChild('closebutton') closebutton;

  currentPage = 0;
  selectedPage: any = {};
  addNotice: any = {};
  siderItems = siderList;
  notices: any = [];
  buildings: any = [];
  deletenotice: any = {};
  loading = true;
  btnLoading = false;

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.getNotices();
    this.getBuildings();
  }
  getNotices() {
    this.loading = true;
    this.dataservice.getNotices().subscribe((result: any) => {
      console.log('getNotices', result.body);
      this.notices = result.body;
      this.loading = false;
    });
  }
  getBuildings() {
    this.dataservice.getBuildings().subscribe((result: any) => {
      this.buildings = result.body.data;
    });
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    this.selectedPage = this.siderItems.filter(
      (rooms) => rooms.id == changeData
    );
  }
  FormSubmit() {
    this.btnLoading = true;
    this.addNotice = this.usForm.value;
    console.log(this.addNotice, 'formvalue');
    this.dataservice.AddNotices(this.addNotice).subscribe((result: any) => {
      console.log(result);
      if (result.status == 201) {
        this.btnLoading = false;
        alert('Notice created successfully!');
        this.getNotices();
        this.closebutton.nativeElement.click();
        location.reload();
      } else {
        this.btnLoading = false;
        alert('Failed. Please check the fields!');
      }
    });
  }
  deleteNotice(item) {
    this.deletenotice = item;
    console.log(this.deletenotice);
  }
  deleteNoticeConfirm(check) {
    console.log(check);
    this.dataservice.deleteNotices(this.deletenotice.id).subscribe((result) => {
      console.log(result);
      this.getNotices();
      location.reload();
    });
  }
}
