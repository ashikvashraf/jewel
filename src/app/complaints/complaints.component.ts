import { Component, OnInit, ViewChild } from '@angular/core';
import { siderList } from '../constants';
import { DataService } from '../data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  siderItems = siderList;
  currentPage = 0;
  selectedPage: any = {};
  complaints: any = [];
  updateStatusObj : any = {};
  loading = true;
  btnLoading = false;

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.getComplaints();
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    this.selectedPage = this.siderItems.filter(
      (rooms) => rooms.id == changeData
    );
  }
  dateConvert(rawdate) {
    let date = formatDate(rawdate, 'MMM d, y, h:mm:ss a', 'en');
    return date;
  }
  getComplaints() {
    this.loading = true;
    this.dataservice.getComplaints().subscribe((result:any) => {
      console.log("getComplaints",result.body);
      this.complaints = result.body;
      this.loading = false;
    });
  }
  updateStatus(item) {
    this.updateStatusObj = item;
    console.log(this.updateStatusObj);
  }
  updateStatusConfirm(status) {
    this.btnLoading = true;
    console.log(status);
    this.dataservice.updateComplaintStatus(status,this.updateStatusObj.id).subscribe((result) => {
      console.log(result);
      this.closebutton.nativeElement.click();
      this.getComplaints();
      this.btnLoading = false;
      // location.reload();
    })
  }
}
