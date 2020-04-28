import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { PhotoComponent } from '../photo/photo.component';
import { Plugins } from '@capacitor/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
})
export class AskComponent implements OnInit {

  lat: number;
  lng: number;
  address: string;

  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController,
              private googleMaps:GoogleMapsService,
              public toastController: ToastController) { }

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
  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;
      this.presentToast(this.googleMaps.getData(this.lat, this.lng))
      // this.googleMaps.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
      //   this.address = decodedAddress;
      //   console.log(this.address);
      // });
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 8000
    });
    toast.present();
  }
}
