import { Component, OnInit, ViewChild } from '@angular/core';
import { siderList } from '../constants';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss'],
})
export class ResidentsComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;
  @ViewChild('closebutton') closebutton;

  currentPage = 0;
  selectedPage: any = {};
  addResident: any = {};
  siderItems = siderList;
  residents: any = [];
  buildings: any = [];
  apartments: any = [];
  apartmentsUnfiltered: any = [];
  deleteEmploye: any = {};
  loading = true;
  btnLoading = false;

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.getResidents();
    this.getBuildings();
  }
  getResidents() {
    this.loading = true;
    this.dataservice.getResidents().subscribe((result: any) => {
      console.log('getResidents', result.body);
      this.residents = result.body;
      this.loading = false;
    });
  }
  getBuildings() {
    this.dataservice.getBuildings().subscribe((result: any) => {
      this.buildings = result.body.data;
    });
    this.dataservice.getApartments().subscribe((result: any) => {
      this.apartmentsUnfiltered = result.body.data;
      console.log(this.apartments, 'Apartments');
    });
  }
  buildingOnChange(selected) {
    console.log(selected);
    this.apartments = this.apartmentsUnfiltered.filter(
      (items) => items.building == selected
    );
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    this.selectedPage = this.siderItems.filter(
      (rooms) => rooms.id == changeData
    );
  }
  deleteResidents(item) {
    this.deleteEmploye = item;
    console.log(this.deleteEmploye);
  }
  deleteResidentsConfirm(check) {
    console.log(check);
    this.dataservice
      .deleteResidents(this.deleteEmploye.id)
      .subscribe((result) => {
        console.log(result);
        this.getResidents();
        location.reload();
      });
  }
  FormSubmit() {
    this.btnLoading = true;
    this.addResident = this.usForm.value;
    // this.addResident.user = localStorage.getItem("user_id");
    console.log(this.addResident, 'formvalue');
    this.dataservice.AddResidents(this.addResident).subscribe((result: any) => {
      console.log(result);
      if (result.status == 201) {
        this.btnLoading = false;
        alert('Resident created successfully!');
        this.getResidents();
        this.closebutton.nativeElement.click();
        // location.reload();
      } else {
        this.btnLoading = false;
        alert('Failed. Please check the fields!');
      }
    });
  }
}
