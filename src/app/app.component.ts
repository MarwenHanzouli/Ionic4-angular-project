import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './models/User.model';
import { UsersService } from './services/users.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  

  private userSubscription:Subscription;
  private user:User;
  private connected:boolean;
  private selectedIndex=0;

  private menu=[];
  private menuUser=[
    {
      id:'Emergency',
      title: 'Ask for emergency',
      url: '/dashboard/Emergency',
      icon: 'alert-circle'
    },
    {
      id:'Hospitals',
      title: 'List of hospitals',
      url: '/dashboard/Hospitals',
      icon: 'list-circle'
    }
  ];
  private menuAgent=[
    {
      id:'Ambulances',
      title: 'Manage ambulances',
      url: '/dashboard/Ambulances',
      icon: 'settings'
    }
  ];
  private menuAmbulancier=[
    {
      id:'Ambulance',
      title: 'My ambulance',
      url: '/dashboard/Ambulance',
      icon: 'settings'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usersService:UsersService,
    private router:Router
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async ngOnInit(){
    let x=await Storage.get({ key: "USER" });
    if(x.value!==null && x.value!=="undefined"){
      console.log(x)
      this.router.navigate(['/dashboard','Home'])
      this.usersService.next(JSON.parse(x.value))
    }
    this.userSubscription=this.usersService.userOb.subscribe((u)=>
      {
        this.menu=[
          {
            id:'Home',
            title: 'Home',
            url: '/dashboard/Home',
            icon: 'home'
          },
          {
            id:'Account',
            title: 'My account',
            url: '/dashboard/Account',
            icon: 'person-circle'
          },
          {
            id:'Notifications',
            title: 'Notifications',
            url: '/dashboard/Notifications',
            icon: 'notifications'
          }
        ];
        if(u)
        {
          this.connected=false;
          this.user=u;
          if(this.user.role==="USER")
          {
            this.menu=this.menu.concat(this.menuUser);
          }
          else if(this.user.role==="AGENT")
          {
            this.menu=this.menu.concat(this.menuAgent);
          }
          else if(this.user.role==="AMBULANCIER")
          {
            this.menu=this.menu.concat(this.menuAmbulancier);
          }
          const path = window.location.pathname.split('dashboard/')[1];
          if (path !== undefined) 
          {
            this.selectedIndex = this.menu.findIndex(page => page.id.toLowerCase() === path.toLowerCase());
          }
        }
        else{
          this.connected=true;
        }
      }
    );
    this.router.events.pipe(filter(e=> e instanceof NavigationEnd)).subscribe(e=>{
      const path = window.location.pathname.split('dashboard/')[1];
      if (path !== undefined) 
      {
        this.selectedIndex = this.menu.findIndex(page => page.id.toLowerCase() === path.toLowerCase());
      }
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  acitve(){
    const path = window.location.pathname.split('dashboard/')[1];
    if (path !== undefined) 
    {
      this.selectedIndex = this.menu.findIndex(page => page.id.toLowerCase() === path.toLowerCase());
    }
  }
}
