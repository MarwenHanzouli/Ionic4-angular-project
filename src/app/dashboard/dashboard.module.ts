import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { AccountPopoverComponent } from './account-popover/account-popover.component';
import { NotificationsPopoverComponent } from './notifications-popover/notifications-popover.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { AmbulancesComponent } from './ambulances/ambulances.component';
import { AskEmergencyComponent } from './ask-emergency/ask-emergency.component';
import { ListHospitalsComponent } from './list-hospitals/list-hospitals.component';
import { MyAmbulanceComponent } from './my-ambulance/my-ambulance.component';
import { MaterialModule } from '../material.module';
import { AgmCoreModule } from "@agm/core";
import { environment } from 'src/environments/environment';
import { MapComponent } from './map/map.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { AskComponent } from './ask/ask.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    })
  ],
  entryComponents:[
    AccountPopoverComponent,
    NotificationsPopoverComponent
  ],
  declarations: [
    DashboardPage,
    AccountPopoverComponent,
    NotificationsPopoverComponent,
    MyAccountComponent,
    NotificationsComponent,
    HomeComponent,
    AmbulancesComponent,
    AskEmergencyComponent,
    ListHospitalsComponent,
    MyAmbulanceComponent,
    MapComponent,
    MyRequestsComponent,
    AskComponent
  ]
})
export class DashboardPageModule {}
