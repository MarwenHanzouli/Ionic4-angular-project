import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { AngularFirestore } from '@angular/fire/firestore';

var userSubject:BehaviorSubject<User>;
Storage.get({ key: "USER" }).then(function(data){
  userSubject=new BehaviorSubject<User>(<User>JSON.parse(data.value));
});
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userOb:Observable<User>;
  private USER_STORAGE: string ="USER";
  private u:any;
  private users:Observable<any[]>;
  constructor(private router:Router,
              private firestore:AngularFirestore) { 
            //this.getUsers();   
            this.userOb=userSubject.asObservable();
  }
  public next(us:User){
    userSubject.next(us);
  }
  getUsers() {
    this.users=this.firestore.collection('users').valueChanges();
  }
  register(user:User){ 
    return this.firestore.collection('users').add({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      role:user.role,
      phone:user.phone,
      photo:user.image ? user.image : '',
      id:user.id ? user.id : null
    });
  }

  login(auth){
    return this.firestore.collection('users',ref => ref.where('email', '==', auth.email)
      .where('password', '==', auth.password))
      .snapshotChanges();
  }
  getUserFromFirebaseByEmail(email:string){
    return this.firestore.collection('users',ref => ref.where('email', '==', email))
    .snapshotChanges();
  }
  async logout(){
    this.router.navigate(['/home']);
    await Storage.remove({key:this.USER_STORAGE});
    userSubject.next(null);
  }
}
