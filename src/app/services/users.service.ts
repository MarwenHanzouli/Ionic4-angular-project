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
    let user=new User('Marwen','Hanzouli',25995310,'marwenhanzouli@gmail.com','1234');
    user.role="USER";
    // Storage.get({ key: this.USER_STORAGE }).then(function(data) {
    //   if(data.value){
    //     console.log(JSON.parse(data.value));
    //     this.userSubject.next(JSON.parse(data.value));
    //   }
      
    // });
    // this.userSubject=new BehaviorSubject(null);
    // this.userOb=this.userSubject.asObservable();
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
    // u.lastName="Hanzouli";
    // u.firstName="Marwen";
    // u.phone=25595310;
    // u.role="USER";
    // this.userSubject.next(u);
    // Storage.set({
    //   key: this.USER_STORAGE,
    //   value:JSON.stringify(u)});
    // let x= await this.getUserFromStorage();
    // this.router.navigate(['/dashboard','Home']);
    return this.getUserFromFirebase('email',u.email);
  }
  async getUserFromStorage(){
    const u = await Storage.get({ key: this.USER_STORAGE });
    this.u=JSON.parse(u.value);
  }
  logout(){
    this.router.navigate(['/home']);
    this.userSubject.next(null);
    Storage.remove({key:this.USER_STORAGE});
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
