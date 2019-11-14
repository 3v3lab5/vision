import { NurseService } from './../../services/nurse.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-infusion-history',
  templateUrl: './infusion-history.component.html',
  styleUrls: ['./infusion-history.component.css']
})
export class InfusionHistoryComponent implements OnInit {

  details={};
  constructor(private route: ActivatedRoute,public snackbar: MatSnackBar,
    private router: Router,private nurse: NurseService) { }

    public graph = {
      data: [
          { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
          { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
      ],
      layout: {width: 320, height: 240, title: 'A Fancy Plot'}
    }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
  	this.nurse.readInfusionDetails(id)
  	  .subscribe(
  	    res => {
  	        if(res.success){
  	        	this.details = res.data;
  	        	console.log(this.details);
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
