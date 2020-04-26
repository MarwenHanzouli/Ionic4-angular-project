import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPopoverComponent } from './account-popover/account-popover.component';
import { NotificationsPopoverComponent } from './notifications-popover/notifications-popover.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  private title:string;

  constructor(private activatedRoute:ActivatedRoute,
              public popoverController: PopoverController) { }

  ngOnInit() {
    this.title=this.activatedRoute.snapshot.paramMap.get('id');
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
}
