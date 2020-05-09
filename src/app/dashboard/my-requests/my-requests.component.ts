import { Component, OnInit } from '@angular/core';
import { EmergenciesService } from 'src/app/services/emergencies.service';
import { Observable } from 'rxjs';
import { ActionSheetController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
})
export class MyRequestsComponent implements OnInit {

  emergencies:Observable<any>;
  constructor(public emergenciesService:EmergenciesService,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.emergencies=this.emergenciesService.emergenciesPerUser;
  }
  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Emergencies',
      buttons: [{
        text: 'View',
        icon: 'eye',
        handler: () => {
          console.log(item.payload.doc.id);
        }
      },{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          const alert = await this.alertController.create({
            header: 'Confirm!',
            message: '<strong>Do you want delete this emergency</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  
                }
              }, {
                text: 'Yes',
                handler:async () => {
                  const loading = await this.loadingController.create({
                    message: 'Please wait...'
                  });
                  await loading.present();
                  await this.emergenciesService.deleteEmergencie(item.payload.doc.id);
                  await loading.dismiss();
                }
              }
            ]
          });
          await alert.present();
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
}
