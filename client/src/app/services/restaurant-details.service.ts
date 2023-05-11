import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Restaurant } from '../core/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailsService {

  constructor(private http: HttpClient) { }
  getRestaurantDetails():Observable<Restaurant | any>{
    return this.http.get<Restaurant | any>(environment.baseUrl + '/owner/rest_details').pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
  }))}
  addRestaurant(restaurant: Restaurant){
    return this.http.post(environment.baseUrl + '/owner/add_rest', restaurant).pipe(catchError(error => {
      const err = error;
      return of(err);
     }))
  }
}