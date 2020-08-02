import { Component, OnInit,ViewChild } from '@angular/core';
import { siderList } from "../constants";
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;
  @ViewChild('closebutton') closebutton;

  currentPage = 0;
  selectedPage : any = {};
  addResident: any = {};
  siderItems = siderList
  security: any = [];
  employeeTypes: any = [];
  deletesecurityID : any = {};
  loading = true;
  btnLoading = false;

  constructor(public dataservice: DataService) { }

  ngOnInit(): void {
    this.getSecurity();
  }
  getSecurity() {
    this.loading = true;
    this.dataservice.getSecurity().subscribe((result:any) => {
      this.security = result.body.data;
      console.log("getSecurity",this.security)
      this.loading = false;
    });
  }
  deleteSecurity(item) {
    this.deletesecurityID = item;
    console.log(this.deletesecurityID);
  }
  deleteSecurityConfirm(check) {
    console.log(check);
    this.dataservice.deleteResidents(this.deletesecurityID.id).subscribe((result) => {
      console.log(result);
      this.getSecurity();
      location.reload();
    })
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    console.log("changeData", changeData);
    this.selectedPage = this.siderItems.filter(rooms => rooms.id == changeData);
    console.log("filter",this.selectedPage);
  }
  FormSubmit() {
    this.btnLoading = true;
    this.addResident = this.usForm.value;
    console.log(this.addResident, 'formvalue');
    this.dataservice.AddEmployee(this.addResident).subscribe((result) => {
      console.log(result);
      if (result.data.createUser) {
        this.btnLoading = false;
        alert('Security personnel created successfully!');
        this.getSecurity();
        this.closebutton.nativeElement.click();
        location.reload();
      } else {
        this.btnLoading = false;
        alert('Failed. Please check the fields!');
      }
    });
  }
}
