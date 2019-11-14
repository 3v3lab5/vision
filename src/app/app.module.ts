import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatOptionModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteUserDialogComponent } from './dialogs/delete-user-dialog/delete-user-dialog.component';
import { EditStationDialogComponent } from './dialogs/edit-station-dialog/edit-station-dialog.component';
import { DeleteStationDialogComponent } from './dialogs/delete-station-dialog/delete-station-dialog.component';
import { EditBedDialogComponent } from './dialogs/edit-bed-dialog/edit-bed-dialog.component';
import { DeleteBedDialogComponent } from './dialogs/delete-bed-dialog/delete-bed-dialog.component';
import { EditDripoDialogComponent } from './dialogs/edit-dripo-dialog/edit-dripo-dialog.component';
import { DeleteDripoDialogComponent } from './dialogs/delete-dripo-dialog/delete-dripo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    EditStationDialogComponent,
    DeleteStationDialogComponent,
    EditBedDialogComponent,
    DeleteBedDialogComponent,
    EditDripoDialogComponent,
    DeleteDripoDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule
    


    


  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
    },AuthService],
  bootstrap: [AppComponent],
    entryComponents:[EditUserDialogComponent,
      DeleteUserDialogComponent,
      EditStationDialogComponent,
      DeleteStationDialogComponent,
      EditBedDialogComponent,
      DeleteBedDialogComponent,
      EditDripoDialogComponent,
      DeleteDripoDialogComponent
    ]
})
export class AppModule { }
