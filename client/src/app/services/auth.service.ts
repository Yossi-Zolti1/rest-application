import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../core/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerUser(user: User){
    return this.http.post('http://localhost:3000/user/createUser', user).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
     }))
  }
}
