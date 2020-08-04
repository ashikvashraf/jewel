import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList } from '../constants';
import { DataService } from '../data.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  securityForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  currentPage = 0;
  selectedPage: any = {};
  addSecurity: any = {};
  siderItems = siderList;
  security: any = [];
  deletesecurityID: any = {};
  loading = true;
  btnLoading = false;
  isNewForm = true;
  isNewSecurity = true;
  showform = true;
  editItem;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getSecurity();
  }
  changeFormType(value) {
    this.showform = true;
    this.isNewSecurity = value;
    console.log(this.isNewSecurity);
    if (!value) {
      this.securityForm.get('name').disable();
    } else {
      this.securityForm.get('name').enable();
    }
  }
  formReset() {
    this.isNewForm = true;
    this.securityForm.reset();
  }
  // updateForm(item) {
  //   this.editItem = item;
  //   this.isNewForm = false;
  //   this.securityForm.get('phone_number').disable();
  //   this.securityForm.get('email').disable();
  //   this.securityForm.get('flat_user_name').disable();
  //   this.securityForm.patchValue({
  //     name: item.name,
  //     phone: item.number,
  //   });
  // }
  getSecurity() {
    this.loading = true;
    this.dataservice.getSecurity().subscribe((result: any) => {
      this.security = result.body.data;
      console.log('getSecurity', this.security);
      this.loading = false;
    });
  }
  deleteSecurity(item) {
    this.deletesecurityID = item;
    console.log(this.deletesecurityID);
  }
  deleteSecurityConfirm(check) {
    console.log(check);
    this.dataservice
      .deleteSecurity(this.deletesecurityID.id)
      .subscribe((result) => {
        console.log(result);
        this.getSecurity();
        location.reload();
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
  searchUsers() {
    this.btnLoading = true;
    this.dataservice
      .searchUser(this.securityForm.value.phone)
      .subscribe((result: any) => {
        console.log('searchUsers', result.body);
        if (result.body.status === 200) {
          this.securityForm.patchValue({
            name: result.body.data.name,
          });
          this.addSecurity.user = result.body.data.id;
        }
        this.btnLoading = false;
        console.log('this.addResident', this.addSecurity);
      });
  }
  resultHandler(result) {
    console.log(result);
    if (result.body.status === 201) {
      this.btnLoading = false;
      alert('Security personnel created successfully!');
      this.getSecurity();
      this.closebutton.nativeElement.click();
      location.reload();
    } else {
      this.btnLoading = false;
      alert('Failed. Please check the fields!');
    }
  }
  FormSubmit() {
    let payload = {};
    this.btnLoading = true;
    Object.assign(this.addSecurity, this.securityForm.value);
    console.log(this.addSecurity, 'formvalue');
    if (this.isNewSecurity) {
      console.log('in new');
      payload = {
        user_data: {
          name: this.addSecurity.name,
          phone_number: this.addSecurity.phone,
          user_type: 'security',
        },
        community: localStorage.getItem('community'),
      };
    } else {
      console.log('in exist');
      payload = {
        user: this.addSecurity.user,
        community: localStorage.getItem('community'),
      };
    }
    this.dataservice.addSecurity(payload).subscribe((result: any) => {
      this.resultHandler(result);
    });
  }
}
