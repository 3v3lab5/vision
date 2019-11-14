import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseRoutingModule } from './nurse-routing.module';
import { NursehomeComponent } from './nursehome/nursehome.component';
import { SelectStationComponent } from './select-station/select-station.component';
import { MatCardModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatGridListModule, MatProgressBarModule, MatExpansionModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { RoundPipe } from '../pipes/round.pipe';
import { NurseComponent } from './nurse.component';
import { InfusionHistoryComponent } from './infusion-history/infusion-history.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';


PlotlyViaCDNModule.plotlyVersion = '1.49.4'; 
PlotlyViaCDNModule.plotlyBundle = 'basic'; 


@NgModule({
  declarations: [NurseComponent, NursehomeComponent, SelectStationComponent, PatientHistoryComponent,RoundPipe, InfusionHistoryComponent],
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
    MatExpansionModule,
    PlotlyViaCDNModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
    
  ],
  exports:[RoundPipe]
})
export class NurseModule { }
