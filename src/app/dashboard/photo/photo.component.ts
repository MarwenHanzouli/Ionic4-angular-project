import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  
  @Input() photo: Photo;
  private mobile:boolean;
  constructor(public modalController: ModalController,
              private navParams: NavParams,
              private platform:Platform) { }

  ngOnInit() {
    this.photo=this.navParams.get('photo');
    this.mobile=this.platform.is('hybrid')||this.platform.is('ios')||this.platform.is('android');
  }
  async dismissModal(){
    try {
      const element = await this.modalController.getTop();
      if (element) 
      {
          element.dismiss();
          return;
      }
    } 
    catch (error) {
    }
  }
}
