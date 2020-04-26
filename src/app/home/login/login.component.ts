import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

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
  login(){
    this.submitted=true;
    if(this.authForm.invalid)
    {
      return;
    }
  }
}
