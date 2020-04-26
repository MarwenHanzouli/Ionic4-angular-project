import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  private login:boolean;
  private register:boolean;

  constructor() {}

  segmentChanged(event){
    if(event.detail.value==="signup")
    {
      this.login=false;
      this.register=true;
    }else if(event.detail.value==="signin"){
      this.login=true;
      this.register=false;
    }
  }

  ngOnInit(): void {
    this.login=true;
    this.register=false;
  }

}
