import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject:BehaviorSubject<User>;
  public userOb:Observable<User>;

  constructor(private router:Router) { 
    let user=new User('Marwen','Hanzouli',25995310,'marwenhanzouli@gmail.com','1234');
    user.role="USER";
    this.userSubject=new BehaviorSubject(null);
    this.userOb=this.userSubject.asObservable();
  }

  register(user:User){
    
  }
  login(u:User){
    u.lastName="Hanzouli";
    u.firstName="Marwen";
    u.phone=25595310;
    u.role="USER";
    this.userSubject.next(u);
    this.router.navigate(['/dashboard','Home']);
  }
  logout(){
    this.router.navigate(['/home']);
    this.userSubject.next(null);
  }
}
