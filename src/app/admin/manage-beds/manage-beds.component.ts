import { EditBedDialogComponent } from './../../dialogs/edit-bed-dialog/edit-bed-dialog.component';
import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DeleteBedDialogComponent } from 'src/app/dialogs/delete-bed-dialog/delete-bed-dialog.component';

@Component({
  selector: 'app-manage-beds',
  templateUrl: './manage-beds.component.html',
  styleUrls: ['./manage-beds.component.css']
})
export class ManageBedsComponent implements OnInit {

  createBedForm:FormGroup;
	bedData={};
	stations=[];
	beds=[];
  term;
  	constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) {
  		this.createBedForm = this.fb.group({
  			stationId:['',Validators.required],
  			bedName:['',Validators.compose([Validators.required,Validators.pattern('^[A-Za-z0-9]+((,|-)[A-Za-z0-9]+)*[A-Za-z0-9]+$')])]

  		}) 
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
  		this.admin.readBed()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.beds = res.data;
  		        	}
              else{
                this.snackbar.open(res.message, 'close')
              }
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	}


  	onSubmit(formData: any, formDirective: FormGroupDirective): void {
  		this.bedData = this.createBedForm.value;
  		this.admin.createBed(this.bedData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readBed()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.beds = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )
  		            formDirective.resetForm();
  		            this.createBedForm.reset();
  		        	}
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
  	   
  	}

  	openEditDialog(bed) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '200px';
  	        dialogConfig.width='500px';
  	        dialogConfig.data = {
  	                _id: bed._id,
  	                bedName:bed.bedName
  	            };

  	        let dialogRef = this.dialog.open(EditBedDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.admin.readBed()
  	          	.subscribe(
  	          		res => {
  	          	        if(res.success){
  	          	        	this.beds = res.data;
  	          	        	}
  	          	        },
  	          	    err => {
  	          	          console.log(err);
  	          	    }

  	          	)
  	          }
  	        });
  	}

  	openDeleteDialog(station) {
  	    const dialogConfig = new MatDialogConfig();
  	    dialogConfig.autoFocus = true;
  	    dialogConfig.height= '200px';
  	    dialogConfig.width='400px';
  	    dialogConfig.data = {
  	        _id: station._id,
  	        stationName:station.stationName,
  	        title: 'Remove User'
  	    };
  	    let dialogRef = this.dialog.open(DeleteBedDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readBed()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.beds = res.data;
  	      	        	}
                    else{
                      this.beds = [];
                    }
  	      	        },
  	      	    err => {
  	      	          console.log(err);
  	      	    }

  	      	)
  	      }
  	    });
  	        
  	 }




  	validationMessages = {
  		'stationId':[
  			{type:'required',message:'Station name is required'}
  		],
  		'bedName':[
  			{type:'required',message:'Bed name is required'},
  			{type:'pattern',message:'Eg: B101,B102,B103'}
  		]
  	}


}
