import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-ask-emergency',
  templateUrl: './ask-emergency.component.html',
  styleUrls: ['./ask-emergency.component.scss'],
})
export class AskEmergencyComponent implements OnInit {
  lat: number;
  lng: number;
  address: string;
  constructor(private googleMaps:GoogleMapsService) { }

  ngOnInit() {
    //this.getCurrentLocation();
  }
  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;
      this.googleMaps.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
        this.address = decodedAddress;
        console.log(this.address);
      });
    });
  }
}
