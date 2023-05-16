import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Email, User, UserLogin } from '../core/entities/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token$ = new BehaviorSubject<string | null>(null);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
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
    return this.http.post(environment.baseUrl + '/login', user).pipe(catchError(error => {
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
  getToken(): string | null{
    return this.token$?.value;
  }
  getIsLoggedIn(): boolean{
    return this.isLoggedIn$?.getValue();
  }
}
