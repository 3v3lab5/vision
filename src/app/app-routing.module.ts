import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService } from './services/role-guard.service';


const routes: Routes = [

  {
		path:'',
		redirectTo:'/guest/login',
		pathMatch:'full'
	},
	{
		path:'*',
		redirectTo:'/guest/login',
		pathMatch:'full'
	},
  
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) ,
  canActivate: [RoleGuardService], 
	data: { 
		expectedRole: 'admin'
  } 	
},
  
{ path: 'nurse', loadChildren: () => import('./nurse/nurse.module').then(m => m.NurseModule), 
  canActivate: [RoleGuardService], 
	data: { 
		expectedRole: 'nurse'
  } 

},

{ path: 'guest', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
