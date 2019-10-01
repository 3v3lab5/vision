import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { passValidator } from '../password-validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm:FormGroup;
	resetData = {'userName':''};
	userName;
  constructor(private fb: FormBuilder,private authService:AuthService,private route: ActivatedRoute,public snackbar: MatSnackBar,
  private router: Router) { 
  	this.resetForm = this.fb.group({
  	password:['',Validators.compose([Validators.required,Validators.minLength(5)])],
  	confirmPassword:['',passValidator]
  	})
  }

  ngOnInit() {
  	let token = this.route.snapshot.paramMap.get('token');
  	this.authService.checkResetPasswordLink(token)
  	  	.subscribe(
  	    	res => {
  	        	if(res.success){
  	        		console.log(res.data.userName);
  	        		this.userName = res.data.userName;
  	        		this.snackbar.open(res.message, 'close')
  	        	}
  	        	else{
  	        		this.snackbar.open(res.message, 'close')
  	        		this.router.navigate(['/guest/login'])
  	        }
  	    },
  	    err => {
  	        console.log(err);
  	    }
  		)
  	}
  	onSubmit() {
  	  this.resetData = this.resetForm.value;
  	 this.resetData.userName = this.userName;
  	  console.log(this.resetData);
  	  this.authService.resetPassword(this.resetData)
  	  	.subscribe(
  	  		res => {
  	              if(res.success){
  	                this.snackbar.open(res.message, 'close')
  	              }
  	          },
  	        err => {
  	            console.log(err);
  	        }

  	  	)
  	}




    validationMessages = {
    	'password': [
      	    { type: 'required', message: 'Password is required' },
      	    { type: 'minlength', message: 'Password must be at least 5 characters long' },
    	]
    }

}
