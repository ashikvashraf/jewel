import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList } from '../constants';
import { DataService } from '../data.service';
import { Visitor } from '../_models/visitors';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  buildingForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
  });

  currentUser;
  currentPage = 0;
  selectedPage: any = {};
  addVisitors: any = {};
  siderItems = siderList;
  buildings: Visitor;
  deleteID: any = {};
  loading = true;
  btnLoading = false;
  buildingName = 'test';
  isNewForm = true;
  editId;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getBuildings();
  }
  formReset() {
    this.isNewForm = true;
    this.buildingForm.reset();
  }
  updateForm(item) {
    this.editId = item.id;
    this.isNewForm = false;
    this.buildingForm.patchValue({
      name: item.name,
      address: item.address,
      description: item.description,
    });
  }
  getBuildings() {
    this.loading = true;
    this.dataservice.getBuildings().subscribe((result: any) => {
      this.buildings = result.body.data;
      console.log('getBuildings', this.buildings);
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
  FormSubmit() {
    this.btnLoading = true;
    this.addVisitors = this.buildingForm.value;
    this.addVisitors.community = localStorage.getItem('community');
    console.log(this.addVisitors, 'formvalue');
    if (this.isNewForm === true) {
      this.dataservice
        .addBuildings(this.addVisitors)
        .subscribe((result: any) => {
          console.log('FormSubmit', result);
          if (result.status === 201) {
            alert('Building created successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getBuildings();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    } else {
      this.dataservice
        .editBuildings(this.addVisitors, this.editId)
        .subscribe((result: any) => {
          console.log('FormSubmit', result);
          if (result.status === 200) {
            alert('Building edited successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getBuildings();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    }
  }
  deleteBuilding(item) {
    this.deleteID = item;
    console.log(this.deleteID);
  }
  deleteBuildingConfirm(check) {
    console.log(check);
    this.dataservice.deleteBuildings(this.deleteID.id).subscribe((result) => {
      console.log(result);
      this.getBuildings();
      location.reload();
    });
  }
}
