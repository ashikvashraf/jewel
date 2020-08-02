import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { siderList } from '../constants';

@Component({
  selector: 'app-maintenance-fee',
  templateUrl: './maintenance-fee.component.html',
  styleUrls: ['./maintenance-fee.component.scss'],
})
export class MaintenanceFeeComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  feeForm = this.fb.group({
    fee_type: ['', Validators.required],
    amount: ['', Validators.required],
    is_active: [true],
  });

  currentPage = 0;
  selectedPage: any = {};
  siderItems = siderList;
  deleteID: any = {};
  addFees: any = {};
  maintenanceFees: any = [];
  loading = true;
  btnLoading = false;
  isNewForm = true;
  editId;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getMaintenanceFees();
  }
  OnChange(changeData) {
    this.currentPage = changeData;
    console.log('changeData', changeData);
    this.selectedPage = this.siderItems.filter(
      (rooms) => rooms.id == changeData
    );
    console.log('filter', this.selectedPage);
  }
  getMaintenanceFees() {
    this.loading = true;
    this.dataservice.getMaintenanceFeeTypes().subscribe((result: any) => {
      this.maintenanceFees = result.body;
      console.log('getMaintenanceFees', this.maintenanceFees);
      this.loading = false;
    });
  }
  deleteFee(item) {
    this.deleteID = item;
    console.log(this.deleteID);
  }
  deleteFeeConfirm(check) {
    console.log(check);
    this.dataservice.deleteFees(this.deleteID.id).subscribe((result) => {
      console.log(result);
      this.getMaintenanceFees();
      location.reload();
    });
  }
  formReset() {
    this.isNewForm = true;
    this.feeForm.reset();
  }
  updateForm(item) {
    this.editId = item.id;
    this.isNewForm = false;
    this.feeForm.patchValue({
      fee_type: item.fee_type,
      amount: item.amount,
      is_active: item.is_active,
    });
  }
  FormSubmit() {
    this.btnLoading = true;
    this.addFees = this.feeForm.value;
    this.addFees.community = localStorage.getItem('community');
    console.log(this.addFees, 'formvalue');
    if (this.isNewForm === true) {
      this.dataservice.AddFees(this.addFees).subscribe((result: any) => {
        console.log('FormSubmit', result);
        if (result.status === 201) {
          alert('Fees created successfully!');
          this.btnLoading = false;
          this.closebutton.nativeElement.click();
          this.getMaintenanceFees();
          location.reload();
        } else {
          this.btnLoading = false;
          alert('Failed. Please check the fields!');
        }
      });
    } else {
      this.dataservice
        .editFees(this.addFees, this.editId)
        .subscribe((result: any) => {
          console.log('FormSubmit', result);
          if (result.status === 200) {
            alert('Fees edited successfully!');
            this.btnLoading = false;
            this.closebutton.nativeElement.click();
            this.getMaintenanceFees();
            location.reload();
          } else {
            this.btnLoading = false;
            alert('Failed. Please check the fields!');
          }
        });
    }
  }
}
