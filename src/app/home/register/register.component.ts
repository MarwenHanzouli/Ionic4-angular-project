import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/validators';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean=false;
  registred:boolean=false;
  loading:boolean=false;
  type:string;
  eye:string;
  color:string;
  loader:any=null;
  emailRegistred:boolean=false;

  constructor(private formBuilder: FormBuilder,
              private usersService:UsersService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
    this.type="password";
    this.eye="eye-off";
    this.color="primary";
  }
  initForm()
  {
    this.registerForm = this.formBuilder.group(
      {
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        phone:['', [Validators.required,Validators.pattern(/^[0-9]*$/)]],
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required],
        repassword: ['', Validators.required]
      },{
        validator: MustMatch('password', 'repassword')
      }
    );
  }
  get f() { return this.registerForm.controls; }
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
  async register(){
    this.submitted=true;
    if(this.registerForm.invalid)
    {
      return;
    }
    this.loader = await this.loadingController.create({
      message: 'Please wait...'
    });
    let x=await this.loader.present();
    let user=new User(this.registerForm.value['firstName'],this.registerForm.value['lastName'],
    this.registerForm.value['phone'],this.registerForm.value['email'],this.registerForm.value['password'])
    let d=await this.usersService.getUserFromFirebase('email',this.registerForm.value['email'])
    if(d.hasChildren()){
      this.loader.dismiss();
      this.emailRegistred=true;
      this.presentToast("Try with another email")
    }
    else{
      this.usersService.register(user).subscribe(
        () => {
          this.loader.dismiss();
          this.registred=true;
          this.router.navigate(['/home'])
          this.presentToast("This registration is successfully completed",3000);
        },
        (error) => {
          this.loader.dismiss();
        }
      );
    }
    
  }
  async presentLoading(){
    this.loader = await this.loadingController.create({
      message: 'Please wait...'
    });
    return await this.loader.present(); 
  }
  async dismissLoading(){
    await this.loader.dismiss();
  }
  async presentToast(message,dur?) {
    const toast = await this.toastController.create({
      message: message,
      duration: dur ? dur : 2000
    });
    await toast.present();
  }
}
