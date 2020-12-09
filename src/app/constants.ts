export const siderList = [
  { id: 0, name: 'Customers', route: 'customers' },
  { id: 1, name: 'Field Agent', route: 'fieldagent' },
];

export const apiURLs = {
  customers: 'customer/get-customer-list/',
  area: 'masters/area/',
  agents: 'agents/',
  assignCustomers: 'customer/assign-customers/',
  getcustomerbyagent : 'customer/get-customer-by-user/',
  apartments: 'community/apartment/community_id/',
  apartmentsbyBuilding: 'community/apartment/building_id/',
  residents: 'resident/resident/',
  visitors: 'resident/visitors/?community_id=',
  noticeBoard: 'noticeboard/notice_board/',
  complaints: 'complaint/complaints/',
  updateComplaitStatus: 'complaint/complaint/update_status/',
  security: 'administration/security/?community=',
  searchUser: 'user/users/verify/?phone_number=',
  billing: 'billing/bills_list/filter/community_id/',
  billingbyBuilding: 'billing/bills_list/filter/building_id/',
  billingbyApartment: 'billing/bills_list/filter/apartment_id/',
  maintenanceFeeTypes: 'administration/maintenance_fee_type/',
  editMaintenanceFeeTypes: 'administration/maintenance_fee_type_details/',
  generateBills: 'billing/generate_bills/',

  addBuildings: 'community/building/',
  editBuildings: 'community/building_details/',
  addApartments: 'community/apartment/',
  editApartments: 'community/apartment_details/',
  addResidents: 'resident/resident/',
  editResidents: 'resident/resident_details/',
  addSecurity: 'administration/security/',
};
export var filterParams = {
  suppressAndOrCondition: true,
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = new Date(cellValue).toLocaleDateString('en-IN');
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  buttons: ['reset'],
};
export const customerColumnDefs = [
  {
    headerName: 'Id',
    field: 'id',
    sortable: true,
    editable: false,
    resizable: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    width: 80,
  },
  {
    headerName: 'Created on',
    field: 'created_at',
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: "Bride's name",
    field: 'bride_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Guardian name',
    field: 'name_of_guardian',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'House name',
    field: 'house_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Place',
    field: 'place',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Post office',
    field: 'post_office',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'District',
    field: 'district',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Marriage date',
    field: 'marriage_date',
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Status',
    field: 'is_assigned',
    sortable: true,
    editable: false,
    resizable: true,
    cellRenderer: function (params) {
      if (params.data.is_assigned === true) return 'Assigned';
      else return 'Unassigned';
    },
    // width: 350,
  },
];
export const fieldAgentColumnDefs = [
  {
    headerName: 'Id',
    field: 'id',
    sortable: true,
    editable: false,
    resizable: true,
    checkboxSelection: true,
    width: 80,
  },
  {
    headerName: 'Name',
    field: 'name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: "Phone number",
    field: 'phone_number',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Type',
    field: 'user_type_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Username',
    field: 'username',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Email',
    field: 'email',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Branch',
    field: 'branch_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Company',
    field: 'company_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
];
export const filteredCustomerColumnDefs = [
  {
    headerName: 'Id',
    field: 'id',
    sortable: true,
    editable: false,
    resizable: true,
    width: 80,
  },
  {
    headerName: 'Created on',
    field: 'created_at',
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: "Bride's name",
    field: 'bride_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Guardian name',
    field: 'name_of_guardian',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'House name',
    field: 'house_name',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Place',
    field: 'place',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    // width: 350,
  },
  {
    headerName: 'Post office',
    field: 'post_office',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
    width: 170,
  },
  {
    headerName: 'District',
    field: 'district',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      buttons: ['reset'],
    },
    sortable: true,
    editable: false,
    resizable: true,
  },
  {
    headerName: 'Marriage date',
    field: 'marriage_date',
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    sortable: true,
    editable: false,
    resizable: true,
    width: 150,
  },
];