import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;
  submitted: boolean=false;
  loading:boolean=false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm()
  {
    this.forgotForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.email]]
      }
    );
  }
  get f() { return this.forgotForm.controls; }
  submit(){
    this.submitted=true;
    if(this.forgotForm.invalid)
    {
      return;
    }
  }

}
