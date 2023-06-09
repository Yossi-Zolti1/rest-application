import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Department, Item, Menu, RestaurantState } from '../core/entities/menu';
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
  getRestDetails(restId: number) :Observable<RestaurantState>{
    return this.http.get<RestaurantState>(environment.baseUrl + '/customer/menus_details', {
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
  deleteDepartment(departmentId: number) {
    return this.http.delete(environment.baseUrl + '/owner/delete_department' , {
      params: {
        departmentId: departmentId
      }
    }).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
    }));
  }
  deleteItem(itemId: number) {
    return this.http.delete(environment.baseUrl + '/owner/delete_item' , {
      params: {
        itemId: itemId
      }
    }).pipe(catchError(error => {
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
  addItem(item: FormData){
    return this.http.post(environment.baseUrl + '/owner/add_item', item).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  getItems(departmentId: number) : Observable<Item[]>{
    return this.http.get<Item[]>(environment.baseUrl + '/owner/items_details', {
      params: {
        departmentId: departmentId,
      }})
  }
  getSingleMenu(menuId: number): Observable<Menu>{
    return this.http.get<Menu>(environment.baseUrl + '/owner/single_menu_details', {
      params: {
        menuId: menuId,
      }})
  }
  updateMenu(menu:FormData){
    return this.http.put(environment.baseUrl + '/owner/update_menu', menu).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  updateDepartment(department: FormData){
    return this.http.put(environment.baseUrl + '/owner/update_department', department).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  updateItem(item: FormData){
    return this.http.put(environment.baseUrl + '/owner/update_item', item).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }
  getSingleDepartment(departmentId: number): Observable<Department>{
    return this.http.get<Department>(environment.baseUrl + '/owner/single_department_details', {
      params: {
        departmentId: departmentId,
      }})
  }
  getSingleItem(itemId: number): Observable<Item>{
    return this.http.get<Item>(environment.baseUrl + '/owner/single_item_details', {
      params: {
        itemId: itemId,
      }}).pipe(catchError(error => {
        const err = error.statusCode;
        return of(err);
       }))
  }
}
