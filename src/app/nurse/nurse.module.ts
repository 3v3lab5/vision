import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseRoutingModule } from './nurse-routing.module';
import { NursehomeComponent } from './nursehome/nursehome.component';
import { SelectStationComponent } from './select-station/select-station.component';
import { MatCardModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatGridListModule, MatProgressBarModule, MatExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { RoundPipe } from '../pipes/round.pipe';
import { NurseComponent } from './nurse.component';


@NgModule({
  declarations: [NurseComponent, NursehomeComponent, SelectStationComponent, PatientHistoryComponent,RoundPipe],
  imports: [
    CommonModule,
    NurseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  exports:[RoundPipe]
})
export class NurseModule { }
