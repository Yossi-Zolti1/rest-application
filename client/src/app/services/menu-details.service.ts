import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Department, Menu } from '../core/entities/menu';
@Injectable({
  providedIn: 'root'
})
export class MenuDetailsService {

  constructor(private http: HttpClient) { }
  addMenu(menu:FormData){
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

  deleteMenu(menuId: number) {
    return this.http.delete(environment.baseUrl + '/owner/delete_menu?menuId=' + menuId).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
    }));
  }
  addDepartment(department: FormData){
    return this.http.post(environment.baseUrl + '/owner/add_department', department).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  getDepartments(menuId: number) : Observable<Department[]>{
    return this.http.get<Department[]>(environment.baseUrl + '/owner/departments_details', {
      params: {
        menuId: menuId,
      }})
  }
}
