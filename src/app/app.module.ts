import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SensorOverviewComponent } from './sensor-overview/sensor-overview.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import { CrudSensorComponent } from './crud-sensor/crud-sensor.component';
import { EditSensorComponent} from './edit-sensor/edit-sensor.component';
import { SettingsComponent } from './settings/settings.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog-component/dialog.component';
import {DataService} from './data.service';
import {MyService} from "./data.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SensorOverviewComponent,
    SensorDetailComponent,
    CrudSensorComponent,
    EditSensorComponent,
    SettingsComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFileUploadModule,
    CommonModule
  ],

  providers: [MyService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
