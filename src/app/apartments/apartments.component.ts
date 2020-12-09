import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { siderList, fieldAgentColumnDefs, filteredCustomerColumnDefs } from '../constants';
import { DataService } from '../data.service';
import { Visitor } from '../_models/visitors';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  assignForm = this.fb.group({
    user: ['', Validators.required],
  });

  currentUser;
  currentPage = 0;
  selectedPage: any = {};
  payload: any = {};
  siderItems = siderList;
  columnDefs = fieldAgentColumnDefs;
  customerColumnDefs = filteredCustomerColumnDefs;
  rowSelection = 'single';
  buildings: any;
  agents: any = {};
  areaFilter: '';
  selectedRows: any = [];
  loading = true;

  constructor(public dataservice: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAreaLists();
    // this.getCustomers();
  }
  getCustomers() {
    this.dataservice
      .getCustomersbyAgent(this.selectedRows[0].id)
      .subscribe((result: any) => {
        this.buildings = Array.from(result.body.data, (x:any) => x.customer) ;
        console.log('getCustomers', this.buildings);
        this.loading = false;
      });
  }
  getAreaLists() {
    this.loading = true;
    this.dataservice.getAgents().subscribe((result: any) => {
      this.agents = result.body.data;
      console.log('areaList', this.agents);
      this.loading = false;
    });
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
}
