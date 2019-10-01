import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-edit-bed-dialog',
  templateUrl: './edit-bed-dialog.component.html',
  styleUrls: ['./edit-bed-dialog.component.css']
})
export class EditBedDialogComponent implements OnInit {

  editBedForm:FormGroup;
	editBedId={'_id':''};
	editBedData={'_id':''};

  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditBedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editBedId = data;
  		this.editBedForm = this.fb.group({
  			bedName:[data.bedName,Validators.required]
  		}) 
  	}

  	ngOnInit() {
  	}
  	validationMessages = {
  		'bedName':[
  			{type:'required',message:'Bed name is required'}
  		],
  	}
  	onSubmit(){
  		this.editBedData = this.editBedForm.value;
  		this.editBedData._id = this.editBedId._id;
  		this.admin.updateBed(this.editBedData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.dialogRef.close('success');
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)

  	}

}
