import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core";

@Component({
  selector: 'app-ask-emergency',
  templateUrl: './ask-emergency.component.html',
  styleUrls: ['./ask-emergency.component.scss'],
})
export class AskEmergencyComponent implements OnInit {
  
  ask:boolean;
  requests:boolean;
  map:boolean;

  constructor() { }

  ngOnInit() {
    this.ask=true;
    this.requests=false;
    this.map=false;
  }
  ionViewWillEnter(){
    this.ask=true;
    this.requests=false;
    this.map=false;
  }
  segmentChanged(event){
    if(event.detail.value==="ask"){
      this.ask=true;
      this.requests=false;
      this.map=false;
    }
    else if(event.detail.value==="requests"){
      this.ask=false;
      this.requests=true;
      this.map=false;
    }
    else if(event.detail.value==="map"){
      this.ask=false;
      this.requests=false;
      this.map=true;
    }
  }

}
