import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../core/services/authentication.service';
import { ArquitecturaService } from './arquitectura.service';
import { map } from 'rxjs/operators';
import { HistoryFilter } from '../models/historyFilter.model';

const headers = new HttpHeaders();
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
headers.append('Access-Control-Allow-Origin', '*');
let options = {headers: headers}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  http: HttpClient
  constructor(http: HttpClient,private authentication: AuthenticationService,private arquitecturaService: ArquitecturaService) {
    this.http = http
   }  
  
  getHistoryByFilter(filter: HistoryFilter): Observable<any>{
    return  this.http.post<any>(environment.RestFullApi+'history/GetHistoryFilter',filter)
    .pipe(
        map(res => {
        return res
        })
    );
  }

}
