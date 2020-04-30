import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from './services/users.service';
import { GoogleMapsService } from './services/google-maps.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotoService } from './services/photo.service';
import { HTTP } from '@ionic-native/http/ngx';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
firebase.initializeApp(environment.firebaseConfig);
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ionic-project-e5966'),
    AngularFireDatabaseModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersService,
    GoogleMapsService,
    PhotoService,
    HTTP,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
