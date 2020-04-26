import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';
import { Subscription, Observable } from 'rxjs';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-account-popover',
  templateUrl: './account-popover.component.html',
  styleUrls: ['./account-popover.component.scss'],
})
export class AccountPopoverComponent implements OnInit {
 

  private user:Observable<User>;
  constructor(private usersService:UsersService,
              private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.user=this.usersService.userOb;
  }
  async logout(){
    // close popover
    try {
      const element = await this.popoverCtrl.getTop();
      if (element) 
      {
          element.dismiss();
          this.usersService.logout();
          return;
      }
    } 
    catch (error) {
    }
  }
}
