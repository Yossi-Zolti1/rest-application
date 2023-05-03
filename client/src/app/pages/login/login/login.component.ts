import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder,private auth: AuthService) { }
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })
  //Buttons clicks functionalities 
  login() {
    this.auth.login(this.loginForm.value).subscribe(res => {res;
      if(res === 400){
        this.loginForm.reset();
        alert('אין משתמש כזה במערכת')
      }
      else{
        localStorage.setItem('token', res.token);
        const role = this.auth.getRole();
      }
      })
  }
  ngOnInit(): void {
  }

}
