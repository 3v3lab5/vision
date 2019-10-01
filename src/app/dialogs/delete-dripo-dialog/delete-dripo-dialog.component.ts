import { AdminService } from './../../services/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dripo-dialog',
  templateUrl: './delete-dripo-dialog.component.html',
  styleUrls: ['./delete-dripo-dialog.component.css']
})
export class DeleteDripoDialogComponent implements OnInit {
  deleteDripoData={dripoId:''};
  constructor(private admin: AdminService,public snackbar: MatSnackBar,
      private dialogRef: MatDialogRef<DeleteDripoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      this.deleteDripoData = data;

       }

  ngOnInit() {
  }

  removeDripo(){
    this.admin.deleteDripo(this.deleteDripoData)
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
