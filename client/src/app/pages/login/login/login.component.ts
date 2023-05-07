import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder,private auth: AuthService, private router: Router) { }
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })
  //Buttons clicks functionalities 
  login() {
    this.auth.login(this.loginForm.value).subscribe(res => {res;
      if(res === 400){
        this.loginForm.reset();
        debugger;
        alert('אין משתמש כזה במערכת')
      }
      else{
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin']);
      }
      })
  }
  forgotPassword(){
    const email = {
      email: this.loginForm.controls['email'].value
    }
    this.auth.forgotPassword(email).subscribe(res => {
debugger;
    })
  }
  ngOnInit(): void {
  }

}
