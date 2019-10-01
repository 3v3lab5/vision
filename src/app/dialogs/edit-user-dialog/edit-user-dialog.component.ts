import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { passValidator } from 'src/app/guest/password-validator';


@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  changePasswordForm:FormGroup;
	editUserId={'id':''};
	editUserData={'_id':''};
  constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditUserDialogComponent>,
           @Inject(MAT_DIALOG_DATA) public data: any) {
  			this.editUserId = data;
  			this.changePasswordForm = this.fb.group({
  			password:['',Validators.compose([Validators.required,Validators.minLength(5)])],
  			confirmPassword:['',passValidator]
  			}) 

  			//Observable to update validator if password field changed again
  			this.changePasswordForm.controls.password.valueChanges
  			    .subscribe(x => this.changePasswordForm.controls.confirmPassword.updateValueAndValidity())

         }

  	ngOnInit() {
  	}

  	close(){
  	    this.dialogRef.close();
  	}
  	onSubmit(){
  		this.editUserData = this.changePasswordForm.value;
  		this.editUserData._id = this.editUserId.id;
  		this.admin.updateUser(this.editUserData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.dialogRef.close();
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
