import { NurseService } from './../../services/nurse.service';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-nursehome',
  templateUrl: './nursehome.component.html',
  styleUrls: ['./nursehome.component.css']
})

export class NursehomeComponent implements OnInit {
  showFiller = false;
  messageText: string;
  activeTasks: Array<any>=[];
  iterates=[];
  upcomingTasks=[];
  upcomingTaskFlag = false;
  delayedTasks=[];
  delayedTaskFlag = false;
  interval: any;
  beds=[];
  doctors=[];
  patients=[];
  histories=[];
  dripos=[];
  public cols;
  ovHeight=100;
  blockAckData={_id:''};  

  constructor(
              private nurse: NurseService,
              public snackbar: MatSnackBar,
              private socketService:SocketService) { }

  onResize(event) {
    this.cols = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  ngOnInit() {
    this.cols = (window.innerWidth <= 400) ? 1 : 4;
    this.nurse.readDripos()
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

    
      this.socketService.onMessage().subscribe(msg => {
        if(msg.infusionStatus == 'Start'){
          this.dripos.forEach(function (dripo,index) {
              if(msg._id == dripo._id){
                dripo.rate=msg.rate;
                dripo.monitor=true;
                dripo.bedName=msg.bedName;
                dripo.status='ongoing';
                dripo.infusionStatus='Started';
                dripo.infusedVolume=msg.infusedVolume;
                dripo.timeRemaining=msg.timeRemaining;
                dripo.percentage=msg.percentage;
                dripo.deviceCharge = msg.deviceCharge;
                dripo.topic = msg.topic;
              }
          });
        }

        else if(msg.infusionStatus == 'Infusing'){
          this.dripos.forEach(function (dripo,index) {
              if(msg._id == dripo._id){
                dripo.rate=msg.rate;
                dripo.monitor=true;
                dripo.status='ongoing';
                dripo.bedName=msg.bedName;
                dripo.infusionStatus='Started';
                dripo.infusedVolume=msg.infusedVolume;
                dripo.timeRemaining=msg.timeRemaining;
                dripo.percentage=msg.percentage;
                dripo.deviceCharge = msg.deviceCharge;
                dripo.topic = msg.topic;
              }
          });
        }

        else if(msg.infusionStatus == 'Blocked'){
           this.dripos.forEach(function (dripo,index) {
               if(msg._id == dripo._id){
                 dripo.rate=msg.rate;
                 dripo.monitor=true;
                 dripo.bedName=msg.bedName;
                 dripo.status='alerted';
                 dripo.infusionStatus='Blocked';
                 dripo.infusedVolume=msg.infusedVolume;
                 dripo.timeRemaining=msg.timeRemaining;
                 dripo.percentage=msg.percentage;
                 dripo.deviceCharge = msg.deviceCharge;
                 dripo.topic = msg.topic;
               }
           });
        }

        else if(msg.infusionStatus == 'Ended'){
          this.dripos.forEach(function (dripo,index) {
              if(msg._id == dripo._id){
                dripo.monitor=false;
                dripo.status='" "';
              }
          });
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

    

      });
}

acknowledge(id){
this.blockAckData._id = id;
this.nurse.blockAck(this.blockAckData)
  .subscribe(
    res => {
        if(res.success){
          this.dripos.forEach(function (dripo,index) {
              if(dripo._id == id){
                dripo.status='ongoing';
              }
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
}
  

}
