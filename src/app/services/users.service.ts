import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject:BehaviorSubject<User>;
  public userOb:Observable<User>;

  constructor() { 
    let user=new User('Marwen','Hanzouli',25995310,'marwenhanzouli@gmail.com','1234');
    user.role="USER";
    this.userSubject=new BehaviorSubject(user);
    this.userOb=this.userSubject.asObservable();
  }

  register(user:User){
    
  }
}
