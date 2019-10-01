import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { ManageBedsComponent } from './manage-beds/manage-beds.component';
import { ManageDriposComponent } from './manage-dripos/manage-dripos.component';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AdminComponent, AdminhomeComponent, ManageUsersComponent, ManageStationsComponent, ManageBedsComponent, ManageDriposComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }
