import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPopoverComponent } from './account-popover/account-popover.component';
import { NotificationsPopoverComponent } from './notifications-popover/notifications-popover.component';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit , OnDestroy{
  
  
  private title:string;
  home:boolean;
  account:boolean;
  notifications:boolean;
  ambulance:boolean;
  ambulances:boolean;
  askForEmergency:boolean;
  hospitals:boolean;
  private subscriptionUser:Subscription;
  role:string;
  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              public popoverController: PopoverController,
              private usersService:UsersService) { }

  ngOnInit() {
    this.home=true;
    this.account=this.notifications=this.ambulance=this.ambulances=this.askForEmergency=this.hospitals=false;
    this.title=this.activatedRoute.snapshot.paramMap.get('id');
    this.subscriptionUser=this.usersService.userOb.subscribe((data)=>{
      if(data!==null){
        this.role=data.role;
      }
    });
  }
  ionViewWillEnter(){
    const path = window.location.pathname.split('dashboard/')[1];
    if (path !== undefined) 
    {
      if(path==="Home")
      {
        this.home=true;
        this.account=this.notifications=this.ambulance=this.ambulances=this.askForEmergency=this.hospitals=false;
      }else if(path==="Notifications")
      {
        this.notifications=true;
        this.account=this.home=this.ambulance=this.ambulances=this.askForEmergency=this.hospitals=false;
      }
      else if(path==="Account")
      {
        this.account=true;
        this.home=this.notifications=this.ambulance=this.ambulances=this.askForEmergency=this.hospitals=false;
      }
      else if(path==="Emergency")
      {
        this.askForEmergency=true;
        this.account=this.home=this.notifications=this.ambulance=this.ambulances=this.hospitals=false;
      }
      else if(path==="Hospitals")
      {
        this.hospitals=true;
        this.account=this.home=this.notifications=this.ambulance=this.ambulances=this.askForEmergency=false;
      }
      else if(path==="Ambulance")
      {
        this.ambulance=true;
        this.account=this.home=this.notifications=this.hospitals=this.ambulances=this.askForEmergency=false;
      }
      else if(path==="Ambulances")
      {
        this.ambulances=true;
        this.account=this.home=this.notifications=this.hospitals=this.ambulance=this.askForEmergency=false;
      }
    }
  }
  async presentPopoverAccount(ev: any) {
    const popover = await this.popoverController.create({
      component: AccountPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async presentPopoverNotifications(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationsPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  emergency(){
    this.router.navigate(['/dashboard','Emergency'])
    this.askForEmergency=true;
    this.account=this.home=this.notifications=this.ambulance=this.ambulances=this.hospitals=false;
  }


  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }
}
