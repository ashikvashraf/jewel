import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiderComponent } from './sider/sider.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { ResidentsComponent } from './residents/residents.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { SecurityComponent } from './security/security.component';
import { HeaderComponent } from './header/header.component';
import { GraphQLModule } from './graphql.module';
import { BillsComponent } from './bills/bills.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { MaintenanceFeeComponent } from './maintenance-fee/maintenance-fee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiderComponent,
    DashboardComponent,
    BuildingsComponent,
    ResidentsComponent,
    VisitorsComponent,
    ApartmentsComponent,
    SecurityComponent,
    BillsComponent,
    ComplaintsComponent,
    NoticeboardComponent,
    HeaderComponent,
    FooterComponent,
    MaintenanceFeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    GraphQLModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
