import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  apiKey=environment.apiKey;
  constructor(private http: HttpClient,
              ) {
                
  }
  //This function makes an http call to google api to decode the cordinates
  getAddress(lat: number, lan: number) {
    let url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
      this.apiKey
    }`
    console.log(url)
    return this.http
      .get<any>(url)
      .pipe(
        map(geoData => {
          console.log(geoData)
          if (!geoData || !geoData.results || geoData.results === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
}
