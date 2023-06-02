import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { Table } from '../core/entities/table';

@Injectable({
  providedIn: 'root'
})
export class TableDetailsService {

  constructor(private http: HttpClient) { }

  addTables(tables: object, restId: string){

        const details: object[] = [{restId}, tables]
    
    return this.http.post(environment.baseUrl + '/owner/add_tables', details).pipe(catchError(error => {
      const err = error.statusCode;
      return of(err);
     }))
  }

  getTables(restId: string){

return this.http.get(environment.baseUrl + '/owner/tables_details', {
  params: {
    restId: restId,
  }})
}

}
