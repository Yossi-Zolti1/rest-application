import { Component, OnInit } from '@angular/core';
import {  UntypedFormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MailValidator } from 'src/app/validations/mailValidator';
import { NameValidator } from 'src/app/validations/nameValidator';
import { PasswordValidator } from 'src/app/validations/passwordValidator';
import { PhoneValidator } from 'src/app/validations/phoneValidator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, public fb: UntypedFormBuilder, private router: Router) { }
  registerForm = this.fb.group({
    email: ['', [MailValidator]],
    name: ['', [NameValidator]],
    password: ['',PasswordValidator],
    phone:['', PhoneValidator],
  });
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  register(){
    this.auth.registerUser(this.registerForm.value).subscribe(res => {
    if(res.status == 400){
      if(res.error.message.code === 'ER_DUP_ENTRY'){
        this.registerForm.reset();
        alert(" קיים משתמש כזה במערכת")
      }
      else{
        alert("ההרשמה נכשלה")
      }
    }
    else{
      this.router.navigate(['login'])
    }
    })
  }
  ngOnInit(): void {
  }

}
