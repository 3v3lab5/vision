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

  details={'infusionLogs':[],'error':[],'batteryLogs':[],'bedName':'','date':'','startingTime':'','endingTime':''
,'infusedVolume':'','totalVolume':'','averageRate':''};
  innerWidth=0;
  innerHeight=0;
  rate:Array<any>=[];
  time=[];
  infusedVolume=[];
  error=[];
  rateArray=[];
  rateSum=0;
  averageRate=0;
  errorTime=[];
  batteryCharge=[];
  public graph={'data':[],'layout':{}};
  public graph2={'data':[],'layout':{}};
  public graph3={'data':[],'layout':{}};

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [{position: 1, name: 'Bed Name', weight:'', symbol: '-'},
  {position: 2, name: 'Infusion Date', weight:'', symbol: 'dd/mm/yyyy'},
  {position: 3, name: 'Starting Time', weight: '', symbol: 'Time'},
  {position: 4, name: 'Ending Time', weight: '',symbol:'Time'},
  {position: 5, name: 'Infused Volume', weight: '', symbol: 'ml'},
  {position: 6, name: 'Total Volume', weight: '', symbol: 'ml'},
  {position: 7, name: 'Average Rate', weight: '', symbol: 'ml/Hr'}];

  constructor(private route: ActivatedRoute,public snackbar: MatSnackBar,
    private router: Router,private nurse: NurseService) { }

    
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    let id = this.route.snapshot.paramMap.get('id');
    var resultArray:Array<any>=[];
    var resultArray2:Array<any>=[];
    var resultArray3:Array<any>=[];
    var resultArray4:Array<any>=[];


    this.nurse.readInfusionDetails(id)
  	  .subscribe(
  	    res => {
  	        if(res.success){
              this.details = res.data;
              this.dataSource[0].weight = this.details.bedName;
              this.dataSource[1].weight = this.details.date;
              this.dataSource[2].weight = this.details.startingTime;
              this.dataSource[3].weight = this.details.endingTime;
              this.dataSource[4].weight = this.details.infusedVolume;
              this.dataSource[5].weight = this.details.totalVolume;
              this.dataSource[6].weight = this.details.averageRate;

              this.details.infusionLogs.forEach(function (det,index) {
                resultArray.push(det.rate);
                resultArray2.push(det.infusedVolume);
                resultArray3.push(det.time);
              })
              this.details.batteryLogs.forEach(bat => {
                resultArray4.push(bat.charge);
              });

  	        }
  	        else{
  	        	this.snackbar.open(res.message, 'close')
  	        }
  	    },
  	    err => {
  	        console.log(err);
  	    }
    )
    this.rate = resultArray;
    this.infusedVolume=resultArray2;
    this.time = resultArray3;
    this.batteryCharge = resultArray4;


    this.graph = {
      data: [
          { x: this.time, y:this.rate, type: 'scatter', mode: 'lines+points', marker: {color: 'green'} },
      ],
      layout: {title: 'Rate Plot',xaxis: {
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: 'Rate (ml/hr)',
        }
      },
      width: this.innerWidth,
      height: this.innerHeight
    }
    }
    this.graph2 = {
      data: [
          { x:this.time, y:this.infusedVolume, type: 'scatter', mode: 'lines+points', marker: {color: 'blue'} },
      ],
      layout: {title: 'Infused Volume Plot',xaxis: {
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: 'Infused volume (ml)',
        }
      },
      width: this.innerWidth,
      height: this.innerHeight
    }
    }
    this.graph3 = {
      data: [
          { x:this.time, y:this.batteryCharge, type: 'scatter', mode: 'lines+points', marker: {color: 'violet'} },
      ],
      layout: {title: 'Device Performance',xaxis: {
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: '% mAh',
        }
      },
      width: this.innerWidth,
      height: this.innerHeight
    }
    }
  }

  
}
