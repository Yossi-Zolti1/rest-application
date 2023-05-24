import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../core/entities/menu';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDetailsService {

  constructor(private http: HttpClient) { }
  addMenu(menu:Menu){
    return this.http.post(environment.baseUrl + '/owner/add_menu', menu).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  getMenus(restId: number) :Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.baseUrl + '/owner/menus_details', {
      params: {
        restId: restId,
      }})
  }
  
}
