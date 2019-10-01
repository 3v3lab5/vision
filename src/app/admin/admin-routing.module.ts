import { AdminhomeComponent } from './adminhome/adminhome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';
import { ManageBedsComponent } from './manage-beds/manage-beds.component';
import { ManageDriposComponent } from './manage-dripos/manage-dripos.component';
const routes: Routes = [
  { path: 'home', component: AdminhomeComponent },
  { path: 'manageusers', component: ManageUsersComponent },
  { path: 'managestations', component: ManageStationsComponent },
  { path: 'managebeds', component: ManageBedsComponent },
  { path: 'managedripos', component: ManageDriposComponent },
  {path: '', redirectTo: '/admin/home'},
  {path: '*', redirectTo: '/admin/home'}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
