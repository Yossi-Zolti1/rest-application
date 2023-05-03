import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User, UserLogin } from '../core/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerUser(user: User){
    return this.http.post(environment.baseUrl + '/user/createUser', user).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
     }))
  }
  login(user: UserLogin){
    return this.http.post(environment.baseUrl + '/user/login', user).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
     }))
  }
}
