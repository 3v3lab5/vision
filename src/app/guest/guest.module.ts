import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MatCardModule,MatIconModule,MatFormFieldModule,MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

@NgModule({
  declarations: [GuestComponent, RegisterComponent, LoginComponent, ForgotpasswordComponent, ResetpasswordComponent, ActivateAccountComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class GuestModule { }
