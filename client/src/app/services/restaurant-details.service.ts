import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Restaurant} from '../core/entities/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailsService {

  constructor(private http: HttpClient) { }
  getRestaurantDetails(userId: number):Observable<Restaurant | any>{
    return this.http.get<Restaurant | any>(environment.baseUrl + `/owner/rest_details?userId=${userId}`).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
  }))}
  addRestaurant(restaurant: FormData){
    return this.http.post(environment.baseUrl + '/owner/add_rest', restaurant).pipe(catchError(error => {
      const err = error;
      return of(err);
     }))
  }
  updateRestaurant(restaurant: FormData){
    return this.http.put(environment.baseUrl + '/owner/update_rest', restaurant).pipe(catchError(error => {
      const err = error.status;
      return of(err);
     }))
  }
  getAllRestaurants(page: number):Observable<Restaurant[] | any> {
    return this.http.get<Restaurant | any>(environment.baseUrl + `/customer/rests_details`, {
      params: {
        currentPage: page,
      }
    }).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
  }))
  }
  getrestByName(name: string):Observable<Restaurant[] | any>{
    return this.http.get<Restaurant | any>(environment.baseUrl + `/customer/rest_details_by_name`, {
      params: {
        nameInserted: name,
      }
    }).pipe(catchError(error => {
      const statusCode = error.status;
      return of(statusCode);
  }))
  }
}
