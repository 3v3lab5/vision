import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-dripo-dialog',
  templateUrl: './edit-dripo-dialog.component.html',
  styleUrls: ['./edit-dripo-dialog.component.css']
})
export class EditDripoDialogComponent implements OnInit {

  editDripoForm:FormGroup;
	editDripoId={'_id':''};
	editDripoData={'_id':''};
  stations=[];
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditDripoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editDripoId = data;
  		this.editDripoForm = this.fb.group({
  			stationId:[data.stationId,Validators.required],
  			dripoId:[data.dripoId,Validators.required],
        altName:[data.altName,Validators.required]

  		}) 
  	}

  	validationMessages = {
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		],
  		'dripoId':[
  			{type:'required',message:'dripo id is required'}
  		],
      'altName':[
        {type:'required',message:'Alternative name is required'}
      ]
  	}

  	ngOnInit() {
  		this.admin.readStation()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.stations = res.data;
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	}

  	onSubmit(){
  		this.editDripoData = this.editDripoForm.value;
  		this.editDripoData._id = this.editDripoId._id;
  		this.admin.updateDripo(this.editDripoData)
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
