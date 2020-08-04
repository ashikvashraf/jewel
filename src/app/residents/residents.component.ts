import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList } from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss'],
})
export class ResidentsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  residentForm = this.fb.group({
    flat_user_name: ['', Validators.required],
    building: ['', Validators.required],
    apartment: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
  });

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
  isNewForm = true;
  isNewResident = true;
  showform = true;
  editItem;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getResidents();
    this.getBuildings();
  }
  changeFormType(value) {
    this.showform = true;
    this.isNewResident = value;
    console.log(this.isNewResident);
    this.residentForm.get('phone_number').enable();
    if (!value) {
      this.residentForm.get('email').disable();
      this.residentForm.get('flat_user_name').disable();
    } else {
      this.residentForm.get('email').enable();
      this.residentForm.get('flat_user_name').enable();
    }
  }
  formReset() {
    this.isNewForm = true;
    this.residentForm.reset();
  }
  updateForm(item) {
    this.editItem = item;
    this.isNewForm = false;
    this.residentForm.get('phone_number').disable();
    this.residentForm.get('email').disable();
    this.residentForm.get('flat_user_name').disable();
    this.residentForm.patchValue({
      flat_user_name: item.flat_user_name,
      building: item.building,
      apartment: item.apartment,
      phone_number: item.phone_number,
      email: item.email,
      address: item.address,
    });
  }
  getResidents() {
    this.loading = true;
    this.dataservice.getResidents().subscribe((result: any) => {
      console.log('getResidents', result.body);
      this.residents = result.body;
      this.loading = false;
    });
  }
  searchUsers() {
    this.btnLoading = true;
    this.dataservice
      .searchUser(this.residentForm.value.phone_number)
      .subscribe((result: any) => {
        console.log('searchUsers', result.body);
        if (result.body.status === 200) {
          this.residentForm.patchValue({
            flat_user_name: result.body.data.name,
            phone_number: result.body.data.phone_number,
            email: result.body.data.email,
          });
          this.addResident.user = result.body.data.id;
        }
        this.btnLoading = false;
        console.log('this.addResident', this.addResident);
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
  resultHandler(result) {
    console.log(result);
    if (result.status == 201) {
      this.btnLoading = false;
      alert('Resident created successfully!');
      this.getResidents();
      this.closebutton.nativeElement.click();
      location.reload();
    } else {
      this.btnLoading = false;
      alert('Failed. Please check the fields!');
    }
  }
  FormSubmit() {
    this.btnLoading = true;
    Object.assign(this.addResident, this.residentForm.value);
    console.log(this.addResident, 'formvalue');
    if (this.isNewForm === true) {
      if (this.isNewResident) {
        console.log('in new');
        let payload = {
          user_data: {
            name: this.addResident.flat_user_name,
            phone_number: this.addResident.phone_number,
            email: this.addResident.email,
          },
          apartment: this.addResident.apartment,
          address: this.addResident.address,
        };
        this.dataservice.AddResidents(payload).subscribe((result: any) => {
          this.resultHandler(result);
        });
      } else {
        let payload = {
          user: this.addResident.user,
          apartment: this.addResident.apartment,
          address: this.addResident.address,
        };
        console.log(payload, 'in existing', this.addResident.user);
        this.dataservice.AddResidents(payload).subscribe((result: any) => {
          this.resultHandler(result);
        });
      }
    } else {
      this.addResident.user = this.editItem.user;
      console.log(this.addResident);
      this.dataservice
        .editResidents(this.addResident, this.editItem.id)
        .subscribe((result: any) => {
          console.log('Formedit', result);
          if (result.status === 200) {
            alert('Resident edited successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getResidents();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    }
  }
}
