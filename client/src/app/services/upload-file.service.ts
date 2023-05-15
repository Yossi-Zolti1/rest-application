import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }
  updateLogo(logo: FormData): Observable<{msg: string, link1:string}>{
    return this.http.post<{msg:string, link1:string}>(environment.baseUrl + '/owner/update_logo', logo)
  }
}
