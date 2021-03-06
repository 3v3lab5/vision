import { InfusionHistoryComponent } from './infusion-history/infusion-history.component';
import { NursehomeComponent } from './nursehome/nursehome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectStationComponent } from './select-station/select-station.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { NurseComponent } from './nurse.component';
InfusionHistoryComponent


const routes: Routes = [
  { path: 'home', component: NursehomeComponent },
  { path: 'selectstation', component: SelectStationComponent },
  { path: 'patienthistory', component: PatientHistoryComponent },
  {path: 'infusiondetails/:id',component:InfusionHistoryComponent},
  { path: '', redirectTo:'/nurse/home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
