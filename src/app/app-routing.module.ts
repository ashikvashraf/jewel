import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResidentsComponent } from './residents/residents.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { SecurityComponent } from './security/security.component';
import { AuthGuard } from './login/auth.guard';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { BillsComponent } from './bills/bills.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { MaintenanceFeeComponent } from './maintenance-fee/maintenance-fee.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'residents',
    component: ResidentsComponent,
    canActivate: [AuthGuard],
    // data: { roles: 'Admin' },
  },
  {
    path: 'buildings',
    component: BuildingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visitors',
    component: VisitorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'apartments',
    component: ApartmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'security',
    component: SecurityComponent,
    canActivate: [AuthGuard],
    // data: { roles: 'Admin' },
  },
  {
    path: 'notice_board',
    component: NoticeboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'complaints',
    component: ComplaintsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'maintenance_fee',
    component: MaintenanceFeeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
