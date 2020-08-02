import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList } from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  apartmentForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
    building: ['', Validators.required],
  });

  currentPage = 0;
  selectedPage: any = {};
  apartments: any = [];
  buildings: any = [];
  addApartment: any = {};
  siderItems = siderList;
  deleteID: any = {};
  loading = true;
  btnLoading = false;
  isNewForm = true;
  editId;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getApartments();
    this.getBuildings();
  }
  formReset() {
    this.isNewForm = true;
    this.apartmentForm.reset();
  }
  updateForm(item) {
    this.editId = item.id;
    this.isNewForm = false;
    this.apartmentForm.patchValue({
      name: item.name,
      address: item.address,
      description: item.description,
      building: item.building,
    });
  }
  getApartments() {
    this.loading = true;
    this.dataservice.getApartments().subscribe((result: any) => {
      this.apartments = result.body.data;
      console.log('getapartments', this.apartments);
      this.loading = false;
    });
  }
  getBuildings() {
    this.dataservice.getBuildings().subscribe((result: any) => {
      this.buildings = result.body.data;
      console.log('getBuildings', this.buildings);
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
    this.addApartment = this.apartmentForm.value;
    console.log(this.addApartment, 'formvalue');
    if (this.isNewForm === true) {
      this.dataservice
        .addApartments(this.addApartment)
        .subscribe((result: any) => {
          console.log('FormSubmit', result);
          if (result.status === 201) {
            alert('Apartment created successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getApartments();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    } else {
      this.dataservice
        .editApartments(this.addApartment, this.editId)
        .subscribe((result: any) => {
          console.log('FormSubmit', result);
          if (result.status === 200) {
            alert('Apartment edited successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getApartments();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    }
  }
  deleteApartment(item) {
    this.deleteID = item;
    console.log(this.deleteID);
  }
  deleteApartmentConfirm(check) {
    console.log(check);
    this.dataservice.deleteAparments(this.deleteID.id).subscribe((result) => {
      console.log(result);
      this.getApartments();
      location.reload();
    });
  }
}
