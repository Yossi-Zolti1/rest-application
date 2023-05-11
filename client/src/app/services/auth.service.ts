import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Email, User, UserLogin } from '../core/user';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = localStorage.getItem('token');
  private decodedToken: { [key: string]: string } = {};
  constructor(private http: HttpClient) {
    if (this.token && this.token != 'undefined') {
      this.decodedToken = jwt_decode(this.token);
    }
   }
  registerUser(user: User){
    return this.http.post(environment.baseUrl + '/user/createUser', user).pipe(catchError(error => {
      const err = error;
      return of(err);
     }))
  }
  registerRestManager(user: User){
    return this.http.post(environment.baseUrl + '/admin/create_rest_manager', user).pipe(catchError(error => {
      const err = error;
      return of(err);
     }))
  }
  login(user: UserLogin){
    return this.http.post(environment.baseUrl + '/user/login', user).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
     }))
  }
  forgotPassword(email: Email){
    return this.http.post(environment.baseUrl + '/user/forgotPassword', email).pipe(catchError(error => {
      const statusCode = error;
      return of(statusCode);
     }))
  }
  getRole(): string {
    return this.decodedToken['_role'];
  }
}
