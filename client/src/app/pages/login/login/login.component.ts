import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  userLogin = true;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
  });
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  //Buttons clicks functionalities 
  user_register() {
    this.userLogin = false;
  }
  user_login() {
    this.userLogin = true;
  }
  register(e: any) {
  
  }
  login() {
    
  }
  ngOnInit(): void {
  }

}
