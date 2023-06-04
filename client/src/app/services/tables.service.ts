import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ModifiedTable, Table } from '../core/entities/table';

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

//   getTables(restId: string):Observable<ModifiedTable[]>{

//  return this.http.get<Table[]>(environment.baseUrl + '/owner/tables_details', {
//   params: {
//     restId: restId,
//   }}).pipe(switchMap(res => 
        
//   ))
// }
getTables(restId: string): Observable<ModifiedTable[] | any> {
  return this.http.get<Table[]>(environment.baseUrl + '/owner/tables_details', {
    params: {
      restId: restId,
    }}
  ).pipe(
    switchMap((tables: Table[]) =>
      of(
        tables.map((table: Table) => ({
          name: table.name,
          position: { x: table.positionX, y: table.positionY }
        }))
      )
    ),catchError(error => {
      const err = error.statusCode;
      return of(err);
     })
  );
}
}
