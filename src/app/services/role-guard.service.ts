import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  
  constructor(public authService: AuthService, public router: Router) { }
  public jwtHelper = new JwtHelperService();
  canActivate(route: ActivatedRouteSnapshot): boolean {
     // this will be passed from the route config
     // on the data property
     const expectedRole = route.data.expectedRole;
     const token = localStorage.getItem('token');
     // decode the token to get its payload
     const decodedToken = this.jwtHelper.decodeToken(token);
    if(this.authService.loggedIn() && decodedToken.permission == expectedRole){
    	return true;
    }
    else{
    	this.router.navigate(['/guest']);
    	return false;
    }
   }
  
}
