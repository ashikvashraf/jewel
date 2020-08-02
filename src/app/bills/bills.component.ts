import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import { siderList,months } from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;
  @ViewChild('closebutton') closebutton;

  siderItems = siderList;
  months = months;
  currentPage = 0;
  selectedPage: any = {};
  bills: any = [];
  buildings: any = [];
  apartments: any = [];
  maintenanceFeeTypes: any = [];
  generateBill: any = {};
  selectedBuilding;
  loading = true;

  constructor(public dataservice: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getBills();
    this.getBuildings();
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
  navToMaintenance() {
    this.router.navigate(["maintenance_fee"]);
  }
  getBuildings() {
    this.dataservice.getBuildings().subscribe((result: any) => {
      this.buildings = result.body.data;
      console.log('getBuildings', this.buildings);
    });
    this.dataservice.getMaintenanceFeeTypes().subscribe((result: any) => {
      this.maintenanceFeeTypes = result.body;
      console.log('maintenanceFeeTypes', this.maintenanceFeeTypes);
    });
  }
  monthConvert(month) {
    switch (month) {
      case 1:
        return 'January';
        break;
      case 2:
        return 'February';
        break;
      case 3:
        return 'March';
        break;
      case 4:
        return 'April';
        break;
      case 5:
        return 'May';
        break;
      case 6:
        return 'June';
        break;
      case 7:
        return 'July';
        break;
      case 8:
        return 'August';
        break;
      case 9:
        return 'September';
        break;
      case 10:
        return 'October';
        break;
      case 11:
        return 'November';
        break;
      case 12:
        return 'December';
        break;
    }
  }
  buildingOnChange(selected) {
    this.loading = true;
    console.log(selected);
    this.selectedBuilding = selected;
    this.dataservice.getBillsbyBuilding(selected).subscribe((result: any) => {
      this.bills = result.body.data;
      console.log('getBills', this.bills);
      this.loading = false;
    });
    this.dataservice
      .getApartmentsbyBuilding(selected)
      .subscribe((result: any) => {
        this.apartments = result.body.data;
        console.log('getApartmentsbyBuilding', this.apartments);
      });
  }
  apartmentOnChange(selected) {
    this.loading = true;
    this.dataservice.getBillsbyApartment(selected).subscribe((result: any) => {
      this.bills = result.body.data;
      console.log('getBills', this.bills);
      this.loading = false;
    });
  }
  getBills() {
    this.dataservice.getBills().subscribe((result: any) => {
      this.bills = result.body.data;
      this.loading = false;
      console.log('getBills', this.bills);
    });
  }
  FormSubmit() {
    this.generateBill = this.usForm.value;
    console.log(this.generateBill, 'formvalue');
    this.dataservice
      .generateBills(this.generateBill)
      .subscribe((result: any) => {
        console.log(result);
        if (result.status == 201) {
          alert('Bills created successfully!');
          this.getBills();
          this.closebutton.nativeElement.click();
          // location.reload();
        } else {
          alert('Failed. Please check the fields!');
        }
      });
  }
}
