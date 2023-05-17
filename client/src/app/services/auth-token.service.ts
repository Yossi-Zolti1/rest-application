import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private token = localStorage.getItem('token');
  private decodedToken: { [key: string]: string } = {};
  
  constructor(private authService: AuthService) {
    debugger;
    if(this.authService.isLoggedIn$){
      const token = this.authService.getToken();
      this.decodedToken = jwt_decode(token!);
    }
    else if (this.token && this.token != 'undefined') {
      this.decodedToken = jwt_decode(this.token);
    }
   }
   getRole(): string {
    debugger;
    return this.decodedToken['_role'];
  }
}


