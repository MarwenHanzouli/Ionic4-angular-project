import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject:BehaviorSubject<User>=new BehaviorSubject<User>(null);
  public userOb:Observable<User>=this.userSubject.asObservable();
  private USER_STORAGE: string ="USER";
  private u:any;
  private users:Observable<any[]>;
  constructor(private router:Router,
              private httpClient: HttpClient,
              private firestore:AngularFirestore) { 
            this.getUsers();   
  }
  public next(us:User){
    this.userSubject.next(us);
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
      .valueChanges();
  }
  getUserFromFirebaseByEmail(email:string){
    return this.firestore.collection('users',ref => ref.where('email', '==', email))
    .snapshotChanges();
  }
  async logout(){
    this.router.navigate(['/home']);
    await Storage.remove({key:this.USER_STORAGE});
    this.userSubject.next(null);
  }
}
