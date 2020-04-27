import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lat: number;
  lng: number;
  address: string;

  constructor(private googleMaps:GoogleMapsService) { }

  ngOnInit() {
    this.getCurrentLocation();
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
