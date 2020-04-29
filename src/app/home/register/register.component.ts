import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/validators';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean=false;
  loading:boolean=false;
  type:string;
  eye:string;
  color:string;
  loader:any=null;
  emailRegistred:boolean=false;

  constructor(private formBuilder: FormBuilder,
              private usersService:UsersService,
              public loadingController: LoadingController) { }

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
    const element = await this.loadingController.getTop();
    let user=new User(this.registerForm.value['firstName'],this.registerForm.value['lastName'],
    this.registerForm.value['phone'],this.registerForm.value['email'],this.registerForm.value['password'])
    this.usersService.getUserFromFirebase('email',this.registerForm.value['email'])
    .then(function(d){
      if(d.hasChildren()){
        if (element) 
        {
          element.dismiss();
        }
      }
      else{
        this.loader.dismiss();
        console.log("hhhhhhhhhhhhhh")
        // this.usersService.register(user).subscribe(
        //   () => {
        //     this.loader.dismiss();
        //     console.log('Enregistrement terminé !');
        //   },
        //   (error) => {
        //     console.log('Erreur ! : ' + error);
        //   }
        // );
      }
    })
    
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
}
