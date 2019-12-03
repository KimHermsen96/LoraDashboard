import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { CrudSensorComponent} from './crud-sensor/crud-sensor.component';
import { EditSensorComponent} from './edit-sensor/edit-sensor.component';
import { SettingsComponent} from './settings/settings.component';


const routes: Routes = [
  { path: 'overzicht', component: HomeComponent },
  { path: 'nieuwe_sensor', component: CrudSensorComponent },
  { path: 'aanpassen_sensor', component: EditSensorComponent },
  { path: 'instellingen', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
