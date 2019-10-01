import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-edit-station-dialog',
  templateUrl: './edit-station-dialog.component.html',
  styleUrls: ['./edit-station-dialog.component.css']
})
export class EditStationDialogComponent implements OnInit {
  editStationForm:FormGroup;
	editStationId={'_id':''};
	editStationData={'_id':''};
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<EditStationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
  		this.editStationId = data;
  		this.editStationForm = this.fb.group({
  			stationName:[data.stationName,Validators.required]
  		}) 

  	}

  	ngOnInit() {
  	}

  	validationMessages = {
  		'stationName':[
  			{type:'required',message:'Station name is required'}
  		],
  	}
  	onSubmit(){
  		this.editStationData = this.editStationForm.value;
  		this.editStationData._id = this.editStationId._id;
  		this.admin.updateStation(this.editStationData)
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
