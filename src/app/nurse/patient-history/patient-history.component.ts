import { NurseService } from './../../services/nurse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  histories=[];
  constructor(private route: ActivatedRoute,public snackbar: MatSnackBar,
  private router: Router,private nurse: NurseService) { }

  ngOnInit() {
  	this.nurse.readPatientHistory()
  	  .subscribe(
  	    res => {
  	        if(res.success){
  	        	this.histories = res.data;
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

}
