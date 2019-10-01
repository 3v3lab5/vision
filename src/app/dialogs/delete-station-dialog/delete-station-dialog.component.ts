import { AdminService } from './../../services/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-station-dialog',
  templateUrl: './delete-station-dialog.component.html',
  styleUrls: ['./delete-station-dialog.component.css']
})
export class DeleteStationDialogComponent implements OnInit {

  deleteStationData={stationName:''};
  	constructor(private admin: AdminService,public snackbar: MatSnackBar,
        private dialogRef: MatDialogRef<DeleteStationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
  			this.deleteStationData = data;
         }

  	ngOnInit() {
  	}

  	removeStation(){
  		this.admin.deleteStation(this.deleteStationData)
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
