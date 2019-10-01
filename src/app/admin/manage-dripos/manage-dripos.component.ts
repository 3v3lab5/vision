import { EditDripoDialogComponent } from './../../dialogs/edit-dripo-dialog/edit-dripo-dialog.component';
import { AdminService } from './../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDripoDialogComponent } from 'src/app/dialogs/delete-dripo-dialog/delete-dripo-dialog.component';


@Component({
  selector: 'app-manage-dripos',
  templateUrl: './manage-dripos.component.html',
  styleUrls: ['./manage-dripos.component.css']
})
export class ManageDriposComponent implements OnInit {

  createDripoForm:FormGroup;
	dripoData={};
	stations=[];
	dripos=[];
  term;
  constructor(private fb: FormBuilder,private admin: AdminService,public snackbar: MatSnackBar,private dialog: MatDialog) { 
  		this.createDripoForm = this.fb.group({
  			stationId:['',Validators.required],
  			dripoId:['',Validators.required],
        altName:['',Validators.required]

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
  		this.admin.readDripo()
  		.subscribe(
  			res => {
  		        if(res.success){
  		        	this.dripos = res.data;
  		        	}
              else{
                this.snackbar.open(res.message, 'close')
              }
  		        },
  		    err => {
  		          console.log(err);
  		    }

  		)
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

  	onSubmit(formData: any, formDirective: FormGroupDirective): void {
  		this.dripoData = this.createDripoForm.value;
  		this.admin.createDripo(this.dripoData)
  		.subscribe(
  			res => {
  		        if(res.success){
  		            this.snackbar.open(res.message, 'close')
  		            this.admin.readDripo()
  		            .subscribe(
  		            	res => {
  		                    if(res.success){
  		                    	this.dripos = res.data;
  		                    	}
  		                    },
  		                err => {
  		                      console.log(err);
  		                }

  		            )
  		            formDirective.resetForm();
  		            this.createDripoForm.reset();
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

  	openEditDialog(dripo) {
  	        const dialogConfig = new MatDialogConfig();
  	        dialogConfig.autoFocus = true;
  	        dialogConfig.height= '350px';
  	        dialogConfig.width='600px';
  	        dialogConfig.data = {
  	                stationId: dripo.stationId,
  	                stationName: dripo.stationName,
  	                dripoId:dripo.dripoId,
                    altName:dripo.altName,
  	                _id:dripo._id
  	            };

  	        let dialogRef = this.dialog.open(EditDripoDialogComponent, dialogConfig);
  	        dialogRef.afterClosed().subscribe(result => {
  	          if(result == 'success'){
  	          	this.admin.readDripo()
  	          	.subscribe(
  	          		res => {
  	          	        if(res.success){
  	          	        	this.dripos = res.data;
  	          	        	}
  	          	        },
  	          	    err => {
  	          	          console.log(err);
  	          	    }

  	          	)
  	          }
  	        });
  	}

  	openDeleteDialog(dripo) {
  	    const dialogConfig = new MatDialogConfig();
  	    dialogConfig.autoFocus = true;
  	    dialogConfig.height= '200px';
  	    dialogConfig.width='400px';
  	    dialogConfig.data = {
  	       stationName: dripo.stationName,
  	       dripoId:dripo.dripoId,
  	       _id:dripo._id
  	    };
  	    let dialogRef = this.dialog.open(DeleteDripoDialogComponent, dialogConfig);
  	    dialogRef.afterClosed().subscribe(result => {
  	      if(result == 'success'){
  	      	this.admin.readDripo()
  	      	.subscribe(
  	      		res => {
  	      	        if(res.success){
  	      	        	this.dripos = res.data;
  	      	        	}
                      else{
                        this.dripos = [];
                      }
  	      	        },
  	      	    err => {
  	      	          console.log(err);
  	      	    }

  	      	)
  	      }
  	    });
  	        
  	 }
}
