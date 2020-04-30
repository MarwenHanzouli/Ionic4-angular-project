// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Platform } from '@ionic/angular';
class Envi{
  constructor (private platform:Platform){
  }
  
  api():string{
    if(this.platform.platforms().findIndex(p=>p==="mobileweb")!==-1 
    || this.platform.platforms().findIndex(p=>p==="desktop")){
      return "AIzaSyB8fW_Wli2bBfMIUxNV0_LJKj2kPF8XFfU"
    }else if(this.platform.platforms().findIndex(p=>p==="android")!==-1){
      return "AIzaSyAaNStQVY8LWViTrpb-JXyOvInwyCjPp7s";
    }else if(this.platform.platforms().findIndex(p=>p==="ios")!==-1){
      return "AIzaSyDu5S897rExPuhRvLUvBwJQrpRwBtcGt-0";
    }
    return "";
  }
}

export const environment = {
  production: false,
  apiKey:"AIzaSyA3AaJQ4HMFc2LkNpIop-HesVoQiYCqvYg",
  firebaseConfig : {
    apiKey: "AIzaSyCzW5LrY5zErLHPX-khUli6Tq8lNJwOXL4",
    authDomain: "ionic-project-e5966.firebaseapp.com",
    databaseURL: "https://ionic-project-e5966.firebaseio.com",
    projectId: "ionic-project-e5966",
    storageBucket: "ionic-project-e5966.appspot.com",
    messagingSenderId: "683467664135",
    appId: "1:683467664135:web:930444eb48d5cb84d9b3a2",
    measurementId: "G-G0VEDZ078S"
  },
  apiUrl:'https://ionic-project-e5966.firebaseio.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
