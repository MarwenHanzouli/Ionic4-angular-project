import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
})
export class AskComponent implements OnInit {

  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }
  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Display',
        icon: 'eye',
        handler: () => {
          this.presentModal(position);
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
  async presentModal(postion:number) {
    const modal = await this.modalController.create({
      component: PhotoComponent,
      cssClass:'color-icons',
      componentProps: {
        'photo': this.photoService.getPhoto(postion)
      }
    });
    return await modal.present();
  }
}
