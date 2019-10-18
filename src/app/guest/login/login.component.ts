import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth: AuthService,private router:Router,public snackbar: MatSnackBar) { }

  ngOnInit() {
  }


  loginData = {};
  loginForm = this.fb.group({
  	userName:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
  	password:['',Validators.compose([Validators.required,Validators.minLength(5)])]
  })

  onSubmit() {
    this.loginData = this.loginForm.value;
    this.auth.loginUser(this.loginData)
    	.subscribe(
    		res => {
          if(res.success==true && res.permission == 'admin'){
            localStorage.setItem('token',res.token)
            this.router.navigate(['/admin/home'])
          }
          else if(res.success==true && res.permission == 'nurse'){
            localStorage.setItem('token',res.token)
            this.router.navigate(['/nurse/selectstation'])
          }
          else if(res.success==true && res.expired == true){
            let snackBarRef = this.snackbar.open(res.message, 'Resend Link');
            snackBarRef.afterDismissed().subscribe(() => {
              this.auth.resendActivationLink(this.loginData)
              .subscribe(
                res => {
                  if(res.success==true){
                    this.snackbar.open(res.message, 'close');
                  }
                })
            });

          }
          else{
            this.router.navigate(['/login'])
          }
    			
    		},
    		err => console.log(err)

    	)
  }

  

}
