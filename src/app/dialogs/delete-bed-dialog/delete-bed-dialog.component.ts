import { AdminService } from './../../services/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-bed-dialog',
  templateUrl: './delete-bed-dialog.component.html',
  styleUrls: ['./delete-bed-dialog.component.css']
})
export class DeleteBedDialogComponent implements OnInit {
  deleteBedData={bedName:''};
  constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeleteBedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
  			this.deleteBedData = data;
         }

  	ngOnInit() {
  	}

  	removeBed(){
  		this.admin.deleteBed(this.deleteBedData)
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
