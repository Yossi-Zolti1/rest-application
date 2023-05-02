import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MailValidator } from 'src/app/validations/mailValidator';
import { NameValidator } from 'src/app/validations/nameValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, public fb: FormBuilder) { }
  registerForm = this.fb.group({
    email: ['', [MailValidator]],
    name: ['', [NameValidator]],
    password: [''],
    phone:[''],
  });
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  register(){
    debugger;
     this.auth.registerUser(this.registerForm.value).subscribe(res => {res; debugger;})
  }
  ngOnInit(): void {
  }

}
