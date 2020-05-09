import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  // lat: number;
  // lng: number;
  // address: string;


  @ViewChild('Map',{static:false}) mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = {lat: null, lng: null};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  apiKey: any = 'AIzaSyA3AaJQ4HMFc2LkNpIop-HesVoQiYCqvYg'; /*Your API Key*/
  constructor(private googleMaps:GoogleMapsService,
    public zone: NgZone,
    public loadingController: LoadingController) 
    {
      
  }

  ngOnInit() {
    this.getCurrentLocation();
    /*load google map script dynamically */
    const script = document.createElement('script');
    script.id = 'googleMap';
    if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
    } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=';
    }
    
    document.head.appendChild(script);
    
    /*Get Current location*/
    Plugins.Geolocation.getCurrentPosition().then((position) =>  {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
    });
    /*Map options*/
    this.mapOptions = {
        center: this.location,
        zoom: 16,
        mapTypeControl: false
    };
    setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        /*Marker Options*/
        this.markerOptions.position = this.location;
        this.markerOptions.map = this.map;
        this.markerOptions.title = 'My Location';
        this.marker = new google.maps.Marker(this.markerOptions);
    }, 100);
  }
  getCurrentLocation() {
    // Plugins.Geolocation.getCurrentPosition().then(result => {
    //   this.lat = result.coords.latitude;
    //   this.lng = result.coords.longitude;
    //   this.googleMaps.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
    //     this.address = decodedAddress;
    //     console.log(this.address);
    //   });
    // });
  }
}
