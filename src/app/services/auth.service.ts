import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http"
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userName;
  public hospitalName;
  public stationName;
  public permission;
  private decodedToken;

  // private registerUrl = "http://74.207.227.41:4000/api/register";
	// private loginUrl = "http://74.207.227.41:4000/api/login";
  // private activateAccountUrl  = "http://74.207.227.41:4000/api/activate";
  // private forgotPasswordUrl = "http://74.207.227.41:4000/api/forgotpassword";
  // private resetPasswordUrl = "http://74.207.227.41:4000/api/resetpassword";
  // private resendActivationLinkUrl="http://74.207.227.41:4000/api/resend"


  //production server urls

  private registerUrl = "https://api.dripo.care/api/register";
	private loginUrl = "https://api.dripo.care/api/login";
  private activateAccountUrl  = "https://api.dripo.care/api/activate";
  private forgotPasswordUrl = "https://api.dripo.care/api/forgotpassword";
  private resetPasswordUrl = "https://api.dripo.care/api/resetpassword";
  private resendActivationLinkUrl="https://api.dripo.care/api/resend"

  //Test Server urls

  // private registerUrl = "http://localhost:4000/api/register";
  // private resendActivationLinkUrl="http://localhost:4000/api/resend"
  // private activateAccountUrl  = "http://localhost:4000/api/activate";
  // private loginUrl = "http://localhost:4000/api/login";
  // private forgotPasswordUrl = "http://localhost:4000/api/forgotpassword";
  // private resetPasswordUrl = "http://localhost:4000/api/resetpassword";

  constructor(private http:HttpClient,private router:Router) { }

  public jwtHelper = new JwtHelperService();

  registerUser(user){
    return this.http.post<any>(this.registerUrl,user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl,user)
  }
  activateAccount(token){
    let params = new HttpParams();
    params = params.append("token", token);
    return this.http.get<any>(this.activateAccountUrl,{params: params})
  }

  forgotPassword(userData){
    return this.http.put<any>(this.forgotPasswordUrl,userData)
  }

  checkResetPasswordLink(token){
    let params = new HttpParams();
    params = params.append("token", token);
    return this.http.get<any>(this.resetPasswordUrl,{params: params})
  }

  resetPassword(resetData){
    return this.http.post<any>(this.resetPasswordUrl,resetData)
  }

  resendActivationLink(user){
    return this.http.put<any>(this.resendActivationLinkUrl,user)
  }


  public loggedIn(){
    const token = localStorage.getItem('token');
    try { 
      this.decodedToken = this.jwtHelper.decodeToken(token);

    }
    catch(e){
      console.log("invalid token");
      this.logoutUser();
    }
    if(this.decodedToken){
      return true;
    }
    else{
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/guest/login']);
  }

  getUserName(){
    if(!!localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.userName = decodedToken.userName;
    return this.userName;
    }
    else{
      return 'username';
    }
  }
  getHospitalName(){
    if(!!localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.hospitalName = decodedToken.hospitalName;
    return this.hospitalName;
    }
    else{
      return 'hospitalname';
    }
  }

  getStationName(){
    if(!!localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.stationName = decodedToken.stationName;
    return this.stationName;
    }
    else{
      return 'stationName';
    }
  }


  //function to set dashboard for different accounts
  getMenu(){
    if(!!localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      const decodedToken = this.jwtHelper.decodeToken(token);
      if(decodedToken.permission == 'admin'){
        return this.adminMenuItems;
      }
      else if(decodedToken.permission == 'nurse'){
        return this.nurseMenuItems;
      }
      else{
        return this.nullArray;
      }
    }
    else{
      return this.nullArray;

    }
    
  }


  public stationSelected(){
    if(!!localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.stationName = decodedToken.stationName;
    if(decodedToken.permission == 'admin'){
      return true;
    }
    else if(decodedToken.permission == 'nurse' && !this.stationName){
      return false;
    }
    else if(decodedToken.permission == 'nurse' && this.stationName){
      return true;
    }
    }
    else{
      return false;
    }
  }
  
  public nullArray = [{}];
  public adminMenuItems=[{menu:'Home',icon:'home',href:'/admin/home'},
               {menu:'Manage User',icon:'account_circle',href:'/admin/manageusers'},
               {menu:'Manage Station',icon:'important_devices',href:'/admin/managestations'},
               {menu:'Manage Beds',icon:'hotel',href:'/admin/managebeds'},
               {menu:'Manage Dripo',icon:'speaker_phone',href:'/admin/managedripos'}];


  public nurseMenuItems=[{menu:'Home',icon:'home',href:'nurse/home'},
               {menu:'Manage Patient',icon:'people',href:'nurse/managepatients'}];
  
}
