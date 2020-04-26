import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/validators';

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

  constructor(private formBuilder: FormBuilder) { }

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
  register(){
    this.submitted=true;
    if(this.registerForm.invalid)
    {
      return;
    }
    
    console.log(this.registerForm.value)
  }

}
