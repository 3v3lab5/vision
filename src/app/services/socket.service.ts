import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:any;
  constructor() {
    // this.socket = io('http://74.207.227.41:4000');

    this.socket = io('https://api.dripo.care');

    //this.socket = io('http://localhost:4000');
    //this.socket = io('https://localhost:4000',{secure:true , rejectUnauthorized: false });

  }

  // EMITTER
    sendMessage(topic:string,msg: string) {
      this.socket.emit('publish', {topic:topic ,message: msg});
    }

    // HANDLER
    onMessage() {
      return Observable.create(observer => {
        this.socket.on('dripo', msg => {
          observer.next(msg);
        });
      });
    }
}
