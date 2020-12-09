import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList, customerColumnDefs } from '../constants';
import { DataService } from '../data.service';
import { Visitor } from '../_models/visitors';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class CustomersComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  assignForm = this.fb.group({
    user: ['', Validators.required],
  });

  currentUser;
  currentPage = 0;
  selectedPage: any = {};
  payload: any = {};
  siderItems = siderList;
  columnDefs = customerColumnDefs;
  rowSelection = 'multiple';
  buildings: Visitor;
  areaList: any = {};
  agents: any = {};
  areaFilter: '';
  selectedRows: any = [];
  deleteID: any = {};
  loading = true;
  btnLoading = false;
  buildingName = 'test';
  isNewForm = true;
  editId;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getAreaLists();
  }
  getCustomers() {
    this.loading = true;
    this.dataservice
      .getCustomers(this.areaFilter ? this.areaFilter : '')
      .subscribe((result: any) => {
        this.buildings = result.body.data;
        console.log('getCustomers', this.buildings);
        this.loading = false;
      });
  }
  getAreaLists() {
    this.dataservice.getAreaLists().subscribe((result: any) => {
      this.areaList = result.body.data;
      console.log('areaList', this.areaList);
    });
    this.dataservice.getAgents().subscribe((result: any) => {
      this.agents = result.body.data;
      console.log('areaList', this.agents);
    });
  }
  filterChange(event) {
    // console.log(event.target.value);
    this.areaFilter = event.target.value;
    this.getCustomers();
  }
  onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
  };

  onSelectionChanged(event) {
    this.selectedRows = event.api.getSelectedRows();
    console.log(this.selectedRows);
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
    this.payload = this.assignForm.value;
    this.payload.customers = Array.from(this.selectedRows, (x:any) => x.id);
    console.log(this.payload, 'formvalue');
    this.dataservice.assignCustomers(this.payload).subscribe((result: any) => {
      console.log('FormSubmit', result);
      if (result.status === 201) {
        alert('Customers assigned successfully!');
        this.btnLoading = false;
        this.closebutton.nativeElement.click();
        this.getCustomers();
        // location.reload();
      } else {
        this.btnLoading = false;
        alert('Failed. Please check the fields!');
      }
    });
  }
}
