import { AuthService } from './../../services/auth.service';
import { NurseService } from './../../services/nurse.service';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription, interval } from 'rxjs';
import {Howl, Howler} from 'howler';

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
  date:any;
  public cols;
  public rowHeight;
  public gutterSize;
  ovHeight=100;
  blockAckData={_id:''};
  loader=false; 
  infusionHistoryCallFlag=true; 
  subscription: Subscription;
  intervalId: number;

 

  constructor(
              private nurse: NurseService,
              public snackbar: MatSnackBar,
              private socketService:SocketService,
              private auth:AuthService) { }
              

  onResize(event) {
    if(event.target.innerWidth <=425){
      this.cols=1;
      this.gutterSize=30;
      this.rowHeight=340;
      this.infusionHistoryCallFlag=false;
    }
    else if(event.target.innerWidth>425 && event.target.innerWidth<=600){
      this.cols=2;
      this.rowHeight=260;
      this.gutterSize=20;
    }
    else if(event.target.innerWidth>600 && event.target.innerWidth<=768){
      this.cols=3;
      this.rowHeight=260;
      this.gutterSize=20;
    }
    else if(event.target.innerWidth>768 && event.target.innerWidth<=1900){
      this.cols=4;
      this.rowHeight=260;
      this.gutterSize=20;
    }
    else{
      this.cols=5;
      this.rowHeight=320;

    }

  }
 
  disconnectionChecker(){
    var date = new Date();
    var minutes = date.getMinutes();
    // console.log(minutes);
    this.dripos.forEach(function (dripo,index) {
      if(dripo.monitor==true && dripo.status !='disconnected'){
        //var lastMin = parseInt(dripo.lastMessageMin);
        // console.log(dripo.lastMessageMin);
        // console.log(Math.abs((dripo.lastMessageMin -minutes)));
        if(Math.abs((dripo.lastMessageMin -minutes)) > 4 && Math.abs((dripo.lastMessageMin -minutes)) < 56){
          dripo.status='disconnected';
          dripo.monitor=true;
        }
      }
      

    });

  }

  ngOnInit() {
    if(window.innerWidth <=425){
      this.cols=1;
      this.gutterSize=30;
      this.rowHeight=340;
      this.infusionHistoryCallFlag=false;
    }
    else if(window.innerWidth>425 && window.innerWidth<=600){
      this.cols=2;
      this.rowHeight=260;
      this.gutterSize=20;

    }
    else if(window.innerWidth>600 && window.innerWidth<=768){
      this.cols=3;
      this.rowHeight=260;
      this.gutterSize=20;
    }
    else if(window.innerWidth>768 && window.innerWidth<=1900){
      this.cols=4;
      this.rowHeight=260;
      this.gutterSize=20;
    }
    else if(window.innerWidth>1900){
      this.cols=5;
      this.rowHeight=320;
    }
    // this.cols = (window.innerWidth <= 425) ? 1 : 4;
    // this.cols = (window.innerWidth <= 770 && window.innerWidth >425) ? 2 : 4;
    var soundBlock = new Howl({
      src: ['./../../../assets/audios/drughi.wav'],
      autoplay: true,

    });

    // var sound = new Howl({
    //   src: ['./../../../assets/audios/drugmed.wav'],
    //   autoplay: true,

    // });
    
    const source = interval(60000);
    this.subscription = source.subscribe(val => this.disconnectionChecker());

    
    this.date= new Date();
    this.nurse.readDripos()
        .subscribe(
          res => {
              if(res.success){
                  this.dripos = res.data;
                  if(this.infusionHistoryCallFlag==false){
                  this.loader=true;
                  }

              }
              else{
                   this.snackbar.open(res.message, 'close')
                   if(res.message == "Invalid Token"){
                      this.auth.logoutUser();
                   }
                   if(this.infusionHistoryCallFlag==false){
                    this.loader=true;
                    }
              }
          },
          err => {
              console.log(err);
          }
        )
if(this.infusionHistoryCallFlag==true){
  this.nurse.readPatientHistory()
      .subscribe(
        res => {
            if(res.success){
              this.histories = res.data;
              this.loader=true;
            }
            else{
              this.snackbar.open(res.message, 'close')
              this.loader=true;
            }
        },
        err => {
            console.log(err);
        }
      )

}
      

    
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
                dripo.lastMessageMin = msg.lastMessageMin;
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
                dripo.infusionStatus='Infusing';
                dripo.infusedVolume=msg.infusedVolume;
                dripo.timeRemaining=msg.timeRemaining;
                dripo.lastMessageMin = msg.lastMessageMin;
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
                 dripo.lastMessageMin = msg.lastMessageMin;
                 dripo.percentage=msg.percentage;
                 dripo.deviceCharge = msg.deviceCharge;
                 dripo.topic = msg.topic;
               }
           });
          soundBlock.play();
           
        }
        else if(msg.infusionStatus == 'Disconnected'){
          this.dripos.forEach(function (dripo,index) {
            if(msg._id == dripo._id){
              dripo.monitor=true;
              dripo.status='disconnected';
            }
          });
          //sound.play();
        }

        else if(msg.infusionStatus == 'Ended'){
          this.dripos.forEach(function (dripo,index) {
              if(msg._id == dripo._id){
                dripo.monitor=false;
                dripo.status='';
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



acknowledge(id:any){
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

acknowledgeConErr(id:any){
  this.dripos.forEach(function (dripo,index) {
    if(dripo._id == id){
      dripo.status='offline';
      dripo.monitor=false;
    }
});
}


searchInfusionHistory(){
  //const newDate = this.date.toISOString().substr(0,10);
  this.nurse.searchInfusionHistory(this.date)
    .subscribe(
      res => {
        if(res.success){
            this.histories = res.data;
          }
        else{
          console.log("no inf");
            this.snackbar.open(res.message, 'close')
          }
        },
        err => {
          console.log(err);
        }
    )
}

ngOnDestroy() {
  // For method 1
  this.subscription && this.subscription.unsubscribe();
}



}
