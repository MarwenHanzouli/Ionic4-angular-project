import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  apiKey=environment.apiKey;
  constructor(private http: HttpClient,
    private httpCordova: HTTP) {
                
  }
  async getData(lat: number, lan: number) {
    try {
      let url=`https://maps.googleapis.com/maps/api/js?latlng=${lat},${lan}&key=${this.apiKey}`
      const params = {};
      const headers = {};

      const response = await this.httpCordova.get(url, params, headers);

      console.log(response.status);
      console.log(JSON.parse(response.data)); // JSON data returned by server
      console.log(response.headers);
      return JSON.parse(JSON.stringify(response.data));
    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
      return JSON.parse(JSON.stringify(error.error));
    }
  }
  //This function makes an http call to google api to decode the cordinates
  getAddress(lat: number, lan: number) {
    let url=`https://maps.googleapis.com/maps/api/js?latlng=${lat},${lan}&key=${
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
