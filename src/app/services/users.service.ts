import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject:BehaviorSubject<User>=new BehaviorSubject<User>(null);
  public userOb:Observable<User>=this.userSubject.asObservable();
  private USER_STORAGE: string ="USER";
  private u:any;
  constructor(private router:Router,
              private httpClient: HttpClient) {    
  }
  public next(us:User){
    this.userSubject.next(us);
  }
  register(user:User){
    return this.httpClient
      .post('https://ionic-project-e5966.firebaseio.com/users.json', user)    
  }
  getUserFromFirebase(key:string,value:string){
    return firebase.database().ref('/users').orderByChild(key)
    .equalTo(value).limitToFirst(1).once('value');
  }
  login(u:any){
    return this.getUserFromFirebase('email',u.email);
  }

  async logout(){
    this.router.navigate(['/home']);
    this.userSubject.next(null);
    await Storage.remove({key:this.USER_STORAGE});
  }
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
