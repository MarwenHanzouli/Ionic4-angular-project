import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActionSheetController, ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { PhotoComponent } from '../photo/photo.component';
import { Plugins, PermissionType } from '@capacitor/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
const { Permissions }=Plugins;
@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
})
export class AskComponent implements OnInit {

  lat: number;
  lng: number;
  address: string;
  description: string;
  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController,
              public modalController: ModalController,
              private googleMaps:GoogleMapsService,
              public toastController: ToastController,
              public alertController: AlertController,
              public loadingController: LoadingController) { }

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
      this.presentAlertConfirm(this.lat+' '+this.lng);
      //this.presentToast(this.googleMaps.getData(this.lat, this.lng))
      // this.googleMaps.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
      //   this.address = decodedAddress;
      //   console.log(this.address);
      // });
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm(text:string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you want send this emergency <strong>'+text+'</strong>!!!',
      inputs:[
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: (data) => {
            this.description=data["description"];
            this.presentLoading();
          }
        }
      ]
    });
    // Permissions.query({ name: PermissionType.Geolocation }).then(function(data){
    //   if(data.state==="granted")
    //   {
    //     console.log(this.lat+' '+this.lng)
    //   }
      
    // });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.presentToast('This emergency has been successfully sent: '+this.lat+' '+this.lng+' '+this.description)
  }
}
