import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  submitted: boolean=false;
  loading:boolean=false;
  autenticated:boolean=false;
  type:string;
  eye:string;
  color:string;
  private user:User;
  constructor(private formBuilder: FormBuilder,
              private router:Router,
              public loadingController: LoadingController,
              private usersService:UsersService,
              public toastController: ToastController) { }

  ngOnInit() {
    this.initForm();
    this.type="password";
    this.eye="eye-off";
    this.color="primary";
  }
  initForm()
  {
    this.authForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
      }
    );
  }
  get f() { return this.authForm.controls; }
  changePassword(){
    if(this.type==="password"){
      this.type="text";
      this.eye="eye";
    }else{
      this.type="password";
      this.eye="eye-off";
      this.color="primary"
    }
  }
  async login(){
    this.submitted=true;
    if(this.authForm.invalid)
    {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    //const { role, data } = await loading.onDidDismiss();
    let auth={
      'email':this.authForm.value['email'],
      'password':this.authForm.value['password']
    }
    let aut=await this.usersService.login(auth);
    if(aut.hasChildren()){
      this.user=aut.val()[Object.keys(aut.val())[0]];
      if(this.user.password===auth.password) {
        this.usersService.next(this.user);
        this.router.navigate(['/dashboard','Home']);
      }
      console.log(this.user);
    }
    else{
      this.presentToast("This account is does not exist");
    }
    await loading.dismiss();
    //this.usersService.createNewUser(user.email,user.password);
  }

  async presentToast(message,dur?) {
    const toast = await this.toastController.create({
      message: message,
      duration: dur ? dur : 2000
    });
    await toast.present();
  }
}
