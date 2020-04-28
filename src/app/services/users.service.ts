import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject:BehaviorSubject<User>;
  public userOb:Observable<User>;
  private USER_STORAGE: string ="USER";
  private u:any;
  constructor(private router:Router) { 
    let user=new User('Marwen','Hanzouli',25995310,'marwenhanzouli@gmail.com','1234');
    user.role="USER";
    this.getUserFromStorage().then(function(value) {
      console.log(value);
      // expected output: "foo"
    });
    console.log(this.u)
    this.userSubject=new BehaviorSubject(null);
    this.userOb=this.userSubject.asObservable();
  }

  register(user:User){
    
  }
  async login(u:User){
    u.lastName="Hanzouli";
    u.firstName="Marwen";
    u.phone=25595310;
    u.role="USER";
    this.userSubject.next(u);
    Storage.set({
      key: this.USER_STORAGE,
      value:JSON.stringify(u)});
    let x= await this.getUserFromStorage();
    console.log(this.u)
    this.router.navigate(['/dashboard','Home']);
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
}
